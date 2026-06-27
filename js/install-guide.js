const STEPS = [
  {
    num: 1,
    title: "Foundation",
    desc: "Pour and cure concrete foundation with anchor bolts. The foundation must meet manufacturer specs for depth and diameter before any above-ground work begins.",
    detail: "This is the structural base that supports the entire pole system. The anchor bolts must be precisely positioned and leveled before the concrete sets. Allow full cure time per spec."
  },
  {
    num: 2,
    title: "Pole Sections",
    desc: "Set lower pole section on anchor bolts (level and plumb). Install base cover. Slip-fit upper section aligning weld marks. Torque joint bolts to spec.",
    detail: "Weld marks on the pole sections must align for proper fit. A come-along strap seats the sections together. The base cover conceals the anchor bolts and gives a finished look."
  },
  {
    num: 3,
    title: "ECE Enclosure",
    desc: "Mount the Electrical Components Enclosure on the pole at the designated height. The ECE houses fuses, LED drivers, disconnect switch, and ground bar.",
    detail: "The ECE mounting height is specified by the manufacturer. It must be level and securely bolted to the pole. All conduit entries must be sealed with duct seal."
  },
  {
    num: 4,
    title: "Wire Harness",
    desc: "Route the wire harness inside conduit from the ECE up the pole to the crossarm. The harness carries power from the drivers to the luminaire fixtures.",
    detail: "The harness is factory-built for the specific pole configuration. On retrofit jobs (existing poles), the old harness is often replaced. Protect all conductors from weather and UV."
  },
  {
    num: 5,
    title: "Luminaire & Crossarm",
    desc: "Mount the crossarm with fixture brackets. Install LED luminaires, wire to the harness, and aim per the Field Aiming Diagram. Cycle and test the system.",
    detail: "Each luminaire has a labeled position on the Field Aiming Diagram for proper light coverage. Verify the pole ID (e.g., A1, B2) matches all documentation before commissioning."
  }
];

function renderInstallGuideSVG() {
  const W = 480;
  const stepH = 128;
  const gap = 12;
  const totalH = STEPS.length * stepH + (STEPS.length - 1) * gap + 60;
  const cx = W / 2;

  function rect(x, y, w, h, fc, sc, r) {
    const rx = r ? ` rx="${r}"` : "";
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fc || "none"}" stroke="${sc || "none"}" stroke-width="1.5"${rx}/>`;
  }

  function text(x, y, t, s, c, a, fw) {
    return `<text x="${x}" y="${y}" font-size="${s || 12}" fill="${c || "#333"}" text-anchor="${a || "start"}" font-weight="${fw || "normal"}">${t}</text>`;
  }

  function circle(cx, cy, r, fc, sc) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fc || "none"}" stroke="${sc || "none"}" stroke-width="1.5"/>`;
  }

  function arrow(x1, y1, x2, y2) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d97706" stroke-width="2" marker-end="url(#arrow)"/>`;
  }

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${totalH}" style="font-family:sans-serif;">`);

  parts.push(`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#d97706"/></marker></defs>`);

  // Title
  parts.push(text(cx, 28, "5-Step Pole Installation", 16, "#b45309", "middle", "bold"));
  parts.push(text(cx, 44, "Musco Sports Lighting System", 11, "#888", "middle"));

  const startY = 58;

  for (let i = 0; i < STEPS.length; i++) {
    const s = STEPS[i];
    const y = startY + i * (stepH + gap);
    const pad = 10;

    // Panel background
    parts.push(rect(pad, y, W - pad * 2, stepH, "#f9f9f9", "#e5e5e5", 10));

    // Step number badge
    const badgeCx = 52;
    const badgeCy = y + stepH / 2;
    parts.push(circle(badgeCx, badgeCy, 22, "#d97706", "#b45309"));
    parts.push(text(badgeCx, badgeCy + 5, String(s.num), 16, "#fff", "middle", "bold"));

    // === Step-specific visual (right of badge, before text) ===
    const visX = 84;
    const visY = y + 18;
    const visW = 66;
    const visH = stepH - 36;

    if (s.num === 1) {
      // Foundation: concrete block with anchor bolts
      parts.push(rect(visX, visY + visH - 30, visW, 30, "#d4d4d4", "#999", 4));
      parts.push(rect(visX + 6, visY + visH - 26, visW - 12, 22, "#e0e0e0", "none", 3));
      for (let b = 0; b < 2; b++) {
        const bx = visX + 16 + b * 34;
        parts.push(rect(bx - 2, visY + visH - 36, 4, 8, "#888", "#666", 1));
        parts.push(circle(bx, visY + visH - 36, 3, "#aaa", "#888"));
      }
      parts.push(text(visX + visW / 2, visY + visH - 36, "ANCHOR", 6, "#666", "middle"));
    } else if (s.num === 2) {
      // Pole: two rects stacked
      const pw1 = 22, ph1 = 50, pw2 = 18, ph2 = 34;
      const px = visX + (visW - pw1) / 2;
      parts.push(rect(px, visY + visH - ph1, pw1, ph1, "#c0c0c0", "#888", 2));
      parts.push(rect(px + (pw1 - pw2) / 2, visY + visH - ph1 - ph2, pw2, ph2, "#c8c8c8", "#888", 2));
      parts.push(rect(px - 4, visY + visH - ph1, pw1 + 8, 4, "#999", "#777", 1));
      parts.push(text(visX + visW / 2, visY + 8, "SLIP-FIT", 7, "#888", "middle"));
      parts.push(text(visX + visW / 2, visY + 16, "JOINT", 7, "#888", "middle"));
    } else if (s.num === 3) {
      // ECE: box on side of pole
      const pw = 10, ph = 60;
      const px = visX + 10;
      parts.push(rect(px, visY + (visH - ph) / 2, pw, ph, "#aaa", "#888", 2));
      parts.push(rect(px + pw + 2, visY + (visH - ph) / 2 + 6, 34, 48, "#e0e0e0", "#888", 4));
      parts.push(rect(px + pw + 6, visY + (visH - ph) / 2 + 10, 26, 10, "#555", "#444", 2));
      parts.push(text(visX + visW / 2, visY + visH - 6, "ECE", 8, "#888", "middle"));
    } else if (s.num === 4) {
      // Harness: line from ECE up to top
      const lx = visX + visW / 2;
      const topY = visY + 4;
      const botY = visY + visH - 8;
      parts.push(rect(lx - 3, botY - 24, 6, 24, "#ddd", "#999", 2));
      parts.push(line(lx, botY - 24, lx, topY, "#d97706", 2));
      parts.push(rect(lx - 5, topY, 10, 10, "#b0b0b0", "#888", 2));
      parts.push(text(visX + visW / 2, visY + visH - 4, "CONDUIT", 6, "#888", "middle"));
    } else if (s.num === 5) {
      // Crossarm with fixtures
      const cax = visX + 4;
      const cay = visY + visH / 2 - 4;
      parts.push(rect(cax, cay, visW - 8, 8, "#b0b0b0", "#888", 2));
      for (let f = 0; f < 2; f++) {
        const fx = cax + 10 + f * 22;
        parts.push(rect(fx, cay - 16, 16, 16, "#d0d0d0", "#888", 3));
        parts.push(rect(fx + 2, cay - 14, 12, 12, "#e8e8e8", "none", 2));
      }
      parts.push(text(visX + visW / 2, cay + 24, "FIXTURES", 7, "#888", "middle"));
    }

    // Title & description
    const textX = visX + visW + 14;
    parts.push(text(textX, y + 30, s.title, 14, "#b45309", "start", "bold"));
    parts.push(text(textX, y + 52, s.desc, 9, "#1a1a1a", "start"));

    // Key detail line
    parts.push(text(textX, y + 74, s.detail.substring(0, 90) + (s.detail.length > 90 ? "..." : ""), 8, "#888", "start"));
  }

  // Down arrows between steps
  for (let i = 0; i < STEPS.length - 1; i++) {
    const y1 = startY + i * (stepH + gap) + stepH;
    const y2 = startY + (i + 1) * (stepH + gap);
    parts.push(arrow(cx, y1 + 2, cx, y2 - 10));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

export { renderInstallGuideSVG, STEPS };
