function renderPanelSVG(visual, scenario) {
  if (!visual) return "";
  const type = visual?.type || "main";
  const isSub = type === "sub";
  const isBonded = visual?.bonding === "bonded";
  const hasNeutral = visual?.feeder === "neutral" || visual?.feeder === "complete";
  const hasGround = visual?.feeder === "ground" || visual?.feeder === "complete";
  const hasHots = visual?.feeder === "hots" || visual?.feeder === "complete";
  const done = visual?.done;
  const rods = visual?.rods;
  const breakers = visual?.breakers || [];
  const voltage = scenario?.voltage || "";
  const is3ph = voltage.includes("208") || voltage.includes("480") || voltage.includes("277");
  const phaseColors = is3ph ? ["#e03", "#d60", "#38c"] : ["#111", "#d00"];
  const phaseLabels = is3ph ? ["A", "B", "C"] : ["L1", "L2"];

  const W = 440, H = 500;
  const cx = W / 2;

  function svg(tag, attrs, content) {
    const a = Object.entries(attrs || {}).map(([k, v]) => `${k}="${v}"`).join(" ");
    return content ? `<${tag} ${a}>${content}</${tag}>` : `<${tag} ${a}/>`;
  }

  function rect(x, y, w, h, fill, stroke, r) {
    return svg("rect", { x, y, width: w, height: h, fill: fill || "none", stroke: stroke || "none", rx: r || 0, ry: r || 0 });
  }

  function circle(cx, cy, r, fill, stroke) {
    return svg("circle", { cx, cy, r, fill: fill || "none", stroke: stroke || "none" });
  }

  function text(x, y, txt, size, fill, anchor) {
    return svg("text", { x, y, "font-size": size || 12, fill: fill || "#333", "text-anchor": anchor || "middle", "font-family": "system-ui,sans-serif" }, txt);
  }

  function line(x1, y1, x2, y2, stroke, width) {
    return svg("line", { x1, y1, x2, y2, stroke: stroke || "#999", "stroke-width": width || 1.5 });
  }

  function path(d, stroke, width, fill) {
    return svg("path", { d, fill: fill || "none", stroke: stroke || "none", "stroke-width": width || 1.5, "stroke-linecap": "round", "stroke-linejoin": "round" });
  }

  // Wire curves: top-entry to terminal
  function wirePath(x1, y1, x2, y2) {
    const mid = y1 + (y2 - y1) * 0.4;
    return `M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`;
  }

  let parts = [];

  // === SVG root ===
  parts.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:0 auto">`);

  // === Background / Wall ===
  parts.push(rect(0, 0, W, H, "#e8e4dc", "none"));
  parts.push(rect(0, 0, W, H, "none", "#bbb", 0));
  for (let r = 0; r < H; r += 20) {
    parts.push(line(0, r, W, r, "#ddd", 0.5));
  }

  // === Panel Enclosure ===
  const px = 30, py = 25, pw = 380, ph = 440;
  parts.push(rect(px, py, pw, ph, "#fff", "#666", 3));
  parts.push(rect(px + 8, py + 8, pw - 16, ph - 16, "none", "#ccc", 2));

  // === Panel label ===
  parts.push(text(cx, py + 22, isSub ? "SUBPANEL" : "MAIN SERVICE PANEL", 13, "#555", "middle"));
  parts.push(text(cx, py + 36, voltage || "", 10, "#999", "middle"));

  // === Conduit / Feed entry (top) ===
  const conduitX = cx;
  const entryY = py + 8;
  parts.push(rect(conduitX - 18, py - 8, 36, 16, "#666", "#444", 4));
  parts.push(rect(conduitX - 12, py - 8, 24, 8, "#555", "none"));
  parts.push(text(conduitX, py - 2, "FEED", 8, "#fff", "middle"));

  // === MAIN BREAKER / FEED LUGS ===
  const mbY = 70, mbH = 50, mbW = 180, mbX = cx - mbW / 2;

  if (!isSub) {
    // Main breaker body
    parts.push(rect(mbX, mbY, mbW, mbH, "#333", "#222", 4));
    parts.push(rect(mbX + 4, mbY + 4, mbW - 8, mbH - 8, "#444", "#555", 3));
    parts.push(text(cx, mbY + 20, "MAIN BREAKER", 11, "#eee", "middle"));
    parts.push(text(cx, mbY + 34, "200A", 10, "#aaa", "middle"));

    // Lug positions on main breaker
    const lugSpacing = is3ph ? 40 : 60;
    const lugStart = cx - (lugSpacing * (is3ph ? 1 : 0.5));
    for (let i = 0; i < (is3ph ? 3 : 2); i++) {
      const lx = lugStart + i * lugSpacing;
      parts.push(circle(lx, mbY + mbH + 10, 8, "#666", "#555"));
      parts.push(text(lx, mbY + mbH + 24, phaseLabels[i], 9, "#555", "middle"));
    }
  } else {
    // Subpanel feed lugs
    parts.push(rect(mbX, mbY, mbW, mbH, "#eee", "#ccc", 4));
    parts.push(text(cx, mbY + 18, "FEED FROM MAIN", 11, "#666", "middle"));
    parts.push(text(cx, mbY + 32, "L1 · L2 · N · G", 9, "#999", "middle"));

    const lugSpacing = is3ph ? 40 : 55;
    const lugStart = cx - (lugSpacing * (is3ph ? 1 : 0.5));
    for (let i = 0; i < (is3ph ? 3 : 2); i++) {
      const lx = lugStart + i * lugSpacing;
      parts.push(circle(lx, mbY + mbH + 10, 7, "#ddd", "#bbb"));
    }
  }

  // === Bus bars ===
  const busTop = mbY + mbH + 24;
  const busBot = 340;
  const busW = 10;
  const busGap = is3ph ? 65 : 90;
  const busStart = cx - busGap;

  for (let i = 0; i < (is3ph ? 3 : 2); i++) {
    const bx = busStart + i * busGap;
    // Bus bar
    parts.push(rect(bx - busW / 2, busTop, busW, busBot - busTop, "#c0c0c0", "#999", 2));
    // Bus bar shine
    parts.push(rect(bx - busW / 4, busTop, busW / 3, busBot - busTop, "rgba(255,255,255,0.25)", "none"));
    // Breaker stabs
    for (let s = busTop + 20; s < busBot - 15; s += 35) {
      parts.push(rect(bx - 6, s, 12, 6, "#aaa", "#888", 1));
    }
    // Bus label
    parts.push(text(bx, busBot + 12, phaseLabels[i], 9, "#888", "middle"));
  }

  // === Branch Breakers (on bus bars) ===
  if (breakers.length > 0) {
    const brY = busTop + 10;
    const labels = ["15A", "20A", "30A", "40A", "50A", "60A"];
    const colors = ["#eee", "#ddd", "#ccc", "#bbb", "#aaa", "#999"];
    breakers.forEach((b, i) => {
      const bx = busStart + (i < breakers.length / 2 ? 0 : 1) * busGap;
      const by = brY + (i % Math.ceil(breakers.length / 2)) * 30;
      const bw = 28, bh = 22;
      const bi = labels.indexOf(b);
      const bc = bi >= 0 ? colors[bi] : "#ddd";
      parts.push(rect(bx - bw / 2, by, bw, bh, bc, "#bbb", 2));
      parts.push(text(bx, by + 14, b, 7, "#333", "middle"));
    });
  }

  // === Neutral Bar ===
  const nBarY = 365, nBarH = 28, nBarW = 140, nBarX = px + 25;
  parts.push(rect(nBarX, nBarY, nBarW, nBarH, "#e8e0f0", "#b088e0", 3));

  if (isSub) {
    parts.push(text(nBarX + nBarW / 2, nBarY + 18, "NEUTRAL (FLOATING)", 9, "#6b21a8", "middle"));
    // Isolation indicator
    parts.push(rect(nBarX + 4, nBarY - 3, nBarW - 8, 3, "#fef3c7", "#f59e0b"));
  } else if (isBonded) {
    parts.push(text(nBarX + nBarW / 2, nBarY + 18, "NEUTRAL (BONDED)", 9, "#6b21a8", "middle"));
  } else {
    parts.push(text(nBarX + nBarW / 2, nBarY + 18, "NEUTRAL BAR", 9, "#6b21a8", "middle"));
  }

  // Neutral screw terminals
  for (let i = 0; i < 5; i++) {
    parts.push(circle(nBarX + 18 + i * 26, nBarY + nBarH / 2, 4, "#d0b0f0", "#a080d0"));
  }

  // === Ground Bar ===
  const gBarX = px + pw - 25 - nBarW;
  parts.push(rect(gBarX, nBarY, nBarW, nBarH, "#e0f0e0", "#60c080", 3));
  parts.push(text(gBarX + nBarW / 2, nBarY + 18, "GROUND BAR", 9, "#166534", "middle"));

  for (let i = 0; i < 5; i++) {
    parts.push(circle(gBarX + 18 + i * 26, nBarY + nBarH / 2, 4, "#a0e0a0", "#60c080"));
  }

  // === Bonding Indicator ===
  const bondX = cx, bondY = mbY + mbH + 40;
  if (isBonded && !isSub) {
    parts.push(rect(bondX - 50, bondY - 10, 100, 20, "#fef3c7", "#f59e0b", 10));
    parts.push(text(bondX, bondY + 4, "✓ BONDING SCREW IN", 10, "#92400e", "middle"));
  }

  // === FEEDER WIRES ===
  // Entry points at top
  const phases = is3ph ? 3 : 2;
  const feedX = cx;
  const feedY = entryY + 10;

  // Wire data: label, color, target func
  const wires = [];

  if (hasHots) {
    for (let i = 0; i < phases; i++) {
      const lugX = busStart + i * busGap;
      const color = phaseColors[i];
      wires.push({
        label: phaseLabels[i],
        color,
        fromX: feedX - 20 + i * 20,
        fromY: feedY,
        toX: lugX,
        toY: busTop - 10,
      });
    }
  }

  if (hasNeutral) {
    wires.push({
      label: "N",
      color: "#eee",
      strokeColor: "#ccc",
      fromX: feedX + 15,
      fromY: feedY,
      toX: nBarX + nBarW / 2,
      toY: nBarY,
    });
  }

  if (hasGround) {
    wires.push({
      label: "G",
      color: "#4ade80",
      strokeColor: "#22c55e",
      fromX: feedX + 35,
      fromY: feedY,
      toX: gBarX + nBarW / 2,
      toY: nBarY,
    });
  }

  // Draw wires
  for (const w of wires) {
    const d = wirePath(w.fromX, w.fromY, w.toX, w.toY);
    const sc = w.strokeColor || w.color;
    // Wire shadow
    parts.push(path(d, "rgba(0,0,0,0.15)", 5));
    // Wire
    parts.push(path(d, sc, 3));
    // Wire highlight
    parts.push(path(d, w.color, 1.5));
    // Wire label dot
    parts.push(circle(w.toX, w.toY - 2, 3, w.color, w.strokeColor || w.color));
    parts.push(text(w.toX, w.toY - 10, w.label, 8, "#333", "center"));
  }

  // === Ground Rods ===
  if (rods) {
    const rodX = gBarX + nBarW + 15;
    parts.push(rect(rodX, nBarY + 24, 6, 50, "#888", "#666", 1));
    parts.push(rect(rodX + 1, nBarY + 24, 4, 50, "#999", "none"));
    parts.push(line(rodX + 3, nBarY + 28, gBarX + nBarW - 5, nBarY + 26, "#22c55e", 1.5));
    parts.push(circle(rodX + 3, nBarY + 26, 2, "#22c55e"));
    parts.push(text(rodX + 3, nBarY + 84, "GR", 7, "#888", "middle"));
  }

  // === Done overlay ===
  if (done) {
    parts.push(rect(px + 20, py + 150, pw - 40, 60, "rgba(22,163,74,0.12)", "#16a34a", 8));
    parts.push(text(cx, py + 185, "✓ INSTALLATION COMPLETE", 16, "#16a34a", "middle"));
  }

  // === Bonding screw visual (subpanel warning) ===
  if (isSub && isBonded) {
    parts.push(rect(cx - 70, bondY + 100, 140, 24, "#fef2f2", "#b91c1c", 6));
    parts.push(text(cx, bondY + 116, "⚠ BONDING SCREW MUST BE OUT", 10, "#b91c1c", "middle"));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

export { renderPanelSVG };
