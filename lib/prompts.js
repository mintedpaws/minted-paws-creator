// lib/prompts.js
// v13 — CREATURE TRANSFORMATIONS + ILLUSTRATION RARE STYLE
//        Each type physically mutates the pet into a fantasy creature
//        while keeping the face/expression recognizable
//        Art style matches Pokemon Illustration Rare aesthetic

// ---- Utility: pick random items from an array ----
function pickOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

// ---- Shared framing instructions ----
const FRAMING_START =
  "IMPORTANT: This is a LANDSCAPE composition. The creature must be centered in the frame with its ENTIRE body fully visible — head, limbs, tail — with generous empty space on all sides. Do not crop any part of the creature.";

const FRAMING_END =
  "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
  "REMINDER: LANDSCAPE composition. The full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.";

const CORE_RULES =
  "Keep the creature's FACE recognizable — same facial structure, eye placement, snout shape, and expression as the original pet. The face is the anchor. " +
  "BUT the BODY should be dramatically transformed into a fantasy creature — mutate limbs, add new anatomy, change proportions, grow new features. This is a full creature evolution, not a dog in a costume. " +
  "Remove any leash, collar, harness, or accessories from the original photo.";

const ART_STYLE =
  "Render in the style of a Pokemon TCG Illustration Rare card — soft painterly brushstrokes, dreamy atmosphere, the creature harmoniously blending into its environment rather than pasted on top. " +
  "The composition should feel like a single flowing painting where creature and background merge through color, light, and texture. " +
  "Use impressionistic details in the background, sharp focus on the creature's face, and soft diffused edges where the creature meets the environment. " +
  "Rich saturated colors with a slight ethereal glow throughout the entire image.";

// ---- Type definitions ----
const TYPES = {
  fire: {
    intro:
      "Transform this pet into a legendary fire-type fantasy creature — a full creature evolution, not just a dog with fire effects.",
    mutations: [
      "Replace the paws with clawed obsidian talons that glow with inner magma. Grow jagged volcanic rock plates along the spine and shoulders like natural armor. The tail becomes a long whip of living flame.",
      "The legs become thick and powerful with cracked magma-skin, glowing orange between the cracks. Grow a dramatic mane of living fire that flows like liquid from the head down the neck. The tail splits into two flame tendrils.",
      "Grow massive smoldering wings made of ember and ash that trail sparks. The fur transitions into charcoal-black scales along the back and legs. Paws become broad with glowing lava claws.",
      "The body is larger and more muscular with obsidian-plated armor growing naturally from the shoulders and chest. Horns of cooled lava curl from the head. The tail is a heavy club of volcanic rock with a molten core.",
      "Fur becomes a mix of dark ash and glowing ember patches. Grow flame-feathered wings from the shoulders. The legs are longer and more powerful with crystallized magma hooves. A crown of floating fire orbits the head.",
      "The body is sleek and serpentine with elongated proportions. Scales of black glass cover the flanks. A ridge of blue-hot flame runs from head to tail. The paws are replaced with raptor-like fire claws.",
    ],
    poses: [
      "standing defiantly atop a crumbling volcanic cliff, muscles tense and ready",
      "mid-leap through an enormous wall of roaring fire, body fully extended",
      "charging forward through a field of molten rock, magma splashing with each stride",
      "howling skyward as a massive spiral of flames erupts around its body",
      "crouching low ready to pounce with bubbling lava pooling beneath",
      "emerging triumphantly from a violently erupting volcanic fissure",
      "perched on a floating chunk of obsidian above an endless lava lake",
      "rearing up on hind legs silhouetted against a massive eruption",
      "sprinting across a field of cooling lava with cracks of molten orange beneath each step",
      "leaping between erupting fire geysers with perfect agility",
    ],
    effects: [
      "ember-orange glowing eyes that burn like tiny suns",
      "molten-gold glowing eyes with flickering flame pupils",
      "glowing lava-crack veins pulsing bright orange across the body",
      "smoldering pawprints glowing on the ground behind each step",
      "rings of fire orbiting the body in slow spirals",
      "thousands of embers and sparks swirling in the air",
      "heat shimmer distortion radiating visibly off the body",
      "small floating fireballs orbiting the head like a crown",
      "cracks of molten lava forming in the ground beneath its stance",
    ],
    environments: [
      "a massive erupting volcano with ash-filled orange skies and rivers of lava flowing through the scene",
      "the inside of a vast magma chamber deep underground with glowing stalactites dripping fire",
      "a hellish landscape of fire geysers and sulfur vents under a blood-red sky, the creature emerging from the chaos",
      "a volcanic island surrounded by boiling ocean with towering pillars of steam, everything painted in warm oranges",
      "a scorched battlefield at dusk with embers floating like a million fireflies, the scene dissolving into painterly strokes at the edges",
      "a primordial landscape of obsidian spires and pools of bubbling magma stretching into a hazy orange horizon",
      "a crumbling ancient fire temple with lava flowing down the steps, the creature and architecture blending together",
      "an ash-covered wasteland with rivers of fire, the sky and ground merging in heat shimmer",
    ],
    style:
      "Dramatic warm palette — deep crimsons, volcanic oranges, bright yellows, and black. " + ART_STYLE,
  },
  water: {
    intro:
      "Transform this pet into a majestic water-type fantasy creature — a full aquatic evolution, not just a dog near water.",
    mutations: [
      "Replace the paws with webbed flipper-feet with translucent membranes. Grow flowing translucent fins along the ears, spine, and tail like a betta fish. The fur transitions to iridescent scales along the body.",
      "The tail becomes a large elegant fish tail with flowing translucent fins. Grow gill-like slits on the neck that glow blue. The legs become shorter and more streamlined with webbed feet. Bioluminescent spots dot the body.",
      "Grow a dramatic fan of translucent fins from the head like a lionfish crown. The body is sleek and elongated with smooth skin transitioning from fur. The paws have retractable webbing between the toes. A dorsal fin runs along the spine.",
      "The creature is larger with a powerful orca-like build. Smooth hydrodynamic skin replaces most fur except on the face. A massive flowing tail fin trails behind. Barnacle and coral-like growths accent the shoulders.",
      "Grow elegant wing-like pectoral fins from the shoulders that spread like a manta ray. The body is covered in shimmering fish scales that catch the light. Long whisker-like tendrils flow from the chin. The tail is a translucent fan.",
      "The legs are replaced with four powerful flippers. A crest of crystallized ice and coral grows from the head. The body is covered in bioluminescent markings that pulse with light. Flowing jellyfish-like tendrils trail from the tail.",
    ],
    poses: [
      "leaping majestically above a crashing wave at the peak of its arc, water trailing off the fins",
      "gliding gracefully through crystal-clear water surrounded by colorful fish and coral",
      "surfacing from the deep ocean with water streaming elegantly off its body and fins",
      "running impossibly along the surface of the ocean leaving magical ripples with each step",
      "floating serenely in the center of a bioluminescent underwater cavern",
      "diving downward into a deep ocean trench with a spiral trail of bubbles",
      "riding the crest of a massive turquoise wave",
      "emerging from a whirlpool with water spiraling around its body",
      "swimming powerfully through a school of jellyfish in the deep ocean",
      "breaching from the water like a whale, fully airborne with spray everywhere",
    ],
    effects: [
      "glowing aqua-blue eyes that shimmer like sunlight through water",
      "deep ocean-teal eyes with bioluminescent pupils",
      "magical water streams spiraling gracefully around the body",
      "floating orbs of water suspended in the air around the creature",
      "a misty vapor aura drifting off the body",
      "frost crystallizing on the whiskers and fin tips",
      "bioluminescent blue markings pulsing rhythmically along the body",
      "tiny bubbles constantly rising from the fur and fins",
      "prismatic light refracting through the translucent fins casting rainbow patterns",
    ],
    environments: [
      "a vast open ocean at golden hour with towering turquoise waves, the creature and water painted as one flowing composition",
      "a deep underwater coral kingdom glowing with intense bioluminescence, the scene dissolving into soft impressionistic strokes at the edges",
      "a moonlit tropical lagoon with crystal-clear water, the creature blending seamlessly with the reflections and light",
      "a frozen arctic seascape with massive glaciers and vivid aurora borealis painting the sky in soft brushstrokes",
      "a thundering waterfall cascading into a misty jungle pool, the mist and creature merging into the painterly atmosphere",
      "an ancient submerged temple with shafts of golden light breaking through the water surface, everything rendered in soft luminous strokes",
      "a hidden underwater grotto with turquoise water and crystalline formations refracting light everywhere",
      "a deep ocean scene with bioluminescent creatures and soft beams of light from far above, the darkness fading into painterly abstraction",
    ],
    style:
      "Cool oceanic palette — teals, deep blues, aquamarine, shimmering silvers, and touches of bioluminescent cyan. " + ART_STYLE,
  },
  grass: {
    intro:
      "Transform this pet into a wild nature-type fantasy creature — a full botanical evolution, not just a dog in a forest.",
    mutations: [
      "Grow living vines and flowering branches from the shoulders and spine like natural antlers. The paws become root-like with bark texture and tiny mushrooms growing between the toes. The tail is a long trailing vine with blooming flowers.",
      "The fur transitions into soft moss and tiny ferns growing naturally across the back and flanks. Grow a crown of twisted branches and blooming flowers from the head. The legs are bark-textured like tree trunks with root-like paws.",
      "Grow large leaf-like wings from the shoulders made of overlapping leaves in autumn colors. The body is covered in bark-like armor plates with moss in the crevices. Mushrooms and small plants grow along the spine. The tail is a thick vine.",
      "The creature is larger and more majestic with a tree-like quality. Massive branch-antlers grow from the head covered in blossoms. The legs are thick and trunk-like. Living flowers bloom across the body. Small forest creatures nest in the antlers.",
      "The body is sleek and deer-like with elongated legs that end in hoof-like root structures. A mane of flowing leaves and petals runs from head to tail. Bioluminescent mushrooms grow along the flanks. Butterfly wings sprout from the shoulders.",
      "Grow a thick shell of living bark across the back like a tortoise, covered in a miniature ecosystem of moss, flowers, and tiny trees. The paws are broad with root-toes. Fern fronds unfurl from the ears and tail.",
    ],
    poses: [
      "bounding joyfully through a field of giant wildflowers twice its size",
      "leaping between massive moss-covered tree branches high in the canopy",
      "standing proudly in a sunlit clearing as ancient vines grow around its legs",
      "emerging from dense jungle foliage like a mythical forest guardian",
      "standing alert on a giant lily pad in the middle of a misty pond",
      "walking through a tunnel of flowering vines with petals raining down",
      "perched on a fallen mossy log overlooking a vast magical forest valley",
      "rearing up against an ancient tree with roots and branches responding to its presence",
      "mid-run through enchanted grass with seeds and petals exploding off its body",
      "sitting regally on a throne of twisted roots and exotic blooming flowers",
    ],
    effects: [
      "warm emerald-green glowing eyes full of ancient wisdom",
      "golden-amber glowing eyes like drops of tree sap",
      "a faint green nature aura with floating pollen and dandelion seeds",
      "butterflies and fireflies swirling around the body",
      "a carpet of small flowers blooming wherever it steps",
      "tiny forest sprites or wisps of green light floating nearby",
      "dewdrops clinging to the body that glow with inner light",
      "spores and seeds releasing from the body into the breeze",
      "golden sunbeams seeming to bend toward the creature",
    ],
    environments: [
      "an ancient magical forest with enormous mossy trees, golden sunbeams breaking through the canopy, the creature and forest painted as one living ecosystem",
      "a hidden grove of giant glowing mushrooms and bioluminescent ferns, everything dissolving into soft impressionistic strokes of green and gold",
      "a sprawling flower meadow stretching to distant mountains, the creature emerging from the flowers as if growing from the earth itself",
      "a sacred grove where massive ancient trees form a natural cathedral, light and leaves and creature all blending in painterly strokes",
      "a hillside of cherry blossom trees in full bloom with millions of petals filling the air, the creature barely distinguishable from the blossoms",
      "an overgrown ancient ruin being reclaimed by nature, the creature part of the reclamation with vines and flowers connecting it to the stone",
      "a mystical bamboo forest at dawn with mist and soft golden light, the creature fading into the misty atmosphere at its edges",
      "a fairy-tale meadow with a winding stream, the water reflections and flowers and creature all painted in flowing connected brushstrokes",
    ],
    style:
      "Warm natural palette — rich greens, golden yellows, warm earth tones, soft pinks and whites from blossoms. " + ART_STYLE,
  },
  electric: {
    intro:
      "Transform this pet into a fierce electric-type fantasy creature — a full electromagnetic evolution, not just a dog with lightning.",
    mutations: [
      "The fur stands permanently on end in jagged spikes like a charged plasma ball. Grow crystalline lightning-bolt horns from the head. The paws become metallic with visible arcing between the claws. The tail is a long whip of pure crackling electricity.",
      "The body is sleek and angular with chrome-like metallic patches replacing fur along the legs and spine. Grow Tesla coil-like antennae from the ears. Circuit-board patterns glow across the body. The eyes are solid electric blue with no pupils.",
      "Grow jagged electric-crystal spines along the entire back and tail like a stegosaurus. The paws are replaced with charged metallic claws that spark constantly. A permanent corona of electricity surrounds the head like a mane. The body crackles with visible static.",
      "The creature is lean and built for speed with elongated proportions. Lightning-shaped stripes replace the natural fur pattern, glowing neon. Grow wing-like energy fins from the shoulders made of pure electricity. The tail leaves a plasma trail.",
      "The body is covered in overlapping metallic scales that generate static. Grow a large dorsal fin of crystallized electricity along the spine. The legs are powerful with electromagnetic coil-like structures at the joints. Ball lightning orbits the body.",
      "Fur transitions to a mix of normal and glowing fiber-optic-like strands. The ears are replaced with large radar-dish-like structures that crackle with energy. The paws leave burned pawprints. A cage of electricity surrounds the body like a Faraday cage.",
    ],
    poses: [
      "mid-sprint across a mountain ridge with lightning striking behind it",
      "leaping through the air with electricity arcing between all four limbs",
      "howling into a thunderstorm as a bolt of lightning channels through its entire body",
      "charging forward through a neon-lit corridor leaving trails of crackling electricity",
      "standing in the eye of a lightning tornado with bolts spiraling all around",
      "mid-pounce with a massive discharge of energy exploding outward from the body",
      "standing atop a lightning rod during the peak of a supercell storm, fully charged",
      "racing across a metal bridge as electricity arcs to every cable and rail around it",
      "skidding to a dramatic stop with electricity trailing behind like a speed afterimage",
      "crouching low on a charged surface with sparks cascading in every direction",
    ],
    effects: [
      "bright crackling yellow-gold eyes with electric energy sparking from the corners",
      "electric-blue eyes that pulse and flicker like live wires",
      "arcs of blue-white lightning coursing visibly across the body",
      "sparks exploding from the paws with each step like tiny fireworks",
      "floating orbs of ball lightning orbiting the body slowly",
      "plasma trails streaming from the tail like an electric comet",
      "electromagnetic field distortion visible as rippling energy in the air",
      "tiny lightning bolts jumping between extremities",
      "a corona of electrical discharge surrounding the entire body",
    ],
    environments: [
      "a towering mountain peak above a sea of dark thunderclouds with lightning everywhere, the creature and storm painted as one electrical event",
      "a futuristic neon cityscape at night during a massive electrical storm, neon lights and lightning blending into impressionistic streaks of color",
      "a vast open plain with a supercell thunderstorm filling the entire dramatic sky, the creature at the epicenter of the energy",
      "an electric crystal cave with naturally conducting mineral formations, the creature's energy connecting to every crystal in flowing arcs",
      "a lightning-struck wasteland with fulgurite glass craters, the landscape and creature both crackling with residual charge",
      "a rain-soaked highway at night with neon reflections, the creature's electricity reflecting in every puddle and wet surface",
      "a magnetic anomaly zone where rocks float and electricity arcs between them, the creature the source of the disturbance",
      "a dark forest where every tree glows with electrical charge, the creature and forest connected by webs of lightning",
    ],
    style:
      "High-contrast electric palette — electric blues, bright golds, deep purples, neon whites, and dramatic black shadows. " + ART_STYLE,
  },
  psychic: {
    intro:
      "Transform this pet into a transcendent psychic-type fantasy creature — a full cosmic evolution, not just a dog with purple effects.",
    mutations: [
      "The body becomes partially translucent with visible cosmic nebulae swirling inside like a living galaxy. Grow a third eye on the forehead that glows intensely. The paws hover slightly off the ground with no visible support. The tail is a trail of astral energy.",
      "Grow elegant curved horns made of crystallized psychic energy from the head. The fur shifts to deep cosmic purple with actual stars and constellations visible within it. The eyes are solid glowing orbs of shifting color. The body seems to phase in and out of reality.",
      "The creature is ethereal and slightly transparent. Grow large ornate psychic wings made of geometric sacred geometry patterns and light. A crown of floating runes orbits the head. The paws leave dimensional ripples where they touch the ground.",
      "The body elongates and becomes more elegant and alien. Multiple translucent afterimage copies trail behind it. Crystalline growths emerge from the shoulders and spine. The tail splits into multiple energy tendrils. The eyes are deep voids with pinpoint stars.",
      "Grow a dramatic crest of psychic crystals from the head like a peacock's fan. The body is covered in softly glowing runic markings. The legs become slender and graceful with crystal-tipped feet that float above the surface. A sphere of warped space surrounds the body.",
      "The creature has an almost mythical eastern dragon influence — elongated, flowing, ethereal. The fur becomes silky and moves on its own like it's underwater. Orbs of pure thought-energy orbit the body. The eyes contain miniature galaxies.",
    ],
    poses: [
      "levitating serenely with eyes half-closed in deep psychic focus, paws dangling in the void",
      "walking calmly through a shattered reality with dimensions fracturing around it",
      "hovering above the ground surrounded by slowly orbiting crystal shards and ancient symbols",
      "standing in a trance as psychic energy pours upward from its body like reverse rain",
      "phasing halfway through a glowing portal between two different dimensions",
      "floating in a cosmic void surrounded by miniature galaxies and star systems",
      "sitting peacefully with dozens of objects levitating in a perfect sphere around it",
      "curled up sleeping while its astral projection stands guard above its body",
      "walking along a path of pure light that materializes with each step forward",
      "standing still as reality bends and warps in a sphere around it",
    ],
    effects: [
      "deep glowing violet eyes radiating visible psychic energy outward",
      "shifting iridescent eyes that change color like an oil slick on water",
      "a layered violet-pink psychic aura rippling outward in waves",
      "floating crystalline shards orbiting in a slow mesmerizing circle",
      "reality-warping distortion effects bending space around the creature",
      "translucent afterimage echoes trailing behind showing past positions",
      "geometric sacred geometry patterns forming spontaneously in the air",
      "streams of pure psychic energy flowing from the eyes like ethereal ribbons",
      "small galaxies and nebulae forming and dissolving around the body",
    ],
    environments: [
      "a transcendent astral plane with vast colorful nebulae, the creature and cosmos painted as one continuous flowing vision",
      "ancient floating stone temple ruins covered in glowing runes drifting in the void, the creature part of the ancient mystery",
      "a mirror dimension where the landscape reflects and fractures infinitely, the creature at the center of the distortion",
      "a crystal sanctuary with massive gemstone formations, rainbow light and creature blending in soft prismatic brushstrokes",
      "a dreamlike surreal landscape where gravity doesn't exist, the creature and floating objects all part of the same impossible painting",
      "a cosmic library with floating books and scrolls of pure light, the creature emanating the knowledge",
      "a vast psychic mindscape of floating islands connected by bridges of pure energy, rendered in flowing impressionistic strokes",
      "the space between stars where cosmic dust forms impossible structures, the creature indistinguishable from the cosmos at its edges",
    ],
    style:
      "Cosmic mystical palette — rich purples, deep pinks, ethereal blues, shimmering whites, and void blacks with pinpoint stars. " + ART_STYLE,
  },
  fighting: {
    intro:
      "Transform this pet into a fearsome fighting-type fantasy creature — a full warrior evolution, not just a dog in a fighting pose.",
    mutations: [
      "Grow natural bone-like armor plates across the chest, shoulders, and forearms. The paws become large powerful fists with wrapped bandage-like skin. The body is heavily muscular with visible battle scars that glow with inner energy. A ridge of bony spikes runs down the spine.",
      "The creature has a samurai-like quality with natural chitinous armor growing in layered plates. Grow blade-like bone extensions from the forearms. The legs are thick and powerful like a bear's. War paint-like natural markings glow on the face.",
      "The body is compact and incredibly muscular like a pitbull-bear hybrid. Grow thick ram-like horns from the head. The paws are massive with reinforced knuckle ridges. Chains of bone grow naturally from the forearms. The skin is tough and scarred.",
      "Grow a dramatic flowing mane that looks like it's made of hardened steel fibers. The body is covered in overlapping stone-like natural armor. The tail is a heavy wrecking ball of bone and muscle. The paws have retractable metallic claws.",
      "The creature has a gladiator quality with a natural bone helm growing over the skull. Shoulder pauldrons of natural chitin armor protect the joints. The forearms are oversized and reinforced for striking. The eyes glow with focused battle energy.",
      "The body is lean and martial-artist-like with elongated limbs built for striking. Grow natural gauntlets of hardened bone over the paws. A spiritual energy shadow — a larger, fiercer version — looms behind the creature like a Stand. Tiger-stripe markings glow across the body.",
    ],
    poses: [
      "crouching low in a martial arts stance with one powerful fist extended forward",
      "mid-leap delivering a devastating flying kick with impact energy trailing behind",
      "standing tall in a champion's victory pose atop a defeated stone golem",
      "charging forward at full speed with a fierce battle cry expression",
      "breaking through a thick stone wall mid-punch with debris exploding outward",
      "mid-uppercut with a massive shockwave rippling outward from the impact",
      "landing from a massive jump that cracks the stone ground in a spider web pattern",
      "meditating under a powerful waterfall with immense restrained power radiating from its still body",
      "squaring up in an ancient arena with focused intensity",
      "blocking an incoming strike with a forearm guard, energy deflecting in all directions",
    ],
    effects: [
      "intense glowing ice-blue eyes burning with fighting spirit",
      "burning crimson eyes that flare with inner rage and focus",
      "a pulsing blue-white battle aura radiating outward with visible force",
      "a fiery orange battle aura that makes the air shimmer and dust rise",
      "impact shockwave rings visible around the fists",
      "battle scars across the body that glow with inner power",
      "ground cracking and debris floating upward from sheer power",
      "a spectral shadow of a larger more powerful version looming behind like a Stand",
      "dust and small rocks levitating around the body from the energy output",
    ],
    environments: [
      "an ancient stone martial arts dojo courtyard at twilight, lanterns and stone and creature all painted in warm flowing brushstrokes",
      "a Roman-style colosseum arena with dramatic golden spotlights, the crowd dissolving into impressionistic paint strokes in the background",
      "a mountain training ground with smashed boulders and a waterfall, the mist and destruction blending into the painterly atmosphere",
      "a moonlit temple rooftop with cherry blossom petals, the creature and blossoms and moonlight all flowing together as one composition",
      "a destroyed city street after an epic battle, dust and debris fading into abstract painterly textures at the edges",
      "a sacred mountaintop monastery above the clouds at golden sunrise, the creature emerging from the light and mist",
      "a rain-soaked back alley at night with neon signs, reflections and creature painted in bold impressionistic strokes",
      "an underground fighting pit carved from raw stone with dramatic torch lighting, shadows and flame merging into the painted scene",
    ],
    style:
      "Cool warrior palette — steel blues, stone grays, deep crimsons, warm golds, and dramatic shadows. " + ART_STYLE,
  },
};

// ---- Build a randomized prompt ----
export function getPromptForType(typeId) {
  const type = TYPES[typeId];
  if (!type) {
    throw new Error(
      `Unknown type: ${typeId}. Valid types: ${Object.keys(TYPES).join(", ")}`
    );
  }

  const mutation = pickOne(type.mutations);
  const pose = pickOne(type.poses);
  const environment = pickOne(type.environments);
  const effects = pickN(type.effects, 2); // 2 extra effects on top of the mutation

  const prompt = [
    FRAMING_START,
    type.intro,
    CORE_RULES,
    `Physical transformation: ${mutation}`,
    `The pose: ${pose}.`,
    `Additional effects: ${effects.join("; ")}.`,
    `Set the scene: ${environment}.`,
    type.style,
    FRAMING_END,
  ].join(" ");

  return prompt;
}
