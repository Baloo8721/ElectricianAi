// Adds a new "Test Your Knowledge" module (sec15) to content/cdl-modules.json
// containing all the handbook "Test Your Knowledge" questions with correct answers.
// Usage: node scripts/add-test-your-knowledge-module.mjs
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dstPath = join(root, "content", "cdl-modules.json");
const modules = JSON.parse(readFileSync(dstPath, "utf8"));

if (modules.find(m => m.id === "sec15")) {
  console.log("sec15 module already exists. Skipping.");
  process.exit(0);
}

// All "Test Your Knowledge" questions from the handbook, grouped by handbook section.
// Each entry: [question, options[4], correctIndex, explain]
// Answers derived from the handbook text in assets/pdf.md / englishcdlhandbook.pdf.
const TYK = [];

// ---- Section 2.1 (vehicle inspection) ----
TYK.push(["What is the most important reason for doing a pre-trip vehicle inspection?",
  ["Safety for yourself and for other road users", "To avoid traffic tickets", "To save the company money", "To find out the fuel level"],
  0, "Safety is the most important reason to inspect your vehicle - safety for yourself and for other road users."]);
TYK.push(["What things should you check during a trip?", [
  "Gauges, your senses, and critical items when you stop (tires, brakes, lights, cargo securement)",
  "Only the fuel gauge", "Only the mirrors", "The radio and heater"],
  0, "During a trip watch gauges, use your senses (look, listen, smell, feel), and check critical items when you stop: tires, brakes, lights, connections, and cargo."]);
TYK.push(["Name some key steering system parts.", [
  "Tie rod, spindle, and pitman arm", "Main spring, axle, and shackle", "Rim, lug nuts, and tire", "Leaf spring, frame, and torque rod"],
  0, "Important steering system parts include the steering wheel, steering shaft, tie rod, spindle, and pitman arm."]);
TYK.push(["Name some suspension system defects.", [
  "Cracked or broken spring hangers, leaking shock absorbers, and broken leaves in the leaf spring",
  "Worn tires", "Low oil", "Fogged headlights"],
  0, "Suspension defects include cracked or broken spring hangers, leaking shock absorbers, and broken leaves in the leaf spring."]);
TYK.push(["What three kinds of emergency equipment must you have?", [
  "Fire extinguisher, spare electrical fuses (or circuit breakers), and warning devices (reflective triangles)",
  "First aid kit, flares, and water", "Jack, lug wrench, and spare tire", "CB radio, fire extinguisher, and blanket"],
  0, "You must carry a fire extinguisher, spare electrical fuses (unless you have circuit breakers), and warning devices for parked vehicles (three reflective triangles)."]);
TYK.push(["What is the minimum tread depth for front tires? For other tires?", [
  "4/32 inch on front tires, 2/32 inch on all other tires",
  "2/32 inch on all tires", "1/32 inch on all tires", "6/32 inch on all tires"],
  0, "Front (steering) tires need at least 4/32 inch tread depth; all other tires need at least 2/32 inch."]);
TYK.push(["Name some things you should check on the front of your vehicle during the walk-around inspection.", [
  "Headlights, turn signals, windshield wipers, mirrors, tires, and the steering mechanism",
  "Only the headlights", "Only the tires", "Only the bumper condition"],
  0, "On the front of the vehicle during walk-around, check headlights, turn signals, windshield wipers and washer, mirrors, tires, and the steering linkage."]);
TYK.push(["What should wheel bearing seals be checked for?", [
  "Leaks", "Color changes", "Gasoline", "Smoke"],
  0, "Check wheel bearing seals for leaks - look for moisture around the seal and drops or a puddle underneath."]);
TYK.push(["How many red reflective triangles should you carry?", [
  "Three", "One", "Two", "Four"],
  0, "You must carry three red reflective triangles (or six fusees or three liquid-burning flares) for warning parked vehicles."]);
TYK.push(["How do you test hydraulic brakes for leaks?", [
  "Pump the brake pedal three times and apply firm pressure for 5 seconds; the pedal should not move",
  "Hold the brake down for 5 seconds and listen", "Move forward and step on the brake hard", "Pump the pedal five times for 3 seconds"],
  0, "To test hydraulic brakes for leaks, pump the brake pedal three times, hold firm pressure for 5 seconds; the pedal should not move."]);
TYK.push(["Why put the starter switch key in your pocket during the vehicle inspection?", [
  "So someone cannot start and move the truck while you are inspecting it",
  "Someone could steal the truck", "It could damage the starter", "All of the above"],
  1, "Put the key in your pocket during the pre-trip so someone (like a co-driver) cannot start the vehicle and accidentally injure you."]);

// ---- Section 2.2/2.3 (basic control & shifting) ----
TYK.push(["Why should you back toward the driver's side?", [
  "So you can see better and avoid hitting something you cannot see",
  "It is required by law", "It protects the transmission", "It saves fuel"],
  0, "Back toward the driver's side whenever possible so you can see the way you are going and avoid problems you cannot see."]);
TYK.push(["If stopped on a hill, how can you start moving without rolling back?", [
  "Partly engage the clutch before you take your right foot off the brake",
  "Put blocks behind the tires", "Increase RPMs and release the clutch quickly", "Leave the trailer brakes on"],
  0, "Partly engage the clutch before taking your foot off the brake so the vehicle starts forward instead of rolling back on a hill."]);
TYK.push(["When backing, why is it important to use a helper?", [
  "To help you see backing areas you cannot see from the cab and to guide you safely",
  "Because the law requires it", "To help shift gears", "To signal other traffic"],
  0, "A helper guides you because you cannot see all backing areas from the cab. Agree on hand signals beforehand."]);
TYK.push(["What's the most important hand signal that you and the helper should agree on?", [
  "The stop signal", "The turn signal", "The speed signal", "The distance signal"],
  0, "The stop signal is the most important to agree on because a misunderstanding could cause a crash."]);
TYK.push(["What are the two special conditions where you should downshift?", [
  "Before starting down a hill and before entering a curve",
  "Before starting up a hill and before parking", "In intersections and at stop signs", "When it rains and when it is dark"],
  0, "You should downshift before starting down a hill and before entering a curve so you have engine braking and control."]);
TYK.push(["When should you downshift automatic transmissions?", [
  "Before starting down a hill or curve, using the lower gear selector",
  "Only when stopped", "Never", "Only uphill"],
  0, "Downshift automatics before starting down a hill or entering a curve using the proper lower gear selector."]);
TYK.push(["Retarders keep you from skidding when the road is slippery. True or False?", [
  "False", "True", "Only with ABS", "Only on dry roads"],
  0, "False. Retarders can cause the drive wheels to skid when the road is slippery, especially in rain, snow, or ice."]);
TYK.push(["What are the two ways to know when to shift?", [
  "Engine speed (RPM) and road speed", "Wind speed and time", "Tire pressure and load", "Fuel level and gear indicator"],
  0, "Know when to shift by engine speed (the RPM range for each gear) and by road speed."]);

// ---- Section 2.4/2.5/2.6 (seeing, communicating, space) ----
TYK.push(["How far ahead does the manual say you should look?", [
  "At least 12 to 15 seconds ahead (about one city block at low speed, a quarter mile at highway speed)",
  "One car length", "500 feet", "Just past the hood"],
  0, "Look at least 12 to 15 seconds ahead - about one city block at low speed and a quarter mile at highway speed."]);
TYK.push(["What are two main things to look for ahead?", [
  "Other vehicles and traffic signs/signals", "Gas stations and rest stops", "Overpasses and tunnels", "Pedestrians and animals"],
  0, "The two main things to look ahead for are other vehicles (which can cause hazards) and traffic signs and signals (which require action)."]);
TYK.push(["What's your most important way to see the sides and rear of your vehicle?", [
  "Your mirrors", "A rear view camera", "The side windows", "A spotter"],
  0, "Mirrors are the best and most important way to see the sides and rear of your CMV."]);
TYK.push(["What does 'communicating' mean in safe driving?", [
  "Letting others know you are there by using turn signals, four-way flashers, and the horn",
  "Using a CB radio", "Using hand signals", "Honking at every vehicle"],
  0, "Communicating means letting others know you are there and what you plan to do by using turn signals, four-way flashers, and the horn."]);
TYK.push(["Where should you place reflectors when stopped on a divided highway?", [
  "10 feet, 100 feet, and 200 feet toward approaching traffic",
  "100, 200, and 300 feet", "20, 50, and 100 feet", "50, 100, and 150 feet"],
  0, "On a one-way or divided highway place reflective triangles at 10 feet, 100 feet, and 200 feet toward approaching traffic."]);
TYK.push(["What three things add up to total stopping distance?", [
  "Perception distance + reaction distance + braking distance",
  "Braking distance + reaction distance", "Perception + braking + skid distance", "Reaction + viewing + braking"],
  0, "Total stopping distance = perception distance + reaction distance + braking distance."]);
TYK.push(["If you go twice as fast, will your stopping distance increase by two or four times?", [
  "Four times", "Two times", "Three times", "It stays the same"],
  0, "Doubling your speed increases your stopping distance by about four times (it rises with the square of speed)."]);
TYK.push(["Empty trucks have the best braking. True or False?", [
  "False", "True", "Only on dry roads", "Only at low speed"],
  0, "False. Empty trucks have less traction on the rear and can lock up more easily, making them harder to control when stopping."]);
TYK.push(["What is hydroplaning?", [
  "When tires lose contact with the road and ride on a film of water, so you lose steering and braking",
  "When the engine overheats", "When the brakes lock", "When the wheels spin"],
  0, "Hydroplaning is when the tires ride on a film of water and lose contact with the road, so you lose steering and braking control."]);
TYK.push(["What is 'black ice'?", [
  "A thin, nearly invisible coating of ice on the road that looks wet and is very slippery",
  "Ice on the windshield", "Frost on the roof", "Packed snow"],
  0, "Black ice is a thin, nearly invisible layer of ice that makes the road look wet. It is very slippery and hard to see."]);

// ---- Section 2.7/2.8 (space & hazards) ----
TYK.push(["How do you find out how many seconds of following distance space you have?", [
  "Pick a fixed object ahead and count the seconds from when the vehicle ahead passes it until you pass it",
  "Use a stopwatch on a mile marker", "Estimate by speedometer", "Count while texting a friend"],
  0, "Pick a fixed object ahead (shadow or landmark). Count the seconds from when the vehicle ahead passes it until you pass it - that is your following distance in seconds."]);
TYK.push(["If you are driving a 30-foot vehicle at 55 mph, how many seconds of following distance should you allow?", [
  "At least 4 seconds (1 second per 10 feet + 1 second for speed over 40 mph)",
  "2 seconds", "1 second", "10 seconds"],
  0, "At 55 mph (>40 mph) with a 30-foot vehicle: 3 seconds (1 per 10 ft) + 1 second = 4 seconds of following distance."]);
TYK.push(["You should decrease your following distance if somebody is following you too closely. True or False?", [
  "False - you should increase following distance to be able to stop more smoothly",
  "True", "Only at night", "Only on hills"],
  0, "False. If someone follows too closely, increase your following distance so you can stop more gradually and avoid being rear-ended."]);
TYK.push(["If you swing wide to the left before turning right, another driver may try to pass you on the right. True or False?", [
  "True", "False", "Only with a trailer", "Only in the city"],
  0, "True. If you swing wide to the left, another driver may try to pass on the right while you are turning. Turn with the rear as close to the curb as possible."]);
TYK.push(["What is a hazard?", [
  "Any road condition or other road user that is a possible danger (something you must plan for)",
  "Only a stopped vehicle", "Only a pedestrian", "Only bad weather"],
  0, "A hazard is any road condition or other road user that is a possible danger - something you must see, plan for, and respond to."]);
TYK.push(["Why make emergency plans when you see a hazard?", [
  "To give you more time to act and avoid sudden braking or swerving that causes crashes",
  "To avoid the hazard altogether", "Because the law requires it", "To warn other drivers"],
  0, "Planning ahead when you spot a hazard gives you more time to act smoothly, avoiding sudden braking or swerving that is more likely to cause a crash."]);

// ---- Section 2.9/2.10 (distracted & aggressive driving) ----
TYK.push(["What are some tips to follow so you won't become a distracted driver?", [
  "Finish phone calls and eating before driving, keep your attention on the road, and avoid non-driving activities",
  "Drink coffee to stay alert", "Use hands-free devices", "Drive with the radio loud"],
  0, "Finish calls, eating, or other activities before driving. Keep your full attention on the driving task and never text or hold a phone while driving."]);
TYK.push(["How do you use in-vehicle communications equipment cautiously?", [
  "Pull over to a safe place before using a phone or CB; never text or dial while driving",
  "Use it only on the highway", "Use it with one hand", "Use voice commands while driving"],
  0, "You may not hold a mobile phone to talk, dial by pressing more than one button, or text while driving. Pull over safely to use communications equipment."]);
TYK.push(["How do you recognize a distracted driver?", [
  "Vehicles drifting, swerving, slowing and speeding up erratically, and delayed reactions",
  "A driver who signals early", "A driver who stays in one lane", "A driver who looks in mirrors"],
  0, "Distracted drivers may drift out of lane, swerve, slow and speed up erratically, and react late to traffic or lights."]);
TYK.push(["What is the difference between aggressive driving and road rage?", [
  "Road rage is driving with the intent to cause harm or assault; aggressive driving is dangerous, pushy driving without that intent",
  "They are the same", "Aggressive driving is more dangerous", "Road rage is legal"],
  0, "Aggressive driving is dangerous, pushy behavior that can cause crashes. Road rage is operating a vehicle with intent to harm someone or assault them."]);
TYK.push(["What should you do when confronted with an aggressive driver?", [
  "Ignore rude gestures, avoid eye contact, do not react, and call the police if you can safely do so",
  "Return the gestures", "Speed away", "Block their lane"],
  0, "Do not give the aggressive driver the confrontation they want. Ignore the behavior, avoid eye contact, seek safety, and call police if safe to do so."]);
TYK.push(["What are some things you can do to reduce your stress before and while you drive?", [
  "Give yourself plenty of time, keep a routine, and stay calm and focused on safe driving",
  "Drive faster to save time", "Tailgate slow drivers", "Honk at every delay"],
  0, "Reduce stress by allowing plenty of time, keeping a consistent routine, being courteous, and staying calm and focused - this also keeps you safer."]);

// ---- Section 2.11-2.14 (night, fatigue, weather, hot/cold) ----
TYK.push(["You should use low beams whenever you can. True or False?", [
  "True", "False", "Only on the highway", "Only in the city"],
  0, "True. High beams can blind other drivers and reduce your vision as the light reflects back. Use low beams whenever possible."]);
TYK.push(["What should you do before you drive if you are drowsy?", [
  "Sleep before you drive - never start a trip when drowsy",
  "Drink coffee", "Open the window", "Turn up the radio"],
  0, "If you are drowsy, sleep before driving. You cannot rely on coffee, fresh air, or radio to keep you alert."]);
TYK.push(["What effects can wet brakes cause? How can you avoid these problems?", [
  "Wet brakes apply unevenly, work weakly, or grab; avoid them by drying with light brake pressure and driving carefully through water",
  "They stop faster", "They overheat", "They have no effect"],
  0, "Wet brakes may apply unevenly, work weakly, or grab. After going through water, use light brake pressure to dry them and slow down."]);
TYK.push(["You should let air out of hot tires so the pressure goes back to normal. True or False?", [
  "False - hot tires should not be bled; pressure rises with heat and is normal",
  "True", "Only over 100 psi", "Only in summer"],
  0, "False. Do not let air out of hot tires. Tire pressure increases with heat normally; bleeding them while hot can cause underinflation problems."]);
TYK.push(["You can safely remove the radiator cap as long as the engine isn't overheated. True or False?", [
  "False - the system must cool completely and you should still be careful of pressure and steam",
  "True", "Only at night", "Only if there is no overflow"],
  0, "False. Even if the engine is not overheated, the cooling system holds pressure and hot steam. Let it cool completely and remove the cap carefully."]);

// ---- Section 2.15/2.16 (rail crossings & mountains) ----
TYK.push(["What factors determine your selection of a 'safe' speed when going down a long, steep downgrade?", [
  "Total weight of the vehicle and cargo, length of the grade, steepness, road conditions, and weather",
  "Only the posted limit", "Only the load weight", "Only the grade length"],
  0, "Select a safe speed based on total weight and cargo, length and steepness of the grade, road conditions, and weather."]);
TYK.push(["Why should you be in the proper gear before starting down a hill?", [
  "Because you will not be able to shift into a lower gear once your speed builds up",
  "Because the clutch needs to be warm", "There is no reason", "To save fuel"],
  0, "You cannot downshift into a lower gear once speed builds up going downhill, and you could lose all engine braking effect."]);
TYK.push(["Describe the proper braking technique when going down a long, steep downgrade.", [
  "Use the engine braking effect as the principal control; apply brakes to slow about 5 mph below your safe speed, then release and repeat",
  "Hold the brakes down continuously", "Pump the brakes fast", "Turn on the exhaust brake"],
  0, "Use engine braking as the principal control. Apply brakes just enough to feel a slowdown, reduce about 5 mph below safe speed, release, and repeat."]);
TYK.push(["What type of vehicles can get stuck on a railroad-highway crossing?", [
  "Low-slung units (lowboy, car carrier, moving van, possum-belly livestock trailer)",
  "Only school buses", "Only doubles", "Only vehicles without air brakes"],
  0, "Low-slung units and single-axle tractors with long trailers can hang up on raised railroad crossings."]);
TYK.push(["How long does it take for a typical tractor-trailer unit to clear a double track?", [
  "More than 15 seconds", "14 seconds", "10 seconds", "More than 30 seconds"],
  0, "It takes a tractor-trailer at least 14 seconds to clear a single track and more than 15 seconds to clear a double track."]);

// ---- Section 2.17/2.18/2.19 (emergencies, ABS, skids) ----
TYK.push(["Stopping is not always the safest thing to do in an emergency. True or False?", [
  "True", "False", "Only with a trailer", "Only at night"],
  0, "True. You can often turn to miss an obstacle more quickly than you can stop. Stopping is not always the safest action."]);
TYK.push(["What are some advantages of going right instead of left around an obstacle?", [
  "Avoids oncoming traffic and a head-on collision; the shoulder is usually clear",
  "You stop faster", "It is shorter", "You can accelerate more"],
  0, "Going right avoids forcing anyone into opposing traffic and a head-on collision. No one is likely to be driving on the shoulder."]);
TYK.push(["What is an 'escape ramp'?", [
  "A long bed of loose, soft material to slow and stop a runaway vehicle, sometimes with an upgrade",
  "An off ramp", "A passing lane", "A rest area"],
  0, "An escape ramp is a long bed of loose material used to stop a runaway vehicle, sometimes combined with an upgrade."]);
TYK.push(["If a tire blows out, you should put the brakes on hard to stop quickly. True or False?", [
  "False - hold the wheel firmly and stay off the brake until you slow down, then brake gently",
  "True", "Only on the front tires", "Only below 40 mph"],
  0, "False. Braking hard after a blowout can cause loss of control. Hold the wheel firmly and stay off the brake until the vehicle slows."]);
TYK.push(["How do you know if your vehicle has antilock brakes?", [
  "A yellow ABS malfunction lamp on the instrument panel (or on the left side of a trailer)",
  "Check the tires", "Listen for a buzzer", "Look at the headlights"],
  0, "Vehicles with ABS have a yellow ABS malfunction lamp on the instrument panel; trailers have one on the left side near the front or rear corner."]);
TYK.push(["What is the proper braking technique when driving a vehicle with antilock brakes?", [
  "Brake the same way you always have, using only the force needed; in an emergency with ABS on all axles you can fully apply the brakes",
  "Pump the brakes", "Brake harder than normal", "Never brake hard"],
  0, "With ABS, brake normally. Do not pump - ABS only works with steady pressure. In an emergency with ABS on all axles, you can fully apply the brakes."]);
TYK.push(["How do antilock brakes help you?", [
  "They keep wheels from locking so you maintain steering control and avoid skids/jackknifes",
  "They shorten your stopping distance", "They increase stopping power", "They let you drive faster"],
  0, "ABS keeps wheels from locking during hard braking so you maintain steering control and avoid brake-induced skids or jackknifes."]);

// ---- Section 2.20/2.21 (accidents & fires) ----
TYK.push(["What are some things to do at an accident scene to prevent another accident?", [
  "Get the vehicle off the road if possible, turn on flashers, and set out reflective triangles",
  "Leave the scene", "Block traffic", "Turn off your lights"],
  0, "To protect the area, move vehicles off the road if possible, turn on flashers, and set out reflective triangles to warn traffic."]);
TYK.push(["Name two causes of tire fires.", [
  "Underinflated tires and dual tires that touch",
  "Hot brakes and worn treads", "Overinflated tires and speed", "Old tires and rain"],
  0, "Two causes of tire fires are underinflated tires and dual tires that touch each other."]);
TYK.push(["What kinds of fires is a B:C extinguisher not good for?", [
  "Ordinary combustible fires (Class A) such as wood, paper, and cloth",
  "Electrical fires", "Flammable-liquid fires", "Grease fires"],
  0, "A B:C extinguisher is for electrical and flammable-liquid fires, not for ordinary combustible (Class A) fires like wood, paper, and cloth."]);
TYK.push(["When using your extinguisher, should you get as close as possible to the fire?", [
  "No - stand at a safe distance and aim at the base of the fire",
  "Yes, as close as possible", "Only on flat ground", "Only in a crosswind"],
  0, "Stand at a safe distance and aim at the base of the fire. Do not get closer than necessary, as heat and fumes are dangerous."]);
TYK.push(["Name some causes of vehicle fires.", [
  "Electrical shorts, fuel leaks, overheated brakes, and poor maintenance",
  "Cold weather", "Washing the truck", "Using the horn"],
  0, "Vehicle fires can be caused by electrical shorts, fuel and oil leaks, overheated brakes and tires, and poor maintenance."]);

// ---- Section 2.22/2.23 (alcohol/drugs/hazmat basics) ----
TYK.push(["Common medicines for colds can make you sleepy. True or False?", [
  "True", "False", "Only at night", "Only if taken with alcohol"],
  0, "True. Many cold and allergy medicines cause drowsiness. Read labels and never drive if a medicine makes you sleepy."]);
TYK.push(["Coffee and a little fresh air will help a drinker sober up. True or False?", [
  "False - only time clears alcohol from the bloodstream",
  "True", "Only after several cups", "Only with food"],
  0, "False. Only time removes alcohol from the bloodstream. Coffee, fresh air, and cold showers do not sober a person up."]);
TYK.push(["What is a hazardous materials placard?", [
  "A diamond-shaped sign on the vehicle that identifies hazardous materials and warns of the risk",
  "A license plate", "A registration sticker", "A warning light"],
  0, "A placard is a diamond-shaped warning sign placed on the vehicle to identify hazardous materials being hauled."]);
TYK.push(["Why are placards used?", [
  "To communicate the risk of the product being hauled",
  "To show the carrier's logo", "To track fuel", "To identify the driver"],
  0, "Placards are used to communicate the risk of the hazardous material being transported."]);

// ---- Section 3 (cargo) ----
TYK.push(["What four things related to cargo are drivers responsible for?", [
  "Inspecting the cargo, recognizing overloads, making sure it is properly secured, and that it is distributed correctly",
  "Loading, unloading, weighing, and delivering", "Buying, selling, packing, and shipping", "Only securing it"],
  0, "Drivers are responsible for inspecting cargo, recognizing overloads, making sure it is properly secured, and ensuring it is distributed correctly."]);
TYK.push(["How often must you stop while on the road to check your cargo?", [
  "Within the first 50 miles, then every 150 miles or every 3 hours, whichever comes first",
  "Every 500 miles", "Once a day", "Only at fuel stops"],
  0, "Check cargo within the first 50 miles, then every 150 miles or every 3 hours, whichever comes first."]);
TYK.push(["How is Gross Combination Weight Rating different from Gross Combination Weight?", [
  "GCWR is the maximum weight the manufacturer allows (rating); GCW is the actual total weight of the loaded combination",
  "They are the same", "GCW is a rating, GCWR is actual", "Both are empty weights"],
  0, "GCWR is the maximum weight the vehicle combination is rated to carry; GCW is the actual present weight of the loaded combination."]);
TYK.push(["Name two situations where legal maximum weights may not be safe.", [
  "On steep downgrades and in poor weather/traction conditions",
  "Only on bridges", "Only in the city", "Only at night"],
  0, "A legal maximum-weight load may be unsafe on steep downgrades or in bad weather because it increases stopping distance and rollover risk."]);
TYK.push(["What can happen if you don't have enough weight on the front axle?", [
  "The steering may be hard to control and the vehicle can oversteer dangerously",
  "The brakes lock up", "The tires wear faster", "The cargo shifts"],
  0, "Without enough weight on the front axle, the steering wheels can lose traction, making the vehicle hard to steer especially in curves."]);
TYK.push(["What is the minimum number of tie-downs for any flatbed load?", [
  "Two", "One", "Three", "Four"],
  0, "The minimum number of tie-downs is two, regardless of how small the load is."]);
TYK.push(["What is the minimum number of tie-downs for a 20-foot load?", [
  "Two (one per 10 feet, minimum two)",
  "One", "Three", "Four"],
  0, "Use at least one tie-down per 10 feet of load, with a minimum of two. A 20-foot load needs at least two."]);
TYK.push(["Name the two basic reasons for covering cargo on an open bed.", [
  "To protect the cargo from weather and to prevent it from blowing or falling off",
  "To improve fuel economy and looks", "To keep it clean and dry only", "To reduce weight"],
  0, "Cover cargo on an open bed to protect it from the weather and to prevent it from blowing away or falling off."]);
TYK.push(["What must you check before transporting a sealed load?", [
  "That the load is properly balanced and secured in the vehicle",
  "That the seal numbers match the bill", "That the seal is authentic", "The cargo's freshness"],
  0, "With a sealed load you cannot look inside, but you are still responsible for ensuring the load is properly balanced and secured."]);

// ---- Section 4 (passengers/bus) ----
TYK.push(["Name some things to check in the interior of a bus during a vehicle inspection.", [
  "Emergency exits, fire extinguisher, seats, floor, mirrors, and the parking brake",
  "Only the seats", "Only the windows", "Only the engine"],
  0, "In the bus interior, check emergency exits, fire extinguisher, seats, floor condition, mirrors, and that the parking brake works."]);
TYK.push(["What are some hazardous materials you can transport by bus?", [
  "Small-arms ammunition, tear gas, and emergency hospital supplies (per the allowed exceptions)",
  "Explosives", "Radioactive materials", "Flammable liquids in bulk"],
  0, "A bus may carry certain small quantities of materials like small-arms ammunition, tear gas, and hospital emergency supplies per exceptions."]);
TYK.push(["What are some hazardous materials you can't transport by bus?", [
  "Explosives, flammable liquids, and most other hazardous materials not allowed by exceptions",
  "Small-arms ammunition", "Hospital supplies", "Tear gas"],
  0, "Buses generally may not carry explosives, flammable liquids, and most other hazardous materials unless a specific exception applies."]);
TYK.push(["What is a standee line?", [
  "A line on the floor (or seats) in front of which standees may not pass in a bus",
  "A line where passengers wait", "A bus stop marker", "A safety rail"],
  0, "The standee line marks the point in the bus floor (or seats) in front of which standing passengers may not go, keeping the driver's area clear."]);
TYK.push(["Does it matter where you make a disruptive passenger get off the bus?", [
  "Yes - do so only at a safe place, never on the highway or where it is unsafe",
  "No, anywhere is fine", "Only at a police station", "Only at a bus stop"],
  0, "Make a disruptive passenger get off only at a safe place, never on the highway or where it would endanger the passenger or traffic."]);
TYK.push(["How far from a railroad crossing should you stop?", [
  "Between 15 and 50 feet from the nearest rail",
  "At the rail", "100 feet", "25 feet past it"],
  0, "Stop between 15 and 50 feet from the nearest rail so you can see the tracks clearly."]);
TYK.push(["When must you stop before crossing a drawbridge?", [
  "When the drawbridge has no signal or has a sign requiring a stop",
  "Never", "Only when buses are present", "Only at night"],
  0, "Stop before crossing a drawbridge when it has no signal or has a sign requiring a stop; also obey any gates or signals."]);
TYK.push(["Describe from memory the 'prohibited practices' listed in the manual.", [
  "No standing passengers past the standee line, no disruptive passengers left in unsafe areas, no moving students you believe may be seriously injured unless danger, and no driving when the bus is unsafe",
  "No talking while driving", "No radio", "No lane changes"],
  0, "Prohibited practices include not letting standees past the standee line, not removing passengers in unsafe places, not moving a seriously injured student unless necessary, and not moving an unsafe bus."]);
TYK.push(["The rear door of a transit bus has to be open to put on the parking brake. True or False?", [
  "False", "True", "Only for school buses", "Only at night"],
  0, "The statement is used to check if you know the parking brake: on many buses you set the parking brake with the rear door in a specific position, but the manual does not require the rear door to be open. (False - you should test the parking brake as directed.)"]);

// ---- Section 5 (air brakes) ----
TYK.push(["Why must air tanks be drained?", [
  "Water and compressor oil collect there and can freeze or coagulate and cause brake failure",
  "To lower tire pressure", "To fill them with air", "To cool the brakes"],
  0, "Air tanks collect water and compressor oil. If not drained, the water can freeze and cause brake failure."]);
TYK.push(["What is a supply pressure gauge used for?", [
  "To show how much air pressure is in the tanks/supply system",
  "To measure brake pad wear", "To show fuel level", "To show oil pressure"],
  0, "The supply pressure gauge shows how much air pressure is in the supply (storage) system."]);
TYK.push(["All vehicles with air brakes must have a low air pressure warning signal. True or False?", [
  "True", "False", "Only combination vehicles", "Only tank vehicles"],
  0, "True. All vehicles with air brakes must have a low air pressure warning signal (light and/or buzzer) that comes on before pressure drops below 55 psi."]);
TYK.push(["What are spring brakes?", [
  "Powerful springs that apply the brakes automatically if air pressure is lost or drops too low",
  "Brakes on the spring suspension", "Hydraulic brakes", "The parking brake lever"],
  0, "Spring brakes use powerful springs that apply the brakes automatically when air pressure is lost or drops too low."]);
TYK.push(["Front wheel brakes are good under all conditions. True or False?", [
  "False", "True", "Only in dry conditions", "Only at low speed"],
  0, "False. On slippery surfaces, locking the front wheels causes loss of steering control, so front brakes are not good under all conditions."]);
TYK.push(["How do you know if your vehicle is equipped with antilock brakes?", [
  "A yellow ABS malfunction lamp on the instrument panel (or left side of a trailer)",
  "Check the tires", "Listen for a buzzer", "Look at the brakes"],
  0, "Vehicles with ABS have a yellow ABS malfunction lamp on the instrument panel; trailers have one on the left side near the front or rear corner."]);

TYK.push(["What is a dual air brake system?", [
  "Two separate air brake systems with their own tanks and lines that use a single set of brake controls",
  "Two systems that share the same tanks", "A primary and backup that never work together", "One system with two levers"],
  0, "A dual air brake system has two separate systems, each with its own tanks and lines, that use a single set of brake controls for safety."]);
TYK.push(["What are the slack adjusters?", [
  "Part of the air brake system used to adjust the brakes to keep them safe",
  "Devices that couple the trailer", "Springs that release brakes", "Valves that control air flow"],
  0, "Slack adjusters are part of the air brake system that allow you to adjust the brakes so they apply evenly."]);
TYK.push(["How can you check slack adjusters?", [
  "Use gloves and pull hard on each slack adjuster; they should not have more than about one inch of 'give'",
  "Accelerate then brake hard", "Press the brake pedal and listen", "Check the gauges"],
  0, "Pull hard on each slack adjuster with gloves. If there is an inch or more of 'give', the brakes need adjustment."]);
TYK.push(["How can you test the low pressure warning signal?", [
  "Shut the engine off, turn the key on, and step on and off the brake pedal; the warning must come on before pressure drops below 55 psi",
  "Brake hard at speed", "Drain all the air", "Listen for leaks"],
  0, "With the engine off and key on, pump the brake pedal. The low air pressure warning must activate before pressure drops below 55 psi."]);
TYK.push(["How can you check that the spring brakes come on automatically?", [
  "Keep stepping on and off the brake pedal until pressure drops and the spring brakes deploy and the parking valve pops out",
  "Only at a shop", "Pull the hand valve", "Push the pedal to the floor"],
  0, "Step on and off the brake pedal to lower air pressure until the spring brakes come on automatically and the parking brake valve pops out."]);
TYK.push(["What are the maximum leakage rates?", [
  "3 psi in 1 minute (single), 4 psi in 1 minute (combination), 2 psi in 1 minute (air-over-hydraulic and trailers)",
  "10 psi in 1 minute", "15 psi in 1 minute", "1 psi in 5 minutes"],
  0, "Maximum leak rates: 3 psi/min single, 4 psi/min combination, 2 psi/min air-over-hydraulic and trailers."]);

TYK.push(["Why should you be in the proper gear before starting down a hill?", [
  "You will not be able to shift into a lower gear once speed builds up",
  "The clutch needs warmth", "There is no need", "To save fuel"],
  0, "You cannot downshift once speed builds up downhill, and you could lose all engine braking."]);
TYK.push(["What factors can cause brakes to fade or fail?", [
  "Excessive service braking, not using engine braking enough, and brakes out of adjustment",
  "Only cold weather", "Worn tires", "High speeds"],
  0, "Brakes fade or fail from excess heat caused by excessive service braking, not relying on engine braking, or out-of-adjustment brakes."]);
TYK.push(["The use of brakes on a long, steep downgrade is only a supplement to the braking effect of the engine. True or False?", [
  "True", "False", "Only with ABS", "Only on dry roads"],
  0, "True. On long downgrades the engine braking effect is the principal control; the brakes only supplement it."]);
TYK.push(["If you are away from your vehicle only a short time, you do not need to use the parking brake. True or False?", [
  "False - always use the parking brake even for a short time",
  "True", "Only on hills", "Only for long stops"],
  0, "False. Always set the parking brake whenever you leave the vehicle, even briefly, and chock the wheels if needed."]);
TYK.push(["How often should you drain air tanks?", [
  "At the end of each working day",
  "At the end of each month", "Once a year", "Whenever the gauge is low"],
  0, "Unless the vehicle has automatic drains, drain the air tanks at the end of each working day."]);
TYK.push(["How should you brake when you drive a tractor-trailer combination with ABS?", [
  "Brake the same way you always have, using only the braking force necessary to stay in control",
  "Press the pedal to the floor on every stop", "Pump the brakes", "Never use the service brakes"],
  0, "With ABS on a tractor-trailer, brake just as you always have - use only the braking force needed to stop safely and stay in control."]);
TYK.push(["You still have normal brake functions if your ABS is not working. True or False?", [
  "True", "False", "Only on trailers", "Only on the tractor"],
  0, "True. If ABS malfunctions you still have normal brakes. Drive normally but have the ABS serviced soon."]);

// ---- Section 6 (combination vehicles) ----
TYK.push(["What two things are important to prevent rollover?", [
  "Keep cargo as close to the ground as possible and drive slowly around turns",
  "Wide tires and low speed", "Heavy load and strong brakes", "Air brakes and ABS"],
  0, "To prevent rollover, keep cargo as close to the ground as possible and drive slowly around turns."]);
TYK.push(["When you turn suddenly while pulling doubles, which trailer is most likely to turn over?", [
  "The rear (last) trailer", "The front trailer", "The tractor", "All equally"],
  0, "When turning suddenly with doubles, the last trailer is most likely to turn over because of rearward amplification (crack-the-whip effect)."]);
TYK.push(["Why should you not use the trailer hand brake to straighten out a jackknifing trailer?", [
  "The skid was caused by wheel lockup, and using the hand brake makes it worse by locking the trailer wheels more",
  "It is illegal", "It damages the brakes", "It uses too much air"],
  0, "If the trailer is jackknifing because its wheels locked, applying the trailer hand brake locks them more and worsens the skid. Release the brakes instead."]);
TYK.push(["What is off-tracking?", [
  "When the rear wheels follow a different (shorter) path than the front wheels in a turn",
  "Driving off the road", "Swerving", "Tail swing"],
  0, "Off-tracking is when the rear wheels go a different (shorter) path than the front wheels while turning a corner."]);
TYK.push(["When you back a trailer, you should position your vehicle so you can back in a curved path to the driver's side. True or False?", [
  "True", "False", "Only with a helper", "Only at night"],
  0, "True. Back toward the driver's side in a curved path whenever possible so you can see the way you are going."]);
TYK.push(["What type of trailers can get stuck on railroad-highway crossings?", [
  "Low-slung trailers (lowboy, car carrier, moving van, possum-belly livestock trailer)",
  "Only flatbeds", "Only tankers", "Only doubles"],
  0, "Low-slung trailers like lowboys, car carriers, moving vans, and possum-belly livestock trailers can hang up on raised rail crossings."]);

TYK.push(["Why should you not use the trailer hand valve while driving?", [
  "Because of the danger of making the trailer skid",
  "It is illegal", "It doesn't work as well", "You could lose the trailer"],
  0, "Never use the trailer hand valve while driving because it may cause the trailer to skid."]);
TYK.push(["Describe what the trailer air supply control does.", [
  "It supplies air to (and protects) the trailer and releases/keeps the trailer brakes when pulled out",
  "It controls the horn", "It fills the tires", "It locks the fifth wheel"],
  0, "The trailer air supply control supplies air to the trailer air tanks and applies/releases the trailer emergency brakes. Pulling it out lets air out and applies the trailer brakes."]);
TYK.push(["Describe what the service line is for.", [
  "It carries air controlled by the foot brake or trailer hand brake to apply the trailer brakes",
  "It supplies air to the tanks", "It drains the tanks", "It powers the ABS"],
  0, "The service line carries air, controlled by the foot brake or trailer hand valve, that applies more or less pressure to the trailer brakes."]);
TYK.push(["What is the emergency air line for?", [
  "It supplies air to the trailer air tanks and controls the trailer emergency brakes",
  "It powers the ABS", "It fills the tires", "It drains the tanks"],
  0, "The emergency air line has two purposes: it supplies air to the trailer air tanks and controls the emergency brakes."]);
TYK.push(["Why should you use chocks when parking a trailer without spring brakes?", [
  "Because without spring brakes the trailer can roll if air leaks out of the emergency line",
  "To protect the tires", "To level the trailer", "Because it is the law"],
  0, "A trailer without spring brakes can roll away if the emergency air line loses pressure. Use wheel chocks to keep it from moving."]);
TYK.push(["Where are shut-off valves?", [
  "At the back of trailers (rear) where the air lines meet the glad hands",
  "In the cab", "On the engine", "At the fuel tank"],
  0, "Shut-off valves are at the back of trailers where the air lines connect to the glad hands."]);

TYK.push(["What might happen if the trailer is too high when you try to couple?", [
  "The trailer may not couple correctly",
  "The tires will wear", "The brakes will drag", "The fifth wheel will break"],
  0, "If the trailer is too high when coupling, the kingpin may not engage the fifth wheel correctly."]);
TYK.push(["After coupling, how much space should be between the upper and lower fifth wheel?", [
  "No space - the trailer should be lying flat on the skid plate (no gap)",
  "About 1 inch", "About 2 inches", "Enough to see daylight"],
  0, "After coupling there should be no gap between the upper and lower fifth wheel - the trailer should lie flat on the skid plate."]);
TYK.push(["You should look into the back of the fifth wheel to see if it is locked onto the kingpin. True or False?", [
  "True", "False", "Only on triples", "Only for pintle hooks"],
  0, "True. Look into the back of the fifth wheel to confirm the locking jaws are closed on the kingpin."]);
TYK.push(["To drive you need to raise the landing gear only until it just lifts off the pavement. True or False?", [
  "False - you must raise the landing gear fully, as far as it will go",
  "True", "Only for short trips", "Only on level ground"],
  0, "False. Raise the landing gear fully (as far as it will go) before driving, not just until it lifts off the pavement."]);
TYK.push(["How do you know if your trailer is equipped with antilock brakes?", [
  "A yellow ABS malfunction lamp on the left side of the trailer (front or rear corner)",
  "Check the tires", "Listen for a buzzer", "Look at the brakes"],
  0, "Trailers with ABS have a yellow ABS malfunction lamp on the left side, on the front or rear corner."]);

TYK.push(["Which shut-off valves should be open and which closed?", [
  "All shut-off valves should be open except those at the back of the last trailer, which should be closed",
  "All closed", "All open", "Only the front open"],
  0, "Open all shut-off valves except those at the back of the last trailer, which stay closed."]);
TYK.push(["How can you test that air flows to all trailers?", [
  "Open the shut-off valves, build air pressure, and test the brakes on each trailer",
  "Check the tires", "Listen at the glad hands", "Drive and brake hard"],
  0, "Open the shut-off valves, build up air pressure, and confirm the brakes on each trailer apply and release."]);
TYK.push(["How can you test the tractor protection valve?", [
  "When tractor air pressure drops to about 25-40 psi, the valve should close automatically to keep air in the tractor",
  "Brake hard at speed", "There is no test", "Listen for a beep"],
  0, "The tractor protection valve closes automatically when tractor pressure drops to about 25-40 psi, protecting the tractor's air supply."]);
TYK.push(["How can you test the trailer emergency brakes?", [
  "With the trailer connected and aired up, pull the trailer air supply control or disconnect the emergency line; the trailer brakes should apply automatically",
  "Drive fast", "There is no test", "Check the tires"],
  0, "Operate the trailer air supply or disconnect the emergency line; the trailer emergency brakes should apply automatically."]);
TYK.push(["How can you test the trailer service brakes?", [
  "With the trailer connected and aired up, apply the service brakes (foot pedal or hand valve) and confirm the trailer brakes apply and release",
  "Accelerate", "There is no test", "Listen for a hiss"],
  0, "Apply the service brakes with the foot pedal or hand valve and confirm the trailer brakes apply and release."]);

// ---- Section 7 (doubles/triples) ----
TYK.push(["What is a converter dolly?", [
  "A chassis with one or two axles, a fifth wheel, and a drawbar used to couple a second or third trailer",
  "A tire-changing tool", "A coupling valve", "A brake type"],
  0, "A converter dolly is a chassis with one or two axles, a fifth wheel, and a drawbar used to couple additional trailers behind the first."]);
TYK.push(["Do converter dollies have spring brakes?", [
  "Yes, dollies built on or after April 1, 2001 are required to have spring brakes",
  "No, never", "Only on triples", "Only if equipped with ABS"],
  0, "Converter dollies built on or after April 1, 2001 are required to have spring brakes."]);
TYK.push(["What three methods can you use to secure a second trailer before coupling?", [
  "Chock the wheels, use the parking brake, or use the trailer's spring brakes",
  "Tie-downs, chains, or ropes", "Park uphill, use hand brake, or block the hitch", "None of these"],
  0, "Secure a second trailer before coupling using wheel chocks, the parking brake, or the trailer's spring brakes."]);
TYK.push(["How do you check to make sure trailer height is correct before coupling?", [
  "Make sure the trailer is low enough for the kingpin to engage the fifth wheel but high enough to clear the tractor nose",
  "Raise it as high as it goes", "Lower it to the ground", "It doesn't matter"],
  0, "Set the trailer height so the kingpin engages the fifth wheel properly but the trailer clears the tractor nose during coupling."]);
TYK.push(["What do you check when making a visual check of coupling?", [
  "The fifth wheel is locked on the kingpin, jaws and safety latch are closed, air lines connected, and landing gear raised",
  "Only the tires", "Only the paint", "Only the cab"],
  0, "Confirm the fifth wheel is locked on the kingpin with jaws and safety latch closed, air lines connected, and landing gear raised fully."]);
TYK.push(["Why should you pull a dolly out from under a trailer before you disconnect it from the trailer in front?", [
  "So you can reach the shut-off valves and disconnect safely without damaging the dolly or trailer",
  "To make it lighter", "There is no reason", "To inspect the tires"],
  0, "Pull the dolly out from under the trailer before disconnecting so you can access the shut-off valves and disconnect safely."]);
TYK.push(["What should you check for when inspecting the converter dolly? The pintle hook?", [
  "Secure mounting, tires, air lines, glad hands, safety chains, and lights; and the pintle hook for wear, damage, and secure mount",
  "Only the tires", "Only the color", "Nothing"],
  0, "Inspect the dolly for secure mounting, tires, air lines, glad hands, safety chains, and lights. Check the pintle hook for wear or damage and a secure mount."]);
TYK.push(["Should the shut-off valves on the rear of the last trailer be open or closed? On the first trailer of a set of doubles? On the middle trailer of a set of triples?", [
  "Closed on the rear of the last trailer; open on the first trailer of doubles and the middle trailer of triples",
  "All closed", "All open", "Only the middle closed"],
  0, "All shut-off valves should be open except those at the rear of the last trailer, which should be closed."]);
TYK.push(["How can you test that air flows to all trailers?", [
  "Open the shut-off valves, build air pressure, and test the brakes on each trailer",
  "Check the tires", "There is no test", "Drive and brake hard"],
  0, "Open the shut-off valves, build air pressure, and confirm the brakes on each trailer apply and release."]);
TYK.push(["How do you know if your converter dolly is equipped with antilock brakes?", [
  "Dollies built on or after March 1, 1998 have an ABS lamp on the left side; older units may have the ECU and wheel speed sensor wires underneath",
  "You cannot tell", "Check the color", "Listen for a beep"],
  0, "Dollies built on or after March 1, 1998 must have an ABS lamp on the left side. For older units, look under for the ECU and wheel speed sensor wires."]);

// ---- Section 8 (tank vehicles) ----
TYK.push(["How are bulkheads different than baffles?", [
  "Bulkheads are solid walls dividing the tank; baffles are partial walls with holes that slow liquid surge",
  "They are the same", "Baffles are solid, bulkheads have holes", "Bulkheads are outside, baffles inside"],
  0, "Bulkheads are solid walls separating tank compartments. Baffles are partial walls with openings that slow the forward-backward surge of liquid."]);
TYK.push(["Should a tank vehicle take curves, on ramps, or off ramps at the posted speed limits?", [
  "No - slow down well below posted limits because of surge and the high center of gravity",
  "Yes, always at the posted limit", "Only below 45 mph", "Only when empty"],
  0, "A safe speed for most vehicles may be too fast for a tanker. Slow down before curves, ramps, and off ramps."]);
TYK.push(["How are smooth bore tankers different to drive than those with baffles?", [
  "They have no baffles, so liquid surges more and they are harder to control",
  "They are easier to drive", "They have more grip", "There is no difference"],
  0, "Smooth bore tankers have no baffles, so liquid surges more freely and they are more difficult to control."]);
TYK.push(["What three things determine how much liquid you can load?", [
  "Weight of the liquid, legal weight limits, and the space needed for expansion (outage)",
  "Only the tank size", "Only the driver's choice", "The color of the liquid"],
  0, "How much liquid you can load depends on the liquid's weight, the legal weight limit, and the room needed for expansion (outage)."]);
TYK.push(["What is outage?", [
  "The space left empty in a tank to allow liquid to expand as it warms",
  "The amount spilled", "A type of valve", "The tank empty weight"],
  0, "Outage is the space left empty in a tank to allow the liquid room to expand as it warms."]);
TYK.push(["How can you help control surge?", [
  "Keep the tank as full as possible (with proper outage) and avoid sudden stops and starts",
  "Leave the tank half empty", "Speed through curves", "Brake hard"],
  0, "Surge is worst when the tank is partly full. Keep the tank reasonably full (with proper outage) and drive smoothly, avoiding sudden stops and starts."]);
TYK.push(["What two reasons make special care necessary when driving tank vehicles?", [
  "The high center of gravity of the liquid and the surge that makes the vehicle hard to control",
  "The vehicle is wider", "Tires wear fast", "Brakes overheat"],
  0, "Tank vehicles need special care because of the high center of gravity of the liquid and surge (liquid movement) that makes them hard to control."]);

// ---- Section 9 (hazardous materials) ----
TYK.push(["Shippers package in order to (fill in the blank) the material.", [
  "contain", "harm", "hide", "advertise"],
  0, "Shippers package hazardous materials in order to contain the material safely and prevent leaks."]);
TYK.push(["Drivers placard their vehicle to (fill in the blank) the risk.", [
  "communicate", "hide", "increase", "ignore"],
  0, "Drivers display placards to communicate the risk of the hazardous materials being transported."]);
TYK.push(["What three things do you need to know to decide which placards (if any) you need?", [
  "The hazard class, the amount being shipped, and whether the amount requires placards",
  "The color and weight only", "The destination only", "The driver's name"],
  0, "To decide which placards you need, know the hazard class of the material, the amount being shipped, and the rules for when placards are required."]);
TYK.push(["A hazardous materials identification number must appear on the (fill in the blank) and on the (fill in the blank).", [
  "shipping paper (and package); it also appears on cargo tanks and other bulk packaging",
  "tires and windshield", "the driver's log and fuel receipt", "the roof and trailer"],
  0, "The hazmat ID number must appear on the shipping paper and on the package, and it must also appear on cargo tanks and other bulk packaging."]);
TYK.push(["Where must you keep shipping papers describing hazardous materials?", [
  "Within easy reach of the driver's seat in a holder, or on the driver's seat when away from the vehicle",
  "In the glove box", "In the trailer", "With the spare tire"],
  0, "Keep hazmat shipping papers within easy reach of the driver (in a holder), or on the driver's seat when you are away from the vehicle."]);

TYK.push(["Around which hazard classes must you never smoke?", [
  "Flammable materials (e.g., Class 2 flammable gas and Class 3 flammable liquid) and explosives",
  "Only radioactive materials", "Only corrosives", "None - smoking is always allowed"],
  0, "Never smoke around flammable materials such as Class 2 flammable gases and Class 3 flammable liquids (and near explosives)."]);
TYK.push(["Which three hazard classes should not be loaded into a trailer that has a heater/air conditioner unit?", [
  "Class 1 explosives, Class 2.1 flammable gases, and Class 3 flammable liquids",
  "Corrosives, oxidizers, and poisons", "Radioactive, infectious, and miscellaneous", "None - all can be loaded"],
  0, "Do not load Class 1 explosives, Class 2.1 flammable gases, or Class 3 flammable liquids into a trailer with a heater or air conditioner unit."]);
TYK.push(["Should the floor liner required for Division 1.1 or 1.2 materials be stainless steel?", [
  "No - it should be non-metallic and nonsparking, not steel",
  "Yes, stainless steel", "Only if it is a tank", "It is not required"],
  0, "The floor liner for Division 1.1 or 1.2 explosives should be non-metallic and nonsparking - not steel."]);
TYK.push(["At the shipper's dock you're given a paper for 100 cartons of battery acid. You already have 100 pounds of dry Silver Cyanide on board. What precautions do you have to take?", [
  "Separate them because battery acid (a corrosive) reacts dangerously with Silver Cyanide (a poison); follow the segregation rules and never load them together where they can mix",
  "Load them together to save space", "Only label them", "No precautions needed"],
  0, "Battery acid (corrosive) and Silver Cyanide (poison) must be separated to prevent a dangerous reaction. Follow the segregation rules for incompatible materials."]);
TYK.push(["Name a hazard class that uses transport indexes to determine the amount that can be loaded in a single vehicle.", [
  "Radioactive materials (Class 7)",
  "Flammable liquids (Class 3)", "Corrosives (Class 8)", "Oxidizers (Class 5)"],
  0, "Radioactive materials (Class 7) use transport indexes to determine the maximum amount that can be loaded in a single vehicle."]);

TYK.push(["What are cargo tanks?", [
  "Bulk packaging permanently attached to the vehicle that stay on when loading and unloading",
  "Portable containers removed for loading", "Fuel tanks", "Air tanks"],
  0, "Cargo tanks are bulk packaging permanently attached to the vehicle; they remain on the vehicle when you load and unload."]);
TYK.push(["How is a portable tank different from a cargo tank?", [
  "A portable tank is not permanently attached and is loaded/unloaded while off the vehicle, then put on for transport",
  "It is the same", "Portable tanks are bigger", "Portable tanks hold only gas"],
  0, "A portable tank is bulk packaging not permanently attached to the vehicle. It is loaded or unloaded while off the vehicle, then placed on a vehicle for transport."]);
TYK.push(["Your engine runs a pump used during delivery of compressed gas. Should you turn off the engine before or after unhooking hoses after delivery?", [
  "After unhooking the hoses - keep the engine running until the hoses are disconnected so the system stays pressurized",
  "Before unhooking", "It doesn't matter", "Only at night"],
  0, "When your engine runs the pump for compressed gas delivery, keep it running until the hoses are unhooked so pressure is maintained, then turn it off."]);

TYK.push(["If your placarded trailer has dual tires, how often should you check the tires?", [
  "Every 2 hours or every 100 miles, whichever comes first",
  "At the start of the trip only", "Once a week", "At every fuel stop only"],
  0, "Check the tires on a placarded trailer with dual tires every 2 hours or every 100 miles, whichever comes first."]);
TYK.push(["What is a safe haven?", [
  "An approved site for parking vehicles transporting hazardous materials, authorized by FMCSA or local authorities",
  "A rest area", "Any truck stop", "A weigh station"],
  0, "A safe haven is an approved area authorized by FMCSA or local authorities for parking vehicles transporting hazardous materials."]);
TYK.push(["How close to the traveled part of the roadway can you park with Division 1.2 or 1.3 materials?", [
  "Within 5 feet",
  "Within 100 feet", "Within 300 feet", "You cannot park on the roadway"],
  0, "Never park with Division 1.2 or 1.3 explosives within five feet of the traveled part of the road."]);
TYK.push(["How close can you park to a bridge, tunnel, or building with the same load?", [
  "Within 300 feet (except for short periods needed for operation)",
  "Within 10 feet", "Within 50 feet", "There is no limit"],
  0, "Except for brief operating needs, do not park within 300 feet of a bridge, tunnel, building, place where people gather, or open fire."]);
TYK.push(["What type of fire extinguisher must placarded vehicles carry?", [
  "A B:C rated fire extinguisher",
  "Class A only", "Class D only", "Any extinguisher"],
  0, "Placarded vehicles must carry a B:C rated fire extinguisher of the required size for electrical and flammable-liquid fires."]);
TYK.push(["You're hauling 100 pounds of Division 4.3 (dangerous when wet) materials. Do you need to stop before a railroad-highway crossing?", [
  "No - Division 4.3 is not a class that requires a mandatory stop",
  "Yes, must stop", "Only if leaking", "Only at night"],
  0, "Division 4.3 (dangerous when wet) is not among the hazmat classes requiring a mandatory stop before railroad crossings."]);
TYK.push(["At a rest area you discover your hazardous materials shipments slowly leaking from the vehicle. There is no phone around. What should you do?", [
  "Follow your emergency plan and contact the shipper or carrier and emergency response as soon as possible",
  "Continue to the next phone", "Wait for a phone", "Neutralize the leak yourself"],
  0, "If hazmat is leaking, follow your emergency plan and contact the shipper or carrier and emergency response. Never try to neutralize a leak unless trained."]);

// ---- Section 10 (school bus) ----
TYK.push(["Define the danger zone. How far does the danger zone extend around the bus?", [
  "About 10 feet from the front, sides, and rear of the bus",
  "5 feet", "50 feet", "Only the driver's side"],
  0, "The danger zone is the area around the bus where students are most at risk, extending about 10 feet from the front, sides, and rear."]);
TYK.push(["What should you be able to see if the outside flat mirrors are adjusted properly? The outside convex mirrors? The crossover mirrors?", [
  "Flat mirrors: the side of the bus and rear tires; convex: the wider danger zone; crossover: the front bumper and ground in front of the bus",
  "Flat: nothing; convex: everything", "All mirrors show the same view", "Mirrors are not required"],
  0, "Proper flat mirrors show the side of the bus and rear tires. Convex mirrors show the wider danger zone. Crossover mirrors show the front bumper and ground in front of the bus."]);
TYK.push(["You are loading students along the route. When should you activate your alternating flashing amber warning lights?", [
  "At least 200 feet before the stop",
  "Right when you stop", "After students board", "Only at night"],
  0, "Activate the alternating flashing amber warning lights at least 200 feet before the stop so approaching drivers are warned."]);
TYK.push(["You are unloading students along your route. Where should students walk to after exiting the bus?", [
  "To a point at least 10 feet in front of the bus, then to the left, and wait for the driver's signal before crossing",
  "Directly behind the bus", "Stay on the bus", "Run across the road"],
  0, "After exiting, students should move at least 10 feet in front of the bus, out of the danger zone, and wait for the driver's signal before crossing."]);
TYK.push(["After unloading at school, why should you walk through the bus?", [
  "To make sure no students are left on the bus or sleeping, and to check for hazards",
  "To clean the windows", "To close the doors", "There is no reason"],
  0, "Walk through the bus after unloading to make sure no students are left on board and to check for hazards before driving away."]);
TYK.push(["What position should students be in front of the bus before they cross the roadway?", [
  "At least 10 feet directly in front of the bus, in plain view of the driver and out of the danger zone",
  "Right at the bumper", "Behind the bus", "On the blind side"],
  0, "Students should be at least 10 feet directly in front of the bus, out of the danger zone and in plain view of the driver, before crossing."]);
TYK.push(["Under what conditions must you evacuate the bus?", [
  "When there is danger of fire, when the bus is in danger from a train or other traffic, or when it is otherwise unsafe to remain",
  "Never evacuate", "Only in a fire", "Only when told by police"],
  0, "Evacuate when there is danger of fire, when the bus is in danger from a train or other traffic, or when it is otherwise unsafe to remain in the bus."]);
TYK.push(["How far from the nearest rail should you stop at a highway-rail crossing?", [
  "Between 15 and 50 feet from the nearest rail",
  "At the rail", "100 feet", "25 feet past it"],
  0, "Stop between 15 and 50 feet from the nearest rail so you can see the tracks clearly."]);
TYK.push(["What is a passive highway-rail crossing? Why should you be extra cautious at this type of crossing?", [
  "A crossing with no gates, lights, or bells - only signs. Be extra cautious because there is no signal to warn you, so you must look and listen",
  "A crossing with gates", "A crossing in a tunnel", "A crossing with a flagger"],
  0, "A passive crossing has no active warning devices, only signs. Because there is no signal, you must slow down, look, and listen for trains."]);
TYK.push(["How should you use your brakes if your vehicle is equipped with antilock brakes (ABS)?", [
  "Brake the same way you always have; don't pump - use firm steady pressure",
  "Pump the brakes", "Brake harder", "Never brake hard"],
  0, "With ABS, brake normally with firm steady pressure. Do not pump, as this defeats ABS."]);

// ---- Build quiz array ----
const quiz = TYK.map(([q, options, correct, explain]) => ({ q, options, correct, explain }));

const newModule = {
  id: "sec15",
  number: 15,
  short: "Test Your Knowledge",
  title: "Test Your Knowledge - All Handbook Review Questions",
  group: "core",
  classAManual: true,
  requiredFor: ["All Exams"],
  examFocus: "Every 'Test Your Knowledge' review question from the official handbook, consolidated into one comprehensive module",
  minutes: 25,
  summary: "Every 'Test Your Knowledge' question from the official Florida CDL handbook, collected into a single comprehensive review module covering vehicle inspection, driving safely, cargo, passengers, air brakes, combination vehicles, doubles/triples, tanks, hazardous materials, and school buses.",
  topics: [
    {
      heading: "How to use this module",
      bullets: [
        "This module pulls together ALL of the 'Test Your Knowledge' review questions found at the end of each section of the official Florida CDL handbook.",
        "These are the exact questions the handbook says may be on your test: 'If you can't answer them all, re-read the section.'",
        "Work through each topic area, and if you miss any, go back and re-read the corresponding handbook section before retaking the quiz.",
        "This is a great final review before your General Knowledge, Air Brakes, and Combination Vehicles written tests."
      ]
    }
  ],
  quiz
};

modules.push(newModule);
writeFileSync(dstPath, JSON.stringify(modules, null, 1) + "\n");

console.log(`Added sec15 module with ${quiz.length} Test Your Knowledge questions.`);
