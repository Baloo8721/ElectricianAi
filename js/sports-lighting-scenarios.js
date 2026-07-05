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
        info: "The coil itself can fail shorted or open. A shorted coil trips the control circuit breaker.",
        options: [
          "Check coil resistance with an ohmmeter — good coil ~32.8\u2126, shorted coil ~0.4\u2126",
          "Hit the contactor with a hammer",
          "Replace the control transformer"
        ],
        correct: 0,
        explanation: "Test coil resistance across the coil terminals. A known-good contactor reads ~32.8 ohms. A shorted coil reads ~0.4 ohms and will trip the control circuit when the switch is activated. An open coil reads infinite resistance. Any of these faults require contactor replacement.",
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
  },
  {
    id: "repair-hid-lamp",
    title: "Repair — HID Lamp Replacement",
    description: "Replace a failed 1500W metal halide lamp following safety procedures and manufacturer specs",
    mode: "repair",
    steps: [
      {
        id: "safety-first",
        instruction: "You need to replace a failed 1500W MH lamp on a Musco HID system. What's the FIRST thing you do?",
        info: "MH lamps operate at high pressure and temperature.",
        options: [
          "Shut power off and allow lamp and fixture to cool completely",
          "Remove the lamp immediately to inspect it",
          "Check voltage at the lamp socket"
        ],
        correct: 0,
        explanation: "Always shut power off and allow the lamp and fixture to cool before handling. The arc tube operates at up to 1000\u00b0C and the bulb at 400\u00b0C. Severe burns can result from touching a hot lamp.",
        visual: { highlight: "ece", faultLabel: "BURNS HAZARD 400\u00b0C" }
      },
      {
        id: "lamp-specs",
        instruction: "You're replacing a failed 1500W metal halide lamp. Which lamp specifications must match?",
        info: "The lamp must match the system design exactly.",
        options: [
          "ANSI code M48, 1500W MH, Mogul Screw Position Oriented base, BT-56 bulb, clear finish",
          "Any 1500W lamp with a mogul base",
          "A pulse-start metal halide lamp that's close in wattage"
        ],
        correct: 0,
        explanation: "The lamp must match exactly: ANSI M48, 1500W MH clear, BT-56 bulb, Mogul Screw Position Oriented base. Never substitute with pulse-start lamps or different ANSI codes. Using the wrong lamp can cause arc tube rupture or ballast damage.",
        visual: { faultLabel: "M48 1500W MH ONLY" }
      },
      {
        id: "uv-warning",
        instruction: "Before reinstalling the fixture lens, you notice the outer bulb has a small scratch. What should you do?",
        info: "The outer envelope of the MH lamp protects from UV radiation.",
        options: [
          "Replace the lamp — any scratch or crack in the outer bulb requires immediate replacement",
          "It's fine, install as-is",
          "Cover the scratch with electrical tape"
        ],
        correct: 0,
        explanation: "Periodically inspect the outer envelope and replace any lamps that show scratches, cracks, or damage. If the outer bulb is broken or punctured, hazardous short-wave UV radiation can escape, causing serious skin burn and eye inflammation. The lamp must be used only in an enclosed fixture rated for 1000\u00b0C glass fragments.",
        visual: { highlight: "ece", faultLabel: "UV HAZARD" }
      },
      {
        id: "socket-check",
        instruction: "You're installing the new lamp. What type of socket is used for this lamp?",
        info: "The lamp base type is specified in the technical data.",
        options: [
          "Mogul Screw Position Oriented base with Teflon centering ring",
          "Standard medium screw base",
          "Pin base with twist-lock"
        ],
        correct: 0,
        explanation: "The 1500W MH lamp uses a Mogul Screw Position Oriented base. The die-cast aluminum lamp cone holds the socket in position with a Teflon centering/sealing ring. The arc tube must be horizontal for proper operation and rated life.",
        visual: { highlight: "harness", faultLabel: "MOGUL SCREW BASE" }
      },
      {
        id: "ballast-check",
        instruction: "The new lamp fires but is very dim. You check the ballast label and see it's ANSI M48 CWA. What should you check next?",
        info: "The ballast and lamp must be a matched system.",
        options: [
          "Verify supply voltage to the ballast and check the capacitor condition",
          "Replace the ballast immediately",
          "The lamp is old stock, try another new lamp"
        ],
        correct: 0,
        explanation: "First verify proper voltage is reaching the ballast. A failed capacitor is a common cause of dim lamps on HID systems. Look for brown residue or burnt smell from the capacitor. Test the capacitor with a multimeter. The CWA ballast requires a good capacitor for proper lamp regulation.",
        visual: { highlight: "ece", fault: "fuse", faultLabel: "CHECK CAPACITOR" }
      },
      {
        id: "capacitor-test",
        instruction: "You find the capacitor has brown residue at the base and the lamp is slow to start. What does this indicate?",
        info: "Capacitor failure has specific visual and performance symptoms.",
        options: [
          "Failed capacitor — replace with same rating, min 525V withstand voltage",
          "The capacitor just needs cleaning",
          "The capacitor is fine, the ballast is the problem"
        ],
        correct: 0,
        explanation: "Brown residue at the capacitor base indicates the capacitor has failed (electrolyte leakage). Replace with the same rating. The capacitor must have a minimum withstand voltage of 525V. A failed capacitor causes slow starting, dim output, and can damage the ballast over time.",
        visual: { highlight: "ece", faultLabel: "REPLACE CAPACITOR" }
      },
      {
        id: "warmup-check",
        instruction: "The new lamp is installed and powered on. How long should it take to reach 80% output?",
        info: "HID lamps have a warmup period.",
        options: [
          "3-5 minutes — normal warmup to 80% output",
          "30 seconds — it should be instant",
          "The lamp should start at full brightness"
        ],
        correct: 0,
        explanation: "The 1500W MH lamp requires 3-5 minutes warmup time to reach 80% output. Full stabilization may take longer. If a power interruption occurs, the lamp requires 10-15 minutes restrike time (hot restart) before it will re-light.",
        visual: { highlight: "harness", faultLabel: "WARMUP 3-5 MIN" }
      },
      {
        id: "relamp-interval",
        instruction: "You're scheduled to relamp a bank of poles. At what interval should MH lamps be replaced?",
        info: "Lamps should be replaced before they fail.",
        options: [
          "Every 5,000 hours — at or before rated life, do not run until failure",
          "Only when they burn out",
          "Every 10,000 hours"
        ],
        correct: 0,
        explanation: "Relamp fixtures at or before the end of rated life (5,000 hours). Allowing lamps to operate until they fail is not advised and may increase the possibility of inner arc tube rupture. The Smart Lamp system maintains constant lumens over life but the replacement interval is still 5,000 hours.",
        visual: { lit: true, done: true, faultLabel: "RELAMP @ 5,000 HRS" }
      },
      {
        id: "mercury-disposal",
        instruction: "You remove the old failed MH lamp. How should it be disposed of?",
        info: "MH lamps contain hazardous materials.",
        options: [
          "Recycle per lamp disposal laws — contains mercury (Hg). Use www.lamprecycle.org or call 1-800-825-6020",
          "Throw it in the regular trash",
          "Break it and put pieces in the trash"
        ],
        correct: 0,
        explanation: "HID lamps contain mercury (Hg). They must be managed in accordance with disposal laws. Use www.lamprecycle.org or call 1-800-825-6020 for recycling options. If an arc tube breaks, avoid skin contact with any contents or fragments.",
        visual: { lit: true, done: true, faultLabel: "RECYCLE — Hg" }
      },
      {
        id: "final-test",
        instruction: "System is back together. What should you verify before leaving?",
        info: "Complete system verification after lamp replacement.",
        options: [
          "Cycle power, verify lamp reaches full brightness, check for unusual sounds/arcing, confirm all enclosure covers are secure",
          "Just turn it on and leave",
          "Only verify the replaced fixture works"
        ],
        correct: 0,
        explanation: "Cycle the system, verify the lamp reaches full brightness and stabilizes. Listen for buzzing from the ballast, check for arcing at connections. Confirm the lens gasket is seated and all latches are secure. The system should be turned off at least once a week for 15 min in continuous operation to reduce arc tube rupture risk.",
        visual: { lit: true, done: true }
      }
    ]
  },
  {
    id: "repair-megger-test",
    title: "Repair — Megger Harness Test",
    description: "Test harness circuits with a 1000V megger to find insulation faults before replacing parts",
    mode: "repair",
    steps: [
      {
        id: "prep",
        instruction: "You suspect a harness fault. What's the first step before any megger testing?",
        info: "Megger testing requires preparation and a baseline.",
        options: [
          "Call Musco Control-Link (877-347-3319) and establish a baseline on a known-good driver",
          "Connect the megger directly to the suspect fixture and test immediately",
          "Remove all fuses from the ECE first"
        ],
        correct: 0,
        explanation: "Always call Musco tech support first and establish a baseline reading on a known-good driver. This gives you a reference for what good readings look like on your specific meter.",
        visual: { highlight: "ece", faultLabel: "MEGGER TEST" }
      },
      {
        id: "baseline",
        instruction: "For the baseline test, how do you set up the megger?",
        info: "The megger uses insulation test mode at a specific voltage.",
        options: [
          "Set megger to insulation test at 1000V DC, red-to-red, black-to-black, hold 45 seconds",
          "Set megger to continuity test at low voltage",
          "Set megger to 600V AC and test phase-to-phase"
        ],
        correct: 0,
        explanation: "Set the megger to insulation test mode at 1000V DC. Connect red probe to red wire, black to black wire. Press and hold the test button for 45 seconds while recording both resistance and voltage readings.",
        visual: { highlight: "ece", faultLabel: "SET BASELINE" }
      },
      {
        id: "outage-test",
        instruction: "Baseline is set. How do you test the suspected faulty fixture circuit?",
        info: "Testing the outage circuit requires both normal and reversed polarity checks.",
        options: [
          "Test red-to-red and black-to-black (normal polarity), then reverse: red-to-black and black-to-red",
          "Test only red-to-red, black-to-black",
          "Test each wire to ground only"
        ],
        correct: 0,
        explanation: "First test normal polarity (red-to-red, black-to-black) — a good fixture will glow. Then reverse the leads (red-to-black, black-to-red) — a good fixture should NOT glow. If it glows on reverse, the polarity is reversed.",
        visual: { highlight: "ece", fault: "fuse", faultLabel: "TEST FIXTURE" }
      },
      {
        id: "insulation-test",
        instruction: "The fixture passes polarity. The next test is insulation leakage to ground. Where do you place the black probe?",
        info: "Testing for insulation breakdown to ground is essential.",
        options: [
          "Black probe on the grounding lug in the bottom of the ECE enclosure",
          "Black probe on the pole itself",
          "Black probe on the concrete base"
        ],
        correct: 0,
        explanation: "Move the black probe to the grounding lug in the bottom compartment of the ECE. Test the red wire to ground, then the black wire to ground. Each test for 45 seconds. Readings should be 100 M\u03A9 (megaohms) or higher.",
        visual: { highlight: "ece", faultLabel: "TEST INSULATION" }
      },
      {
        id: "interpret",
        instruction: "You get a reading of 45 M\u03A9 on the red wire to ground. What does this indicate?",
        info: "The threshold for acceptable insulation resistance is specific.",
        options: [
          "Below 100 M\u03A9 — indicates an insulation issue with the fixture circuit",
          "Normal — anything above 10 M\u03A9 is acceptable",
          "The megger is faulty"
        ],
        correct: 0,
        explanation: "Readings below 100 M\u03A9 indicate an insulation issue with the fixture circuit. The harness or fixture has degraded insulation that could cause intermittent faults or failure. The Musco technical specialist will advise on next steps.",
        visual: { highlight: "ece", fault: "driver", faultLabel: "INSULATION FAIL" }
      },
      {
        id: "finalize",
        instruction: "All tests are documented. What's the final step?",
        info: "Proper documentation is critical for the technician.",
        options: [
          "Document all readings for the Musco technician — resistance and voltage for each test",
          "Replace the harness immediately based on your readings",
          "Close everything up and move to the next pole"
        ],
        correct: 0,
        explanation: "Document every reading (resistance and voltage) for each test — baseline, normal polarity, reversed polarity, red-to-ground, and black-to-ground. The Musco technician needs these to determine the correct repair path.",
        visual: { lit: true, done: true }
      }
    ]
  }
];

export { sportsScenarios };
