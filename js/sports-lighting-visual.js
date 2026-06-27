function renderSportsSVG(visual, scenario) {
  const v = visual || {};
  const W = 420, H = 740;

  function text(x, y, t, s, c, a) {
    return `<text x="${x}" y="${y}" font-size="${s || 12}" fill="${c || "#333"}" text-anchor="${a || "start"}">${t}</text>`;
  }

  function rect(x, y, w, h, fc, sc, r) {
    const rx = r ? ` rx="${r}" ry="${r}"` : "";
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fc || "none"}" stroke="${sc || "none"}" stroke-width="1.5"${rx}/>`;
  }

  function circle(cx, cy, r, fc, sc) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fc || "none"}" stroke="${sc || "none"}" stroke-width="1.5"/>`;
  }

  function line(x1, y1, x2, y2, c, w) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || "#333"}" stroke-width="${w || 2}"/>`;
  }

  function dashLine(x1, y1, x2, y2, c, w) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || "#333"}" stroke-width="${w || 1.5}" stroke-dasharray="4,3"/>`;
  }

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" style="font-family:sans-serif;">`);

  const cx = W / 2;
  const poleCx = cx;

  //=== EARTH ===
  const earthY = 700;
  parts.push(line(20, earthY, W - 20, earthY, "#ac8e68", 2));
  parts.push(line(30, earthY + 6, W - 30, earthY + 6, "#ac8e68", 1));
  parts.push(text(40, earthY - 4, "GROUND", 9, "#888", "start"));

  //=== CONCRETE FOUNDATION ===
  const baseW = 110, baseH = 50, baseY = earthY - baseH;
  const baseX = poleCx - baseW / 2;
  parts.push(rect(baseX, baseY, baseW, baseH, "#d4d4d4", "#999", 4));
  parts.push(rect(baseX + 4, baseY + 4, baseW - 8, baseH - 8, "#e0e0e0", "none", 3));
  parts.push(text(poleCx, baseY + 28, "CONCRETE BASE", 9, "#777", "middle"));
  parts.push(text(poleCx, baseY + 40, "w/ lightning ground", 7, "#999", "middle"));

  //=== POLE (multi-section) ===
  const poleBaseY = baseY - 6;
  const poleBotW = 24, poleBotH = 260;
  const poleTopW = 18, poleTopH = 180;
  const poleTopY = poleBaseY - poleBotH - poleTopH;
  const poleMidY = poleBaseY - poleBotH;

  // Bottom section
  parts.push(rect(poleCx - poleBotW / 2, poleMidY, poleBotW, poleBotH, "#c0c0c0", "#888", 2));
  parts.push(rect(poleCx - poleBotW / 4, poleMidY, poleBotW / 3, poleBotH, "rgba(255,255,255,0.15)", "none"));

  // Joint ring between sections
  parts.push(rect(poleCx - poleBotW / 2 - 6, poleMidY - 2, poleBotW + 12, 6, "#999", "#777", 2));

  // Top section (slightly narrower)
  parts.push(rect(poleCx - poleTopW / 2, poleTopY, poleTopW, poleTopH, "#c8c8c8", "#888", 2));
  parts.push(rect(poleCx - poleTopW / 4, poleTopY, poleTopW / 3, poleTopH, "rgba(255,255,255,0.15)", "none"));

  // Pole base cover (cosmetic)
  const coverY = poleMidY + 210;
  const coverW = 40, coverH = 40;
  const coverX = poleCx - coverW / 2;
  parts.push(rect(coverX, coverY, coverW, coverH, "#aaa", "#888", 3));
  parts.push(rect(coverX + 2, coverY + 2, coverW - 4, coverH - 4, "#bbb", "none", 2));
  parts.push(text(poleCx, coverY + 24, "BASE COVER", 7, "#666", "middle"));

  //=== ECE ENCLOSURE (on left side of pole, mid-height) ===
  const eceW = 110, eceH = 130;
  const eceX = poleCx - poleBotW / 2 - eceW - 6;
  const eceY = poleMidY + 50;
  const eceHighlight = v.highlight === "ece";

  parts.push(rect(eceX, eceY, eceW, eceH, eceHighlight ? "#fef3c7" : "#e8e8e8", eceHighlight ? "#d97706" : "#888", 4));
  parts.push(rect(eceX + 4, eceY + 4, eceW - 8, 18, "#555", "#444", 2));
  parts.push(text(eceX + eceW / 2, eceY + 16, "ECE ENCLOSURE", 10, "#fff", "middle"));

  //=== Disconnect Switch (bottom-right of ECE) ===
  const discX = eceX + eceW - 32;
  const discY = eceY + eceH - 38;
  parts.push(rect(discX, discY, 26, 30, "#ddd", "#888", 3));
  parts.push(rect(discX + 3, discY + 3, 20, 24, "#eee", "none", 2));
  // Handle rotated to ON position
  parts.push(rect(discX + 8, discY + 7, 10, 16, "#333", "#222", 2));
  parts.push(line(discX + 13, discY + 12, discX + 13, discY + 18, "#4ade80", 2));
  parts.push(text(discX + 13, discY - 3, "DISC", 6, "#888", "middle"));

  //=== Distribution Blocks (between disconnect and fuses) ===
  const dbY = eceY + 28;
  for (let i = 0; i < 3; i++) {
    const dbx = eceX + 6 + i * 32;
    parts.push(rect(dbx, dbY, 26, 18, "#c8d8e8", "#8899aa", 3));
    parts.push(text(dbx + 13, dbY + 12, `${String.fromCharCode(65 + i)}`, 8, "#446", "middle"));
  }
  parts.push(text(eceX + eceW / 2, dbY - 4, "DISTRIBUTION BLOCKS", 7, "#888", "middle"));

  //=== Fuses ===
  const fuseY = eceY + 54;
  for (let i = 0; i < 3; i++) {
    const fx = eceX + 6 + i * 32;
    const isBlown = v.fault === "fuse";
    parts.push(rect(fx, fuseY, 26, 22, isBlown ? "#fef2f2" : "#d4d4d4", isBlown ? "#b91c1c" : "#999", 3));
    parts.push(text(fx + 13, fuseY + 14, `F${i + 1}`, 7, "#555", "middle"));
    if (isBlown) {
      parts.push(circle(fx + 13, fuseY - 4, 3, "#b91c1c", "#991111"));
      parts.push(text(fx + 13, fuseY - 8, "BLOWN", 5, "#b91c1c", "middle"));
    }
  }
  parts.push(text(eceX + eceW / 2, fuseY - 4, "FUSES", 7, "#888", "middle"));

  // Power flow arrow: disconnect → distribution blocks
  const pfColor = "#d97706";
  dashLine(discX + 13, discY - 2, eceX + eceW / 2, dbY + 18, pfColor, 1);

  //=== Drivers ===
  const drvY = eceY + 84;
  for (let i = 0; i < 2; i++) {
    const dx = eceX + 8 + i * 46;
    const isFaulty = v.fault === "driver" && i === 0;
    parts.push(rect(dx, drvY, 40, 38, isFaulty ? "#fef2f2" : "#d4d4d4", isFaulty ? "#b91c1c" : "#999", 3));
    parts.push(text(dx + 20, drvY + 12, "DRVR", 6, "#555", "middle"));
    parts.push(text(dx + 20, drvY + 20, `${i + 1}`, 6, "#555", "middle"));

    // 3 LED indicators on driver face
    for (let l = 0; l < 3; l++) {
      const lx = dx + 6 + l * 12;
      const ledColor = isFaulty ? "#b91c1c" : "#22c55e";
      parts.push(circle(lx, drvY + 30, 3, ledColor, "#555"));
    }
  }

  // ECE label (when highlighted)
  if (eceHighlight) {
    parts.push(rect(eceX - 2, eceY - 18, eceW + 4, 16, "#fef3c7", "#d97706", 4));
    parts.push(text(eceX + eceW / 2, eceY - 7, "CHECK ECE", 10, "#92400e", "middle"));
  }

  //=== HARNESS CONDUIT (from ECE up to crossarm) ===
  const harnessX = eceX + eceW - 4;
  const harnessTop = poleTopY + 24;
  const harnessBot = eceY + 10;
  const harnessColor = v.highlight === "harness" ? "#d97706" : "#999";
  parts.push(rect(harnessX - 4, harnessBot, 8, harnessTop - harnessBot, "#ddd", harnessColor, 2));
  parts.push(line(harnessX, harnessBot, harnessX, harnessTop, harnessColor, 1));
  parts.push(text(harnessX - 2, (harnessBot + harnessTop) / 2 + 3, "HARNESS", 7, "#888", "end"));

  //=== CROSSARM & FIXTURES ===
  const armY = poleTopY + 6;
  const armW = 160, armH = 14;
  const armX = poleCx - armW / 2;
  parts.push(rect(armX, armY, armW, armH, "#b0b0b0", "#888", 3));

  const fixturePositions = [
    poleCx - 50, poleCx - 10, poleCx + 30
  ];

  for (const fx of fixturePositions) {
    parts.push(rect(fx - 6, armY - 12, 12, 12, "#aaa", "#888", 2));
    parts.push(rect(fx - 2, armY - 16, 4, 4, "#888", "#666"));
    const fixtureW = 22, fixtureH = 32;
    const fxbx = fx - fixtureW / 2 + 10;
    parts.push(rect(fxbx, armY - fixtureH - 4, fixtureW, fixtureH, "#d0d0d0", "#888", 3));
    parts.push(rect(fxbx + 3, armY - fixtureH, fixtureW - 6, fixtureH - 6, "#e8e8e8", "none", 2));
    const isLit = v.lit === true;
    if (isLit) {
      parts.push(rect(fxbx + 4, armY - fixtureH + 6, fixtureW - 8, 14, "rgba(255,230,100,0.4)", "none", 4));
    }
  }

  parts.push(text(poleCx, armY + 36, "LUMINAIRE / CROSSARM", 8, "#555", "middle"));

  //=== CONTACTOR CABINET (right of pole base) ===
  const cabW = 90, cabH = 100;
  const cabX = poleCx + poleBotW / 2 + 20;
  const cabY = baseY - 4;
  const cabHighlight = v.highlight === "contactor";

  parts.push(rect(cabX, cabY, cabW, cabH, cabHighlight ? "#fef3c7" : "#e0e0e0", cabHighlight ? "#d97706" : "#888", 4));
  parts.push(rect(cabX + 4, cabY + 4, cabW - 8, 16, "#444", "#333", 2));
  parts.push(text(cabX + cabW / 2, cabY + 15, "CONTACTOR CABINET", 8, "#eee", "middle"));

  // Main contactor
  const ctY = cabY + 26;
  parts.push(rect(cabX + 6, ctY, cabW - 12, 28, "#ccc", "#999", 3));
  parts.push(text(cabX + cabW / 2, ctY + 17, "CONTACTOR", 7, "#444", "middle"));

  // Control transformer
  const trY = ctY + 32;
  parts.push(rect(cabX + 6, trY, cabW - 12, 18, "#d4d4d4", "#999", 2));
  parts.push(text(cabX + cabW / 2, trY + 13, "CTRL XFMR", 7, "#555", "middle"));

  // SPD (surge protection device)
  const spdY = trY + 22;
  parts.push(rect(cabX + 6, spdY, cabW - 12, 14, "#fef3c7", "#d97706", 2));
  parts.push(text(cabX + cabW / 2, spdY + 10, "SPD", 7, "#92400e", "middle"));

  // Conduit from cabinet to pole
  const conduitCx = cabX - 4;
  const conduitY1 = cabY + 16;
  const conduitY2 = cabY + 60;
  parts.push(line(conduitCx, conduitY1, poleCx + poleBotW / 2, eceY + eceH - 20, "#888", 2));
  parts.push(line(conduitCx, conduitY2, poleCx + poleBotW / 2, eceY + eceH - 6, "#888", 2));
  parts.push(text(conduitCx - 20, conduitY1 + 20, "CONDUIT", 7, "#777", "end"));

  if (cabHighlight) {
    parts.push(rect(cabX - 2, cabY - 18, cabW + 4, 16, "#fef3c7", "#d97706", 4));
    parts.push(text(cabX + cabW / 2, cabY - 7, "CHECK CABINET", 10, "#92400e", "middle"));
  }

  //=== COMPLETE BADGE ===
  if (v.done) {
    parts.push(rect(poleCx - 80, poleTopY - 40, 160, 28, "rgba(22,163,74,0.12)", "#16a34a", 8));
    parts.push(text(poleCx, poleTopY - 22, "\u2713 INSTALLATION COMPLETE", 13, "#16a34a", "middle"));
  }

  //=== FAULT LABEL ===
  if (v.faultLabel) {
    parts.push(rect(poleCx - 80, 10, 160, 24, "#fef2f2", "#b91c1c", 6));
    parts.push(text(poleCx, 26, v.faultLabel, 11, "#b91c1c", "middle"));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

export { renderSportsSVG };
