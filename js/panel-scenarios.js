const panelScenarios = [
  {
    id: "main-panel-200a",
    title: "200A Main Panel",
    description: "Residential 120/240V single-phase main service panel",
    type: "main",
    voltage: "120/240V",
    ampacity: "200A",
    wires: "4/0 AL or 2/0 CU",
    steps: [
      {
        id: "panel-type",
        instruction: "What type of panel is this?",
        info: "The first panel after the meter is always the main service panel.",
        options: ["Main service panel", "Subpanel"],
        correct: 0,
        explanation: "This is the main service panel — it's the first disconnect after the meter. Neutral and ground are bonded here.",
        visual: { type: "main", bonding: "bonded", feeder: "none" }
      },
      {
        id: "bonding",
        instruction: "Where should the bonding screw/strap be?",
        info: "The bonding screw connects the neutral bar to the panel enclosure.",
        options: ["IN (neutral bonded to enclosure)", "OUT (neutral floating)"],
        correct: 0,
        explanation: "Main panel: bonding screw IN. Neutral bar is bonded to the enclosure. This is the ONLY place neutral and ground are connected.",
        visual: { type: "main", bonding: "bonded", feeder: "none" }
      },
      {
        id: "feeder-ground",
        instruction: "Land the feeder: Where does the ground (green/bare) wire go first?",
        info: "Always land ground first for safety — Keeps your tools away from live lugs.",
        options: ["Ground bar", "Neutral bar", "Main breaker lug"],
        correct: 0,
        explanation: "Ground lands on the ground bar. Order: ground → neutral → hots. This way the ground path is established first.",
        visual: { type: "main", bonding: "bonded", feeder: "ground" }
      },
      {
        id: "feeder-neutral",
        instruction: "Where does the neutral (white) wire land?",
        info: "In a main panel, the neutral bar IS bonded to the enclosure.",
        options: ["Neutral bar (bonded)", "Ground bar", "Main breaker lug"],
        correct: 0,
        explanation: "Neutral lands on the neutral bar. In a main panel, this bar is bonded to the enclosure via the bonding screw.",
        visual: { type: "main", bonding: "bonded", feeder: "neutral" }
      },
      {
        id: "feeder-hots",
        instruction: "Where do the hot (black & red) wires land?",
        info: "Phase A (black) and Phase B (red) connect to the main breaker.",
        options: ["Main breaker lugs", "Neutral bar", "Ground bar"],
        correct: 0,
        explanation: "Hots land on the main breaker lugs. Black = L1, Red = L2. The main breaker feeds the entire panel bus.",
        visual: { type: "main", bonding: "bonded", feeder: "hots" }
      },
      {
        id: "breakers",
        instruction: "You need circuits for: Lights (15A), Outlets (20A), Dryer (30A), Range (50A). Which breaker for the 20A outlet circuit?",
        info: "Breaker protects the wire. #12 wire = 20A max breaker.",
        options: ["15A breaker", "20A breaker", "30A breaker"],
        correct: 1,
        explanation: "Outlets require #12 wire on a 20A breaker. 15A would be undersized for a 20A circuit, 30A would be oversized and dangerous.",
        visual: { type: "main", bonding: "bonded", feeder: "complete", breakers: ["15A", "20A", "30A", "50A"] }
      },
      {
        id: "inspection",
        instruction: "Final inspection check: Which of these is correct for a main panel?",
        info: "Inspectors check bonding, labeling, and clearances.",
        options: [
          "Neutral bar bonded, directory filled, panel door closed",
          "Neutral bar floating, no directory, panel open",
          "Grounds and neutrals mixed on same bar"
        ],
        correct: 0,
        explanation: "Main panel: bonded neutral, directory filled, panel door closed, all lugs torqued, clearances per 110.26.",
        visual: { type: "main", bonding: "bonded", feeder: "complete", breakers: ["15A", "20A", "30A", "50A"], done: true }
      }
    ]
  },
  {
    id: "subpanel-100a",
    title: "100A Subpanel",
    description: "Residential garage/workshop subpanel fed from main",
    type: "sub",
    voltage: "120/240V",
    ampacity: "100A",
    wires: "#3 CU THHN",
    steps: [
      {
        id: "panel-type",
        instruction: "What type of panel is this being installed as?",
        info: "A subpanel is fed from the main panel — it is NOT the first disconnect.",
        options: ["Main service panel", "Subpanel"],
        correct: 1,
        explanation: "This is a subpanel. It's fed from the main panel with 4 wires. The neutral bar MUST float (not bonded to enclosure).",
        visual: { type: "sub", bonding: "floating", feeder: "none" }
      },
      {
        id: "bonding",
        instruction: "What about the bonding screw in a subpanel?",
        info: "This is the #1 mistake apprentices make on inspections.",
        options: ["IN (neutral bonded to enclosure)", "OUT (neutral floating)"],
        correct: 1,
        explanation: "NEVER bond neutral and ground in a subpanel. The bonding screw must be OUT. Neutral floats, ground bar is bonded to enclosure.",
        visual: { type: "sub", bonding: "floating", feeder: "none" }
      },
      {
        id: "feeder-wires",
        instruction: "How many wires in the feeder cable from main to subpanel?",
        info: "Think about what's needed: hots, return, and safety path.",
        options: ["3 wires (2 hots + neutral)", "3 wires (2 hots + ground)", "4 wires (2 hots + neutral + ground)"],
        correct: 2,
        explanation: "4 wires required: L1 (black), L2 (red), neutral (white), ground (green/bare). Never share neutral and ground paths.",
        visual: { type: "sub", bonding: "floating", feeder: "none" }
      },
      {
        id: "neutral-ground",
        instruction: "In the subpanel, where do neutrals and grounds land?",
        info: "They must be separated — this is critical for code compliance.",
        options: [
          "Neutrals on neutral bar, grounds on ground bar (separate)",
          "All on neutral bar",
          "All on ground bar"
        ],
        correct: 0,
        explanation: "Neutrals on the isolated neutral bar (floating). Grounds on the ground bar (bonded to enclosure). Never mix them in a subpanel.",
        visual: { type: "sub", bonding: "floating", feeder: "complete" }
      },
      {
        id: "ground-rod",
        instruction: "Does a subpanel in a detached garage need its own ground rod(s)?",
        info: "Detached structures have special grounding requirements.",
        options: [
          "Yes — NEC requires at least one ground rod",
          "No — grounds return through the feeder",
          "Only if the building has water pipes"
        ],
        correct: 0,
        explanation: "NEC 250.32: Detached building with subpanel needs at least one ground rod. Two rods if first tests > 25 ohms.",
        visual: { type: "sub", bonding: "floating", feeder: "complete", rods: true }
      },
      {
        id: "inspection",
        instruction: "Final check: What's the most common subpanel inspection fail?",
        info: "This single mistake causes more callbacks than anything else.",
        options: [
          "Bonding screw left IN (neutral bonded to case)",
          "Wrong breaker brand",
          "No main breaker in sub"
        ],
        correct: 0,
        explanation: "Forgotten bonding screw IN = neutral bonded to case = parallel path = ghost trips = failed inspection. Always remove it in subs.",
        visual: { type: "sub", bonding: "floating", feeder: "complete", rods: true, done: true }
      }
    ]
  },
  {
    id: "detached-garage",
    title: "Detached Garage Subpanel",
    description: "100A subpanel in detached garage with full grounding",
    type: "sub",
    voltage: "120/240V",
    ampacity: "100A",
    wires: "#3 CU THHN in 1-1/4\" PVC",
    steps: [
      {
        id: "panel-type",
        instruction: "A detached garage gets power from the house. What type of panel goes in the garage?",
        info: "It's not the first disconnect for the property.",
        options: ["Main service panel", "Subpanel"],
        correct: 1,
        explanation: "Subpanel. The main panel is in the house. The garage subpanel is fed from the house main.",
        visual: { type: "sub", bonding: "floating", feeder: "none" }
      },
      {
        id: "bonding",
        instruction: "Bonding screw in the garage subpanel?",
        info: "Same rule applies as any subpanel.",
        options: ["IN (bonded)", "OUT (floating)"],
        correct: 1,
        explanation: "OUT — floating. The garage subpanel must have neutral isolated from ground, just like any subpanel.",
        visual: { type: "sub", bonding: "floating", feeder: "none" }
      },
      {
        id: "grounding-electrode",
        instruction: "NEC 250.32 requires what at the detached garage?",
        info: "The garage is a separate structure with its own grounding needs.",
        options: [
          "At least one ground rod, bonded to the subpanel ground bar",
          "No ground rod — ground comes from house",
          "A ground rod only if there are metal water pipes"
        ],
        correct: 0,
        explanation: "NEC 250.32 requires a grounding electrode system at detached buildings. At minimum, one 8 ft ground rod. Two if resistance > 25 ohms.",
        visual: { type: "sub", bonding: "floating", feeder: "complete", rods: true }
      },
      {
        id: "feeder-protection",
        instruction: "The feeder from house to garage — what protection is needed at the house end?",
        info: "The feeder needs overcurrent protection at the source.",
        options: [
          "A breaker in the main panel sized for the feeder ampacity",
          "No breaker needed — the garage subpanel has one",
          "A disconnect switch only"
        ],
        correct: 0,
        explanation: "The feeder needs a breaker in the main panel. Size the breaker for the wire ampacity (#3 CU = 100A). The garage sub can also have a main breaker.",
        visual: { type: "sub", bonding: "floating", feeder: "complete", rods: true, feederBreaker: true }
      },
      {
        id: "trench",
        instruction: "The underground PVC feeder run — minimum cover depth?",
        info: "NEC 300.5 specifies minimum burial depths.",
        options: ["12\"", "18\"", "24\""],
        correct: 1,
        explanation: "18\" minimum cover for residential branch circuits and feeders (NEC 300.5). 24\" under driveways and parking areas.",
        visual: { type: "sub", bonding: "floating", feeder: "complete", rods: true, done: true }
      }
    ]
  },
  {
    id: "mobile-home",
    title: "Mobile Home Service",
    description: "200A meter-main combo feeding mobile home interior panel",
    type: "main",
    voltage: "120/240V",
    ampacity: "200A",
    wires: "4/0 AL SEU",
    steps: [
      {
        id: "panel-type",
        instruction: "A mobile home typically has a meter-main combo outside. Is this the main panel?",
        info: "The meter-main is the first disconnect.",
        options: ["Yes — it's the main service disconnect", "No — it's just a meter"],
        correct: 0,
        explanation: "The meter-main combo IS the main service disconnect. Neutral and ground are bonded here. The panel inside the mobile home is a subpanel.",
        visual: { type: "main", bonding: "bonded", feeder: "none" }
      },
      {
        id: "interior-bonding",
        instruction: "What about the panel inside the mobile home?",
        info: "The interior panel is fed from the meter-main outside.",
        options: ["Bond neutral and ground", "Float neutral, separate ground"],
        correct: 1,
        explanation: "The interior panel is a subpanel. Neutral floats, grounds are separate. Bonding only happens at the meter-main outside.",
        visual: { type: "sub", bonding: "floating", feeder: "complete" }
      },
      {
        id: "feeder",
        instruction: "How many wires between the meter-main and the interior panel?",
        options: ["3 wires (2 hots + neutral)", "3 wires (2 hots + ground)", "4 wires (2 hots + neutral + ground)"],
        correct: 2,
        explanation: "4-wire feeder: 2 hots, neutral, and ground. The neutral is isolated in the interior panel (subpanel).",
        visual: { type: "sub", bonding: "floating", feeder: "complete" }
      },
      {
        id: "grounding",
        instruction: "Mobile home grounding — what's required?",
        info: "Mobile homes have specific grounding requirements per NEC 550.",
        options: [
          "Ground rod(s) at meter-main, bonding of metal water pipe, and 4-wire feed to interior",
          "Only a ground rod at the interior panel",
          "No ground rod — just bond to the water pipe"
        ],
        correct: 0,
        explanation: "Mobile home service requires: ground rod(s) at the service, bonding of metal water pipe, and a 4-wire feeder to the interior panel where neutral floats.",
        visual: { type: "main", bonding: "bonded", feeder: "complete", rods: true, done: true }
      }
    ]
  },
  {
    id: "commercial-208v",
    title: "Commercial 208V Panel",
    description: "120/208V 3-phase wye panel in a commercial building",
    type: "main",
    voltage: "120/208V 3-phase",
    ampacity: "400A",
    wires: "(3) 500 kcmil AL per phase + 3/0 CU ground",
    steps: [
      {
        id: "panel-type",
        instruction: "This is a 120/208V 3-phase wye panel in a commercial building. Is it a main or sub?",
        info: "If it's the first panel after the transformer/meter, it's a main.",
        options: ["Main service panel", "Subpanel"],
        correct: 0,
        explanation: "It's a main panel — first disconnect. Neutral and ground are bonded here. The bonding screw or strap connects neutral to enclosure.",
        visual: { type: "main", voltage: "208-3ph", bonding: "bonded", feeder: "none" }
      },
      {
        id: "phase-colors",
        instruction: "What are the correct phase color codes for 120/208V?",
        info: "Standard commercial phase coloring — BRB.",
        options: ["Black, Red, Blue", "Brown, Orange, Yellow", "Black, Red, White"],
        correct: 0,
        explanation: "120/208V wye uses Black (A), Red (B), Blue (C). 277/480V uses Brown, Orange, Yellow. Know your voltage to ID the color code.",
        visual: { type: "main", voltage: "208-3ph", bonding: "bonded", colors: "BRB" }
      },
      {
        id: "neutral-color",
        instruction: "What color is the neutral in a 120/208V system?",
        info: "Neutral color changes with system voltage.",
        options: ["White", "Gray", "Green"],
        correct: 0,
        explanation: "White is the neutral for 120/208V systems. Gray is the neutral for 277/480V systems. Green is always ground.",
        visual: { type: "main", voltage: "208-3ph", bonding: "bonded", colors: "BRB" }
      },
      {
        id: "breakers",
        instruction: "A 208V 3-phase motor (10A FLA) needs what size breaker per NEC 430?",
        info: "Motor branch circuits have special rules — breaker can be larger than wire for inrush.",
        options: ["15A breaker", "30A breaker (250% of FLA)", "10A breaker"],
        correct: 1,
        explanation: "NEC 430.52: Motor branch breaker can be up to 250% of FLA for standard inverse-time breaker. 10A × 2.5 = 25A, next standard size = 30A.",
        visual: { type: "main", voltage: "208-3ph", bonding: "bonded", feeders: "complete" }
      },
      {
        id: "inspection",
        instruction: "Commercial panel final check: Which is correct for a 208V wye main panel?",
        options: [
          "BRB phases, white neutral, bonded at main, directory filled, working space 36\" deep",
          "BOY phases, gray neutral, floating neutral, no directory",
          "Black/Red phases only, green neutral, bonded"
        ],
        correct: 0,
        explanation: "Commercial main panel: BRB phases, white neutral, bonded at main, directory filled, 110.26 working space (36\" deep for under 150V).",
        visual: { type: "main", voltage: "208-3ph", bonding: "bonded", colors: "BRB", done: true }
      }
    ]
  }
];

export { panelScenarios };
