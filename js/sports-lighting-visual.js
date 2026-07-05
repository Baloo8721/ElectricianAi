function renderSportsSVG(visual, scenario) {
  const v = visual || {};
  const isHID = (scenario && scenario.id && scenario.id.includes("hid"));
  const W = 420, H = 820;

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
  const earthY = 780;
  parts.push(line(20, earthY, W - 20, earthY, "#ac8e68", 2));
  parts.push(line(30, earthY + 6, W - 30, earthY + 6, "#ac8e68", 1));
  parts.push(text(40, earthY - 4, "GROUND", 9, "#888", "start"));

  //=== PRECAST CONCRETE BASE with integrated lightning ground ===
  const baseW = 120, baseH = 60, baseY = earthY - baseH;
  const baseX = poleCx - baseW / 2;
  parts.push(rect(baseX, baseY, baseW, baseH, "#d4d4d4", "#999", 4));
  parts.push(rect(baseX + 4, baseY + 4, baseW - 8, baseH - 8, "#e0e0e0", "none", 3));
  parts.push(text(poleCx, baseY + 16, "PRECAST CONCRETE BASE", 9, "#777", "middle"));
  parts.push(text(poleCx, baseY + 28, '9,500 psi — NFPA 780 / UL 96A', 7, "#999", "middle"));

  // Grounding electrode symbol
  const geX = baseX - 18, geY = baseY + 6;
  parts.push(line(geX, geY, geX, geY + 46, "#d97706", 2));
  parts.push(rect(geX - 6, geY + 46, 12, 6, "#d97706", "#b45309", 2));
  parts.push(text(geX, geY + 56, "2/0 GEC", 6, "#d97706", "middle"));

  // Lightning symbol
  parts.push(text(geX, geY - 6, "\u26A1", 10, "#d97706", "middle"));

  //=== POLE (multi-section with jacking ears) ===
  const poleBaseY = baseY - 6;
  const poleBotW = 26, poleBotH = 280;
  const poleTopW = 20, poleTopH = 190;
  const poleTopY = poleBaseY - poleBotH - poleTopH;
  const poleMidY = poleBaseY - poleBotH;

  // Bottom section with jacking ears
  parts.push(rect(poleCx - poleBotW / 2, poleMidY, poleBotW, poleBotH, "#c0c0c0", "#888", 2));
  parts.push(rect(poleCx - poleBotW / 4, poleMidY, poleBotW / 3, poleBotH, "rgba(255,255,255,0.15)", "none"));
  // Jacking ears on lower section
  const jeY = poleMidY + 30;
  parts.push(rect(poleCx - poleBotW / 2 - 10, jeY, 8, 20, "#aaa", "#888", 2));
  parts.push(rect(poleCx + poleBotW / 2 + 2, jeY, 8, 20, "#aaa", "#888", 2));
  parts.push(text(poleCx, jeY + 30, "JACKING EARS", 6, "#888", "middle"));

  // Joint ring between sections
  parts.push(rect(poleCx - poleBotW / 2 - 8, poleMidY - 3, poleBotW + 16, 8, "#999", "#777", 2));

  // Top section
  parts.push(rect(poleCx - poleTopW / 2, poleTopY, poleTopW, poleTopH, "#c8c8c8", "#888", 2));
  parts.push(rect(poleCx - poleTopW / 4, poleTopY, poleTopW / 3, poleTopH, "rgba(255,255,255,0.15)", "none"));

  // Grounding lug inside pole
  const glY = poleMidY + poleBotH - 30;
  parts.push(rect(poleCx - 3, glY, 6, 14, "#d97706", "#b45309", 2));
  parts.push(text(poleCx, glY + 20, "GROUND LUG", 6, "#888", "middle"));

  // Pole base cover
  const coverY = poleMidY + 230;
  const coverW = 44, coverH = 40;
  const coverX = poleCx - coverW / 2;
  parts.push(rect(coverX, coverY, coverW, coverH, "#aaa", "#888", 3));
  parts.push(rect(coverX + 2, coverY + 2, coverW - 4, coverH - 4, "#bbb", "none", 2));
  parts.push(text(poleCx, coverY + 24, "BASE COVER", 7, "#666", "middle"));

  // Wire access handhole
  const whY = poleMidY + poleBotH - 60;
  parts.push(rect(poleCx - 8, whY, 16, 12, "#444", "#666", 2));
  parts.push(text(poleCx, whY + 20, "HANDHOLE", 6, "#888", "middle"));

  //=== POLE CAP ===
  const capY = poleTopY - 16;
  parts.push(rect(poleCx - 14, capY, 28, 16, "#888", "#666", 4));
  parts.push(rect(poleCx - 10, capY + 2, 20, 4, "#aaa", "#888", 2));
  parts.push(text(poleCx, capY + 12, "POLE CAP", 6, "#fff", "middle"));
  // Safety cable
  parts.push(line(poleCx, capY + 16, poleCx, capY + 28, "#888", 1.5));
  parts.push(circle(poleCx, capY + 28, 3, "#888", "#666"));
  parts.push(text(poleCx, capY + 36, "SAFETY CABLE", 6, "#888", "middle"));

  //=== ECE ENCLOSURE (on left side of pole, mid-height) ===
  const eceW = 112, eceH = 148;
  const eceX = poleCx - poleBotW / 2 - eceW - 8;
  const eceY = poleMidY + 40;
  const eceHighlight = v.highlight === "ece";

  parts.push(rect(eceX, eceY, eceW, eceH, eceHighlight ? "#fef3c7" : "#e8e8e8", eceHighlight ? "#d97706" : "#888", 4));
  parts.push(rect(eceX + 4, eceY + 4, eceW - 8, 16, "#555", "#444", 2));
  parts.push(text(eceX + eceW / 2, eceY + 15, "ECE ENCLOSURE", 9, "#fff", "middle"));

  // Pole mounting bracket label
  parts.push(rect(eceX + 2, eceY + eceH - 8, eceW - 4, 6, "#777", "#555", 1));
  parts.push(text(eceX + eceW / 2, eceY + eceH - 4, "MTG BRACKET", 6, "#ddd", "middle"));

  //=== Disconnect Switch (bottom-right of ECE) ===
  const discX = eceX + eceW - 34;
  const discY = eceY + eceH - 44;
  parts.push(rect(discX, discY, 28, 32, "#ddd", "#888", 3));
  parts.push(rect(discX + 4, discY + 3, 20, 26, "#eee", "none", 2));
  parts.push(rect(discX + 9, discY + 7, 10, 18, "#333", "#222", 2));
  parts.push(line(discX + 14, discY + 12, discX + 14, discY + 20, "#4ade80", 2));
  parts.push(text(discX + 14, discY - 3, "DISC SW", 6, "#888", "middle"));

  //=== Distribution Blocks ===
  const dbY = eceY + 26;
  for (let i = 0; i < 3; i++) {
    const dbx = eceX + 6 + i * 32;
    parts.push(rect(dbx, dbY, 28, 18, "#c8d8e8", "#8899aa", 3));
    parts.push(text(dbx + 14, dbY + 12, `${String.fromCharCode(65 + i)}`, 8, "#446", "middle"));
  }
  parts.push(text(eceX + eceW / 2, dbY - 3, "DISTRIBUTION BLOCKS", 7, "#888", "middle"));

  // Power flow arrow: disconnect to distribution blocks
  dashLine(discX + 14, discY - 2, eceX + eceW / 2, dbY + 18, "#d97706", 1);

  //=== Fuses ===
  const fuseY = eceY + 52;
  for (let i = 0; i < 3; i++) {
    const fx = eceX + 6 + i * 32;
    const isBlown = v.fault === "fuse";
    parts.push(rect(fx, fuseY, 28, 22, isBlown ? "#fef2f2" : "#d4d4d4", isBlown ? "#b91c1c" : "#999", 3));
    parts.push(text(fx + 14, fuseY + 14, `F${i + 1}`, 7, "#555", "middle"));
    if (isBlown) {
      parts.push(circle(fx + 14, fuseY - 4, 3, "#b91c1c", "#991111"));
      parts.push(text(fx + 14, fuseY - 8, "BLOWN", 5, "#b91c1c", "middle"));
    }
  }
  parts.push(text(eceX + eceW / 2, fuseY - 3, "FUSES", 7, "#888", "middle"));

  //=== Drivers (LED) OR Ballast + Capacitor (HID) ===
  const drvY = eceY + 82;
  if (isHID) {
    // Ballast (CWA autotransformer) — larger component
    parts.push(rect(eceX + 8, drvY, 44, 38, "#d4d4d4", "#999", 3));
    parts.push(text(eceX + 30, drvY + 14, "BALLAST", 7, "#444", "middle"));
    parts.push(text(eceX + 30, drvY + 22, "CWA", 6, "#666", "middle"));
    parts.push(text(eceX + 30, drvY + 32, "M48", 6, "#888", "middle"));

    // Capacitor
    parts.push(circle(eceX + 78, drvY + 18, 12, "#c8c8c8", "#999", 2));
    parts.push(circle(eceX + 78, drvY + 18, 8, "#e0e0e0", "none"));
    parts.push(text(eceX + 78, drvY + 22, "CAP", 6, "#555", "middle"));

    // Smart Lamp control module
    parts.push(rect(eceX + 60, drvY + 20, 44, 18, "#fef3c7", "#d97706", 2));
    parts.push(text(eceX + 82, drvY + 32, "SMART LAMP", 6, "#92400e", "middle"));
    
    // Hour meter
    parts.push(rect(eceX + 8, eceY + 124, 28, 14, "#fff", "#999", 2));
    parts.push(text(eceX + 22, eceY + 134, "HR METER", 5, "#888", "middle"));
  } else {
    // LED drivers (existing logic)
    for (let i = 0; i < 2; i++) {
      const dx = eceX + 8 + i * 48;
      const isFaulty = v.fault === "driver" && i === 0;
      parts.push(rect(dx, drvY, 44, 40, isFaulty ? "#fef2f2" : "#d4d4d4", isFaulty ? "#b91c1c" : "#999", 3));
      parts.push(text(dx + 22, drvY + 12, "DRVR", 6, "#555", "middle"));
      parts.push(text(dx + 22, drvY + 20, `${i + 1}`, 6, "#555", "middle"));
      for (let l = 0; l < 3; l++) {
        const lx = dx + 6 + l * 14;
        const ledColor = isFaulty ? "#b91c1c" : "#22c55e";
        parts.push(circle(lx, drvY + 32, 3, ledColor, "#555"));
      }
    }
    // Terminal block
    parts.push(rect(eceX + 8, eceY + 126, eceW - 42, 14, "#c8d8e8", "#8899aa", 2));
    parts.push(text(eceX + eceW / 2 - 10, eceY + 136, "TERM BLOCK", 6, "#446", "middle"));
  }

  if (eceHighlight) {
    parts.push(rect(eceX - 2, eceY - 18, eceW + 4, 16, "#fef3c7", "#d97706", 4));
    parts.push(text(eceX + eceW / 2, eceY - 7, "CHECK ECE", 10, "#92400e", "middle"));
  }

  //=== HARNESS CONDUIT from ECE to crossarm ===
  const harnessX = eceX + eceW - 4;
  const harnessTop = poleTopY + 30;
  const harnessBot = eceY + 12;
  const harnessColor = v.highlight === "harness" ? "#d97706" : "#999";
  parts.push(rect(harnessX - 5, harnessBot, 10, harnessTop - harnessBot, "#ddd", harnessColor, 2));
  parts.push(line(harnessX, harnessBot, harnessX, harnessTop, harnessColor, 1));

  // Wire support grip at mid-harness
  const wsgY = (harnessBot + harnessTop) / 2;
  parts.push(rect(harnessX - 8, wsgY - 5, 16, 10, "#daa520", "#b8860b", 3));
  parts.push(text(harnessX, wsgY - 12, "WIRE SUPPORT", 6, "#888", "middle"));
  parts.push(text(harnessX, wsgY - 5, "GRIP", 6, "#888", "middle"));

  // Quick-connect labels at top and bottom of harness
  parts.push(text(harnessX, harnessTop + 14, "TOP Q-CONN", 6, "#888", "middle"));
  parts.push(text(harnessX, harnessBot - 6, "LOW Q-CONN", 6, "#888", "middle"));

  //=== CROSSARM & LUMINAIRES ===
  const armY = poleTopY + 8;
  const armW = 170, armH = 14;
  const armX = poleCx - armW / 2;
  parts.push(rect(armX, armY, armW, armH, "#b0b0b0", "#888", 3));

  // Quick-connect plug-in between crossarm and luminaire
  parts.push(rect(armX + 10, armY - 6, 14, 6, "#daa520", "#b8860b", 2));
  parts.push(text(armX + 17, armY - 8, "QC", 6, "#b8860b", "middle"));

  const fixturePositions = [
    poleCx - 54, poleCx - 14, poleCx + 26
  ];

  for (const fx of fixturePositions) {
    // Mounting bracket
    parts.push(rect(fx - 6, armY - 14, 14, 14, "#aaa", "#888", 2));
    parts.push(rect(fx - 2, armY - 20, 6, 6, "#888", "#666"));

    // Luminaire body with visor
    const fixtureW = 24, fixtureH = 34;
    const fxbx = fx + 8;
    parts.push(rect(fxbx, armY - fixtureH - 6, fixtureW, fixtureH, "#d0d0d0", "#888", 3));
    parts.push(rect(fxbx + 2, armY - fixtureH - 4, fixtureW - 4, fixtureH - 6, "#e8e8e8", "none", 2));
    
    // Spill/glare control visor
    parts.push(rect(fxbx + fixtureW - 6, armY - fixtureH - 6, 6, fixtureH, "#c0c0c0", "#999", 1));

    // Knuckle assembly
    parts.push(rect(fx + 2, armY - 18, 6, 8, "#b0b0b0", "#888", 1));

    const isLit = v.lit === true;
    if (isLit) {
      parts.push(rect(fxbx + 4, armY - fixtureH + 6, fixtureW - 8, 16, "rgba(255,230,100,0.4)", "none", 4));
    }
  }

  parts.push(text(poleCx, armY + 40, "LUMINAIRE / CROSSARM", 8, "#555", "middle"));
  parts.push(text(poleCx, armY + 50, "w/ spill & glare visor", 6, "#999", "middle"));

  //=== CONTACTOR CABINET (right of pole base) ===
  const cabW = 92, cabH = 110;
  const cabX = poleCx + poleBotW / 2 + 24;
  const cabY = baseY - 8;
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
  parts.push(rect(cabX + 6, trY, cabW - 12, 20, "#d4d4d4", "#999", 2));
  parts.push(text(cabX + cabW / 2, trY + 14, "CTRL XFMR", 7, "#555", "middle"));

  // SPD (surge protection device)
  const spdY = trY + 24;
  parts.push(rect(cabX + 6, spdY, cabW - 12, 16, "#fef3c7", "#d97706", 2));
  parts.push(text(cabX + cabW / 2, spdY + 11, "SPD", 7, "#92400e", "middle"));

  // Terminal blocks label
  parts.push(rect(cabX + 6, spdY + 20, cabW - 12, 12, "#c8d8e8", "#8899aa", 2));
  parts.push(text(cabX + cabW / 2, spdY + 29, "TERM BLOCKS", 6, "#446", "middle"));

  // Conduit from cabinet to pole
  const conduitCx = cabX - 4;
  const conduitY1 = cabY + 18;
  const conduitY2 = cabY + 66;
  parts.push(line(conduitCx, conduitY1, poleCx + poleBotW / 2, eceY + eceH - 24, "#888", 2));
  parts.push(line(conduitCx, conduitY2, poleCx + poleBotW / 2, eceY + eceH - 8, "#888", 2));
  parts.push(text(conduitCx - 20, conduitY1 + 22, "CONDUIT", 7, "#777", "end"));

  if (cabHighlight) {
    parts.push(rect(cabX - 2, cabY - 18, cabW + 4, 16, "#fef3c7", "#d97706", 4));
    parts.push(text(cabX + cabW / 2, cabY - 7, "CHECK CABINET", 10, "#92400e", "middle"));
  }

  //=== COMPLETE BADGE ===
  if (v.done) {
    parts.push(rect(poleCx - 80, poleTopY - 50, 160, 28, "rgba(22,163,74,0.12)", "#16a34a", 8));
    parts.push(text(poleCx, poleTopY - 32, "\u2713 INSTALLATION COMPLETE", 13, "#16a34a", "middle"));
  }

  //=== FAULT LABEL ===
  if (v.faultLabel) {
    parts.push(rect(poleCx - 90, 8, 180, 26, "#fef2f2", "#b91c1c", 6));
    parts.push(text(poleCx, 25, v.faultLabel, 10, "#b91c1c", "middle"));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

export { renderSportsSVG };
