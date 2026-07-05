const STEPS = [
  {
    num: 1,
    title: "Foundation — Precast Concrete Base",
    desc: "Install the precast concrete base with integrated lightning ground. Set directly in ground, backfill with concrete, and allow 24 hr cure before pole set.",
    detail: "The precast base includes a tapered upper section for slip-fit steel pole attachment, an integrated grounding electrode (2/0 AWG, 20 ft, UL Listed Class II per NFPA 780/UL 96A), a lifting hole for the Musco load-rated steel rod, wire access handhole, and conduit adapter plate with knockouts. The base is spun concrete with prestressed vertical strands and steel coil spiral reinforcement, min design strength 9,500 psi (65.5 MPa) at 28 days."
  },
  {
    num: 2,
    title: "Pole Sections — Galvanized Steel",
    desc: "Mount lower pole section using jacking ears and a 1.5-ton come-along for slip-fit assembly. Align weld marks between sections. Install base cover trim.",
    detail: "Steel pole has jacking ears for come-along attachment. The ECE attachment brackets and hub with stainless steel screw threads are pre-installed. A grounding lug is inside the pole at the base. A wire access handhole at grade allows underground feed entry. The base cover conceals the joint for a finished look. On multi-section poles, weld marks must align for proper structural fit."
  },
  {
    num: 3,
    title: "ECE Enclosure — Ballast/Capacitor or LED",
    desc: "Mount the Electrical Components Enclosure on the pole brackets at the designated height. ECE houses the ballasts (HID) or LED drivers, capacitors, fuses, Smart Lamp control, terminal block, hour meter, and rotary disconnect switch.",
    detail: "ECE mounting height is specified by the manufacturer. Bolt-through stainless steel pole mounting bracket with clear thermoset polymer coating. For HID systems: CWA ballast on vibration-isolating brackets, power factor correction capacitors, Smart Lamp Control module for constant lumen regulation, hour meter for lamp run time tracking. For LED systems: drivers, distribution blocks, fuse holders, and Control-Link board. The rotary disconnect switch is in the bottom section with padlock capability. All conduit entries sealed with duct seal."
  },
  {
    num: 4,
    title: "Contactor Cabinet",
    desc: "Mount the contactor cabinet at the base of the pole. Contains main contactor (multi-pole per circuit), control transformer, surge protection device (SPD), terminal blocks, and Control-Link communication board.",
    detail: "The contactor cabinet is a separate enclosure — NOT inside the ECE. It receives power from a dedicated breaker in the main distribution panel. The SPD must use the provided flexible conduit — never splice SPD conductors. Control power transformer energizes the coil and Control-Link system. Confirm control system power is always on — use a breaker lock-on device."
  },
  {
    num: 5,
    title: "Wire Harness — Quick-Connect Assembly",
    desc: "Route the factory-built wire harness from the ECE up the pole to the poletop crossarm. HID harness uses spiral-wound 14 AWG copper with flexible protective sleeve and quick-connect plug-in connectors at both ends.",
    detail: "Top plug-in connector mates at the crossarm with matching enclosed quick-connect plug-ins. Lower plug-in connects at the ECE. A wire support grip with snap hook supports the harness at mid-pole to prevent connector strain. Wire ties secure the harness to the pole at intervals. The harness is factory-built per pole ID — never mix harnesses between poles. If luminaire polarity ID labels get trimmed, apply new ones immediately. Do not splice additional length onto conductors."
  },
  {
    num: 6,
    title: "Poletop Assembly & Luminaires",
    desc: "Install the pole cap (secured with bolt + safety cable), mount the crossarm with factory-aimed luminaire assemblies via quick-connect plug-ins. Wire to harness, verify aiming per Field Aiming Diagram. Cycle and test the system.",
    detail: "Each luminaire assembly includes: spill/glare control visor, tempered glass lens with silicone edge seal gasket and O-ring rim seal, aluminum lens rim with stainless steel latch bail and over-center latch handle, die-cast aluminum knuckle with geared tilt adjustment, lamp cone with Teflon centering ring, reflector housing with 2.5 in activated carbon filter, and lamp leveling gear drive. Total luminaire weight: 13.9 kg (30.6 lbs). Verify pole ID matches documentation. Cycle power and test all fixtures before commissioning."
  }
];

function renderInstallGuideSVG() {
  const W = 480;
  const stepH = 140;
  const gap = 14;
  const totalH = STEPS.length * stepH + (STEPS.length - 1) * gap + 60;
  const cx = W / 2;

  function rect(x, y, w, h, fc, sc, r) {
    const rx = r ? ` rx="${r}"` : "";
    return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fc || "none"}" stroke="${sc || "none"}" stroke-width="1.5"${rx}/>`;
  }

  function svgText(x, y, t, s, c, a, fw) {
    return `<text x="${x}" y="${y}" font-size="${s || 12}" fill="${c || "#333"}" text-anchor="${a || "start"}" font-weight="${fw || "normal"}">${t}</text>`;
  }

  function circle(cx, cy, r, fc, sc) {
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fc || "none"}" stroke="${sc || "none"}" stroke-width="1.5"/>`;
  }

  function svgLine(x1, y1, x2, y2, c, w) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c || "#333"}" stroke-width="${w || 2}"/>`;
  }

  function arrow(x1, y1, x2, y2) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d97706" stroke-width="2" marker-end="url(#arrow)"/>`;
  }

  function foreignText(x, y, w, h, html) {
    return `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:sans-serif;font-size:10px;line-height:1.4;color:#1a1a1a;word-wrap:break-word;overflow:hidden;">${html}</div></foreignObject>`;
  }

  function foreignDetail(x, y, w, h, html) {
    return `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="font-family:sans-serif;font-size:9px;line-height:1.35;color:#888;word-wrap:break-word;overflow:hidden;">${html}</div></foreignObject>`;
  }

  const parts = [];
  parts.push(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${totalH}" style="font-family:sans-serif;">`);

  parts.push(`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="#d97706"/></marker></defs>`);

  // Title
  parts.push(svgText(cx, 26, "Complete Pole Installation", 15, "#b45309", "middle", "bold"));
  parts.push(svgText(cx, 42, "Musco Sports Lighting System", 11, "#888", "middle"));

  const startY = 56;

  for (let i = 0; i < STEPS.length; i++) {
    const s = STEPS[i];
    const y = startY + i * (stepH + gap);
    const pad = 10;

    // Panel background
    parts.push(rect(pad, y, W - pad * 2, stepH, "#f9f9f9", "#e5e5e5", 10));

    // Step number badge
    const badgeCx = 46;
    const badgeCy = y + 30;
    parts.push(circle(badgeCx, badgeCy, 20, "#d97706", "#b45309"));
    parts.push(svgText(badgeCx, badgeCy + 5, String(s.num), 15, "#fff", "middle", "bold"));

    // Step-specific visual
    const visX = 78;
    const visY = y + 10;
    const visW = 60;
    const visH = stepH - 20;

    if (s.num === 1) {
      // Foundation: concrete block with anchor bolts
      parts.push(rect(visX, visY + visH - 32, visW, 32, "#d4d4d4", "#999", 4));
      parts.push(rect(visX + 4, visY + visH - 28, visW - 8, 24, "#e0e0e0", "none", 3));
      for (let b = 0; b < 2; b++) {
        const bx = visX + 14 + b * 30;
        parts.push(rect(bx - 2, visY + visH - 40, 4, 10, "#888", "#666", 1));
        parts.push(circle(bx, visY + visH - 40, 3, "#aaa", "#888"));
      }
      parts.push(svgText(visX + visW / 2, visY + visH - 40, "ANCHOR", 6, "#666", "middle"));
    } else if (s.num === 2) {
      // Pole: two sections stacked
      const pw1 = 20, ph1 = 52, pw2 = 16, ph2 = 36;
      const px = visX + (visW - pw1) / 2;
      parts.push(rect(px, visY + visH - ph1, pw1, ph1, "#c0c0c0", "#888", 2));
      parts.push(rect(px + (pw1 - pw2) / 2, visY + visH - ph1 - ph2, pw2, ph2, "#c8c8c8", "#888", 2));
      parts.push(rect(px - 3, visY + visH - ph1, pw1 + 6, 4, "#999", "#777", 1));
      parts.push(svgText(visX + visW / 2, visY + 6, "SLIP", 7, "#888", "middle"));
      parts.push(svgText(visX + visW / 2, visY + 14, "FIT", 7, "#888", "middle"));
    } else if (s.num === 3) {
      // ECE: box on side of pole
      const pw = 10, ph = 60;
      const px = visX + 8;
      parts.push(rect(px, visY + (visH - ph) / 2, pw, ph, "#aaa", "#888", 2));
      parts.push(rect(px + pw + 2, visY + (visH - ph) / 2 + 6, 34, 48, "#e0e0e0", "#888", 4));
      parts.push(rect(px + pw + 6, visY + (visH - ph) / 2 + 10, 26, 10, "#555", "#444", 2));
      parts.push(svgText(visX + visW / 2, visY + visH - 4, "ECE", 8, "#888", "middle"));
    } else if (s.num === 4) {
      // Contactor cabinet: separate box at base
      parts.push(rect(visX + 6, visY + 8, visW - 12, visH - 16, "#e0e0e0", "#888", 4));
      parts.push(rect(visX + 12, visY + 14, visW - 24, 16, "#555", "#444", 2));
      parts.push(svgText(visX + visW / 2, visY + 25, "CABINET", 7, "#eee", "middle"));
      parts.push(rect(visX + 14, visY + 38, visW - 28, 18, "#ccc", "#999", 2));
      parts.push(rect(visX + 14, visY + 60, visW - 28, 14, "#d4d4d4", "#999", 2));
      parts.push(svgText(visX + visW / 2, visY + visH - 6, "CONTACTOR", 7, "#888", "middle"));
      // Conduit connecting to pole/ECE
      const conX = visX + visW + 2;
      const conY1 = visY + 22;
      const conY2 = visY + visH - 10;
      parts.push(svgLine(conX, conY1, conX + 10, conY1 - 8, "#888", 2));
      parts.push(svgLine(conX, conY2, conX + 10, conY2 + 8, "#888", 2));
    } else if (s.num === 5) {
      // Harness: line from ECE up to top
      const lx = visX + visW / 2;
      const topY = visY + 4;
      const botY = visY + visH - 10;
      parts.push(rect(lx - 3, botY - 22, 6, 22, "#ddd", "#999", 2));
      parts.push(svgLine(lx, botY - 22, lx, topY, "#d97706", 2));
      parts.push(rect(lx - 5, topY, 10, 10, "#b0b0b0", "#888", 2));
      parts.push(svgText(visX + visW / 2, visY + visH - 4, "CONDUIT", 6, "#888", "middle"));
    } else if (s.num === 6) {
      // Crossarm with fixtures
      const cax = visX + 4;
      const cay = visY + visH / 2 - 4;
      parts.push(rect(cax, cay, visW - 8, 8, "#b0b0b0", "#888", 2));
      for (let f = 0; f < 2; f++) {
        const fx = cax + 8 + f * 20;
        parts.push(rect(fx, cay - 16, 16, 16, "#d0d0d0", "#888", 3));
        parts.push(rect(fx + 2, cay - 14, 12, 12, "#e8e8e8", "none", 2));
      }
      parts.push(svgText(visX + visW / 2, cay + 24, "FIXTURES", 7, "#888", "middle"));
    }

    // Title
    const textX = visX + visW + 12;
    const textW = W - textX - 16;
    parts.push(svgText(textX, y + 26, s.title, 13, "#b45309", "start", "bold"));

    // Description (wrapping via foreignObject)
    parts.push(foreignText(textX, y + 34, textW, 54, s.desc));

    // Detail (wrapping via foreignObject, smaller)
    parts.push(foreignDetail(textX, y + 88, textW, 44, s.detail));
  }

  // Down arrows between steps
  for (let i = 0; i < STEPS.length - 1; i++) {
    const y1 = startY + i * (stepH + gap) + stepH;
    const y2 = startY + (i + 1) * (stepH + gap);
    parts.push(arrow(cx, y1 + 3, cx, y2 - 10));
  }

  parts.push("</svg>");
  return parts.join("\n");
}

export { renderInstallGuideSVG, STEPS };
