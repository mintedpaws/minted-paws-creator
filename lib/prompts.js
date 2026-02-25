// lib/prompts.js
// Each type has randomized poses, environments, and effects
// v12 — TRUE RANDOMIZATION: picks one pose, one environment, and 2-3 effects
//        per generation so every card feels unique
// Edit these freely — no code changes needed, just tweak the text and redeploy

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
  "IMPORTANT: This is a LANDSCAPE composition. The subject must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the animal.";

const FRAMING_END =
  "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
  "REMINDER: LANDSCAPE composition. The full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.";

const CORE_RULES =
  "Preserve the exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
  "Remove any leash, collar, harness, or accessories.";

// ---- Type definitions ----
const TYPES = {
  fire: {
    intro:
      "Transform this pet into a legendary fire-type fantasy creature in the style of a Pokemon Illustration Rare artwork.",
    poses: [
      "standing defiantly atop a crumbling volcanic cliff, muscles tense and ready",
      "mid-leap through an enormous wall of roaring fire, body fully extended",
      "charging forward through a field of molten rock, magma splashing with each stride",
      "howling skyward as a massive spiral of flames erupts around its body",
      "crouching low ready to pounce with bubbling lava pooling beneath its paws",
      "emerging triumphantly from a violently erupting volcanic fissure",
      "perched on a floating chunk of obsidian above an endless lava lake",
      "mid-stride walking through a burning ancient forest like an unstoppable force of nature",
      "rearing up on hind legs silhouetted against a massive eruption",
      "sprinting across a field of cooling lava with cracks of molten orange beneath each step",
      "standing guard at the mouth of a volcano with ash raining down like snow",
      "leaping between erupting fire geysers with perfect agility",
    ],
    effects: [
      "ember-orange glowing eyes that burn like tiny suns",
      "molten-gold glowing eyes with flickering flame pupils",
      "flames erupting from the ear tips and streaming backward like comets",
      "a blazing trail of fire flowing from the tail like a comet's wake",
      "glowing lava-crack veins pulsing bright orange across the fur",
      "a blazing mane of swirling fire around the neck and shoulders",
      "smoldering pawprints glowing on the ground behind each step",
      "rings of fire orbiting the body in slow spirals",
      "thousands of embers and sparks swirling in the air like fireflies",
      "heat shimmer distortion radiating visibly off the fur",
      "phoenix-like flame wings spreading wide behind the body",
      "small floating fireballs orbiting the head like a crown",
      "cracks of molten lava forming in the ground beneath its stance",
      "a cloak of living flame draped across the shoulders",
    ],
    environments: [
      "a massive erupting volcano with ash-filled orange skies and rivers of lava",
      "a river of bright molten lava cutting through jet-black volcanic rock formations",
      "the inside of a vast magma chamber deep underground with glowing stalactites dripping fire",
      "an ancient temple engulfed in wildfire with crumbling stone pillars",
      "a hellish landscape of fire geysers and sulfur vents under a blood-red sky",
      "a volcanic island surrounded by boiling ocean with towering pillars of steam",
      "a crumbling stone bridge spanning a vast lava canyon with heat rising",
      "a scorched battlefield at dusk with embers floating like a million fireflies",
      "a primordial landscape of obsidian spires and pools of bubbling magma",
      "an ash-covered wasteland with rivers of fire stretching to the horizon",
    ],
    style:
      "Vibrant painterly Pokemon illustration style with rich warm cinematic lighting, dramatic oranges, deep reds, and bright yellows.",
  },
  water: {
    intro:
      "Transform this pet into a majestic water-type fantasy creature in the style of a Pokemon Illustration Rare artwork.",
    poses: [
      "leaping majestically above a crashing wave at the peak of its arc",
      "gliding gracefully through crystal-clear water surrounded by colorful fish",
      "standing regally on a sea rock as enormous waves crash dramatically around it",
      "surfacing from the deep ocean with water streaming elegantly off its body",
      "running impossibly along the surface of the ocean leaving magical ripples with each step",
      "floating serenely in the center of a bioluminescent underwater cavern",
      "diving downward into a deep ocean trench with a spiral trail of bubbles",
      "standing on a frozen ice floe in an arctic sea gazing at the northern lights",
      "riding the crest of a massive turquoise wave like a surfing legend",
      "emerging from a whirlpool with water spiraling around its body",
      "walking along a moonlit beach with glowing waves lapping at its paws",
      "swimming powerfully through a school of jellyfish in the deep ocean",
    ],
    effects: [
      "glowing aqua-blue eyes that shimmer like sunlight through water",
      "deep ocean-teal eyes with bioluminescent pupils",
      "iridescent shimmering highlights across the fur like sunlight through water",
      "translucent flowing fins along the ears that ripple like silk in a current",
      "translucent flowing fins along the tail that trail like a mermaid's veil",
      "magical water streams spiraling gracefully around the body",
      "a crown of crystallized ice forming elegantly around the head",
      "a mane of crystallized ice shards along the neck and shoulders",
      "bioluminescent blue markings glowing on the fur",
      "floating orbs of water suspended in the air around the body",
      "a misty vapor aura drifting off the fur",
      "barnacle and coral-like natural armor growing on the shoulders",
      "a trail of glowing jellyfish-like tendrils flowing from the tail",
      "frost crystallizing on the whiskers and ear tips",
    ],
    environments: [
      "a vast open ocean at golden hour with towering turquoise waves and dramatic clouds",
      "a deep underwater coral kingdom glowing with intense bioluminescence",
      "a moonlit tropical lagoon with crystal-clear water and a vibrant reef visible below",
      "a frozen arctic seascape with massive glaciers and vivid aurora borealis overhead",
      "a thundering waterfall cascading into a misty jungle pool surrounded by ferns",
      "an ancient submerged temple with shafts of golden light breaking through the water surface",
      "a stormy sea with massive dark waves under dramatic lightning-filled clouds",
      "a serene underwater garden of giant kelp and sea anemones with light filtering from above",
      "a hidden grotto with turquoise water and crystalline rock formations",
      "a deep ocean scene with a sunken ship and coral growing over ancient ruins",
    ],
    style:
      "Luminous painterly Pokemon illustration style with beautiful oceanic lighting, teals, deep blues, and shimmering highlights.",
  },
  grass: {
    intro:
      "Transform this pet into a wild nature-type fantasy creature in the style of a Pokemon Illustration Rare artwork.",
    poses: [
      "bounding joyfully through a field of giant wildflowers twice its size",
      "leaping between massive moss-covered tree branches high in the canopy",
      "standing proudly in a sunlit clearing with ancient vines growing around its paws",
      "mid-run through tall enchanted grass with seeds and petals flying everywhere",
      "nuzzling against a glowing ancient tree as golden leaves swirl around it",
      "sitting regally on a throne of twisted roots and blooming exotic flowers",
      "playfully rolling in a meadow of bioluminescent mushrooms at twilight",
      "emerging from dense jungle foliage like a mythical forest guardian",
      "standing alert on a giant lily pad in the middle of a misty pond",
      "stretching tall on a hilltop as a breeze carries cherry blossoms past",
      "walking through a tunnel of flowering vines with petals falling like rain",
      "perched on a fallen mossy log overlooking a vast magical forest valley",
    ],
    effects: [
      "warm emerald-green glowing eyes full of ancient wisdom",
      "golden-amber glowing eyes like drops of tree sap",
      "small leaves and wildflowers blooming naturally from the fur",
      "living vines winding along the tail and legs with tiny buds opening",
      "a faint green nature aura with floating pollen and dandelion seeds",
      "moss and lichen growing naturally along the back like living armor",
      "a crown of woven branches and blooming flowers on the head",
      "glowing mushrooms sprouting from around the paws",
      "butterflies and fireflies swirling around the body",
      "bark-like patterns forming naturally in the fur like tree rings",
      "a carpet of small flowers blooming wherever it steps",
      "tiny forest sprites or wisps of green light floating nearby",
      "fern fronds unfurling along the tail like a natural fan",
      "dewdrops clinging to the fur that glow with inner light",
    ],
    environments: [
      "an ancient magical forest with enormous mossy trees and golden sunbeams breaking through the canopy",
      "a hidden grove of giant glowing mushrooms and bioluminescent ferns at twilight",
      "a sprawling flower meadow stretching to distant mountains under a warm golden sky",
      "a dense tropical jungle canopy with exotic birds and hanging vines everywhere",
      "a sacred grove where massive ancient trees form a natural cathedral of branches overhead",
      "a bamboo forest at dawn with mist rolling through and soft golden light filtering in",
      "a hillside of cherry blossom trees in full bloom with millions of petals filling the air",
      "a mystical swamp with bioluminescent water and twisted mangrove roots",
      "a fairy-tale meadow with a winding stream and wildflowers of every color",
      "an overgrown ancient ruin being reclaimed by nature with trees growing through stone walls",
    ],
    style:
      "Warm painterly Pokemon illustration style with golden-green dappled lighting, rich greens, and warm earth tones.",
  },
  electric: {
    intro:
      "Transform this pet into a fierce electric-type fantasy creature in the style of a Pokemon Illustration Rare artwork.",
    poses: [
      "mid-sprint across a mountain ridge with lightning striking dramatically behind it",
      "leaping through the air with electricity arcing between all four paws",
      "standing on a charged tesla coil tower with fur standing completely on end",
      "howling into a thunderstorm as a bolt of lightning channels through its entire body",
      "crouching low on a rain-soaked rooftop with blue sparks cascading off its back",
      "charging forward through a neon-lit corridor leaving trails of crackling electricity",
      "balanced on a crumbling power line tower during a massive storm",
      "standing in the eye of a lightning tornado with bolts spiraling all around",
      "skidding to a stop with electricity trailing behind like a speed afterimage",
      "mid-pounce with a massive discharge of energy exploding outward",
      "standing atop a lightning rod during the peak of a supercell storm",
      "racing across a metal bridge as electricity arcs to every cable and rail",
    ],
    effects: [
      "bright crackling yellow-gold eyes with electric energy sparking from the corners",
      "electric-blue eyes that pulse and flicker like live wires",
      "arcs of blue-white lightning coursing visibly across the fur",
      "static-charged fur standing on end with visible energy crackling between the hairs",
      "jagged bolt-shaped markings glowing neon-bright on the body",
      "sparks exploding from the paws with each step like tiny fireworks",
      "a crackling electric mane of pure energy around the neck and shoulders",
      "floating orbs of ball lightning orbiting the body slowly",
      "plasma trails streaming from the tail like an electric comet",
      "circuit-board-like glowing patterns running through the fur",
      "a massive lightning bolt frozen mid-strike directly behind the body",
      "electromagnetic field distortion visible as rippling energy in the air",
      "tiny lightning bolts jumping between the ear tips",
      "a corona of electrical discharge surrounding the entire body",
    ],
    environments: [
      "a towering mountain peak above a sea of dark thunderclouds with lightning everywhere",
      "a lightning-struck wasteland with fulgurite glass craters and electrically charged sand",
      "a futuristic neon cityscape at night during a massive electrical storm",
      "a vast open plain with a supercell thunderstorm filling the entire dramatic sky",
      "an electric crystal cave with naturally conducting mineral formations sparking",
      "a wind-battered coastal cliff during a hurricane with horizontal rain and constant lightning",
      "a power plant rooftop with transformer explosions and arcing electricity",
      "a dark forest where every tree has been struck by lightning and glows with residual charge",
      "a rain-soaked highway at night with neon signs reflecting in puddles during a storm",
      "a magnetic anomaly zone where rocks float and electricity arcs between them",
    ],
    style:
      "High-contrast painterly Pokemon illustration style with electric blues, bright golds, deep purples, and dramatic lightning backlighting.",
  },
  psychic: {
    intro:
      "Transform this pet into a transcendent psychic-type fantasy creature in the style of a Pokemon Illustration Rare artwork.",
    poses: [
      "levitating serenely with eyes half-closed in deep psychic focus, paws dangling",
      "sitting in meditation on a floating platform of crystallized light energy",
      "walking calmly through a shattered reality with dimensions fracturing around it",
      "hovering above the ground surrounded by slowly orbiting crystal shards and ancient symbols",
      "standing in a trance as psychic energy pours upward from its body like reverse rain",
      "phasing halfway through a glowing portal between two different dimensions",
      "perched atop a crumbling astral temple spire gazing across infinity",
      "floating in a cosmic void surrounded by miniature galaxies and star systems",
      "sitting peacefully with dozens of objects levitating in a perfect sphere around it",
      "walking along a path of pure light that materializes with each step",
      "curled up sleeping while its astral projection stands guard above its body",
      "standing still as reality bends and warps in a sphere around it",
    ],
    effects: [
      "deep glowing violet eyes radiating visible psychic energy",
      "shifting iridescent eyes that change color like an oil slick",
      "a bright third-eye gem shining intensely on the forehead",
      "a layered violet-pink psychic aura rippling outward from the body in waves",
      "cosmic nebula patterns and galaxy swirls visible within the fur itself",
      "floating crystalline shards orbiting in a slow mesmerizing circle",
      "objects and rocks levitating around the dog defying gravity",
      "reality-warping distortion effects bending space around the paws",
      "a crown of floating psychic runes and ancient symbols above the head",
      "translucent afterimage echoes trailing behind the body showing past positions",
      "geometric sacred geometry patterns forming in the air spontaneously",
      "streams of pure psychic energy flowing from the eyes like ethereal ribbons",
      "small galaxies and nebulae forming and dissolving around the body",
      "a translucent astral projection separating slightly from the physical form",
    ],
    environments: [
      "a transcendent astral plane with vast colorful nebulae filling every inch of the sky",
      "ancient floating stone temple ruins covered in glowing runes drifting in the cosmic void",
      "a mirror dimension where the landscape reflects and fractures infinitely in every direction",
      "a crystal sanctuary with massive gemstone formations refracting rainbow light everywhere",
      "the surface of a distant alien planet with multiple moons and ring systems visible",
      "a dreamlike surreal landscape where gravity doesn't exist and objects float freely",
      "a cosmic library with floating books and scrolls made of pure light",
      "a meditation garden existing between dimensions with impossible geometry and starfields",
      "a vast psychic mindscape of floating islands connected by bridges of pure energy",
      "a space between stars where cosmic dust forms impossible structures and patterns",
    ],
    style:
      "Deep painterly Pokemon illustration style with rich cosmic purples, pinks, blues, ethereal whites, and mystical ambient glow lighting.",
  },
  fighting: {
    intro:
      "Transform this pet into a fearsome fighting-type fantasy creature in the style of a Pokemon Illustration Rare artwork.",
    poses: [
      "crouching low in a martial arts stance with one paw extended forward ready to strike",
      "mid-leap delivering a devastating flying kick with impact energy trailing behind",
      "standing tall in a champion's victory pose atop a defeated stone golem",
      "charging forward at full speed with wrapped fists and a fierce battle cry expression",
      "balanced perfectly on one leg in a crane stance atop a bamboo pole over mist",
      "breaking through a thick stone wall mid-punch with debris and dust exploding outward",
      "squaring up in an ancient arena with a crowd of shadowy spectators watching",
      "meditating under a powerful waterfall with immense restrained power radiating from its still body",
      "mid-uppercut with a massive shockwave rippling outward from the impact point",
      "standing back-to-back with its own shadow warrior reflection ready for a fight",
      "landing from a massive jump that cracks the stone ground in a spider web pattern",
      "blocking an incoming strike with a forearm guard, energy deflecting in all directions",
    ],
    effects: [
      "intense glowing ice-blue eyes burning with fighting spirit",
      "burning crimson eyes that flare with inner rage",
      "sleek dark steel armor plates naturally integrated into the fur on shoulders and chest",
      "bronze battle armor growing naturally along the legs and spine",
      "a pulsing blue-white battle aura radiating outward with visible force",
      "a fiery orange battle aura that makes the air shimmer and dust rise",
      "wrapped cloth bandages on the front paws crackling with stored energy",
      "impact shockwave rings visible around the fists or paws",
      "battle scars across the body that glow with inner power",
      "a flowing martial arts headband trailing dramatically in the wind",
      "war paint markings on the face that glow with fighting energy",
      "a spectral shadow of a larger more powerful version looming behind it like a Stand",
      "chains wrapped around the forearms glowing with fighting spirit",
      "ground cracking and debris floating upward from the sheer force of its power-up",
    ],
    environments: [
      "an ancient stone martial arts dojo courtyard at twilight with paper lanterns glowing",
      "a Roman-style colosseum arena with roaring crowds and dramatic golden spotlights",
      "a mountain training ground with smashed boulders and a thundering waterfall backdrop",
      "a moonlit temple rooftop with cherry blossom petals swirling in the wind",
      "an underground fighting pit carved from raw stone with flickering torch-lit walls",
      "a destroyed city street after an epic battle with crumbling buildings and dust",
      "a sacred mountaintop monastery above the clouds at golden sunrise",
      "a forest clearing turned into a training ground with slashed trees and impact craters",
      "a grand tournament stage with banners and flags from different fighting schools",
      "a rain-soaked back alley at night with neon signs and steam rising from grates",
    ],
    style:
      "Cool-toned painterly Pokemon illustration style with steel blues, stone grays, deep crimsons, and dramatic directional lighting.",
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

  const pose = pickOne(type.poses);
  const environment = pickOne(type.environments);
  const effects = pickN(type.effects, 3); // pick exactly 3 random effects

  const prompt = [
    FRAMING_START,
    type.intro,
    CORE_RULES,
    `The pose: ${pose}.`,
    `Add these elemental effects: ${effects.join("; ")}.`,
    `Set the scene: ${environment}.`,
    type.style,
    FRAMING_END,
  ].join(" ");

  return prompt;
}
