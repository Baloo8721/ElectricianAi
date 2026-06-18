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

  const W = 500, H = 580;
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

  function wirePath(x1, y1, x2, y2) {
    const mid = y1 + (y2 - y1) * 0.4;
    return `M${x1},${y1} C${x1},${mid} ${x2},${mid} ${x2},${y2}`;
  }

  let parts = [];

  parts.push(`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;display:block;margin:0 auto">`);

  // === Background / Wall ===
  parts.push(rect(0, 0, W, H, "#e8e4dc", "none"));
  parts.push(rect(0, 0, W, H, "none", "#bbb", 0));
  for (let r = 0; r < H; r += 20) {
    parts.push(line(0, r, W, r, "#ddd", 0.5));
  }

  // === Service Mast (weatherhead and conduit above panel) ===
  const mastX = cx;
  const mastTop = 0;
  const mastBot = 55;
  parts.push(rect(mastX - 10, mastTop, 20, mastBot - mastTop, "#666", "#444", 2));
  parts.push(line(mastX - 10, mastTop + 10, mastX + 10, mastTop + 10, "#555", 1));
  parts.push(line(mastX - 6, mastTop, mastX - 6, mastBot, "#7a7a7a", 1));

  // Weatherhead at top
  parts.push(rect(mastX - 18, mastTop - 14, 36, 18, "#777", "#555", 6));
  parts.push(line(mastX - 18, mastTop - 8, mastX - 18, mastTop - 2, "#999", 2));
  parts.push(line(mastX + 18, mastTop - 8, mastX + 18, mastTop - 2, "#999", 2));
  parts.push(text(mastX, mastTop - 20, "SERVICE MAST", 8, "#777", "middle"));

  // Utility lines coming in from top
  parts.push(line(mastX - 14, mastTop - 30, mastX - 12, mastTop - 14, "#333", 2));
  parts.push(line(mastX, mastTop - 30, mastX, mastTop - 14, "#eee", 2));
  parts.push(line(mastX + 14, mastTop - 30, mastX + 12, mastTop - 14, "#d00", 2));
  parts.push(text(mastX, mastTop - 34, "UTILITY", 7, "#888", "middle"));

  //=== Meter Base ===
  const meterY = 8;
  parts.push(rect(mastX - 28, meterY, 56, 40, "#ddd", "#999", 4));
  parts.push(rect(mastX - 24, meterY + 4, 48, 32, "#eee", "#bbb", 3));
  parts.push(text(mastX, meterY + 16, "METER", 8, "#666", "middle"));
  parts.push(text(mastX, meterY + 30, "BASE", 8, "#666", "middle"));

  // === Panel Enclosure ===
  const px = 30, py = 55, pw = 440, ph = 470;
  parts.push(rect(px, py, pw, ph, "#fff", "#555", 3));
  parts.push(rect(px + 8, py + 8, pw - 16, ph - 16, "none", "#ccc", 2));

  // === Knockouts on sides ===
  for (let k = 0; k < 4; k++) {
    const ky = py + 80 + k * 60;
    parts.push(circle(px + 4, ky, 6, "#bbb", "#999"));
    parts.push(circle(px + pw - 4, ky, 6, "#bbb", "#999"));
  }
  // Filled knockout plugs on right side
  parts.push(circle(px + pw - 4, py + 80, 7, "#999", "#777"));
  parts.push(line(px + pw - 10, py + 76, px + pw + 2, py + 84, "#888", 1));
  parts.push(line(px + pw - 10, py + 84, px + pw + 2, py + 76, "#888", 1));

  //=== Panel label ===
  parts.push(text(cx, py + 22, isSub ? "SUBPANEL" : "MAIN SERVICE PANEL", 13, "#555", "middle"));
  if (voltage) {
    parts.push(text(cx, py + 36, voltage, 10, "#999", "middle"));
  }

  //=== Conduit / Feed entry (top of panel) ===
  const conduitX = cx;
  const entryY = py + 8;
  parts.push(rect(conduitX - 14, py - 6, 28, 14, "#666", "#444", 3));
  parts.push(rect(conduitX - 10, py - 6, 20, 6, "#555", "none"));
  parts.push(text(conduitX, py - 14, "FEED", 8, "#888", "middle"));

  //=== MAIN BREAKER / FEED LUGS ===
  const mbY = 80, mbH = 55, mbW = 200, mbX = cx - mbW / 2;

  if (!isSub) {
    parts.push(rect(mbX, mbY, mbW, mbH, "#333", "#222", 4));
    parts.push(rect(mbX + 4, mbY + 4, mbW - 8, mbH - 8, "#444", "#555", 3));
    parts.push(text(cx, mbY + 20, "MAIN BREAKER", 11, "#eee", "middle"));
    parts.push(text(cx, mbY + 32, hasHots ? "200A" : (scenario?.ampacity || "200A"), 10, "#aaa", "middle"));

    // Main breaker handle
    parts.push(rect(cx - 25, mbY + 38, 50, 8, "#d00", "#a00", 2));
    parts.push(rect(cx - 25, mbY + 38, 25, 8, "#111", "#a00", 2));

    const lugSpacing = is3ph ? 40 : 65;
    const lugStart = cx - (lugSpacing * (is3ph ? 1 : 0.5));
    for (let i = 0; i < (is3ph ? 3 : 2); i++) {
      const lx = lugStart + i * lugSpacing;
      parts.push(circle(lx, mbY + mbH + 10, 8, "#666", "#555"));
      parts.push(text(lx, mbY + mbH + 24, phaseLabels[i], 9, "#555", "middle"));
    }
  } else {
    parts.push(rect(mbX, mbY, mbW, mbH, "#eee", "#ccc", 4));
    parts.push(text(cx, mbY + 18, "FEED FROM MAIN", 11, "#666", "middle"));
    parts.push(text(cx, mbY + 32, "L1 \u00b7 L2 \u00b7 N \u00b7 G", 9, "#999", "middle"));

    const lugSpacing = is3ph ? 40 : 60;
    const lugStart = cx - (lugSpacing * (is3ph ? 1 : 0.5));
    for (let i = 0; i < (is3ph ? 3 : 2); i++) {
      const lx = lugStart + i * lugSpacing;
      parts.push(circle(lx, mbY + mbH + 10, 7, "#ddd", "#bbb"));
    }
  }

  //=== Bus bars ===
  const busTop = mbY + mbH + 28;
  const busBot = 390;
  const busW = 12;
  const busGap = is3ph ? 70 : 100;
  const busStart = cx - busGap;

  for (let i = 0; i < (is3ph ? 3 : 2); i++) {
    const bx = busStart + i * busGap;
    // Main bus bar
    parts.push(rect(bx - busW / 2, busTop, busW, busBot - busTop, "#c0c0c0", "#888", 2));
    // Bus bar shine
    parts.push(rect(bx - busW / 4, busTop, busW / 3, busBot - busTop, "rgba(255,255,255,0.25)", "none"));
    // Breaker stabs (tabs where breakers clip on)
    for (let s = busTop + 20; s < busBot - 20; s += 32) {
      parts.push(rect(bx - 7, s, 14, 7, "#aaa", "#777", 1));
      parts.push(line(bx - 4, s + 1, bx + 4, s + 1, "#ccc", 0.5));
    }
    // Bus label
    parts.push(text(bx, busBot + 14, phaseLabels[i], 9, "#888", "middle"));
  }

  //=== Branch Breakers ===
  if (breakers.length > 0) {
    const brY = busTop + 10;
    const labels = ["15A", "20A", "30A", "40A", "50A", "60A"];
    const colors = ["#eee", "#ddd", "#ccc", "#bbb", "#aaa", "#999"];
    const rowsPerPhase = Math.ceil(breakers.length / (is3ph ? 3 : 2));
    const rowH = 28;
    breakers.forEach((b, i) => {
      const phaseIdx = i % (is3ph ? 3 : 2);
      const rowIdx = Math.floor(i / (is3ph ? 3 : 2));
      const bx = busStart + phaseIdx * busGap;
      const by = brY + rowIdx * rowH;
      const bw = 32, bh = 22;
      const bi = labels.indexOf(b);
      const bc = bi >= 0 ? colors[bi] : "#ddd";
      parts.push(rect(bx - bw / 2, by, bw, bh, bc, "#aaa", 2));
      parts.push(line(bx - 10, by + 4, bx - 10, by + bh - 4, "#bbb", 1));
      parts.push(text(bx, by + 14, b, 7, "#333", "middle"));
      // Switch handle on breaker
      parts.push(rect(bx - 6, by + 16, 12, 4, "#555", "#444", 1));
    });
  }

  //=== Neutral Bar ===
  const nBarY = 415, nBarH = 30, nBarW = 160, nBarX = px + 30;
  parts.push(rect(nBarX, nBarY, nBarW, nBarH, "#e8e0f0", "#a080d0", 3));

  if (isSub) {
    parts.push(text(nBarX + nBarW / 2, nBarY + 19, "NEUTRAL (FLOATING)", 9, "#6b21a8", "middle"));
    parts.push(rect(nBarX + 4, nBarY - 3, nBarW - 8, 3, "#fef3c7", "#f59e0b"));
  } else if (isBonded) {
    parts.push(text(nBarX + nBarW / 2, nBarY + 19, "NEUTRAL (BONDED)", 9, "#6b21a8", "middle"));
  } else {
    parts.push(text(nBarX + nBarW / 2, nBarY + 19, "NEUTRAL BAR", 9, "#6b21a8", "middle"));
  }

  for (let i = 0; i < 6; i++) {
    parts.push(circle(nBarX + 18 + i * 24, nBarY + nBarH / 2, 4, "#d0b0f0", "#a080d0"));
  }

  //=== Ground Bar ===
  const gBarX = px + pw - 30 - nBarW;
  parts.push(rect(gBarX, nBarY, nBarW, nBarH, "#e0f0e0", "#50b080", 3));
  parts.push(text(gBarX + nBarW / 2, nBarY + 19, "GROUND BAR", 9, "#166534", "middle"));

  for (let i = 0; i < 6; i++) {
    parts.push(circle(gBarX + 18 + i * 24, nBarY + nBarH / 2, 4, "#a0e0a0", "#50b080"));
  }

  //=== MBJ Bonding Screw Visual ===
  if (!isSub) {
    // Green bonding screw on neutral bar visible
    parts.push(rect(nBarX + nBarW - 20, nBarY - 10, 14, 10, "#22c55e", "#16a34a", 2));
    parts.push(line(nBarX + nBarW - 13, nBarY - 10, nBarX + nBarW - 13, nBarY + nBarH, "#16a34a", 1.5));
    parts.push(text(nBarX + nBarW - 13, nBarY - 14, "MBJ", 7, "#16a34a", "center"));
  }

  //=== Bonding badge ===
  const bondX = cx, bondY = mbY + mbH + 50;
  if (isBonded && !isSub) {
    parts.push(rect(cx - 55, bondY - 10, 110, 20, "#fef3c7", "#f59e0b", 10));
    parts.push(text(cx, bondY + 4, "\u2713 BONDING SCREW IN", 10, "#92400e", "middle"));
  }

  //=== FEEDER WIRES ===
  const phases = is3ph ? 3 : 2;
  const feedX = cx;
  const feedY = entryY + 8;

  const wires = [];

  if (hasHots) {
    for (let i = 0; i < phases; i++) {
      const lugX = busStart + i * busGap;
      const color = phaseColors[i];
      wires.push({
        label: phaseLabels[i],
        color,
        fromX: feedX - 25 + i * 25,
        fromY: feedY,
        toX: lugX,
        toY: busTop - 8,
      });
    }
  }

  if (hasNeutral) {
    wires.push({
      label: "N",
      color: "#eee",
      strokeColor: "#ccc",
      fromX: feedX + 20,
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
      fromX: feedX + 45,
      fromY: feedY,
      toX: gBarX + nBarW / 2,
      toY: nBarY,
    });
  }

  for (const w of wires) {
    const d = wirePath(w.fromX, w.fromY, w.toX, w.toY);
    const sc = w.strokeColor || w.color;
    parts.push(path(d, "rgba(0,0,0,0.15)", 5));
    parts.push(path(d, sc, 3));
    parts.push(path(d, w.color, 1.5));
    parts.push(circle(w.toX, w.toY - 2, 3, w.color, w.strokeColor || w.color));
    parts.push(text(w.toX, w.toY - 10, w.label, 8, "#333", "center"));
  }

  //=== Ground Rods + GEC ===
  if (rods) {
    const rodX = gBarX + nBarW + 20;
    parts.push(rect(rodX, nBarY + 26, 8, 55, "#888", "#666", 2));
    parts.push(rect(rodX + 1, nBarY + 26, 6, 55, "#999", "none"));
    parts.push(line(rodX + 4, nBarY + 30, gBarX + nBarW - 5, nBarY + 28, "#22c55e", 2));
    parts.push(circle(rodX + 4, nBarY + 28, 3, "#22c55e"));
    parts.push(text(rodX + 4, nBarY + 90, "GROUND ROD", 7, "#888", "middle"));
    // Earth line at bottom of rod
    parts.push(line(rodX - 20, nBarY + 78, rodX + 28, nBarY + 78, "#a07040", 1.5, "M10,0 L0,10 L20,10 Z"));
    parts.push(line(rodX - 25, nBarY + 82, rodX + 33, nBarY + 82, "#a07040", 1.5));
  }

  //=== GEC from ground bar for non-rod visuals ===
  if (!rods && hasGround) {
    const gecX = gBarX + nBarW + 15;
    parts.push(line(gecX, nBarY + 15, gecX, nBarY + 55, "#22c55e", 2));
    parts.push(text(gecX, nBarY + 68, "GEC", 7, "#888", "middle"));
  }

  //=== Done overlay ===
  if (done) {
    parts.push(rect(px + 30, py + 170, pw - 60, 60, "rgba(22,163,74,0.12)", "#16a34a", 8));
    parts.push(text(cx, py + 205, "\u2713 INSTALLATION COMPLETE", 16, "#16a34a", "middle"));
  }

  //=== Subpanel bonding warning ===
  if (isSub && isBonded) {
    parts.push(rect(cx - 80, bondY + 150, 160, 24, "#fef2f2", "#b91c1c", 6));
    parts.push(text(cx, bondY + 166, "\u26A0 BONDING SCREW MUST BE OUT", 10, "#b91c1c", "middle"));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

export { renderPanelSVG };