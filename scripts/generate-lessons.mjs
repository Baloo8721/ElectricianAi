/**
 * Regenerates content/lessons.json with theory topic + expanded cards from info1–info5.
 * Run: node scripts/generate-lessons.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const current = JSON.parse(
  readFileSync(join(root, "content", "lessons.json"), "utf8")
);

const theoryTopic = {
  id: "electrical-theory",
  number: 1,
  title: "Electrical Theory & Learn",
  description: "How electricity works — start here",
  intro:
    "Understand the basics before you touch a panel. Voltage pushes, current flows, resistance slows. This is your foundation for everything else.",
  cards: [
    {
      title: "Theory poster — full diagram",
      body: [
        "Tap the image to zoom. It walks through all nine core ideas: what electricity is, circuits, V/I/R, power, AC vs DC, home flow, series vs parallel, and wire size."
      ],
      image: {
        src: "assets/electricity-theory-made-simple.png",
        alt: "Theory of Electricity Made Simple — full educational poster",
        caption: "Theory of Electricity — Made Simple (tap to zoom)"
      },
      remember: "Learn the picture first, then the words stick."
    },
    {
      title: "What is electricity?",
      body: [
        "Electricity is the flow of tiny particles called electrons through a conductor (like copper wire).",
        "Copper has free electrons. They need a complete closed loop to move.",
        "Without a complete path, electricity does not flow."
      ],
      list: [
        "Electrons carry energy",
        "They move in a closed loop",
        "Voltage pushes them; resistance slows them"
      ],
      remember: "No loop = no flow."
    },
    {
      title: "The 4 parts of every circuit",
      list: [
        "Source — battery, utility, transformer (provides energy)",
        "Switch — controls flow on/off",
        "Load — light, motor, heater (uses energy)",
        "Return path — neutral/ground back to source"
      ],
      remember: "Source → switch → load → return. Always."
    },
    {
      title: "The 4 core values (symbols)",
      table: {
        headers: ["Symbol", "Name", "Unit", "Think of it as"],
        rows: [
          ["V", "Voltage", "Volts", "Electrical pressure (water pressure)"],
          ["I", "Current", "Amps", "Amount of flow (water volume)"],
          ["R", "Resistance", "Ohms", "Opposition to flow (narrow pipe)"],
          ["P", "Power", "Watts", "Work done (heat, light, motion)"]
        ]
      },
      remember: "V pushes, I flows, R slows, P is work."
    },
    {
      title: "Voltage — electrical pressure",
      body: [
        "Higher voltage = stronger push on electrons.",
        "Examples: 120V receptacle, 240V dryer, 480V motor."
      ],
      remember: "Voltage is the push — not the flow itself."
    },
    {
      title: "Current (amperage) — the flow",
      body: [
        "How many electrons pass per second.",
        "Too much current on too small a wire = heat and fire risk."
      ],
      remember: "Amps measure flow — respect wire ampacity."
    },
    {
      title: "Resistance — opposition to flow",
      body: [
        "Smaller wire = more resistance = less current.",
        "Bigger wire = less resistance = more current allowed.",
        "Resistance creates heat, voltage drop, and power loss."
      ],
      remember: "Heat is the enemy — size wire right."
    },
    {
      title: "Ohm's Law",
      table: {
        headers: ["Formula", "Use"],
        rows: [
          ["V = I × R", "Find voltage"],
          ["I = V ÷ R", "Find current"],
          ["R = V ÷ I", "Find resistance"]
        ]
      },
      remember: "Cover the value you want in the V-I-R triangle."
    },
    {
      title: "Power formulas",
      table: {
        headers: ["Formula", "Use"],
        rows: [
          ["P = V × I", "Power in watts"],
          ["I = P ÷ V", "Find amps from watts"],
          ["V = P ÷ I", "Find volts from power"]
        ]
      },
      body: ["Example: 120V × 10A = 1,200 watts."],
      remember: "Volts × amps = watts. Always."
    },
    {
      title: "Common appliance power (120V examples)",
      table: {
        headers: ["Appliance", "Typical amps", "Power"],
        rows: [
          ["LED light", "~0.2A", "~24W"],
          ["Microwave", "~12A", "~1,440W"],
          ["Space heater", "~12.5A", "~1,500W"],
          ["AC (240V)", "~20A", "~4,800W"],
          ["Electric dryer (240V)", "~24A", "~5,760W"]
        ]
      },
      remember: "Big heat and motors draw the most power."
    },
    {
      title: "DC vs AC",
      body: [
        "DC (direct current): flows one direction — batteries, solar, electronics.",
        "AC (alternating current): reverses direction — US homes use 60 Hz AC.",
        "AC is used in homes and industry because voltage is easy to transform."
      ],
      remember: "Home = AC. Batteries = DC."
    },
    {
      title: "How AC flows in your home",
      list: [
        "Utility transformer → service → meter → main panel",
        "Hot (L1), neutral (N), ground (G)",
        "Electrons loop: panel → load → back through neutral",
        "Hot to neutral ≈ 120V; hot to hot ≈ 240V; neutral to ground ≈ 0V"
      ],
      remember: "Neutral carries current back — ground is safety."
    },
    {
      title: "Series vs parallel circuits",
      body: [
        "Series: one path only — if one bulb breaks, all go out (old Christmas lights).",
        "Parallel: multiple paths — one breaks, others keep working.",
        "Homes use parallel so each room works independently."
      ],
      remember: "Homes = parallel. Series = one break kills all."
    },
    {
      title: "Wire size vs resistance",
      table: {
        headers: ["Copper wire", "Typical max amps"],
        rows: [
          ["#14 AWG", "15A"],
          ["#12 AWG", "20A"],
          ["#10 AWG", "30A"],
          ["#8 AWG", "40A"],
          ["#6 AWG", "55A"],
          ["#4 AWG", "70A"]
        ]
      },
      body: [
        "Bigger wire = less resistance = more current safely.",
        "Breaker must match wire — breaker protects wire, not the appliance."
      ],
      remember: "Small wire + big breaker = fire."
    },
    {
      title: "Single-phase theory (residential)",
      body: [
        "Usually 120/240V. Transformer center-tap gives neutral.",
        "Hot → neutral = 120V. Hot → hot = 240V."
      ],
      table: {
        headers: ["Wire", "Purpose", "Color"],
        rows: [
          ["Hot L1", "120V leg", "Black"],
          ["Hot L2", "120V leg", "Red"],
          ["Neutral", "Return", "White"],
          ["Ground", "Safety", "Green / bare"]
        ]
      },
      remember: "Two hots + neutral = 120V and 240V from one service."
    },
    {
      title: "Three-phase theory",
      body: [
        "Used in commercial, industrial, and utilities.",
        "More efficient, smoother motors, more power.",
        "Three-phase power formula: P = 1.732 × V × I (1.732 = √3)."
      ],
      remember: "1.732 shows up everywhere in 3-phase — learn it."
    },
    {
      title: "Delta systems (know the danger)",
      body: [
        "Pure delta has no neutral — used for motors and industrial loads.",
        "High-leg delta has one 208V leg (often orange) — never use for 120V loads by mistake."
      ],
      remember: "Orange high-leg on delta — mark it and respect it."
    },
    {
      title: "Magnetism & transformers (why it matters)",
      list: [
        "Current through wire creates a magnetic field",
        "Coils strengthen magnetism — basis of transformers, motors, relays, contactors",
        "Transformer: primary voltage in, secondary voltage out (step up or down)",
        "Example step-down: 480V → 120/208V for building use"
      ],
      remember: "Motors and transformers are cousins — both use magnetism."
    },
    {
      title: "Motor theory basics",
      list: [
        "Converts electrical energy into motion",
        "Parts: rotor, stator, bearings, windings",
        "Inrush current on start can be 6–10× running amps",
        "Overload protects motor; contactor switches power; VFD controls speed"
      ],
      remember: "Inrush is why motor breakers can be larger than wire size (Article 430)."
    },
    {
      title: "Series vs parallel (theory summary)",
      table: {
        headers: ["Type", "Paths", "Voltage", "Home use?"],
        rows: [
          ["Series", "One path", "Divided across loads", "Rare"],
          ["Parallel", "Multiple paths", "Same across branches", "Yes — all homes"]
        ]
      },
      remember: "Parallel = safe, independent circuits at home."
    },
    {
      title: "Short circuit vs open circuit",
      body: [
        "Short circuit: fault hot-to-neutral, hot-to-ground, or phase-to-phase — massive current, breaker trips fast.",
        "Open circuit: broken path — no current flow (loose neutral, cut wire)."
      ],
      remember: "Short = trip fast. Open = dead load, weird voltages."
    },
    {
      title: "Power factor, capacitors, harmonics (intro)",
      list: [
        "Power factor: efficiency measure — ideal is 1.0; low PF wastes power",
        "Capacitors: store energy — motor start, PF correction",
        "Inductors: oppose current change — transformers, motors, ballasts",
        "Harmonics: dirty waveforms from VFDs, computers, LEDs — can overheat neutrals"
      ],
      remember: "You will hear these more in commercial/industrial later."
    },
    {
      title: "Continuous load rule (125%)",
      body: [
        "Continuous load = runs 3+ hours.",
        "Size at 125% for some calculations.",
        "On a 20A circuit, max continuous load ≈ 16A (20 × 0.8)."
      ],
      remember: "Heaters and motors that run long — do not max out the breaker."
    },
    {
      title: "Voltage drop theory",
      body: [
        "Longer wire = more resistance = voltage loss at the load.",
        "Target: branch under 3%, total feeder under 5%.",
        "Field formula: VD = (2 × K × I × D) ÷ CM — K = resistivity, D = distance, CM = wire area."
      ],
      remember: "Long run? Upsize wire — cheaper than a callback."
    },
    {
      title: "Key takeaways (9 rules from the poster)",
      list: [
        "Electricity is electron flow in a closed loop",
        "Voltage pushes, current flows, resistance slows",
        "Power is work (watts = V × I)",
        "AC changes direction; DC flows one way",
        "Homes use parallel circuits",
        "Breaker protects wire",
        "Ground is safety; neutral returns current",
        "Test before touch — always",
        "Understand basics, work safely, keep learning"
      ],
      remember: "Electricity wants a source, a path, and a return."
    },
    {
      title: "Final theory rule (info5)",
      body: [
        "If you understand voltage, current, resistance, power, grounding, and fault paths — you understand the foundation of the entire electrical trade.",
        "Electricity always wants: (1) a source, (2) a path, (3) to return to source."
      ],
      remember: "Master the foundation — the code builds on this."
    }
  ]
};

/** Extra cards merged into existing topics by id */
const supplements = {
  "safety-first": [
    {
      title: "Arc flash & ladder safety",
      list: [
        "480V can kill instantly — respect arc flash labels and PPE",
        "Never stand on the top cap of a ladder",
        "Arc flash can exceed 35,000°F — gear matters above 240V"
      ],
      remember: "Respect ALL gear on anything 240V and up."
    },
    {
      title: "Field rules — never forget",
      list: [
        "Breaker protects wire",
        "Never trust labels alone — test",
        "Neutral carries current; ground normally does not",
        "Loose neutrals destroy equipment",
        "Heat is the enemy",
        "Voltage kills; current burns"
      ],
      remember: "Tight terminations matter — torque to spec."
    }
  ],
  "power-flow": [
    {
      title: "Incoming power family tree",
      body: [
        "UTILITY → METER → DISCONNECT → MAIN PANEL → SUB-PANEL(S) → LOADS.",
        "Every install branches from this — only wire count and voltage change."
      ],
      remember: "Draw this line on a napkin — it never changes."
    },
    {
      title: "Voltage & phase quick-ID",
      table: {
        headers: ["System", "L-L", "L-N", "Phases", "Where"],
        rows: [
          ["120/240V 1-ph", "240", "120", "1", "Houses, garages, sheds"],
          ["120/208V 3-ph Wye", "208", "120", "3", "Offices, restaurants"],
          ["277/480V 3-ph Wye", "480", "277", "3", "Factories, big-box"],
          ["240V 3-ph Delta", "240", "120*", "3", "Old industrial"],
          ["347/600V 3-ph", "600", "347", "3", "Canada, large warehouses"]
        ]
      },
      body: ["*High-leg delta: one leg is 208V — do not feed 120V loads wrong."],
      remember: "Know your system before you land a wire."
    },
    {
      title: "Service types — overhead & underground",
      list: [
        "Overhead: drip-loop 12\" below weatherhead; neutral taped white in panel",
        "Torque: 35 in-lb (#2 Al), 50 in-lb (4/0 Al) — verify label",
        "Underground 200A: 4/0 Al XHHW-2 in 2\" PVC",
        "Backfill: 6\" sand, warning tape 12\" above — inspectors dig"
      ],
      remember: "Service entrance details fail inspections when rushed."
    },
    {
      title: "Solar backfeed (residential)",
      list: [
        "Solar panels → inverter → AC disconnect → backfed breaker in main panel",
        "Follow labeling and NEC 690 — coordinate with AHJ"
      ],
      remember: "Solar adds a second source — labeling matters."
    },
    {
      title: "3-way & 4-way switches (from info2)",
      body: [
        "3-way: two locations control one light (stairs, halls) — travelers between switches.",
        "4-way: goes between two 3-ways for three or more switch locations."
      ],
      remember: "3-way = two switches; 4-way = middle switch in a chain."
    }
  ],
  "phases-colors": [
    {
      title: "Where each system is used",
      list: [
        "Single-phase 120/240V: houses, apartments, small shops",
        "120/208V wye: offices, restaurants, retail",
        "277/480V wye: warehouses, industrial plants, large HVAC",
        "Hot → neutral = 120V; hot → hot = 240V (residential)"
      ],
      remember: "Interviewers LOVE BRB and BOY — say them out loud."
    },
    {
      title: "Transformers step voltage",
      body: ["480V → 208V is a common commercial example.", "Transformers use electromagnetic induction."],
      remember: "Big buildings often get 480V and step down for 120V outlets."
    }
  ],
  "panels-bonding": [
    {
      title: "Panel install steps (field manual)",
      list: [
        "Mount level",
        "Bond/float correctly (main = bond, sub = float neutral)",
        "Land feeder: ground → neutral → hots",
        "Label everything before spaghetti sets in"
      ],
      remember: "Label BEFORE you land wires."
    },
    {
      title: "30-second panel checklist",
      list: [
        "Open door one-handed, face turned away",
        "Bonding screw: IN at service, OUT at sub",
        "Neutrals and grounds on separate bars in subs",
        "Feeder order: ground → neutral → hots"
      ],
      remember: "Subpanel neutrals touching grounds = ghost trips later."
    },
    {
      title: "Subpanel feeder sizing quick-pick",
      table: {
        headers: ["Feeder breaker", "Cu THHN", "EMT", "Max dist (3% VD)"],
        rows: [
          ["60A", "#6", "1\"", "85 ft"],
          ["100A", "#3", "1¼\"", "95 ft"],
          ["150A", "#1/0", "2\"", "110 ft"],
          ["200A", "#250 kcmil", "2½\"", "130 ft"]
        ]
      },
      remember: "Longer run? Upsize wire or parallel conduit."
    },
    {
      title: "Grounding electrode system (GEC)",
      table: {
        headers: ["Service", "GEC to rod", "GEC to water"],
        rows: [
          ["100A", "#8 Cu", "#8 Cu"],
          ["200A", "#6 Cu", "#4 Cu"],
          ["400A", "#3/0 Cu", "#3/0 Cu"],
          ["600A+", "500 kcmil Cu", "500 kcmil Cu"]
        ]
      },
      body: ["Cold-water bond within 5 ft of entrance. Two rods 6 ft apart if one rod > 25Ω."],
      remember: "Ground rods protect — size GEC to service."
    },
    {
      title: "Before energizing — final checklist",
      list: [
        "All lugs torqued and stamped",
        "Neutral/ground bond correct location only",
        "Directory filled; panel door closed",
        "Meter: phase-phase, phase-ground, neutral-ground (0V)",
        "Record baseline amps on each leg after energizing"
      ],
      remember: "First start — write down amps for future troubleshooting."
    },
    {
      title: "Special scenarios",
      list: [
        "Detached garage: 4-wire feeder, float neutral, ground rod(s)",
        "Mobile home: 200A meter-main combo; float neutral inside home panel",
        "RTU: 480V 3-ph, local disconnect within sight, HMCP breaker for inrush"
      ],
      remember: "Shed/garage sub = 4 wires + rods — not a 3-wire feed."
    }
  ],
  "wire-breakers": [
    {
      title: "NEC wire sizing (75°C column — info3)",
      table: {
        headers: ["Wire", "Ampacity", "Typical breaker"],
        rows: [
          ["#14", "15A", "15A"],
          ["#12", "20A", "20A"],
          ["#10", "30A", "30A"],
          ["#8", "50A", "40–50A"],
          ["#6", "65A", "60A"],
          ["#4", "85A", "—"],
          ["#3", "100A", "100A"]
        ]
      },
      remember: "CRITICAL: Breaker protects the wire — NOT the appliance."
    },
    {
      title: "Conduit fill — NEC & fist rule",
      body: ["40% max fill for more than 2 conductors (NEC Chapter 9).", "THHN is typical in conduit."],
      table: {
        headers: ["EMT", "Max #12 THHN"],
        rows: [
          ["½\"", "6–7"],
          ["¾\"", "16"],
          ["1\"", "26"]
        ]
      },
      remember: "Overfill = pull burns, failed inspection, angry foreman."
    },
    {
      title: "Derating conductors",
      body: [
        "More conductors in a raceway = more heat = reduced ampacity.",
        "Very important in commercial — count before you pull."
      ],
      remember: "Full conduit runs hot — derate ampacity."
    },
    {
      title: "Box fill (NEC 314.16)",
      list: [
        "#14 = 2.00 in³ per conductor",
        "#12 = 2.25 in³ per conductor",
        "#10 = 2.50 in³ per conductor",
        "All grounds = 1 count; all clamps = 1 count",
        "Each device (receptacle/switch) = 2 counts"
      ],
      remember: "A device counts as two wires — do not stuff boxes."
    },
    {
      title: "Advanced terms (info1)",
      table: {
        headers: ["Term", "Meaning"],
        rows: [
          ["Ampacity", "Safe current capacity of wire"],
          ["Voltage drop", "Voltage lost over distance"],
          ["Inrush", "Motor startup surge"],
          ["Derating", "Reduced ampacity in raceway"],
          ["Harmonics", "Distorted power waveforms"],
          ["Megger", "Insulation resistance tester"],
          ["CTs", "Current transformers"]
        ]
      },
      remember: "Hear a new word on site — look it up same day."
    }
  ],
  "multimeter": [
    {
      title: "Golden safety rules (never)",
      list: [
        "Measure voltage on amp setting",
        "Measure resistance on live circuits",
        "Move leads while touching live",
        "Hold metal probe tips",
        "Trust power is off without testing"
      ],
      safety: true,
      body: "Misuse can blow the meter, arc flash you, or destroy equipment."
    },
    {
      title: "Basic meter settings",
      table: {
        headers: ["Setting", "Symbol", "Use"],
        rows: [
          ["AC voltage", "V~", "Outlets, panels, 120/240V"],
          ["DC voltage", "V⎓", "Batteries, solar, controls"],
          ["Resistance", "Ω", "Heaters, coils — power OFF"],
          ["Continuity", "beeps", "Switches, fuses — power OFF"],
          ["Amperage", "A", "In series or clamp meter"]
        ]
      },
      remember: "Right dial, right port — every time."
    },
    {
      title: "Resistance test on heaters",
      body: [
        "Power OFF. Low ohms usually = good element.",
        "OL = open (burned). 0Ω = shorted — investigate."
      ],
      remember: "OL on a heater often means replace the element."
    },
    {
      title: "Testing capacitors (HVAC)",
      body: ["DISCHARGE capacitor before touching — can hold charge after power is off."],
      remember: "Capacitors bite — discharge first."
    },
    {
      title: "Good meters to buy",
      list: [
        "Beginner: Klein, Ideal, Southwire",
        "Industry standard: Fluke (very respected)"
      ],
      remember: "Buy once, cry once — cheap meters lie."
    },
    {
      title: "Fast troubleshooting order",
      list: [
        "Power source",
        "Breaker",
        "Voltage present",
        "Connections",
        "Continuity",
        "Device/component"
      ],
      remember: "Work top-down — source to load."
    }
  ],
  "conduit-bending": [
    {
      title: "Shrink on offsets",
      body: ["Offsets shorten conduit slightly — about ¼\" per inch of offset at 30°."],
      remember: "Account for shrink on long offset runs."
    },
    {
      title: "3-point saddle",
      body: ["Used to go over pipe, conduit, or obstacles — most common field saddle."],
      remember: "Saddle = three bends, one obstacle."
    },
    {
      title: "Commercial install rules",
      list: [
        "Level, parallel, symmetrical runs",
        "Support within 3 ft of box, ~every 10 ft",
        "Clean bends matter — crooked work gets ripped out"
      ],
      remember: "Conduit work is visible art — take pride."
    },
    {
      title: "Offset multipliers (info3 alternate)",
      table: {
        headers: ["Angle", "Multiplier"],
        rows: [
          ["10°", "5.7"],
          ["22°", "2.6"],
          ["30°", "2.0"],
          ["45°", "1.4"]
        ]
      },
      body: ["Offset height ÷ multiplier = distance between marks."],
      remember: "30° ×2 is the fast field favorite."
    }
  ],
  "nec-essentials": [
    {
      title: "Master these 10 NEC articles (info4)",
      table: {
        headers: ["Article", "Title", "Must know"],
        rows: [
          ["90", "Introduction", "Practical safeguarding — not a design manual"],
          ["110", "Installations", "Neat work, torque, 110.26 working space"],
          ["200", "Grounded conductors", "Neutral = white or gray"],
          ["210", "Branch circuits", "AFCI, GFCI, receptacle spacing"],
          ["215", "Feeders", "125% continuous loads"],
          ["230", "Services", "Disconnect at entrance; max 6 disconnects"],
          ["240", "Overcurrent", "Protect conductors; tap rules; 5-ft tap"],
          ["250", "Grounding/bonding", "Most tested — bonding clears faults"],
          ["300", "Wiring methods", "Same circuit in same raceway; burial depths"],
          ["310", "Conductors", "Table 310.16 ampacity bible"]
        ]
      },
      remember: "Know article numbers — speed in the book wins."
    },
    {
      title: "More articles from info5",
      table: {
        headers: ["Article", "Topic"],
        rows: [
          ["220", "Load calculations"],
          ["314", "Boxes"],
          ["408", "Panels"],
          ["430", "Motors"]
        ]
      },
      remember: "Pool? Article 680. MC support? 330.30."
    },
    {
      title: "Article 210 & 220 highlights",
      list: [
        "210.11: load calculations for branch circuits",
        "210.12: AFCI in dwelling living areas",
        "210.52: 6-ft wall rule; countertop receptacles",
        "220: service and panel sizing"
      ],
      remember: "210 is where receptacles and AFCI/GFCI live."
    },
    {
      title: "Article 250.122 — EGC sizing",
      body: [
        "#12 circuit → #12 ground; #10 circuit → #10 ground; #8 circuit → #10 ground (memorize pattern in table)."
      ],
      remember: "Equipment grounding conductor size follows table 250.122."
    },
    {
      title: "NEC navigation interview line",
      body: [
        "If I do not know the exact line, I use the index and thumb tabs to find it within 60 seconds.",
        "Admit what you do not know — show how you would look it up."
      ],
      remember: "Honest + resourceful beats fake expert."
    }
  ],
  "devices-switches": [
    {
      title: "Switch wiring (field manual)",
      list: ["Line → common screw", "Load → switched leg", "Wrap clockwise under screws"],
      remember: "Line on common — travelers only on 3-way/4-way."
    },
    {
      title: "MWBC & 2-pole breakers",
      body: [
        "2-pole breakers for 240V loads and multi-wire branch circuits.",
        "Motor HMCP: high magnetic trip for motor inrush."
      ],
      remember: "Two poles tied together = both legs off together."
    },
    {
      title: "Countertop receptacle rule (detail)",
      body: [
        "Above counter within 2 ft of edge.",
        "No point along counter more than 24 inches without a receptacle on islands/peninsulas."
      ],
      remember: "Kitchen and bath layouts — measure before drywall."
    }
  ],
  "commercial-industrial": [
    {
      title: "Motor controls (info3)",
      list: [
        "L1-L2-L3 in → T1-T2-T3 to load",
        "Contactor: coil voltage matters most",
        "Overload sized to motor FLA",
        "Relay vs contactor: relay = small control; contactor = motor power"
      ],
      remember: "Follow schematic control path — voltage left to right."
    },
    {
      title: "Ballasts & LED drivers",
      list: [
        "Follow wiring diagram on sticker",
        "Never mix drivers and LED load types"
      ],
      remember: "Wrong driver = early failure or fire."
    },
    {
      title: "PLC & automation",
      body: [
        "PLC = programmable logic controller — industrial automation computer.",
        "Controls pumps, conveyors, water plants, factories.",
        "Huge earning potential in controls and automation."
      ],
      remember: "Learn motor basics first — PLC builds on that."
    },
    {
      title: "Commercial panels (info2)",
      table: {
        headers: ["Panel", "Purpose"],
        rows: [
          ["Lighting panel", "277V or 120V lighting"],
          ["Power panel", "Receptacles and equipment"],
          ["MCC", "Motors"],
          ["Switchboard", "Main distribution"]
        ]
      },
      remember: "Follow the one-line: MSB → panels → loads."
    },
    {
      title: "Troubleshooting — nothing works",
      list: [
        "Check main",
        "Check panel breaker",
        "Check load",
        "Check switch/relay",
        "Work load back to panel"
      ],
      remember: "4 moves before you start swapping parts randomly."
    },
    {
      title: "Motor won't start",
      list: [
        "Control circuit open?",
        "Overload tripped?",
        "Coil getting power?",
        "Voltage correct at T-leads?"
      ],
      remember: "Control circuit first — then power circuit."
    }
  ],
  "tools-jobsite": [
    {
      title: "Field manual fundamentals",
      list: [
        "Keep panel doors closed",
        "De-energize whenever possible",
        "Voltage does not lie — verify with meter",
        "Tighten terminations to spec",
        "Never assume a neutral is safe",
        "Bond everything metallic",
        "Always pull a ground"
      ],
      remember: "Seven habits of a pro — not optional."
    },
    {
      title: "Tool pouch must-haves (survival guide)",
      list: [
        "11-in-1 in your hand, not buried in pouch",
        "Stripper-crimper #10–#14",
        "Tick tester — check on known hot every morning",
        "Mini level — crooked panels = rookie label",
        "Sharpie and white tape — label while you work",
        "Headlamp for dark panels",
        "Torque screwdriver 12–20 in-lb"
      ],
      remember: "Phone eats first — photo before disconnect."
    },
    {
      title: "Common jobsite fails",
      list: [
        "Forgot MC ring — pull whole run",
        "Drywall buried your box — photo and flag",
        "#10 wire on 20A breaker — instant fail",
        "Duct tape on PVC instead of proper glue",
        "Wire nuts left in panel — rookie billboard"
      ],
      remember: "Slow down on materials — redo costs more."
    },
    {
      title: "Print reading basics",
      list: [
        "Floor plans → device locations",
        "One-lines → power hierarchy",
        "Panel schedules → breaker sizes",
        "Schematics → logic, not location",
        "Follow voltage left to right"
      ],
      remember: "Prints lie sometimes — meter tells truth."
    },
    {
      title: "Fire alarm & low voltage",
      body: [
        "Fire alarm: electrician provides power and conduit.",
        "Low voltage: stub boxes, conduit, labeling — coordinate with LV trades."
      ],
      remember: "You power FA — FA company wires devices."
    },
    {
      title: "Change orders & as-builts",
      list: [
        "GC says just install it — stop, get clarification",
        "Document change orders before extra work",
        "Redline prints daily — your as-built when sets get lost"
      ],
      remember: "If it is not on paper, it did not happen."
    },
    {
      title: "Engineer red flags",
      list: [
        "No neutral shown",
        "Overfilled conduits on paper",
        "Wrong breaker sizes",
        "Missing ground paths"
      ],
      remember: "Protect yourself — ask before you burn money."
    }
  ],
  "interview-career": [
    {
      title: "Best interview answers (verbatim from info1)",
      body: [
        "Why electrician? — I like working with my hands, solving problems, and learning a skilled trade with long-term growth.",
        "What do you know? — NEC basics, grounding/bonding, residential vs commercial, conduit, and safety.",
        "Most important? — Safety and doing quality work correctly the first time."
      ],
      remember: "Short, honest, safety-first."
    },
    {
      title: "Interview phrases (info4)",
      list: [
        "I always work safely — I treat every wire as hot until I prove it is not.",
        "I am comfortable pulling cable and keeping work neat.",
        "I study NEC — Articles 250, 300, and 310 right now.",
        "I would rather ask twice than make a mistake once."
      ],
      remember: "Sprinkle these naturally — do not recite like a robot."
    },
    {
      title: "30-minute daily study plan (info4)",
      table: {
        headers: ["Day", "Topic", "Action"],
        rows: [
          ["1", "Safety & LOTO", "Grounding vs bonding"],
          ["2", "Wire sizing", "Write #14/#12/#10 five times"],
          ["3", "Box fill", "Device = 2 wire counts"],
          ["4", "GFCI & AFCI", "Find examples in a panel photo"],
          ["5", "Conduit", "Names: EMT, PVC, rigid; watch stub 90"],
          ["6", "Tools", "Name every tool in your bag"],
          ["7", "Mock interview", "Strength = safety + neat work"]
        ]
      },
      remember: "30 minutes daily beats cramming."
    },
    {
      title: "High-value skills years 2–4 (full list)",
      list: [
        "EMT bending",
        "Motor controls",
        "Transformers",
        "Reading prints",
        "Load calculations",
        "PLC troubleshooting",
        "Fire alarm systems",
        "Data/low voltage",
        "VFDs",
        "Service troubleshooting"
      ],
      remember: "Pick one specialty later — master basics first."
    },
    {
      title: "Career paths the trade offers",
      list: [
        "Industrial controls",
        "Automation",
        "PLC programming",
        "Utilities",
        "Instrumentation",
        "Engineering",
        "Business ownership",
        "Six figures possible with specialization"
      ],
      remember: "The trade is a ladder — first rung is showing up safe."
    },
    {
      title: "Master electrician level (long-term)",
      list: [
        "Service calculations",
        "Transformer and feeder sizing",
        "Fault current calculations",
        "Voltage drop calculations",
        "Coordination studies",
        "Estimating and leadership"
      ],
      remember: "You do not need this day one — know it exists."
    },
    {
      title: "What’s most important in interview",
      body: [
        "Not genius-level code knowledge.",
        "They want reliability, safety, work ethic, willingness to learn, showing up every day."
      ],
      remember: "Attitude and safety beat memorizing the whole NEC."
    }
  ],
  "quick-reference": [
    {
      title: "Troubleshooting method (7 steps)",
      list: [
        "Verify source voltage",
        "Check breaker/fuse",
        "Check continuity",
        "Check neutral",
        "Check grounding",
        "Isolate sections",
        "Identify failed component"
      ],
      remember: "Work backwards from load to source."
    },
    {
      title: "kVA calculation",
      body: ["kVA = VA ÷ 1000"],
      remember: "Transformers and services often rated in kVA."
    },
    {
      title: "Torque values (common)",
      list: [
        "Square-D AL 4/0 main: 275 in-lb",
        "Eaton BR 125A sub-feed: 250 in-lb",
        "Murray 100A breaker: 225 in-lb",
        "Ground bar #6 screw: 45 in-lb"
      ],
      remember: "Torque screwdriver — inspectors may watch."
    },
    {
      title: "Three load types (theory)",
      list: [
        "Resistive: heat, incandescent — steady on breakers",
        "Inductive: motors, fans — inrush current",
        "Capacitive: power supplies, VFDs — harmonics"
      ],
      remember: "Motors are hardest on breakers — Article 430."
    },
    {
      title: "NEC 110.26 working space",
      table: {
        headers: ["Voltage", "Depth clearance"],
        rows: [
          ["0–150V", "3 ft"],
          ["151–600V", "4 ft"],
          ["Height", "6.5 ft headroom"]
        ]
      },
      remember: "Never block a panel with storage."
    },
    {
      title: "Relays vs contactors",
      body: [
        "Relay: small control circuits.",
        "Contactor: large power — usually motors."
      ],
      remember: "Coil voltage on contactor must match control circuit."
    },
    {
      title: "Master memory rules (info5)",
      table: {
        headers: ["World", "Keywords"],
        rows: [
          ["Residential", "Single phase, Romex, 120/240V"],
          ["Commercial", "EMT, MC, 120/208V, 277/480V"],
          ["Industrial", "Motors, PLCs, MCCs, 480V+, automation"]
        ]
      },
      remember: "Voltage tells the truth. Prints lie. Your meter is king."
    }
  ]
};

// Remove old theory if re-running; strip theory from current
const existingTopics = current.topics.filter((t) => t.id !== "electrical-theory");

// Merge supplements
for (const topic of existingTopics) {
  const extra = supplements[topic.id];
  if (extra) topic.cards = [...topic.cards, ...extra];
}

// Renumber: theory = 1, rest shift
const renumbered = existingTopics.map((t, i) => ({ ...t, number: i + 2 }));
const topics = [theoryTopic, ...renumbered];

const suggestedPath = [
  "electrical-theory",
  "safety-first",
  "power-flow",
  "phases-colors",
  "wire-breakers",
  "multimeter",
  "panels-bonding",
  "nec-essentials"
];

const output = { suggestedPath, topics };
writeFileSync(
  join(root, "content", "lessons.json"),
  JSON.stringify(output, null, 2) + "\n"
);

const cardCount = topics.reduce((n, t) => n + t.cards.length, 0);
console.log(`Wrote ${topics.length} topics, ${cardCount} cards to content/lessons.json`);
