const sportsScenarios = [
  {
    id: "pole-build",
    title: "Pole Assembly",
    description: "Step-by-step assembly of a Musco sports lighting pole system",
    mode: "build",
    steps: [
      {
        id: "foundation",
        instruction: "What is the first step before setting the pole?",
        info: "The pole needs a proper foundation before any above-ground work begins.",
        options: [
          "Pour concrete foundation and allow proper curing",
          "Set the pole in the ground and pour concrete around it",
          "Mount the ECE on the pole first"
        ],
        correct: 0,
        explanation: "The concrete foundation must be poured and cured first. This provides a stable base for the pole system and must meet manufacturer specs for depth and diameter.",
        visual: {}
      },
      {
        id: "base-mount",
        instruction: "After the foundation is ready, what goes on first?",
        info: "The lowest section of the pole assembly.",
        options: [
          "The base plate and lower pole section",
          "The ECE enclosure",
          "The contactor cabinet"
        ],
        correct: 0,
        explanation: "The base plate and lower pole section mount directly to the anchor bolts in the foundation. Level and plumb before tightening.",
        visual: {}
      },
      {
        id: "base-cover",
        instruction: "Once the lower pole section is secure, what cosmetic cover installs around the base?",
        info: "This covers the anchor bolts and gives a finished look.",
        options: [
          "Base cover (pole base trim)",
          "Contactor cabinet",
          "Luminaire crossarm"
        ],
        correct: 0,
        explanation: "The base cover hides the anchor bolts and provides a clean finished appearance at the base of the pole.",
        visual: {}
      },
      {
        id: "upper-pole",
        instruction: "With the lower section secure, what comes next?",
        info: "The pole is typically two sections joined together.",
        options: [
          "Install upper pole section and torque the joint bolts",
          "Install all fixtures first",
          "Run the wire harness"
        ],
        correct: 0,
        explanation: "The upper pole section mounts on top of the lower section. The joint must be properly aligned and all bolts torqued to manufacturer spec.",
        visual: {}
      },
      {
        id: "ece-mount",
        instruction: "With the pole fully assembled, where does the ECE enclosure mount?",
        info: "The ECE controls power distribution to the luminaires.",
        options: [
          "On the pole at the designated mounting height",
          "Inside the contactor cabinet",
          "At the top of the pole near the fixtures"
        ],
        correct: 0,
        explanation: "The ECE mounts on the pole at the height specified by the manufacturer. It houses the fuses, drivers, and disconnect switch.",
        visual: { highlight: "ece" }
      },
      {
        id: "contactor-cabinet",
        instruction: "Where does the contactor cabinet install?",
        info: "The contactor cabinet provides switching control for the lighting system.",
        options: [
          "At the base of the pole, connected to the ECE via conduit",
          "Inside the ECE enclosure",
          "At the top of the pole with the fixtures"
        ],
        correct: 0,
        explanation: "The contactor cabinet mounts at the base of the pole near grade. It contains the main contactor, control transformer, and terminal blocks.",
        visual: { highlight: "contactor" }
      },
      {
        id: "harness",
        instruction: "How is the wire harness routed between the ECE and the luminaires?",
        info: "The harness connects the ECE output to the fixtures at the top.",
        options: [
          "Inside conduit from the ECE up the pole to the crossarm",
          "Exposed and strapped to the outside of the pole",
          "Buried underground from the ECE to the fixtures"
        ],
        correct: 0,
        explanation: "The wire harness runs inside conduit from the ECE up the pole to the crossarm. This protects the conductors from weather and UV damage.",
        visual: { highlight: "harness" }
      },
      {
        id: "fixtures",
        instruction: "With the harness in place, what is installed at the crossarm?",
        info: "The light-producing components mount on the crossarm assembly.",
        options: [
          "Mount and wire the luminaire fixtures on the crossarm",
          "Install the photo cells only",
          "Mount the ECE on the crossarm"
        ],
        correct: 0,
        explanation: "The luminaire fixtures mount on the crossarm brackets and are wired to the harness. Each fixture connects to the driver output in the ECE.",
        visual: { highlight: "harness" }
      },
      {
        id: "power-feed",
        instruction: "The contactor cabinet needs power. Where does the feed come from?",
        info: "The system needs a power source for the contactor and control transformer.",
        options: [
          "From a dedicated breaker in the main distribution panel",
          "From the ECE output directly",
          "From the luminaire wiring"
        ],
        correct: 0,
        explanation: "The contactor cabinet is fed from a dedicated breaker in the main distribution panel. The feed connects to the main lugs in the contactor cabinet.",
        visual: { highlight: "contactor" }
      },
      {
        id: "testing",
        instruction: "Before calling the system complete, what test should be performed?",
        info: "Verify everything works before closing up enclosures.",
        options: [
          "Verify voltage at the contactor, test ECE output, check all fixture connections, and cycle the system",
          "Just turn on the breaker and see if lights come on",
          "Megger test only"
        ],
        correct: 0,
        explanation: "Full system test: verify incoming voltage at the contactor, check ECE output voltages, confirm all fixture connections are secure, cycle the contactor, and verify proper operation.",
        visual: { lit: true, done: true }
      }
    ]
  },
  {
    id: "repair-no-lights",
    title: "Repair — No Lights on Field",
    description: "Diagnose and repair a sports lighting system with no lights",
    mode: "repair",
    steps: [
      {
        id: "initial-check",
        instruction: "You arrive on site — the entire field has no lights. What's the first check?",
        info: "Start with the simplest possible causes first.",
        options: [
          "Verify the main breaker feeding the contactor cabinet is ON",
          "Start pulling fuses in the ECE",
          "Check voltage at the luminaire"
        ],
        correct: 0,
        explanation: "Always start at the source. Check the main breaker feeding the lighting system. If the breaker is tripped or off, nothing downstream will work.",
        visual: { highlight: "contactor", faultLabel: "NO LIGHTS" }
      },
      {
        id: "contactor-check",
        instruction: "The main breaker is ON. What's the next check?",
        info: "The contactor controls power flow to the ECE.",
        options: [
          "Check if the contactor is pulled in (engaged)",
          "Go straight to the ECE and check fuses",
          "Test the luminaire drivers"
        ],
        correct: 0,
        explanation: "Check if the contactor is engaged. If the contactor is not pulled in, power cannot reach the ECE. Listen for a hum or use a voltage tester on the load side.",
        visual: { highlight: "contactor", faultLabel: "CHECK CONTACTOR" }
      },
      {
        id: "contactor-voltage",
        instruction: "The contactor is NOT pulled in. What voltage should you check?",
        info: "The contactor coil needs proper voltage to engage.",
        options: [
          "Check coil voltage at the contactor (typically 120V or 208-277V)",
          "Check voltage at the luminaires",
          "Check voltage at the ECE disconnect"
        ],
        correct: 0,
        explanation: "Measure the voltage across the contactor coil terminals. If coil voltage is missing, check the control transformer and control wiring. Typical coil voltages: 120V or 208-277V depending on the system.",
        visual: { highlight: "contactor", faultLabel: "CHECK COIL VOLTAGE" }
      },
      {
        id: "ece-disconnect",
        instruction: "The contactor is pulled in and sending power. Next check?",
        info: "The ECE has a disconnect switch that must be in the ON position.",
        options: [
          "Verify the ECE disconnect switch is ON",
          "Replace both drivers in the ECE",
          "Check the luminaire photocells"
        ],
        correct: 0,
        explanation: "The ECE has a built-in disconnect switch. If it's OFF or in the middle position, power won't reach the fuses and drivers. Flip it ON and retest.",
        visual: { highlight: "ece", faultLabel: "CHECK ECE DISCONNECT" }
      },
      {
        id: "fuses",
        instruction: "The disconnect is ON but lights still won't come on. What's the likely cause?",
        info: "The ECE has multiple fuses protecting the driver circuits.",
        options: [
          "A blown fuse protecting one or more driver circuits",
          "The pole is not grounded properly",
          "The crossarm is loose"
        ],
        correct: 0,
        explanation: "Blown fuses are a common cause. Open the ECE and inspect each fuse with a meter or visual check. Replace any blown fuses with the correct rating.",
        visual: { highlight: "ece", fault: "fuse", faultLabel: "CHECK FUSES" }
      },
      {
        id: "driver-check",
        instruction: "Fuses are good but the lights still won't light. What's next?",
        info: "The LED drivers convert power for the luminaire.",
        options: [
          "Check the LED drivers for proper output voltage",
          "Replace the entire crossarm assembly",
          "Re-run the wire harness"
        ],
        correct: 0,
        explanation: "Test the LED driver output voltage. If the driver has input voltage but no output, the driver is faulty and needs replacement. Drivers can fail open or short.",
        visual: { highlight: "ece", fault: "driver", faultLabel: "CHECK DRIVERS" }
      },
      {
        id: "driver-fault-confirm",
        instruction: "You find Driver 1 has 277V input but 0V output. What's the fix?",
        info: "The driver is receiving power internally but not producing output.",
        options: [
          "Replace the faulty LED driver with the same model",
          "Replace the fuse with a larger rating",
          "Bypass the driver and wire directly"
        ],
        correct: 0,
        explanation: "Replace the faulty driver with an identical replacement. Always replace with the same model and rating. Never bypass the driver — LEDs require regulated current.",
        visual: { highlight: "ece", faultLabel: "REPLACE DRIVER" }
      },
      {
        id: "final-test",
        instruction: "The driver is replaced. What's the final step?",
        info: "Verify the repair was successful and the system is safe.",
        options: [
          "Cycle power, test all fixtures, verify proper voltage readings, and close all enclosures",
          "Just turn it on and leave",
          "Only test the repaired fixture"
        ],
        correct: 0,
        explanation: "Cycle the system on and off, verify all fixtures are working at full brightness, check voltage readings at key points, and properly close and secure all enclosures.",
        visual: { lit: true, done: true }
      }
    ]
  },
  {
    id: "repair-fuse-open",
    title: "Repair — Single Fixture Out",
    description: "Diagnose a single fixture that stopped working on a multi-fixture pole",
    mode: "repair",
    steps: [
      {
        id: "identify",
        instruction: "One fixture on a pole is out but others work. What does this tell you?",
        info: "Isolate the problem based on which fixtures are affected.",
        options: [
          "The problem is downstream of the ECE, likely a single fuse or that fixture's driver",
          "The main breaker is going bad",
          "The contactor is failing"
        ],
        correct: 0,
        explanation: "If only one fixture is out, the problem is specific to that circuit. Power is reaching the ECE (other fixtures work). Check the fuse for that fixture's circuit and the driver.",
        visual: { faultLabel: "1 FIXTURE OUT" }
      },
      {
        id: "fuse-test",
        instruction: "Open the ECE. How do you test the fuse for the dead fixture?",
        info: "A visual check isn't always reliable.",
        options: [
          "Test for voltage on both sides of the fuse with the system ON",
          "Pull the fuse and look at it",
          "Replace all fuses"
        ],
        correct: 0,
        explanation: "With power ON, test voltage from each fuse terminal to ground. If you have voltage on one side but not the other, the fuse is open/blown. Always verify with a meter.",
        visual: { highlight: "ece", fault: "fuse", faultLabel: "TEST FUSE" }
      },
      {
        id: "fuse-replace",
        instruction: "You confirm the fuse is open. What's the correct replacement?",
        info: "Fuses have specific ratings for a reason.",
        options: [
          "Replace with the same type and amp rating",
          "Use a higher amp fuse to prevent future blows",
          "Jump the fuse terminals with wire"
        ],
        correct: 0,
        explanation: "Always replace with the exact same type and amp rating. Never oversize a fuse — it's there to protect the driver and fixture. Oversizing can cause equipment damage or fire.",
        visual: { highlight: "ece", faultLabel: "REPLACE FUSE" }
      },
      {
        id: "verify",
        instruction: "Fuse replaced. How do you confirm the fix?",
        info: "A quick verification saves a return trip.",
        options: [
          "Power on and verify the fixture lights up, check for normal operation",
          "Close everything up and leave",
          "Replace all other fuses too"
        ],
        correct: 0,
        explanation: "Power the system on and verify the repaired fixture lights up and matches the others in brightness. Check for any unusual sounds or signs of arcing before closing up.",
        visual: { lit: true, done: true }
      }
    ]
  },
  {
    id: "repair-contactor",
    title: "Repair — Contactor Not Pulling In",
    description: "Diagnose why the contactor won't engage on a sports lighting system",
    mode: "repair",
    steps: [
      {
        id: "check-power",
        instruction: "The contactor isn't pulling in. What's the first voltage check?",
        info: "The contactor needs both line voltage and control voltage.",
        options: [
          "Check for line voltage at the contactor line terminals",
          "Check voltage at the ECE output",
          "Check voltage at the luminaire"
        ],
        correct: 0,
        explanation: "First verify that line voltage is reaching the contactor. Check L1, L2 on the line side of the contactor. If no voltage, the problem is upstream (breaker or feeder).",
        visual: { highlight: "contactor", faultLabel: "NO CONTACTOR ENGAGE" }
      },
      {
        id: "coil-voltage",
        instruction: "Line voltage is present but the contactor won't pull in. What do you check next?",
        info: "The contactor coil must receive control voltage to engage.",
        options: [
          "Measure voltage across the contactor coil terminals (A1-A2)",
          "Replace the contactor immediately",
          "Check the fuses in the ECE"
        ],
        correct: 0,
        explanation: "Measure the coil voltage. If the coil is rated for 120V and you measure 0V, check the control transformer and the control circuit (photo cell, timer, or manual switch).",
        visual: { highlight: "contactor", faultLabel: "CHECK COIL VOLTAGE" }
      },
      {
        id: "coil-resistance",
        instruction: "You have proper voltage at the coil but it still won't pull in. What next?",
        info: "The coil itself can fail open.",
        options: [
          "Check coil resistance with an ohmmeter (should show continuity)",
          "Hit the contactor with a hammer",
          "Replace the control transformer"
        ],
        correct: 0,
        explanation: "Test the coil resistance. An open coil (infinite resistance) means the contactor is faulty and needs replacement. A shorted coil (very low resistance) will also fail to engage properly.",
        visual: { highlight: "contactor", faultLabel: "TEST COIL RESISTANCE" }
      },
      {
        id: "replace",
        instruction: "The coil tests open. What's the correct action?",
        info: "Failed coils must be replaced — they cannot be repaired.",
        options: [
          "Replace the contactor with the same model and rating",
          "Splice the coil wires together",
          "Replace only the coil if it's a replaceable type"
        ],
        correct: 0,
        explanation: "Replace the contactor with the same model and coil voltage rating. If the contactor has a replaceable coil, that's an option, but most field repairs use a complete contactor replacement.",
        visual: { highlight: "contactor", faultLabel: "REPLACE CONTACTOR" }
      },
      {
        id: "test",
        instruction: "New contactor installed. Final verification?",
        info: "Make sure everything works before leaving.",
        options: [
          "Cycle the system, verify contactor pulls in and holds, check all fixtures",
          "Turn on the breaker and leave",
          "Only test the contactor manually"
        ],
        correct: 0,
        explanation: "Cycle power, verify the contactor pulls in cleanly and holds, check all fixtures operate normally. Listen for chattering or buzzing which indicates control voltage issues.",
        visual: { lit: true, done: true }
      }
    ]
  }
];

export { sportsScenarios };
