const SCENES = [
  {
    id: "job-start",
    title: "Job Start",
    desc: "Arrive on site \u2014 gear up and start the install",
    steps: [
      {
        instruction: "Tap the clipboard to start the job",
        hotspots: [
          { id: "clipboard", x: 160, y: 260, w: 80, h: 50, correct: true, msg: "Job started! Follow the 6-step install sequence." },
          { id: "toolbox", x: 40, y: 320, w: 70, h: 50, correct: false, msg: "Your tools are ready \u2014 grab the clipboard to start." },
          { id: "sky", x: 260, y: 40, w: 100, h: 60, correct: false, msg: "Clear skies ahead. Focus on the work \u2014 tap the clipboard." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#e8f4f8"/>
            <rect x="0" y="240" width="400" height="160" fill="#8b9a6b"/>
            <rect x="0" y="280" width="400" height="120" fill="#6b8a3a"/>
            <rect x="160" y="250" width="80" height="60" fill="#d4a56a" stroke="#8b6914" stroke-width="2" rx="4"/>
            <rect x="165" y="255" width="70" height="25" fill="#f5f5dc" stroke="#ccc" stroke-width="1" rx="2"/>
            <text x="200" y="270" font-size="10" fill="#333" text-anchor="middle" font-weight="bold">START JOB</text>
            <rect x="200" y="260" width="8" height="18" fill="#888" stroke="#666" stroke-width="1"/>
            <rect x="40" y="300" width="70" height="50" fill="#c04000" stroke="#8b3000" stroke-width="2" rx="4"/>
            <rect x="45" y="305" width="60" height="14" fill="#ddd" stroke="#bbb" stroke-width="1" rx="2"/>
            <text x="75" y="315" font-size="8" fill="#333" text-anchor="middle">TOOLS</text>
            <line x1="75" y1="300" x2="65" y2="285" stroke="#888" stroke-width="2"/>
            <line x1="75" y1="300" x2="85" y2="285" stroke="#888" stroke-width="2"/>
            <rect x="140" y="348" width="40" height="12" fill="#aaa" stroke="#888" stroke-width="1"/>
            <rect x="155" y="340" width="10" height="10" fill="#888" rx="2"/>
            <text x="200" y="220" font-size="12" fill="#555" text-anchor="middle">Downey Park \u2014 Pole Install</text>
            <circle cx="320" cy="180" r="30" fill="#d4a56a" stroke="#8b6914" stroke-width="2"/>
            <rect x="315" y="160" width="10" height="40" fill="#999" rx="2"/>
            <text x="200" y="380" font-size="9" fill="#556b2f" text-anchor="middle" font-style="italic">Musco 6-Step Install \u2014 Day 1</text>
          `;
        }
      }
    ]
  },
  {
    id: "foundation",
    title: "Foundation Check",
    desc: "Verify the concrete foundation is cured and anchor bolts are ready",
    steps: [
      {
        instruction: "Check the anchor bolts are aligned and concrete is cured",
        hotspots: [
          { id: "bolts", x: 140, y: 200, w: 120, h: 80, correct: true, msg: "Bolts aligned! Concrete is cured and ready for the pole." },
          { id: "concrete-edge", x: 50, y: 300, w: 160, h: 60, correct: false, msg: "That's the edge of the foundation. Check the anchor bolts area." },
          { id: "hammer", x: 300, y: 330, w: 50, h: 40, correct: false, msg: "You won't need a hammer here. Check the anchor bolts for alignment." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#c8b89a"/>
            <ellipse cx="200" cy="280" rx="160" ry="80" fill="#d4d4d4" stroke="#999" stroke-width="3"/>
            <ellipse cx="200" cy="280" rx="140" ry="68" fill="#e0e0e0" stroke="none"/>
            <circle cx="150" cy="250" r="8" fill="#aaa" stroke="#888" stroke-width="2"/>
            <circle cx="250" cy="250" r="8" fill="#aaa" stroke="#888" stroke-width="2"/>
            <circle cx="150" cy="310" r="8" fill="#aaa" stroke="#888" stroke-width="2"/>
            <circle cx="250" cy="310" r="8" fill="#aaa" stroke="#888" stroke-width="2"/>
            <line x1="150" y1="240" x2="150" y2="225" stroke="#aaa" stroke-width="3"/>
            <line x1="250" y1="240" x2="250" y2="225" stroke="#aaa" stroke-width="3"/>
            <line x1="150" y1="320" x2="150" y2="335" stroke="#aaa" stroke-width="3"/>
            <line x1="250" y1="320" x2="250" y2="335" stroke="#aaa" stroke-width="3"/>
            <circle cx="150" cy="238" r="4" fill="#c0c0c0"/>
            <circle cx="250" cy="238" r="4" fill="#c0c0c0"/>
            <text x="200" y="220" font-size="10" fill="#666" text-anchor="middle">Anchor bolts \u2014 verify position</text>
            <rect x="300" y="320" width="50" height="40" fill="#888" stroke="#666" stroke-width="2" rx="4"/>
            <rect x="310" y="324" width="30" height="6" fill="#bbb" rx="1"/>
            <line x1="325" y1="320" x2="325" y2="308" stroke="#666" stroke-width="3"/>
            <text x="325" y="368" font-size="8" fill="#777" text-anchor="middle">HAMMER</text>
            <text x="200" y="200" font-size="11" fill="#555" text-anchor="middle">Step 1 \u2014 Foundation Check</text>
            <rect x="160" y="345" width="80" height="6" fill="#d97706" rx="3"/>
            <line x1="200" y1="345" x2="200" y2="355" stroke="#d97706" stroke-width="2"/>
            <text x="200" y="370" font-size="7" fill="#888" text-anchor="middle">CURE TIME: 12-24 HOURS</text>
          `;
        }
      }
    ]
  },
  {
    id: "set-pole",
    title: "Set Pole Section",
    desc: "Seat the lower pole section on anchor bolts, level and plumb",
    steps: [
      {
        instruction: "Tap the pole base to seat it on the anchor bolts",
        hotspots: [
          { id: "pole-base", x: 140, y: 180, w: 120, h: 90, correct: true, msg: "Pole seated! Level and plumb verified." },
          { id: "crane-cable", x: 190, y: 30, w: 30, h: 80, correct: false, msg: "The crane holds the pole \u2014 you need to seat the base on the bolts." },
          { id: "level-tool", x: 290, y: 300, w: 60, h: 30, correct: false, msg: "You'll use the level after seating the pole. First, seat the base." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#b8d4e8"/>
            <rect x="0" y="240" width="400" height="160" fill="#8b9a6b"/>
            <line x1="200" y1="0" x2="200" y2="180" stroke="#666" stroke-width="2"/>
            <rect x="195" y="0" width="10" height="180" fill="#999" rx="2"/>
            <circle cx="200" cy="10" r="6" fill="#888"/>
            <ellipse cx="200" cy="260" rx="120" ry="30" fill="#d4d4d4" stroke="#999" stroke-width="2"/>
            <rect x="160" y="180" width="80" height="80" fill="#c0c0c0" stroke="#888" stroke-width="3" rx="2"/>
            <rect x="165" y="185" width="70" height="70" fill="#d0d0d0" stroke="#999" stroke-width="1" rx="2"/>
            <line x1="165" y1="260" x2="165" y2="275" stroke="#aaa" stroke-width="2"/>
            <line x1="235" y1="260" x2="235" y2="275" stroke="#aaa" stroke-width="2"/>
            <rect x="290" y="290" width="60" height="24" fill="#ddd" stroke="#999" stroke-width="2" rx="3"/>
            <circle cx="320" cy="302" r="8" fill="#4ade80" stroke="#22c55e" stroke-width="1"/>
            <line x1="310" y1="302" x2="330" y2="302" stroke="#333" stroke-width="1"/>
            <text x="320" y="325" font-size="8" fill="#777" text-anchor="middle">LEVEL</text>
            <text x="200" y="170" font-size="11" fill="#444" text-anchor="middle">Step 2 \u2014 Set Pole</text>
            <text x="200" y="380" font-size="8" fill="#556b2f" text-anchor="middle">Align weld marks on multi-section poles</text>
          `;
        }
      }
    ]
  },
  {
    id: "ece-contactor",
    title: "ECE & Contactor Cabinet",
    desc: "Mount the ECE on the pole and connect the contactor cabinet",
    steps: [
      {
        instruction: "Tap the ECE to mount it on the pole at the correct height",
        hotspots: [
          { id: "ece-mount", x: 90, y: 120, w: 80, h: 80, correct: true, msg: "ECE mounted! Now connect the contactor cabinet conduit." },
          { id: "contactor-conduit", x: 260, y: 270, w: 60, h: 40, correct: false, msg: "The contactor cabinet connects later. First mount the ECE on the pole." },
          { id: "pole-top", x: 180, y: 40, w: 50, h: 50, correct: false, msg: "The ECE mounts at mid-height on the pole, not at the top." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#e8f4f8"/>
            <rect x="0" y="240" width="400" height="160" fill="#8b9a6b"/>
            <rect x="185" y="10" width="30" height="240" fill="#c0c0c0" stroke="#888" stroke-width="2" rx="2"/>
            <rect x="80" y="120" width="80" height="80" fill="#e8e8e8" stroke="#888" stroke-width="2" rx="4" stroke-dasharray="4,3"/>
            <rect x="84" y="124" width="72" height="14" fill="#555" rx="2"/>
            <text x="120" y="135" font-size="8" fill="#fff" text-anchor="middle">ECE</text>
            <text x="120" y="160" font-size="7" fill="#999" text-anchor="middle">Mount here</text>
            <rect x="250" y="250" width="70" height="55" fill="#ddd" stroke="#888" stroke-width="2" rx="4" stroke-dasharray="4,3"/>
            <rect x="254" y="254" width="62" height="10" fill="#444" rx="2"/>
            <text x="285" y="262" font-size="7" fill="#eee" text-anchor="middle">CONTACTOR</text>
            <text x="285" y="282" font-size="7" fill="#999" text-anchor="middle">Mount later</text>
            <text x="200" y="230" font-size="11" fill="#444" text-anchor="middle">Step 3 \u2014 ECE & Contactor</text>
          `;
        }
      },
      {
        instruction: "Tap the conduit to connect the contactor cabinet to the ECE",
        hotspots: [
          { id: "contactor-conduit-2", x: 250, y: 260, w: 70, h: 50, correct: true, msg: "Cabinet connected! Power can flow from contactor to ECE." },
          { id: "ece-mounted", x: 90, y: 120, w: 80, h: 80, correct: false, msg: "ECE is already mounted. Now connect the conduit from the contactor cabinet." },
          { id: "ground", x: 30, y: 340, w: 60, h: 30, correct: false, msg: "Grounding comes later. Connect the conduit between cabinet and ECE first." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#e8f4f8"/>
            <rect x="0" y="240" width="400" height="160" fill="#8b9a6b"/>
            <rect x="185" y="10" width="30" height="240" fill="#c0c0c0" stroke="#888" stroke-width="2" rx="2"/>
            <rect x="80" y="120" width="80" height="80" fill="#f0f0f0" stroke="#16a34a" stroke-width="2" rx="4"/>
            <rect x="84" y="124" width="72" height="14" fill="#555" rx="2"/>
            <text x="120" y="135" font-size="8" fill="#fff" text-anchor="middle">ECE</text>
            <text x="120" y="170" font-size="7" fill="#16a34a" text-anchor="middle">&#10003; Mounted</text>
            <rect x="250" y="250" width="70" height="55" fill="#e0e0e0" stroke="#888" stroke-width="2" rx="4"/>
            <rect x="254" y="254" width="62" height="10" fill="#444" rx="2"/>
            <text x="285" y="262" font-size="7" fill="#eee" text-anchor="middle">CONTACTOR</text>
            <line x1="160" y1="200" x2="250" y2="275" stroke="#d97706" stroke-width="3" stroke-dasharray="6,3"/>
            <text x="205" y="245" font-size="8" fill="#d97706" text-anchor="middle">CONDUIT</text>
            <text x="200" y="230" font-size="11" fill="#444" text-anchor="middle">Step 3 \u2014 Connect Conduit</text>
          `;
        }
      }
    ]
  },
  {
    id: "run-harness",
    title: "Run Wire Harness",
    desc: "Route the harness conduit from the ECE up the pole to the crossarm",
    steps: [
      {
        instruction: "Tap along the conduit path to route the harness up the pole",
        hotspots: [
          { id: "conduit-path", x: 120, y: 120, w: 160, h: 120, correct: true, msg: "Harness routed! Connected at the driver and crossarm." },
          { id: "ece-inside", x: 40, y: 160, w: 60, h: 60, correct: false, msg: "The harness starts from the ECE but routes up the pole. Tap the conduit path." },
          { id: "crossarm", x: 180, y: 30, w: 60, h: 40, correct: false, msg: "The harness connects at the crossarm, but you need to route it there first." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#e8f4f8"/>
            <rect x="0" y="240" width="400" height="160" fill="#8b9a6b"/>
            <rect x="185" y="50" width="30" height="220" fill="#c0c0c0" stroke="#888" stroke-width="2" rx="2"/>
            <rect x="180" y="30" width="40" height="25" fill="#b0b0b0" stroke="#888" stroke-width="2" rx="3"/>
            <rect x="188" y="35" width="24" height="16" fill="#d0d0d0" rx="2"/>
            <rect x="60" y="170" width="65" height="70" fill="#e8e8e8" stroke="#888" stroke-width="2" rx="4"/>
            <rect x="64" y="174" width="57" height="12" fill="#555" rx="2"/>
            <text x="92" y="183" font-size="7" fill="#fff" text-anchor="middle">ECE</text>
            <rect x="100" y="90" width="85" height="160" fill="none" stroke="#d97706" stroke-width="2" stroke-dasharray="4,3" rx="4"/>
            <text x="142" y="150" font-size="8" fill="#d97706" text-anchor="middle">ROUTE HARNESS</text>
            <rect x="280" y="260" width="60" height="50" fill="#e0e0e0" stroke="#888" stroke-width="2" rx="4"/>
            <rect x="284" y="264" width="52" height="10" fill="#444" rx="2"/>
            <text x="310" y="272" font-size="6" fill="#eee" text-anchor="middle">CONTACTOR</text>
            <line x1="125" y1="240" x2="280" y2="275" stroke="#999" stroke-width="2"/>
            <line x1="125" y1="230" x2="280" y2="260" stroke="#999" stroke-width="2"/>
            <text x="200" y="50" font-size="11" fill="#444" text-anchor="middle">Step 4 \u2014 Wire Harness</text>
            <text x="200" y="390" font-size="7" fill="#888" text-anchor="middle">Use 5/32 hex key on harness connectors</text>
          `;
        }
      }
    ]
  },
  {
    id: "install-luminaires",
    title: "Install Luminaires",
    desc: "Mount LED fixtures on the crossarm and wire to the harness",
    steps: [
      {
        instruction: "Tap fixture position 1 to mount the first luminaire",
        hotspots: [
          { id: "fixture-1", x: 100, y: 130, w: 50, h: 50, correct: true, msg: "Fixture 1 mounted! Now install the second fixture." },
          { id: "fixture-2", x: 175, y: 130, w: 50, h: 50, correct: false, msg: "Start with fixture 1 on the left." },
          { id: "fixture-3", x: 250, y: 130, w: 50, h: 50, correct: false, msg: "Start with fixture 1 on the left." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#b8d4e8"/>
            <rect x="0" y="200" width="400" height="200" fill="#8b9a6b"/>
            <rect x="185" y="100" width="30" height="200" fill="#c0c0c0" stroke="#888" stroke-width="2" rx="2"/>
            <rect x="70" y="110" width="260" height="14" fill="#b0b0b0" stroke="#888" stroke-width="2" rx="3"/>
            <rect x="95" y="124" width="50" height="40" fill="#f5f5dc" stroke="#d97706" stroke-width="2" rx="3"/>
            <rect x="95" y="100" width="12" height="24" fill="#aaa" stroke="#888" stroke-width="1"/>
            <line x1="101" y1="100" x2="101" y2="95" stroke="#888" stroke-width="2"/>
            <rect x="170" y="124" width="50" height="40" fill="#ddd" stroke="#aaa" stroke-width="1" rx="3" opacity="0.5"/>
            <rect x="245" y="124" width="50" height="40" fill="#ddd" stroke="#aaa" stroke-width="1" rx="3" opacity="0.5"/>
            <text x="120" y="148" font-size="11" fill="#d97706" text-anchor="middle" font-weight="bold">\u2191</text>
            <text x="200" y="170" font-size="10" fill="#d97706" text-anchor="middle">INSTALL FIXTURES</text>
            <text x="120" y="178" font-size="8" fill="#999" text-anchor="middle">Fixture 1</text>
            <text x="200" y="380" font-size="9" fill="#556b2f" text-anchor="middle">3 fixtures per crossarm</text>
            <text x="200" y="45" font-size="11" fill="#444" text-anchor="middle">Step 5 \u2014 Mount Luminaires</text>
          `;
        }
      },
      {
        instruction: "Tap fixture position 2 to mount the next luminaire",
        hotspots: [
          { id: "fixture-1-done", x: 100, y: 130, w: 50, h: 50, correct: false, msg: "Fixture 1 is already mounted. Now install fixture 2." },
          { id: "fixture-2", x: 175, y: 130, w: 50, h: 50, correct: true, msg: "Fixture 2 mounted! Now install the third fixture." },
          { id: "fixture-3", x: 250, y: 130, w: 50, h: 50, correct: false, msg: "Install fixture 2 before fixture 3." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#b8d4e8"/>
            <rect x="0" y="200" width="400" height="200" fill="#8b9a6b"/>
            <rect x="185" y="100" width="30" height="200" fill="#c0c0c0" stroke="#888" stroke-width="2" rx="2"/>
            <rect x="70" y="110" width="260" height="14" fill="#b0b0b0" stroke="#888" stroke-width="2" rx="3"/>
            <rect x="95" y="124" width="50" height="40" fill="#c0e8c0" stroke="#16a34a" stroke-width="2" rx="3"/>
            <rect x="95" y="100" width="12" height="24" fill="#aaa" stroke="#888" stroke-width="1"/>
            <line x1="101" y1="100" x2="101" y2="95" stroke="#888" stroke-width="2"/>
            <text x="120" y="148" font-size="9" fill="#166534" text-anchor="middle">\u2713</text>
            <rect x="170" y="124" width="50" height="40" fill="#f5f5dc" stroke="#d97706" stroke-width="2" rx="3"/>
            <rect x="170" y="100" width="12" height="24" fill="#aaa" stroke="#888" stroke-width="1"/>
            <line x1="176" y1="100" x2="176" y2="95" stroke="#888" stroke-width="2"/>
            <rect x="245" y="124" width="50" height="40" fill="#ddd" stroke="#aaa" stroke-width="1" rx="3" opacity="0.5"/>
            <text x="195" y="148" font-size="11" fill="#d97706" text-anchor="middle" font-weight="bold">\u2191</text>
            <text x="200" y="170" font-size="10" fill="#d97706" text-anchor="middle">INSTALL FIXTURES</text>
            <text x="195" y="178" font-size="8" fill="#999" text-anchor="middle">Fixture 2</text>
            <text x="200" y="380" font-size="9" fill="#556b2f" text-anchor="middle">3 fixtures per crossarm</text>
            <text x="200" y="45" font-size="11" fill="#444" text-anchor="middle">Step 5 \u2014 Mount Luminaires (2/3)</text>
          `;
        }
      },
      {
        instruction: "Tap fixture position 3 to mount the final luminaire",
        hotspots: [
          { id: "fixture-1-done-2", x: 100, y: 130, w: 50, h: 50, correct: false, msg: "Fixtures 1 and 2 are mounted. Install fixture 3." },
          { id: "fixture-2-done", x: 175, y: 130, w: 50, h: 50, correct: false, msg: "Fixture 2 is already in place. Install fixture 3." },
          { id: "fixture-3", x: 250, y: 130, w: 50, h: 50, correct: true, msg: "All 3 fixtures installed and wired to the harness!" }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#b8d4e8"/>
            <rect x="0" y="200" width="400" height="200" fill="#8b9a6b"/>
            <rect x="185" y="100" width="30" height="200" fill="#c0c0c0" stroke="#888" stroke-width="2" rx="2"/>
            <rect x="70" y="110" width="260" height="14" fill="#b0b0b0" stroke="#888" stroke-width="2" rx="3"/>
            <rect x="95" y="124" width="50" height="40" fill="#c0e8c0" stroke="#16a34a" stroke-width="2" rx="3"/>
            <text x="120" y="148" font-size="9" fill="#166534" text-anchor="middle">\u2713</text>
            <rect x="170" y="124" width="50" height="40" fill="#c0e8c0" stroke="#16a34a" stroke-width="2" rx="3"/>
            <text x="195" y="148" font-size="9" fill="#166534" text-anchor="middle">\u2713</text>
            <rect x="245" y="124" width="50" height="40" fill="#f5f5dc" stroke="#d97706" stroke-width="2" rx="3"/>
            <rect x="245" y="100" width="12" height="24" fill="#aaa" stroke="#888" stroke-width="1"/>
            <line x1="251" y1="100" x2="251" y2="95" stroke="#888" stroke-width="2"/>
            <text x="270" y="148" font-size="11" fill="#d97706" text-anchor="middle" font-weight="bold">\u2191</text>
            <text x="270" y="178" font-size="8" fill="#999" text-anchor="middle">Fixture 3</text>
            <text x="200" y="170" font-size="10" fill="#d97706" text-anchor="middle">INSTALL FIXTURES</text>
            <text x="200" y="380" font-size="9" fill="#556b2f" text-anchor="middle">3 fixtures per crossarm</text>
            <text x="200" y="45" font-size="11" fill="#444" text-anchor="middle">Step 5 \u2014 Mount Luminaires (3/3)</text>
          `;
        }
      }
    ]
  },
  {
    id: "power-up",
    title: "Power Up & Test",
    desc: "Energize the system and cycle the lights",
    steps: [
      {
        instruction: "Tap the main breaker in the contactor cabinet to turn it ON",
        hotspots: [
          { id: "breaker-on", x: 130, y: 160, w: 70, h: 50, correct: true, msg: "Breaker ON! Power reaching the contactor cabinet." },
          { id: "contactor-body", x: 100, y: 220, w: 80, h: 40, correct: false, msg: "That's the contactor itself. Flip the main breaker first." },
          { id: "transformers", x: 220, y: 150, w: 60, h: 50, correct: false, msg: "Those are the control transformers. Power comes from the main breaker." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#1a2a3a"/>
            <rect x="0" y="240" width="400" height="160" fill="#2a3a2a"/>
            <rect x="185" y="10" width="30" height="240" fill="#555" stroke="#444" stroke-width="2" rx="2"/>
            <rect x="80" y="150" width="100" height="80" fill="#333" stroke="#555" stroke-width="2" rx="4"/>
            <rect x="130" y="155" width="16" height="40" fill="#d0d0d0" stroke="#999" stroke-width="2" rx="2"/>
            <rect x="133" y="157" width="10" height="20" fill="#e0e0e0" rx="1"/>
            <rect x="130" y="180" width="16" height="6" fill="#aaa" rx="1"/>
            <rect x="90" y="200" width="80" height="20" fill="#444" stroke="#666" stroke-width="1" rx="2"/>
            <text x="130" y="213" font-size="7" fill="#ccc" text-anchor="middle">CONTACTOR</text>
            <rect x="210" y="140" width="70" height="60" fill="#444" stroke="#666" stroke-width="2" rx="4"/>
            <rect x="215" y="145" width="60" height="12" fill="#333" rx="2"/>
            <text x="245" y="154" font-size="6" fill="#aaa" text-anchor="middle">TRANSFORMERS</text>
            <rect x="130" y="155" width="16" height="40" fill="#f0f0f0" stroke="#d97706" stroke-width="2" rx="2"/>
            <text x="138" y="198" font-size="6" fill="#d97706" text-anchor="middle">OFF</text>
            <text x="200" y="50" font-size="11" fill="#aaa" text-anchor="middle">Step 6 \u2014 Power Up & Test</text>
          `;
        }
      },
      {
        instruction: "Tap the ECE disconnect switch to turn it ON",
        hotspots: [
          { id: "disconnect-on", x: 280, y: 160, w: 60, h: 60, correct: true, msg: "Disconnect ON! Power flowing through the ECE to the drivers." },
          { id: "fuses", x: 260, y: 230, w: 70, h: 30, correct: false, msg: "Fuses are good. Turn the disconnect switch ON first." },
          { id: "ece-other", x: 50, y: 100, w: 80, h: 80, correct: false, msg: "The ECE is on the right side. Tap the disconnect switch." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#1a2a3a"/>
            <rect x="0" y="240" width="400" height="160" fill="#2a3a2a"/>
            <rect x="185" y="10" width="30" height="240" fill="#555" stroke="#444" stroke-width="2" rx="2"/>
            <rect x="80" y="150" width="100" height="90" fill="#333" stroke="#555" stroke-width="2" rx="4"/>
            <rect x="130" y="155" width="16" height="40" fill="#c0e8c0" stroke="#16a34a" stroke-width="2" rx="2"/>
            <rect x="133" y="157" width="10" height="16" fill="#4ade80" rx="1"/>
            <text x="138" y="190" font-size="6" fill="#16a34a" text-anchor="middle">ON</text>
            <rect x="90" y="210" width="80" height="20" fill="#444" stroke="#666" stroke-width="1" rx="2"/>
            <text x="130" y="223" font-size="7" fill="#ccc" text-anchor="middle">CONTACTOR</text>
            <rect x="260" y="140" width="70" height="70" fill="#444" stroke="#d97706" stroke-width="2" rx="4"/>
            <rect x="280" y="148" width="30" height="50" fill="#f0f0f0" stroke="#d97706" stroke-width="2" rx="2"/>
            <rect x="283" y="150" width="24" height="20" fill="#ddd" rx="1"/>
            <text x="295" y="180" font-size="6" fill="#d97706" text-anchor="middle">OFF</text>
            <rect x="270" y="228" width="50" height="16" fill="#333" stroke="#555" stroke-width="1" rx="2"/>
            <text x="295" y="240" font-size="6" fill="#aaa" text-anchor="middle">FUSES</text>
            <text x="200" y="50" font-size="11" fill="#aaa" text-anchor="middle">Step 6 \u2014 Turn Disconnect ON</text>
          `;
        }
      },
      {
        instruction: "Tap the test button to cycle the lights",
        hotspots: [
          { id: "test-btn", x: 170, y: 290, w: 60, h: 36, correct: true, msg: "All lights cycle on! System commissioned successfully." },
          { id: "contactor-other", x: 90, y: 300, w: 60, h: 30, correct: false, msg: "That's the contactor. Find the test/cycle switch to verify operation." },
          { id: "ece-other-2", x: 270, y: 300, w: 60, h: 30, correct: false, msg: "The test button is in the center near the contactor controls." }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#1a2a3a"/>
            <rect x="0" y="240" width="400" height="160" fill="#2a3a2a"/>
            <rect x="185" y="10" width="30" height="240" fill="#555" stroke="#444" stroke-width="2" rx="2"/>
            <rect x="80" y="150" width="100" height="90" fill="#333" stroke="#555" stroke-width="2" rx="4"/>
            <rect x="130" y="155" width="16" height="40" fill="#c0e8c0" stroke="#16a34a" stroke-width="2" rx="2"/>
            <rect x="133" y="157" width="10" height="16" fill="#4ade80" rx="1"/>
            <text x="138" y="190" font-size="6" fill="#16a34a" text-anchor="middle">ON</text>
            <rect x="260" y="140" width="70" height="70" fill="#444" stroke="#d97706" stroke-width="2" rx="4"/>
            <rect x="280" y="148" width="30" height="50" fill="#e0e0e0" stroke="#16a34a" stroke-width="2" rx="2"/>
            <rect x="283" y="150" width="24" height="14" fill="#4ade80" rx="1"/>
            <text x="295" y="176" font-size="6" fill="#16a34a" text-anchor="middle">ON</text>
            <rect x="160" y="280" width="80" height="36" fill="#333" stroke="#d97706" stroke-width="2" rx="4"/>
            <text x="200" y="302" font-size="9" fill="#d97706" text-anchor="middle" font-weight="bold">TEST</text>
            <text x="200" y="50" font-size="11" fill="#aaa" text-anchor="middle">Step 6 \u2014 Cycle Lights</text>
          `;
        }
      }
    ]
  },
  {
    id: "complete",
    title: "Job Complete",
    desc: "All 6 steps finished \u2014 system is live",
    steps: [
      {
        instruction: "Tap the completed pole to finish",
        hotspots: [
          { id: "anywhere", x: 30, y: 40, w: 340, h: 330, correct: true, msg: "" }
        ],
        svg: function () {
          return `
            <rect x="0" y="0" width="400" height="400" fill="#1a2a3a"/>
            <rect x="0" y="200" width="400" height="200" fill="#2a3a2a"/>
            <circle cx="200" cy="150" r="120" fill="rgba(255,230,100,0.15)"/>
            <rect x="185" y="60" width="30" height="200" fill="#c0c0c0" stroke="#888" stroke-width="2"/>
            <rect x="70" y="50" width="260" height="14" fill="#b0b0b0" stroke="#888" stroke-width="2" rx="3"/>
            <rect x="95" y="64" width="50" height="36" fill="rgba(74,222,128,0.3)" rx="3"/>
            <rect x="170" y="64" width="50" height="36" fill="rgba(74,222,128,0.3)" rx="3"/>
            <rect x="245" y="64" width="50" height="36" fill="rgba(74,222,128,0.3)" rx="3"/>
            <rect x="200" y="300" width="160" height="50" fill="rgba(22,163,74,0.2)" rx="8"/>
            <rect x="200" y="300" width="160" height="50" fill="none" stroke="#16a34a" stroke-width="2" rx="8"/>
            <text x="280" y="320" font-size="13" fill="#16a34a" text-anchor="middle" font-weight="bold">JOB COMPLETE</text>
            <text x="280" y="338" font-size="9" fill="#4ade80" text-anchor="middle">Downey Park \u2014 Day 1</text>
            <text x="200" y="380" font-size="9" fill="#888" text-anchor="middle">Tap to finish</text>
          `;
        }
      }
    ]
  }
];

export { SCENES };
