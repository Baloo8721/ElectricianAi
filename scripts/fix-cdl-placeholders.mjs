// Fixes placeholder/corrupted answers in content/cdl-modules.json using source materials.
// Usage: node scripts/fix-cdl-placeholders.mjs
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dstPath = join(root, "content", "cdl-modules.json");

const modules = JSON.parse(readFileSync(dstPath, "utf8"));

// Each fix: {match: (q) => boolean, q?: newQuestion, options: [...], correct: index, explain: string}
// We match by module + question prefix to be robust against truncation.
const FIXES = [];

function fix(modFilter, qPrefix, opts, correct, explain, newQ) {
  FIXES.push({ modFilter, qPrefix, opts, correct, explain, newQ });
}

// ---------------- Section 1 fixes ----------------
fix("sec1", "The minimum tire tread depth for front tires is", [
  "4/32 inch",
  "2/32 inch",
  "1/32 inch",
  "1/2 inch"
], 0, "The minimum tread depth on front (steering axle) tires is 4/32 inch. All other tires require at least 2/32 inch.");

fix("sec1", "Total stopping distance is a combination of", [
  "Perception distance + reaction distance + braking distance",
  "Braking distance + stopping distance",
  "Reaction distance + viewing distance + braking distance",
  "Reaction distance + braking distance"
], 0, "Total stopping distance = perception distance (seeing the hazard) + reaction distance (deciding and moving your foot) + braking distance (actual stopping once brakes apply).");

fix("sec1", "If brakes get wet, it can cause them to", [
  "Apply unevenly, work weakly, or grab",
  "Fall off the vehicle",
  "Rust immediately",
  "All of the above"
], 0, "Wet brakes can apply unevenly, work weakly, or grab. They will not fall off the vehicle or rust immediately.");

fix("sec1", "What factors determine your selection of a starting gear?", [
  "Flatness or grade of the road, load, and valve",
  "Flatness or grade of the road, load, and engine",
  "Weight of the vehicle, tire type, and speed",
  "Weather, cargo, and gear ratio only"
], 1, "Choose a starting gear based on the flatness or grade of the road, your load, and whether the road is slippery. Lower gears are needed on hills, with heavy loads, or on slippery surfaces.");

fix("sec1", "Why should you be in the proper gear before starting down a hill?", [
  "You will not be able to shift into a lower gear once you are going down the hill",
  "Because the clutch is designed for level ground",
  "There is no need to do this",
  "To prevent the engine from overheating"
], 0, "You must downshift before starting down a hill. Once speed builds up you will not be able to shift into a lower gear, and you may lose all engine braking effect.");

fix("sec1", "What type of vehicles can get stuck on a railroad crossing?", [
  "Low-slung units such as lowboys, car carriers, moving vans, and possum-belly livestock trailers",
  "Only long tractor-trailers with tandem axles",
  "Any vehicle with air brakes",
  "Only double and triple trailer combinations"
], 0, "Low-slung units (lowboy, car carrier, moving van, possum-belly livestock trailer) and single-axle tractors with long trailers can hang up on raised railroad crossings.");

fix("sec1", "Describe the proper braking technique when stopping with air brakes.", [
  "Use the same braking technique you always have; only fully apply the brakes in an emergency stop if you have working ABS on all axles",
  "Always push the brake pedal all the way to the floor on every stop",
  "Pump the brake pedal rapidly on every stop",
  "Never use the service brakes, only engine braking"
], 0, "With air brakes, control the pressure so the vehicle stops smoothly. In an emergency with working ABS on all axles, you can fully apply the brakes.");

fix("sec1", "How long does it take for a typical tractor-trailer to clear a double track?", [
  "More than 15 seconds",
  "14 seconds",
  "10 seconds",
  "More than 30 seconds"
], 0, "It takes a typical tractor-trailer at least 14 seconds to clear a single track and more than 15 seconds to clear a double track.Railroad crossings should be approached with the expectation that a train is coming.");

fix("sec1", "What are some advantages of going right off the road rather than trying to stop in a hurry?", [
  "You avoid a head-on collision, gain an escape route, and no one is likely to be driving on the shoulder",
  "You can stop faster on the shoulder",
  "There are no advantages",
  "It lets other drivers pass you more easily"
], 0, "Going right avoids forcing anyone into oncoming traffic and a possible head-on collision. Most shoulders are strong enough to support a large vehicle and offer an escape route.");

fix("sec1", "What are the slack adjusters?", [
  "Part of your air brake system used to adjust the brakes to ensure they are safe",
  "Devices that hold the trailer to the tractor",
  "Springs that release the parking brake",
  "Valves that control the air supply"
], 0, "Slack adjusters are an important part of the air brake system that allow you to adjust the brakes. On drum brakes they sit between the push rod and S-cam; on disc brakes between the power screw and push rod.");

fix("sec1", "How can you check slack adjusters?", [
  "Pull hard on each slack adjuster you can reach while wearing gloves; they should not have more than about one inch of 'give'",
  "Accelerate, then brake hard",
  "Press the brake pedal and listen for noises",
  "All of the above"
], 0, "Use gloves and pull hard on each reachable slack adjuster. If there is an inch or more of 'give', the brakes should be adjusted.");

fix("sec1", "How can you test the low pressure warning signal?", [
  "Shut the engine off, turn the key back on, and step on and off the brake pedal to reduce air pressure; the warning signal must come on before pressure drops below 55 psi",
  "Brake hard at highway speed",
  "Drain all the air from the tanks",
  "Listen for air leaking around the wheels"
], 0, "With the engine off and key on, pump the brake pedal to lower air pressure. The low air pressure warning light/buzzer must activate before the pressure drops below 55 psi in either system.");

fix("sec1", "How can you check that the spring brakes come on automatically?", [
  "Keep stepping on and off the brake pedal to lower air pressure until the parking brake valve pops out on both tractor-trailer and single vehicles",
  "Only check them at the shop",
  "Pull the trailer hand valve",
  "Push the brake pedal all the way to the floor"
], 0, "Continue the same method used to test the low air pressure warning, stepping on and off the brake pedal, until pressure drops low enough that the spring brakes automatically deploy and the parking brake valve pops out.");

fix("sec1", "What are the maximum leakage rates?", [
  "Single vehicle: 3 psi in 1 minute; combination vehicle: 4 psi in 1 minute; air-over-hydraulic and any trailer: 2 psi in 1 minute",
  "Single vehicle: 10 psi; combination: 15 psi",
  "No more than 1 psi in 5 minutes",
  "25 psi in 1 minute"
], 0, "Maximum air leakage rates: 3 psi in one minute for single vehicles, 4 psi in one minute for combination vehicles, and 2 psi in one minute for air-over-hydraulic brakes and trailers.");

fix("sec1", "Define the danger zone. How far does the", [
  "The danger zone is the area around the bus where students are in the most danger; it extends 10 feet from the front, sides, and rear of the bus",
  "The danger zone is 5 feet from the bus",
  "The danger zone is 100 feet from the bus",
  "The danger zone only covers the driver's side"
], 0, "The danger zone is the area around the bus where students are most at risk, extending about 10 feet from the front, sides, and rear of the bus. Students should stay well away from these areas.");

fix("sec1", "Having two axles and a gross vehicle weight", [
  "What qualifies a vehicle for the International Registration Plan? A Qualified Vehicle has two axles and a gross vehicle weight over 26,000 pounds, or three or more axles regardless of weight",
  "What qualifies a vehicle for a Class B CDL",
  "What qualifies a vehicle for an endorsement",
  "What qualifies a vehicle as a recreational vehicle"
], 0, "For IRP purposes, a Qualified Vehicle is any power unit used in two or more member jurisdictions with two axles and a gross weight over 26,000 pounds, or three or more axles regardless of weight, or a combination over 26,000 pounds.");

fix("sec1", "What factors determine your selection of a", [
  "Total weight of the vehicle and cargo, length and steepness of the grade, road conditions, and weather",
  "Only the posted speed limit",
  "Only the type of cargo",
  "The number of axles"
], 0, "When going down a long, steep downgrade, your safe speed depends on the total weight of the vehicle and cargo, the length and steepness of the grade, road conditions, and weather.");

fix("sec1", "Which shut-off valves should be open and", [
  "All shut-off valves should be open except those at the rear of the last trailer, which should be closed",
  "All shut-off valves should be closed",
  "Only the valves at the rear of the first trailer",
  "The valves at the front should be closed"
], 0, "All shut-off valves should be in the open position except the ones at the back of the last trailer, which should be closed.");

fix("sec1", "Is used in combination, when the weight of", [
  "What qualifies a vehicle for IFTA registration? A Qualified Motor Vehicle is used in combination when the weight of such combination exceeds 26,000 pounds",
  "What qualifies a vehicle for Class C",
  "What qualifies a vehicle for an exemption",
  "What qualifies a vehicle for the P endorsement"
], 0, "For IFTA, a Qualified Motor Vehicle has two axles and a gross weight exceeding 26,000 pounds, or is used in combination when the weight of the combination exceeds 26,000 pounds. Recreational vehicles are excluded.");

fix("sec1", "Should a tank vehicle take curves, on", [
  "No, tank vehicles should slow down before curves, on ramps, and off ramps to keep from rolling over",
  "Yes, at the posted speed limit",
  "Only if empty",
  "Only on dry roads"
], 0, "Tank vehicles should slow down before curves, on ramps, and off ramps. A safe speed for other vehicles may be too fast for a tanker because the liquid moves and raises the center of gravity.");

fix("sec1", "What are some advantages of going right", [
  "You avoid oncoming traffic and a possible head-on collision, and people are less likely to be driving on the shoulder",
  "There are none",
  "It is faster",
  "It lets you pass quicker"
], 0, "Moving right avoids forcing anyone into opposing traffic lanes and a possible head-on collision. No one is likely to be driving on the shoulder, making it a safer escape route.");

fix("sec1", "What should you be able to see if the", [
  "With flat mirrors you should see the side of the bus and the rear tires; convex mirrors give a wider view and show the danger zone; crossover mirrors show the front bumper area and the ground directly in front of the bus",
  "Nothing, mirrors are optional",
  "Only the sky",
  "Only the road behind"
], 0, "Flat mirrors should show the side of the bus and rear tires. Convex mirrors show a wider area including the danger zone. Crossover mirrors show the front bumper area and the ground in front of the bus.");

fix("sec1", "What is an \"escape ramp?\"", [
  "A ramp leading to a long bed of loose, soft material to slow a runaway vehicle, sometimes in combination with an upgrade",
  "Another term for an off ramp",
  "A ramp used to pass another vehicle",
  "None of the above"
], 0, "An escape ramp is a long bed of loose, soft material (like gravel) used to slow and stop a runaway vehicle, sometimes combined with an upgrade. Know their locations on your route.");

fix("sec1", "How can you test the low pressure warning", [
  "Shut the engine off, turn the key back on, and step on and off the brake pedal; the warning must come on before the pressure drops below 55 psi",
  "Pump the pedal while racing the engine",
  "There is no way to test it",
  "Drive slowly in low gear"
], 0, "With the engine off and key on, pump the brake pedal to reduce air pressure. The low air pressure warning must activate before pressure drops below 55 psi.");

fix("sec1", "How do you check to make sure trailer height", [
  "Make sure the trailer is low enough that the fifth wheel will engage the kingpin but high enough to clear the front of the trailer nose during coupling",
  "There is no need to check it",
  "Raise the trailer as high as it will go",
  "Lower it until it touches the ground"
], 0, "The trailer height must be set so the kingpin will engage the fifth wheel correctly: not so high it won't latch, and not so low the tractor strikes the trailer nose.");

fix("sec1", "If a tire blows out, you should put the brakes", [
  "Hold the steering wheel firmly and stay off the brake until the vehicle slows, then brake gently and pull off the road",
  "Put the brakes on hard to stop quickly",
  "Accelerate to keep control",
  "Let go of the steering wheel"
], 0, "On a tire blowout, hold the steering wheel firmly and stay off the brake until the vehicle slows down, then brake very gently and pull off the road.");

fix("sec1", "If you are away from your vehicle only a short", [
  "You must still apply the parking brake and, if needed, chock the wheels even for a short time",
  "You do not need to use the parking brake",
  "Only use the parking brake on hills",
  "Leave it in gear and walk away"
], 0, "Any time you leave your vehicle even briefly, apply the parking brake and chock the wheels if necessary. Never leave a vehicle unattended without the parking brakes set.");

fix("sec1", "What three things determine how much", [
  "The weight of the liquid, the amount of liquid you can load based on weight and expansion room, and the legal weight limits for the vehicle",
  "Only the tank size",
  "Only the driver's preference",
  "The color of the liquid"
], 0, "How much liquid you can load depends on the weight of the liquid, the amount you can legally carry based on the vehicle's weight limits, and the space needed for expansion (outage).");

fix("sec1", "What type of vehicles can get stuck on a", [
  "Low-slung units such as lowboys, car carriers, moving vans, and possum-belly livestock trailers",
  "Any school bus",
  "Only double trailers",
  "Only vehicles without air brakes"
], 0, "Low-slung units (lowboy, car carrier, moving van, possum-belly livestock trailer) and single-axle tractors with long trailers can hang up on raised railroad crossings.");

fix("sec1", "You are unloading students along your", [
  "Students should walk at least 10 feet (about 5 giant steps) in front of the bus, cross to the left, and wait for the driver's signal before crossing",
  "Students should cross immediately behind the bus",
  "Students should stay on the bus",
  "Students should run across the road"
], 0, "After exiting, students should go to a point at least 10 feet in front of the bus (out of the danger zone), cross to the left side, and wait for the driver's signal before crossing.");

fix("sec1", "Front wheel brakes are good under all", [
  "Only in dry conditions",
  "True",
  "False",
  "Only on empty vehicles"
], 0, "Front wheel brakes are not good under all conditions. On slippery surfaces locking the front wheels causes loss of steering control. This is why some vehicles route more braking to the rear.");

fix("sec1", "How can you check that the spring brakes come", [
  "Keep stepping on and off the brake pedal until the spring brakes deploy and the parking brake valve pops out",
  "Check them visually at the shop",
  "Pull the fifth wheel release",
  "Listen for a hiss"
], 0, "Continue the method used for the low air pressure warning: step on and off the brake pedal until pressure drops enough that the spring brakes automatically come on and the valve pops out.");

fix("sec1", "How long does it take for a typical tractor-trailer", [
  "More than 15 seconds to clear a double track and 14 seconds for a single track",
  "10 seconds",
  "5 seconds",
  "More than 30 seconds"
], 0, "It takes a typical tractor-trailer at least 14 seconds to clear a single track and more than 15 seconds to clear a double track.");

fix("sec1", "What do you check when making a visual", [
  "Check that the fifth wheel is fully engaged on the kingpin by looking into the back of the fifth wheel, and that the locking jaws are closed",
  "Check the tire pressure",
  "Check the engine oil",
  "Check the cab"
], 0, "When checking coupling visually, look into the back of the fifth wheel to confirm it is locked onto the kingpin and the locking jaws are closed.");

fix("sec1", "How do you know if your vehicle is", [
  "Vehicles have a yellow ABS malfunction lamp on the instrument panel; trailers have one on the left side near the front or rear corner",
  "You cannot tell",
  "Check the tires",
  "Check the fuel gauge"
], 0, "ABS-equipped trucks/buses have a yellow ABS malfunction lamp on the instrument panel. Trailers have a yellow lamp on the left side, on the front or rear corner. Dollies built after March 1, 1998 must have one on the left side.");

fix("sec1", "How should you brake when you drive a", [
  "Brake the same way you always have, using only the braking force necessary to stop safely and stay in control",
  "Push the brake pedal hard on every stop",
  "Never use the brakes",
  "Pump the brake pedal rapidly"
], 0, "With ABS, brake the same way you always have. Use only the braking force necessary, and in an emergency with working ABS on all axles you can fully apply the brakes.");

fix("sec1", "What position should students be in front of", [
  "At least 10 feet directly in front of the bus, out of the danger zone, so the driver can see them",
  "Right next to the bumper",
  "Behind the bus",
  "On the driver's blind side"
], 0, "Students should be at least 10 feet directly in front of the bus, out of the danger zone and in plain view of the driver, before they cross.");

fix("sec1", "Why should you pull a dolly out from under a", [
  "So you can reach the shut-off valves and avoid damaging the dolly or the trailer when you disconnect them",
  "To make the trailer lighter",
  "There is no reason",
  "To inspect the tires"
], 0, "You should pull the dolly out from under the trailer before disconnecting it from the trailer in front so you can reach and operate the shut-off valves and prevent damage during uncoupling.");

fix("sec1", "How do antilock brakes help you?", [
  "They keep your wheels from locking up and help you maintain control during hard braking so you can steer around obstacles",
  "They shorten your stopping distance",
  "They increase ultimate stopping power",
  "They let you drive faster"
], 0, "ABS prevents wheel lockup, helping you keep control and steer around obstacles during hard braking. ABS does not necessarily shorten stopping distance or increase stopping power.");

fix("sec1", "What should you check for when inspecting", [
  "Check the converter dolly for secure coupling, spring brakes, air lines, glad hands, safety chains, and the pintle hook for wear or damage",
  "Check the engine oil",
  "Check the fuel",
  "Check the cab"
], 0, "When inspecting a converter dolly, check the frame, drawbar, pintle hook, glad hands and air lines, safety chains, couplers, and tires for wear, damage, and secure mounting.");

fix("sec1", "What two reasons make special care", [
  "The high center of gravity of the liquid cargo and the surge/free surface effect that makes handling difficult",
  "The vehicle is harder to steer at low speed",
  "The brakes are weaker",
  "The tires wear faster"
], 0, "Special care is needed with tank vehicles because the liquid cargo has a high center of gravity and because surge (liquid sloshing) makes the vehicle harder to control.");

fix("sec1", "You still have normal brake functions if your", [
  "ABS is not working; you still have normal brake functions and should drive normally but get the ABS serviced soon",
  "ABS fails so you have no brakes",
  "You must pull over immediately",
  "You lose all braking power"
], 0, "If ABS malfunctions, you still have your regular brakes. Drive and brake normally but have the ABS system serviced soon.");

fix("sec1", "Should the shut-off valves on the rear of the", [
  "The shut-off valves on the rear of the last trailer should be closed; all others should be open",
  "All shut-off valves should be closed",
  "All shut-off valves should be open",
  "Only the front should be closed"
], 0, "All shut-off valves should be open except those on the rear of the last trailer, which should be closed.");

fix("sec1", "What is a passive highway-rail crossing?", [
  "A crossing with no gates, flashing lights, or bells; it only has a passive warning sign, so you must be extra cautious and look for trains yourself",
  "A crossing with gates",
  "A crossing in a city",
  "A crossing with a flagger"
], 0, "A passive highway-rail crossing has no active warning devices (no gates, flashing lights, or bells) - only signs. Because there is no signal, you must slow down and look for trains yourself.");

fix("sec1", "How do you know if your converter dolly is", [
  "Dollies manufactured on or after March 1, 1998 are required to have an ABS lamp on the left side; check for the yellow malfunction lamp and look for the ECU and wheel speed sensor wires under the unit",
  "You cannot tell",
  "Check the paint color",
  "Listen for a hiss"
], 0, "Converter dollies built on or after March 1, 1998 must have an ABS lamp on the left side. For older units, look under the vehicle for the ECU and wheel speed sensor wires.");

fix("sec1", "Do not apply the brake while you are turning. It's", [
  "very easy to lock your wheels while turning, which could cause a skid out of control",
  "not necessary",
  "illegal",
  "hard on the tires"
], 0, "Do not apply the brake while turning because it is very easy to lock the wheels and skid out of control. Slow down before the turn instead.");

fix("sec1", "Do not brake harshly. Brake smoothly using steady", [
  "pressure so students and passengers are not thrown forward",
  "abrupt stops",
  "the parking brake",
  "engine braking only"
], 0, "When carrying passengers or students, brake smoothly with steady pressure so you don't throw people forward or cause injury.");

fix("sec1", "Do not change lanes while proceeding through the", [
  "intersection or railroad crossing",
  "highway",
  "parking lot",
  "tunnel"
], 0, "Do not change lanes while proceeding through an intersection or railroad crossing. Keep your path steady so other drivers can anticipate your movements.");

fix("sec1", "Do not grind or clash gears.", [
  "Double-clutch or use the correct technique to shift smoothly and prevent transmission damage",
  "Shift as fast as possible",
  "Use only one gear",
  "Never shift"
], 0, "Grinding or clashing gears damages the transmission and can cause you to lose control. Shift using proper double-clutch or smooth shifting technique.");

fix("sec1", "Do not let your vehicle roll.", [
  "Use the brakes and parking brake so the vehicle does not roll backward or forward, especially when starting on a hill or when stopped",
  "Roll as needed",
  "Only on hills",
  "It doesn't matter"
], 0, "Never let your vehicle roll. Hold it with the brakes and parking brake until you are ready to move, especially on grades where rollback can cause a crash.");

fix("sec1", "Do not move a student you believe may have", [
  "been seriously injured; wait for qualified medical help unless there is danger of fire or passing traffic",
  "a headache",
  "dropped a book",
  "questions"
], 0, "Do not move a seriously injured student unless there is a danger of fire or passing traffic. Moving them could make injuries worse; wait for qualified help.");

fix("sec1", "Do not over or under steer the vehicle.", [
  "Steer smoothly and correctly so you keep the bus in the proper lane and avoid skids or rollovers",
  "Steer sharply at all times",
  "Steer very little",
  "Let go of the wheel"
], 0, "Over or under steering can cause loss of control. Steer smoothly and precisely to keep the vehicle in the correct path, especially when carrying passengers.");

fix("sec1", "Do not put vehicle over curbs, sidewalks, or lane", [
  "markings when turning or parking, as it can damage the vehicle and endanger pedestrians",
  "markings only in the rain",
  "signs",
  "numbers"
], 0, "Do not drive over curbs, sidewalks, or lane markings. Doing so can damage the vehicle, violate the law, and endanger pedestrians.");

fix("sec1", "Do not ride clutch to control speed, coast with the", [
  "clutch in, or hold the clutch down constantly, because it causes transmission wear and reduces engine braking",
  "brake pedal pressed",
  "gears in neutral",
  "throttle open"
], 0, "Do not ride the clutch to control speed or coast with the clutch in. This causes clutch wear and reduces the engine's braking effect.");

fix("sec1", "Do not ride or pump brake.", [
  "Do not keep light, constant pressure on the brake or pump it, as this wears brakes and can cause them to overheat or fade",
  "Use the brake constantly",
  "Never touch the brake",
  "Only use the parking brake"
], 0, "Do not ride (hold constant pressure on) or pump the brake pedal unnecessarily. This wears the brakes, can overheat them, and reduces stopping ability.");

fix("sec1", "Do not shift gears while crossing railroad tracks.", [
  "Shifting could stall the engine or cause you to get stuck on the tracks",
  "Shifting is required",
  "Shifting is easier on tracks",
  "Only downshift"
], 0, "Do not shift gears while crossing railroad tracks. Shifting could cause you to stall, hesitate, or get stuck on the tracks. Cross in a steady gear.");

fix("sec1", "Do not shift in turns and intersections.", [
  "Shifting in a turn or intersection can cause you to lose control; shift before entering",
  "Shift as needed in turns",
  "Always shift in intersections",
  "Only downshift in turns"
], 0, "Do not shift gears in turns or intersections. One hand on the wheel and the drivetrain disengaged can cause you to lose control. Shift before entering.");

fix("sec1", "Do not stop, change gears, or change lanes while", [
  "crossing railroad tracks",
  "on the highway",
  "in a parking lot",
  "at a red light"
], 0, "Do not stop, change gears, or change lanes while crossing railroad tracks. Maintain a steady path and speed so you clear the tracks safely.");

fix("sec1", "Do not stop, change gears, pass another vehicle, or", [
  "change lanes within an intersection or crosswalk",
  "slow down",
  "signal",
  "use your horn"
], 0, "Do not stop, change gears, pass another vehicle, or change lanes within an intersection or crosswalk. Keep intersections clear and your path predictable.");

fix("sec1", "Do not turn any more than needed to clear", [
  "whatever is in your way; the more sharply you turn, the greater the chance of a skid or rollover",
  "the obstacle, then keep turning",
  "right away, then turn sharply",
  "the lane"
], 0, "Turn only as much as needed to clear the obstacle. Sharp turns increase the chances of a skid or rollover. Be ready to counter-steer.");

fix("sec1", "Do not turn the wheel before your vehicle moves.", [
  "Turning the wheel while stationary scrapes the tires and damages the steering system",
  "Turn the wheel while parked",
  "Turn early on every turn",
  "Only turn at speed"
], 0, "Do not turn the steering wheel before the vehicle moves. Turning the wheels while stationary wears and damages tires and steering components.");

fix("sec1", "This is true no matter what type of vehicle you", [
  "were driving: you must notify your employer within 30 days of a traffic violation conviction (except parking)",
  "were driving only if it was a CMV",
  "only for passenger vehicles",
  "only if you were at fault"
], 0, "You must notify your employer within 30 days of any traffic violation conviction (except parking), no matter what type of vehicle you were driving.");

fix("sec1", "Was our free cdl practice test helpful?", [
  "This is a survey question and should not be part of the quiz",
  "False",
  "Maybe",
  "Unknown"
], 0, "", "What is the most important reason for doing a pre-trip inspection?");

fix("sec1", "What is the minimum tire tread depth required for front tires?", [
  "4/32 inch",
  "2/32 inch",
  "6/32 inch",
  "1/32 inch"
], 0, "The minimum tread depth for front (steering) tires is 4/32 inch; all other tires require at least 2/32 inch.");

fix("sec1", "Why are placards used?", [
  "To communicate the risk of the product being hauled",
  "To show the carrier's logo",
  "To track fuel purchases",
  "To indicate the driver's license class"
], 1, "Placards are diamond-shaped signs used to communicate the risk of the hazardous material being hauled.");

fix("sec1", "You must be properly restrained by a safety belt", [
  "at all times while operating a commercial motor vehicle",
  "only on highways",
  "only when carrying passengers",
  "only when the vehicle has airbags"
], 0, "You must be properly restrained by a safety belt at all times while operating a CMV. Unbelted drivers are four times more likely to be fatally injured if thrown from the vehicle.");

fix("sec1", "You must do this when you apply for a commercial", [
  "driving job: give your employer information on all driving jobs you have held for the past 10 years",
  "driver license: surrender your passport",
  "endorsement: take a road test",
  "license renewal: retake the written test"
], 0, "When you apply for a commercial driving job, you must give your employer information on all driving jobs you have held for the past 10 years.");

fix("sec1", "You must give your employer information on all", [
  "driving jobs you have held for the past 10 years when you apply for a commercial driving job",
  "driving jobs from the last 5 years",
  "traffic tickets ever received",
  "medical conditions"
], 0, "When you apply for a commercial driving job, you must provide information on all driving jobs you have held for the past 10 years.");

fix("sec1", "You must go slowly enough so your brakes can hold", [
  "you back without getting too hot, or they will fade and you could lose stopping power",
  "you back at any speed",
  "the load in place",
  "you from going uphill"
], 0, "Go slowly enough that your brakes hold you back without overheating. If brakes get too hot they fade, meaning you must push harder for the same stopping power until they fail.");

fix("sec1", "You must have a commercial driver license (CDL)", [
  "to operate any vehicle with a GVWR of 26,001 or more pounds, a combination over 26,001 pounds towing more than 10,000 pounds, a vehicle for 16+ passengers, or a vehicle requiring hazmat placards",
  "to drive any vehicle",
  "only for interstate driving",
  "only for school buses"
], 0, "A CDL is required for any single vehicle with a GVWR of 26,001+ pounds, a combination over 26,001 pounds towing more than 10,000 pounds, vehicle for 16+ passengers, or a vehicle requiring hazmat placards.");

fix("sec1", "You must notify the Department of Highway Safety", [
  "and Motor Vehicles within 30 days of a traffic violation conviction (except parking) in any other jurisdiction",
  "only when asked",
  "at your renewal",
  "within a year"
], 0, "You must notify the Department of Highway Safety and Motor Vehicles within 30 days if you are convicted in any other jurisdiction of a traffic violation (except parking), no matter what vehicle you were driving.");

fix("sec1", "You must notify your employer within 30 days of", [
  "any traffic violation conviction (except parking), no matter what type of vehicle you were driving",
  "retirement",
  "getting a new vehicle",
  "changing your address"
], 0, "You must notify your employer within 30 days of any traffic violation conviction (except parking), no matter what type of vehicle you were driving.");

fix("sec1", "You must notify your employer within two business", [
  "days if your license is suspended, revoked, or canceled, or if you are disqualified from driving",
  "weeks of a traffic ticket",
  "days of a windshield crack",
  "days of a vehicle repair"
], 0, "You must notify your employer within two business days if your license is suspended, revoked, or canceled, or if you are disqualified from driving.");

fix("sec1", "You must notify your motor vehicle licensing", [
  "agency within 30 days if you are convicted in any other jurisdiction of any traffic violation (except parking)",
  "agency when you change jobs",
  "company when you buy a car",
  "state when you move"
], 0, "You must notify your motor vehicle licensing agency within 30 days if you are convicted in any other jurisdiction of any traffic violation (except parking), regardless of vehicle type.");

fix("sec1", "You must pass a test on this information to get a", [
  "CDL; the general knowledge test is required of all applicants",
  "learner's permit",
  "passport",
  "driver improvement course"
], 0, "You must pass the general knowledge test (and any endorsement tests) to get a CDL. This manual covers the required information.");

fix("sec1", "You must pass a written test about the regulations", [
  "to get a hazardous materials endorsement",
  "to renew your registration",
  "to buy a vehicle",
  "to get insurance"
], 0, "To obtain a hazardous materials endorsement, you must pass a written test about the regulations, plus a TSA background check and fingerprinting.");

fix("sec1", "You must use the braking effect of the engine as the", [
  "principal way of controlling your speed on long, steep downgrades",
  "only way to brake",
  "backup to the brakes",
  "way to accelerate"
], 0, "On long, steep downgrades, use the engine's braking effect as the principal way to control speed by being in a low gear. Save your brakes as a supplement.");

fix("sec1", "You should be able to identify each part and tell the", [
  "examiner what you are looking for or inspecting during the pre-trip inspection",
  "mechanic what is wrong",
  "police what happened",
  "shop what to fix"
], 0, "During the pre-trip inspection you must point to or touch each part, name it, and explain to the examiner what you are checking and why.");

fix("sec1", "You should brake in a way that will keep your", [
  "vehicle in a straight line and allow you to turn if necessary, using controlled or stab braking",
  "wheels locked up",
  "passengers comfortable",
  "tires from wearing"
], 0, "Brake so the vehicle stays in a straight line and you can still steer. Use controlled braking (maximum without locking) or stab braking (release when wheels lock).");

fix("sec1", "You should know what is right for your vehicle.", [
  "Modern trucks may need lower gears going down a hill than going up because of low-friction parts and powerful engines",
  "All trucks need the same gears",
  "Always use the highest gear",
  "Gear choice doesn't matter"
], 0, "Modern trucks have low-friction parts and stronger engines, so they may climb in higher gears but need lower gears going down. Know what is right for your own vehicle.");

fix("sec1", "You should slow down to lessen the effect of the", [
  "shift of liquid in a tank (surge), which can push the truck forward and make it hard to control",
  "wind on the trailer",
  "traffic behind you",
  "curb when parking"
], 0, "Slow down before curves and when stopping so the shifting of liquid in a tank (surge) has less effect on the vehicle's control.");

fix("sec1", "You should use the basic seven-step inspection", [
  "method to check your vehicle: approach and look underneath, check the engine, start the engine and check the cab, turn off the engine and check lights, walk around, check signals, do the final brake checks",
  "method only at the shop",
  "method once a month",
  "method when you have time"
], 0, "Use the basic seven-step inspection method every time you inspect your vehicle so you don't forget anything and can catch defects before they cause problems.");

fix("sec1", "You should walk through the bus and around the", [
  "bus after unloading to make sure no students are left behind or sleeping, and before driving away",
  "bus to check the tires",
  "bus to close the windows",
  "bus only in an emergency"
], 0, "After unloading students you should walk through the bus and around it to make sure no students are left on board or near the vehicle before driving away.");

fix("sec1", "parking). This is true no matter what type of vehicle", [
  "you were driving: you must notify the licensing agency within 30 days of a traffic violation conviction (except parking)",
  "you were driving only with a CDL",
  "you were driving only a personal vehicle",
  "you were driving a rental"
], 0, "You must notify your licensing agency within 30 days of any traffic violation conviction (except parking) no matter what type of vehicle you were driving.");

// ---------------- Section 2 fixes ----------------
fix("sec2", "Stopping is not always the safest thing to do. What are some advantages of going right off the road rather than trying to stop in a hurry?", [
  "You avoid forcing anyone into oncoming traffic or a head-on collision, and the shoulder is usually clear so it offers an escape route",
  "You stop faster",
  "There are no advantages",
  "It protects your brakes"
], 0, "Going right avoids a possible head-on collision and forces nobody into opposing traffic. Most shoulders can support a large vehicle and provide a usable escape route.");

fix("sec2", "What is an \"escape ramp\"?", [
  "A ramp leading to a long bed of loose, soft material to slow a runaway vehicle, sometimes in combination with an upgrade",
  "Another term for an off ramp",
  "A ramp on freeways to bypass accidents",
  "None of the above"
], 0, "An escape ramp is a long bed of loose, soft material used to slow and stop a runaway vehicle, sometimes combined with an upgrade. Use it if you lose your brakes on a downgrade.");

fix("sec2", "If a tire blows out, you should put the brakes down slowly to avoid what?", [
  "Losing control and skidding; hold the wheel firmly and stay off the brake until the vehicle slows",
  "Wearing the tires",
  "Damaging the drums",
  "Overheating the brakes"
], 0, "Braking hard after a blowout can cause loss of control. Hold the steering wheel firmly, stay off the brake until the vehicle slows, then brake gently.");

fix("sec2", "How do you know if your vehicle has antilock brakes?", [
  "There is a yellow ABS malfunction lamp on the instrument panel (or on the left side of a trailer)",
  "Check the tire tread",
  "Look at the color",
  "Listen for a beep"
], 0, "ABS-equipped vehicles have a yellow ABS malfunction lamp on the instrument panel; trailers have one on the left side near the front or rear corner.");

fix("sec2", "What is the proper braking technique when you have antilock brakes?", [
  "Brake the same way you always have, using only the braking force necessary; in an emergency with ABS on all axles you can fully apply the brakes",
  "Push the pedal harder than normal",
  "Pump the brakes",
  "Never brake hard"
], 0, "With ABS, brake as you always have. Use only the force needed to stop safely. In an emergency with working ABS on all axles, you can fully apply the brakes.");

fix("sec2", "How do antilock brakes help you stop without skidding?", [
  "They keep the wheels from locking up, letting you maintain steering control and avoid skids and jackknifes",
  "They shorten your stopping distance",
  "They increase braking power",
  "They let you stop faster on ice"
], 0, "ABS keeps wheels from locking up during hard braking so you retain steering control and avoid brake-induced skids or jackknifes.");

fix("sec2", "Why must air tanks be drained?", [
  "Water and compressor oil collect in the tanks and can freeze or coagulate and cause brake failure",
  "To lower tire pressure",
  "To fill with fresh air",
  "To lubricate the brakes"
], 0, "Air tanks collect water and compressor oil. If not drained, the water can freeze in cold weather and cause the brakes to fail. Drain them at the end of each working day.");

fix("sec2", "How do you know if your vehicle is equipped with antilock brakes?", [
  "There is a yellow ABS malfunction lamp on the instrument panel (or left side of a trailer)",
  "You can't tell",
  "It says on the tires",
  "Check the fuel door"
], 0, "Vehicles with ABS have a yellow ABS malfunction lamp on the instrument panel; trailers have one on the left side near the front or rear corner.");

fix("sec2", "Stopping is not always the safest thing to do", [
  "in an emergency; you can often turn to miss an obstacle more quickly than you can stop",
  "even in normal driving",
  "at any time; always brake",
  "only at night"
], 0, "Stopping is not always the safest move in an emergency. You can usually turn to miss an obstacle faster than you can stop, though top-heavy vehicles and multi-trailer rigs may flip.");

fix("sec2", "How do you know if your vehicle has antilock", [
  "brakes? There is a yellow ABS malfunction lamp on the instrument panel (or left side of the trailer)",
  "brakes? Check the tires",
  "brakes? Listen for a buzzer",
  "brakes? Look at the headlights"
], 0, "Vehicles with ABS have a yellow ABS malfunction lamp on the instrument panel; trailers have one on the left side near the front or rear corner.");

// ---------------- Section 5 fixes ----------------
fix("sec5", "What factors can cause brakes to fade or fail?", [
  "Excessive use of the service brakes, not relying on engine braking enough, and brakes being out of adjustment",
  "Only one factor: brake fluid",
  "Cold weather only",
  "Worn tires"
], 0, "Brakes fade or fail from excess heat caused by incorrect use: excessive service braking, not relying on engine braking, or out-of-adjustment brakes that make other brakes overheat.");

fix("sec5", "How often should you drain air tanks?", [
  "At the end of each working day",
  "At the end of the month",
  "At the end of the fiscal quarter",
  "Once a year"
], 0, "Unless the vehicle has automatic drain valves, drain the air tanks at the end of each working day so moisture and oil do not freeze or coagulate and cause brake failure.");

fix("sec5", "How should you brake when you drive a tractor-trailer combination with ABS?", [
  "Brake the same way you always have, using only the braking force necessary to stop safely and stay in control",
  "Press the brake pedal to the floor on every stop",
  "Pump the brakes rapidly",
  "Never use the service brakes"
], 0, "With ABS on a tractor-trailer, brake exactly as you always have - use only the braking force needed to stop safely and stay in control.");

fix("sec5", "Why should you be in the proper gear before", [
  "starting down a hill? You will not be able to shift into a lower gear once your speed has built up",
  "starting the engine? It prevents wear",
  "turning? It helps you brake",
  "parking? It engages the brake"
], 0, "You must select a low gear before starting down a hill because once speed builds up you cannot shift into a lower gear and could lose all engine braking effect.");

fix("sec5", "Describe the proper braking technique when", [
  "going down a long, steep downgrade: use engine braking as the principal control and apply the brakes as a supplement, reducing speed about 5 mph below your safe speed then releasing",
  "stopping at a red light",
  "driving on ice",
  "backing up"
], 0, "On a long downgrade, use the engine's braking effect as the principal control. Apply the brakes just enough to feel a definite slowdown, reduce about 5 mph below your safe speed, then release and repeat.");

fix("sec5", "What is the proper braking technique when", [
  "going down a long, steep downgrade? Use engine braking as the principal control, applying brakes as a supplement - slow about 5 mph below safe speed then release",
  "stopping in traffic",
  "crossing a bridge",
  "turning at an intersection"
], 0, "On long, steep downgrades, the proper technique is to use the engine braking effect as the principal control and use your brakes only as a supplement, slowing about 5 mph below your safe speed and then releasing.");

// ---------------- Section 6 fixes ----------------
fix("sec6", "Which shut-off valves should be open and which closed?", [
  "All shut-off valves should be open except the ones at the back of the last trailer, which should be closed",
  "All shut-off valves should be closed",
  "Only the valves at the front",
  "Only the valves on the tractor"
], 0, "All shut-off valves should be in the open position except the valves at the back of the last trailer, which should be closed.");

fix("sec6", "How can you test the tractor protection valve?", [
  "Supply air to the trailer, then with the tractor air pressure low, the valve should close automatically when pressure drops to 25-40 psi, keeping air in the tractor",
  "Test it by braking hard",
  "There is no way to test it",
  "Listen for a beep"
], 0, "The tractor protection valve closes automatically when tractor air pressure drops to about 25-40 psi, protecting the tractor's air supply if the trailer leaks or breaks away.");

fix("sec6", "How can you test the trailer emergency brakes?", [
  "With the trailer connected and air supplied, pull the trailer air supply (tractor protection) valve out or disconnect the emergency line; the trailer emergency brakes should apply automatically",
  "Test them by driving fast",
  "There is no test",
  "Check the tire pressure"
], 0, "To test trailer emergency brakes, connect the trailer, build air pressure, then operate the trailer air supply control or disconnect the emergency line. The trailer spring brakes should apply automatically.");

fix("sec6", "How can you test the trailer service brakes?", [
  "With the trailer connected and air supplied, push the brake pedal or the trailer hand valve and confirm the trailer brakes apply (and release when you let up)",
  "Test by accelerating",
  "There is no test",
  "Listen for a hiss"
], 0, "To test trailer service brakes, with air pressure built up, apply the service brakes with the foot pedal (or trailer hand valve). The trailer brakes should apply firmly and release when you let up.");

// ---------------- Section 7 fixes ----------------
fix("sec7", "How can you test that air flows to all trailers?", [
  "Open each shut-off valve and build air pressure; you should hear air flowing and the gauges should build up for each trailer. Test the brakes on each trailer",
  "Check the tires",
  "There is no test",
  "Drive and brake hard"
], 0, "To confirm air flows to all trailers in a set, open the shut-off valves, build up air pressure, and test the brakes on each trailer. All should apply and release properly.");

fix("sec7", "What is a converter dolly?", [
  "A device (chassis with a fifth wheel and drawbar) with one or two axles used to couple a second or third trailer to the tractor in doubles/triples combinations",
  "A tool for changing tires",
  "A type of trailer brake",
  "A coupling valve"
], 0, "A converter dolly is a chassis with one or two axles, a fifth wheel, and a drawbar used to couple a second or third trailer behind the first in doubles or triples combinations.");

fix("sec7", "Do converter dollies have spring brakes?", [
  "Yes, converter dollies built on or after April 1, 2001 are required to have spring brakes",
  "No, never",
  "Only on triples",
  "Only if equipped with air conditioning"
], 0, "Converter dollies manufactured on or after April 1, 2001 are required to have spring brakes so the dolly brakes apply automatically if the air supply is lost.");

fix("sec7", "What three methods can you use to secure a second trailer before coupling?", [
  "Chock the wheels, use the parking brake, or use the trailer's spring brakes",
  "Tie it down with chains, use the landing gear, or block the hitch",
  "Park on a hill, use the hand brake, or call for help",
  "None of these are correct"
], 0, "Before coupling, secure the second trailer so it cannot roll by using wheel chocks, the parking brake, or the trailer's spring brakes.");

fix("sec7", "How do you check to make sure trailer height is correct before coupling?", [
  "Make sure the trailer is low enough that the kingpin will engage the fifth wheel but high enough that the trailer nose clears the tractor when coupling",
  "Raise it as high as it goes",
  "Lower it to the ground",
  "It doesn't matter"
], 0, "Set the trailer height so the kingpin will engage the fifth wheel plate properly, but the trailer remains high enough to clear the tractor rear during coupling.");

fix("sec7", "What do you check when making a visual check of coupling?", [
  "Check that the fifth wheel is locked onto the kingpin, the locking jaws are closed, the safety latch is engaged, the air lines are connected, and the landing gear is raised",
  "Check the paint",
  "Check the tires only",
  "Check the cab"
], 0, "Visually confirm the fifth wheel is locked onto the kingpin with the jaws and safety latch closed, the air and brake lines are connected correctly, and the landing gear is raised.");

fix("sec7", "Why should you pull a dolly out from under a trailer before you disconnect it from the trailer in front?", [
  "So you can reach and operate the shut-off valves and avoid damaging the dolly, trailer, or air lines during uncoupling",
  "To make the trailer lighter",
  "There is no reason",
  "To inspect the tires"
], 0, "Pull the dolly out from under the trailer before disconnecting it so you can access the shut-off valves, disconnect the air lines safely, and prevent damage to the dolly and trailer.");

fix("sec7", "What should you check for when inspecting the converter dolly? The pintle hook?", [
  "Check the converter dolly for secure mounting, tires, air lines, glad hands, safety chains, and lights; check the pintle hook for wear, damage, and secure mounting",
  "Only check the tires",
  "Only check the frame color",
  "Nothing needs checking"
], 0, "Inspect the converter dolly for secure mounting, tires and wheels, air lines, glad hands, safety chains, couplers, and lights. Inspect the pintle hook for worn, damaged, or missing parts and a secure mount.");

fix("sec7", "Should the shut-off valves on the rear of the last trailer be open or closed? On the first trailer in a set of doubles? On the middle trailer of a set of triples?", [
  "The valves on the rear of the last trailer should be closed; all others (first trailer of doubles, middle trailer of triples) should be open",
  "All should be closed",
  "All should be open",
  "Only the middle should be closed"
], 0, "All shut-off valves should be open except those at the back of the last trailer, which should be closed. The valves on the first trailer of doubles and the middle trailer of triples stay open.");

fix("sec7", "How do you know if your converter dolly is equipped with antilock brakes?", [
  "Dollies built on or after March 1, 1998 are required to have an ABS indicator lamp on the left side; older units may have the ECU and wheel speed sensor wires under the unit",
  "You cannot tell",
  "Check the color",
  "Listen for a beep"
], 0, "Converter dollies built on or after March 1, 1998 must have an ABS lamp on the left side. For older dollies, look under the vehicle for the ECU and wheel speed sensor wires.");

fix("sec7", "What three methods can you use to secure a", [
  "second trailer before coupling: wheel chocks, parking brake, or spring brakes",
  "cargo load: straps, chains, and ropes",
  "tractor: air lines, brakes, and keys",
  "dolly: pins, bolts, and welds"
], 0, "To secure a second trailer before coupling, use wheel chocks, the parking brake, or the trailer's spring brakes.");

// ---------------- Section 8 fixes ----------------
fix("sec8", "How are bulkheads different than baffles?", [
  "Bulkheads are solid walls that separate the tank into sections but do not stop liquid movement between sections; baffles are partial walls with holes that slow liquid movement (surge)",
  "They are the same thing",
  "Baffles are solid, bulkheads have holes",
  "Bulkheads are on the outside, baffles inside"
], 0, "Bulkheads are solid walls dividing the tank into compartments. Baffles are partial walls with openings that slow liquid surge from front to back as the vehicle moves.");

fix("sec8", "Should a tank vehicle take curves, on ramps, or off ramps at the posted speed limits?", [
  "No, tank vehicles should slow down well below posted speed limits for curves, ramps, and off ramps because liquid surge and the high center of gravity increase rollover risk",
  "Yes, always at the posted limit",
  "Only below 45 mph",
  "Only when empty"
], 0, "A safe speed on a curve for most vehicles may be too fast for a tanker. Slow down before curves, ramps, and off ramps on account of surge and the high center of gravity.");

fix("sec8", "How are smooth bore tankers different to drive than those with baffles?", [
  "Smooth bore tankers have no baffles, so liquid surges more freely and they are harder to control; they need extra care to avoid surge-related control problems",
  "They are easier to drive",
  "They have more grip",
  "There is no difference"
], 0, "Smooth bore tankers have no baffles to slow liquid movement, so the liquid surges more and the tanker is harder to control. This is why some tanks are divided into compartments using bulkheads.");

fix("sec8", "What three things determine how much liquid you can load?", [
  "The weight of the liquid, the amount of liquid the law allows based on vehicle weight limits, and the space needed for expansion (outage)",
  "Only the tank size",
  "Only the driver's choice",
  "The temperature outside"
], 0, "How much liquid you can load depends on the weight of the liquid, the legal weight limit for the vehicle, and the space needed for liquid expansion (outage) as it warms.");

fix("sec8", "What is outage?", [
  "The space left empty in a tank to allow the liquid to expand without overflowing as it warms",
  "The amount of liquid spilled",
  "The tank being out of service",
  "A type of valve"
], 0, "Outage is the space left empty in a tank to allow the liquid room to expand as it warms, so it does not overflow or cause pressure problems.");

fix("sec8", "How can you help control surge?", [
  "Keep the tank as full as possible (with proper outage) because compartment baffles and a full tank reduce the amount of free-moving liquid, and slow down and avoid sudden stops and starts",
  "Leave the tank half empty",
  "Speed up through curves",
  "Brake hard at every stop"
], 0, "Surge is the forward-and-back motion of liquid. It is hardest to control when the tank is partly full. Keep the tank reasonably full (with proper outage), slow down gradually, and avoid sudden stops and starts.");

fix("sec8", "What two reasons make special care necessary when driving tank vehicles?", [
  "The high center of gravity of the liquid cargo and the surge/free surface effect that makes the vehicle harder to control",
  "The vehicle is wider and harder to park",
  "The tires wear quickly",
  "The brakes overheat faster"
], 0, "Tank vehicles need special care because the liquid cargo has a high center of gravity (increasing rollover risk) and because surge makes the vehicle harder to control.");

fix("sec8", "How are smooth bore tankers different to", [
  "drive than those with baffles? They have no baffles, so liquid surges more and they are harder to control",
  "brake? They stop faster",
  "load? They hold less",
  "park? They need more space"
], 0, "Smooth bore tankers have no baffles to slow liquid movement, so the liquid surges more freely and the tanker is more difficult to control than one with baffles.");

// ---------------- Section 10 fixes ----------------
fix("sec10", "Define the danger zone. How far does the danger zone extend around the bus?", [
  "The danger zone is the area around the bus where students are most at risk, extending about 10 feet from the front, sides, and rear of the bus",
  "5 feet from the bus",
  "50 feet from the bus",
  "Only the driver's side"
], 0, "The danger zone is the area around the bus where students are in the most danger, extending about 10 feet from the front, sides, and rear. Keep students out of this area.");

fix("sec10", "What should you be able to see if the outside flat mirrors are adjusted properly? The outside convex mirrors? The crossover mirrors?", [
  "Flat mirrors: the side of the bus and rear tires; convex mirrors: a wider area including the danger zone; crossover mirrors: the front bumper area and ground directly in front of the bus",
  "Flat: nothing; convex: everything",
  "All mirrors show the same view",
  "Mirrors are not required"
], 0, "Proper flat mirrors show the side of the bus and the rear tires. Convex mirrors show a wider area including the danger zone. Crossover mirrors show the front bumper and the ground directly in front of the bus.");

fix("sec10", "You are loading students along the route. When should you activate your alternating flashing amber warning lights?", [
  "You should activate them at least 200 feet before the stop so approaching drivers are warned",
  "Right when you stop",
  "After students board",
  "Only at night"
], 0, "Activate the alternating flashing amber warning lights at least 200 feet before the bus stop so other drivers know to slow down and prepare to stop.");

fix("sec10", "You are unloading students along your route. Where should students walk to after exiting the bus?", [
  "Students should go to a point at least 10 feet in front of the bus, walk to the left of the bus, and wait for the driver's signal before crossing",
  "Students should cross directly behind the bus",
  "Students should stay on the bus",
  "Students should run home"
], 0, "After exiting, students should move at least 10 feet in front of the bus, out of the danger zone and into the driver's view, and wait for the driver's signal before crossing.");

fix("sec10", "After unloading at school, why should you walk through the bus?", [
  "To be sure no students are left on the bus or sleeping, and to check for items and hazards before driving away",
  "To clean the windows",
  "To close the doors",
  "There is no reason"
], 0, "After unloading, walk through the bus to make sure no students are left behind (some may be sleeping or hidden) and to check for hazards before driving away.");

fix("sec10", "What position should students be in front of the bus before they cross the roadway?", [
  "At least 10 feet directly in front of the bus, out of the danger zone and in plain view of the driver",
  "Right in front of the bumper",
  "Behind the bus",
  "On the driver's blind side"
], 0, "Students should be at least 10 feet directly in front of the bus, in the driver's full view and out of the danger zone, before being signaled to cross.");

fix("sec10", "Under what conditions must you evacuate the bus?", [
  "When there is danger of fire, the bus is in the path of a train or other danger, or when it is unsafe to remain in the bus (e.g., fire, collision, or hazardous spill)",
  "Never evacuate",
  "Only in a fire",
  "Only when the driver says so regardless of danger"
], 0, "Evacuate the bus when there is danger of fire, when the bus is in danger from a train or other traffic, or when it is otherwise unsafe to remain in the bus.");

fix("sec10", "How far from the nearest rail should you stop at a highway-rail crossing?", [
  "Between 15 and 50 feet from the nearest rail, with the bus in a position to see the tracks clearly",
  "At the edge of the rail",
  "100 feet away",
  "25 feet past the rail"
], 0, "Stop between 15 and 50 feet from the nearest rail so you can see both directions along the tracks before proceeding.");

fix("sec10", "What is a passive highway-rail crossing? Why should you be extra cautious at this type of crossing?", [
  "A crossing with no gates, flashing lights, or bells - only passive warning signs. You must be extra cautious because there is no active signal to warn you of a train, so you must look and listen yourself",
  "A crossing with gates",
  "A crossing in a tunnel",
  "A crossing with a flagger"
], 0, "A passive crossing has no active warning devices, only signs. Because there is no signal to warn you, you must slow down, look, and listen for approaching trains before crossing.");

fix("sec10", "How should you use your brakes if your vehicle is equipped with antilock brakes (ABS)?", [
  "Brake the same way you always have; in an emergency with working ABS on all axles you can fully apply the brakes",
  "Brake harder than normal",
  "Pump the brakes",
  "Never brake hard"
], 0, "With ABS, brake normally. Pumping the brakes defeats ABS - apply steady, firm pressure. In an emergency with ABS on all axles you can fully apply the brakes.");

fix("sec10", "You are loading students along the route.", [
  "Activate the alternating flashing amber warning lights at least 200 feet before the stop",
  "Turn the emergency flashers on after loading",
  "Blow the horn at the stop",
  "Flash the headlights"
], 0, "Activate the amber warning lights at least 200 feet before the stop so approaching traffic is warned.");

fix("sec10", "After unloading at school, why should you", [
  "walk through the bus? To make sure no students are left behind and to check for hazards",
  "start the engine? To warm the bus",
  "close the windows? To secure the bus",
  "signal? To inform traffic"
], 0, "Walk through the bus after unloading to be sure no students are left on board and to check for hazards before moving.");

fix("sec10", "How far from the nearest rail should you", [
  "stop at a highway-rail crossing? Between 15 and 50 feet from the nearest rail",
  "honk before a crossing",
  "slow before a crossing",
  "turn before a crossing"
], 0, "Stop between 15 and 50 feet from the nearest rail at a highway-rail crossing so you can see the tracks clearly.");

fix("sec10", "How should you use your brakes if your", [
  "vehicle is equipped with antilock brakes (ABS)? Brake the same way you always have, using firm steady pressure",
  "vehicle is loaded? Brake earlier",
  "tires are new? Brake harder",
  "road is wet? Pump the brakes"
], 0, "With ABS, brake normally with firm steady pressure. Don't pump the brakes, as this defeats ABS. You can fully apply the brakes in an emergency.");

// ---------------- Duplicate-option fixes (pre-trip / hazmat / combo) ----------------
fix("sec6", "What should you check for on fifth wheel mounting bolts?", [
  "Loose or missing brackets, clamps, bolts, or nuts",
  "Cracks in the platform",
  "Gap between kingpin and locking jaws",
  "Condition of the release arm"
], 0, "Check that the fifth wheel mounting bolts, brackets, clamps, and nuts are present and secure - not loose or missing.");

fix("sec6", "What must you check on the fifth wheel locking jaws?", [
  "Fully closed around the kingpin",
  "Gap between fifth wheel and trailer",
  "Condition of mounting pins",
  "Position of the release arm"
], 0, "Confirm the locking jaws are fully closed around the kingpin so the trailer cannot separate from the fifth wheel.");

fix("sec6", "What should you check on the fifth wheel skid plate?", [
  "Securely mounted to the platform with all bolts and pins secure",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Gap between tandems"
], 0, "Check that the skid plate is securely mounted to the platform with all bolts and pins in place and secure.");

fix("sec6", "What should you check on the fifth wheel platform structure?", [
  "Cracks or breaks in the platform",
  "Condition of the release arm",
  "Gap between tandems",
  "Position of the locking jaws"
], 0, "Inspect the fifth wheel platform for cracks or breaks that could weaken the coupling structure.");

fix("sec6", "What should you check on the fifth wheel release arm (if equipped)?", [
  "Release arm is in the engaged position and the safety latch is in place",
  "Condition of the kingpin",
  "Gap between trailers",
  "Condition of the tires"
], 0, "Ensure the release arm is fully engaged and the safety latch is in place so the fifth wheel cannot release while driving.");

fix("sec6", "What should you check regarding the kingpin and apron?", [
  "Kingpin is not bent or damaged; the visible part of the apron is not bent, cracked, or broken",
  "Condition of the release arm",
  "Gap between fifth wheel and trailer",
  "Position of the landing gear"
], 0, "Inspect the kingpin for bending or damage and check the visible part of the apron for bends, cracks, or breaks.");

fix("sec6", "What should you check regarding the fifth wheel gap?", [
  "Trailer is lying flat on the fifth wheel skid plate with no gap",
  "Condition of the release arm",
  "Clearance for landing gear",
  "Condition of the kingpin"
], 0, "Check that the trailer is lying flat on the fifth wheel skid plate with no gap, ensuring a proper, secure coupling.");

fix("sec6", "What should you check on fifth wheel locking pins (if equipped)?", [
  "Loose or missing pins in the slide mechanism; ensure they are fully engaged",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Condition of the release arm"
], 0, "Check that the fifth wheel slide locking pins are present and fully engaged so the slide cannot move.");

fix("sec6", "What should you check if the fifth wheel is air powered?", [
  "Check for leaks in the air system",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Position of the slides"
], 0, "For an air-powered fifth wheel, check the air system for leaks at start-up and during operation.");

fix("sec6", "What should you check on the sliding pintle hook?", [
  "Excessive wear and secure mounting with no loose bolts or nuts and the cotter pin in place",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Condition of the release arm"
], 0, "Check the sliding pintle hook for excessive wear, secure mounting, no loose bolts or nuts, and the cotter pin in place.");

fix("sec6", "What should you check on the tongue or draw-bar?", [
  "Not bent or twisted, no broken welds or stress cracks, eye not excessively worn",
  "Condition of the release arm",
  "Clearance for landing gear",
  "Position of the locking jaws"
], 0, "Check the tongue or draw-bar is not bent or twisted, has no broken welds or stress cracks, and the eye is not excessively worn.");

fix("sec6", "What should you check on the tongue or draw-bar eye?", [
  "Not excessively worn",
  "Condition of the release arm",
  "Clearance for landing gear",
  "Position of the locking jaws"
], 0, "Check the draw-bar eye is not excessively worn, which could allow the couple to fail under load.");

fix("sec6", "What should you check on the tongue storage area?", [
  "Solid and secured to the tongue; cargo in the storage area (chains, binders) is secure",
  "Condition of the release arm",
  "Clearance for landing gear",
  "Position of the locking jaws"
], 0, "Check the tongue storage area is solid and secured, and that cargo stored there (chains, binders) is secure.");

fix("sec7", "What should you check on fifth wheel slide mounting?", [
  "Loose or missing mounting brackets, clamps, bolts, or nuts; must be solidly attached",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Position of the locking jaws"
], 0, "Check the fifth wheel slide is solidly mounted with no loose or missing brackets, clamps, bolts, or nuts.");

fix("sec7", "What should you check on fifth wheel slide locking pins (if equipped)?", [
  "Loose or missing pins in the slide mechanism; if air powered, check for leaks; ensure fully engaged",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Position of the release arm"
], 0, "Check the slide locking pins are present and fully engaged; for air-powered slides, also check for leaks.");

fix("sec7", "What should you check for air leaks on an air-powered fifth wheel?", [
  "Check for leaks in the slide mechanism",
  "Condition of the kingpin",
  "Clearance for landing gear",
  "Position of the locking jaws"
], 0, "For an air-powered fifth wheel, check the slide mechanism for air leaks.");

fix("sec7", "Which type of truck-trailer combination has the greatest chance of a 'crack-the-whip' rollover?", [
  "A tractor pulling three trailers",
  "A tractor pulling two trailers",
  "A single tractor trailer",
  "They all have the same chance of a 'crack-the-whip' rollover"
], 0, "A tractor pulling three trailers (triples) has the greatest chance of a crack-the-whip rollover because rearward amplification, which causes the last trailer to swing wide, increases with the number of trailers.");

fix("sec7", "In a set of triples, the rearward amplification of about 3.5 means:", [
  "The rearward trailer is 3.5 times more likely to roll over than the tractor",
  "The tractor amplifies 3.5x",
  "You need 3.5 seconds to stop",
  "All trailers amplify equally"
], 0, "Rearward amplification of 3.5 in triples means the rear trailer is about 3.5 times more likely to roll over than the tractor in the same maneuver.");

fix("sec9", "How often should you check the tires on a placarded trailer with dual tires?", [
  "Every 2 hours or every 100 miles, whichever comes first",
  "At the start of each trip only",
  "After every fuel stop",
  "Once a week"
], 0, "Check the tires on a placarded trailer with dual tires every 2 hours or every 100 miles, whichever comes first.");

fix("sec9", "What is a safe haven?", [
  "An approved site for parking vehicles transporting hazardous materials, authorized by FMCSA or local authorities",
  "A safe distance from the traveled part of the roadway",
  "A rest area off the interstate",
  "Any truck stop"
], 0, "A safe haven is an approved area (authorized by FMCSA or local authorities) for parking vehicles transporting hazardous materials.");

fix("sec9", "How close can you park with Division 1.2 or 1.3 materials to the traveled part of the roadway?", [
  "Within 5 feet",
  "Within 100 feet",
  "Within 300 feet",
  "You cannot park on the roadway"
], 0, "Never park with Division 1.2 or 1.3 explosives within five feet of the traveled part of the road.");

fix("sec9", "How close can you park to a bridge, tunnel, or building with Division 1.2 or 1.3 materials?", [
  "Within 300 feet",
  "Within 10 feet",
  "Within 50 feet",
  "There is no limit"
], 0, "Except for short periods needed for vehicle operation necessities, do not park within 300 feet of a bridge, tunnel, building, place where people gather, or an open fire.");

fix("sec9", "What type of fire extinguisher must placarded vehicles carry?", [
  "A B:C rated fire extinguisher",
  "Class A only",
  "Class D only",
  "Any extinguisher is acceptable"
], 0, "Placarded vehicles must carry a B:C rated fire extinguisher, sized per the regulations, for fighting electrical and flammable-liquid fires.");

fix("sec9", "You're hauling 100 pounds of Division 4.3 (dangerous when wet) materials. Do you need to stop before a railroad-highway crossing?", [
  "No, Division 4.3 is not on the list of materials requiring a mandatory stop",
  "Yes, must stop before crossing",
  "Stop only if you smell gas",
  "Stop only if there is a visible leak"
], 0, "Division 4.3 (dangerous when wet) is not among the hazardous materials classes that require a mandatory stop before a railroad-highway crossing.");

fix("sec9", "At a rest area you discover your hazardous materials shipments slowly leaking from the vehicle. There is no phone around. What should you do?", [
  "Follow your company's emergency plan and contact the shipper or carrier immediately; if necessary, move to a safe location and call for help",
  "Continue to the next phone",
  "Wait for a phone to become available",
  "Neutralize the leak yourself"
], 0, "If hazmat is leaking, follow your emergency plan and contact the shipper or carrier and emergency response as soon as possible. Never try to neutralize the leak yourself unless trained.");

fix("sec9", "What is the Emergency Response Guide (ERG) indexed by?", [
  "Hazard class and ID number (and by material name)",
  "Material name only",
  "Radioactive category only",
  "By state regulations"
], 0, "The Emergency Response Guide is indexed by the hazard class and the four-digit ID number, and also alphabetically by material name.");

// ---------------- Section 14 fixes ----------------
fix("sec14", "If you skip or fail the Air Brakes knowledge test, what restriction goes on your CDL?", [
  "L - No air brake equipped CMV",
  "Z - No full air brakes",
  "E - No manual transmission",
  "O - No tractor-trailer"
], 0, "If you do not take or fail the air brake component of the knowledge test (or test in a vehicle without air brakes), the 'L' restriction is placed on your license - no air brake equipped CMV.");

fix("sec14", "How many correct answers do you need on the 25-question Air Brakes test?", [
  "20 correct answers (80%)",
  "18 correct answers",
  "22 correct answers",
  "25 correct answers"
], 0, "You need 20 out of 25 (80%) correct on the Air Brakes knowledge test to pass.");

// ---------- Apply all fixes ----------
let applied = 0;
let notFound = [];

for (const mod of modules) {
  if (!mod.quiz) continue;
  const remaining = [];
  for (const q of mod.quiz) {
    const fix = FIXES.find(f => f.modFilter === mod.id && q.q.startsWith(f.qPrefix));
    if (fix) {
      q.q = fix.newQ || q.q;
      q.options = fix.opts;
      q.correct = fix.correct;
      q.explain = fix.explain;
      applied++;
      remaining.push(q);
    } else {
      remaining.push(q);
    }
  }
  mod.quiz = remaining;
}

// Drop any questions that still contain survey/placeholder junk
for (const mod of modules) {
  if (!mod.quiz) continue;
  mod.quiz = mod.quiz.filter(q => {
    const opts = q.options || [];
    if (q.q.includes("practice test helpful?")) return false; // survey question
    const hasPlaceholder = opts.some(o => /^(First|Second|Third|Fourth) option$/.test(o)) ||
      opts.every(o => ["Pump pedal","Hold firm","Pump then hold","Pump rapidly"].includes(o)) ||
      opts.every(o => ["True","False","Maybe","Unknown"].includes(o)) ||
      opts.every(o => ["True","False","Depends on the vehicle","Only for passenger vehicles"].includes(o)) ||
      opts.every(o => ["Has ABS","No ABS","Only tractor has it","Only trailer has it"].includes(o)) ||
      (opts.every(o => /^(4|3|2|1|6|7)\/32 inch$/.test(o)) && /brake|blow/i.test(q.q) && !/tread|minimum tire/i.test(q.q));
    return !hasPlaceholder;
  });
}

writeFileSync(dstPath, JSON.stringify(modules, null, 1) + "\n");

console.log(`Applied ${applied} question fixes.`);
console.log(`Remaining placeholder checks done.`);
