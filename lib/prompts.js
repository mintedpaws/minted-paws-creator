// lib/prompts.js
// v14 — BODY-PRESERVING ENHANCEMENTS
//        Keep the pet's full body intact — same legs, paws, tail, proportions
//        Layer elemental effects, accessories, glowing accents, and magical auras ON TOP
//        Never replace or remove body parts
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
  "IMPORTANT: This is a LANDSCAPE composition. The pet must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the animal.";

const FRAMING_END =
  "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
  "REMINDER: LANDSCAPE composition. The full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.";

const CORE_RULES =
  "CRITICAL: Keep the pet's ENTIRE BODY exactly as it is — same breed, same body shape, same proportions, same number of legs, same paws, same tail. " +
  "Do NOT replace any body parts. Do NOT add wings, fins, extra limbs, tails, horns, or scales. Do NOT turn the pet into a different creature. " +
  "The pet should still look like itself — a real pet — but enhanced with magical elemental effects layered ON TOP of and AROUND its body. " +
  "Preserve the exact fur color, pattern, and markings. Remove any leash, collar, harness, or accessories from the original photo.";

const ART_STYLE =
  "Render in the style of a Pokemon TCG Illustration Rare card — soft painterly brushstrokes, dreamy atmosphere, the pet harmoniously blending into its environment rather than pasted on top. " +
  "The composition should feel like a single flowing painting where pet and background merge through color, light, and texture. " +
  "Use impressionistic details in the background, sharp focus on the pet's face, and soft diffused edges where the pet meets the environment. " +
  "Rich saturated colors with a slight ethereal glow throughout the entire image.";

// ---- Type definitions ----
const TYPES = {
  fire: {
    intro:
      "Place this pet in a dramatic fire-themed fantasy scene. The pet keeps its real body but is enhanced with magical fire effects and a blazing environment.",
    enhancements: [
      "The pet's fur has a subtle warm ember glow at the tips as if radiating heat. Flames flicker around its paws without burning them. A soft fiery aura surrounds the body like rising heat waves.",
      "Glowing orange-red vein-like markings trace across the fur, pulsing with inner fire energy. Embers and sparks drift upward from the pet's back. The ground beneath glows with faint lava cracks.",
      "A dramatic mane of swirling fire energy wraps loosely around the pet's neck and shoulders like a fiery scarf. Tiny floating fireballs orbit the head like a crown. The pet's eyes glow a warm amber-gold.",
      "The pet is surrounded by rings of slowly orbiting fire. Smoldering pawprints glow on the ground behind it. A heat shimmer distortion radiates off the fur giving it an otherworldly intensity.",
      "Flames stream backward from the ear tips and tail like comet trails. The fur has subtle charcoal-dark streaks mixed with the natural coloring as if kissed by fire. Embers swirl in the air all around.",
      "A cloak of living flame drapes loosely behind the pet like a royal mantle of fire. The eyes burn with molten gold intensity. Small volcanic crystals float near the paws, glowing orange from within.",
    ],
    poses: [
      "standing defiantly atop a crumbling volcanic cliff, looking powerful and fearless",
      "mid-leap through an enormous wall of roaring fire, body fully extended",
      "charging forward through a field of molten rock, magma splashing around each stride",
      "howling skyward as a massive spiral of flames erupts around its body",
      "crouching low ready to pounce with bubbling lava pooling beneath its paws",
      "emerging triumphantly from a violently erupting volcanic fissure",
      "perched on a floating chunk of obsidian above an endless lava lake",
      "rearing up on hind legs silhouetted against a massive eruption",
      "sprinting across a field of cooling lava with cracks of molten orange beneath each step",
      "standing guard at the mouth of a volcano with ash raining down like snow",
    ],
    effects: [
      "ember-orange glowing eyes that burn with fierce intensity",
      "molten-gold glowing eyes with flickering flame pupils",
      "thousands of embers and sparks swirling in the air like fireflies",
      "smoldering pawprints glowing on the ground behind each step",
      "heat shimmer distortion radiating visibly off the fur",
      "small floating fireballs orbiting the head like a crown",
      "cracks of molten lava forming in the ground beneath its stance",
      "a warm fiery aura that makes nearby air shimmer",
    ],
    environments: [
      "a massive erupting volcano with ash-filled orange skies and rivers of lava flowing through the scene",
      "the inside of a vast magma chamber deep underground with glowing stalactites dripping fire",
      "a hellish landscape of fire geysers and sulfur vents under a blood-red sky",
      "a volcanic island surrounded by boiling ocean with towering pillars of steam, everything painted in warm oranges",
      "a scorched battlefield at dusk with embers floating like a million fireflies, the scene dissolving into painterly strokes at the edges",
      "a primordial landscape of obsidian spires and pools of bubbling magma stretching into a hazy orange horizon",
      "a crumbling ancient fire temple with lava flowing down the steps",
      "an ash-covered wasteland with rivers of fire, the sky and ground merging in heat shimmer",
    ],
    style:
      "Dramatic warm palette — deep crimsons, volcanic oranges, bright yellows, and black. " + ART_STYLE,
  },
  water: {
    intro:
      "Place this pet in a majestic water-themed fantasy scene. The pet keeps its real body but is enhanced with magical water effects and an oceanic environment.",
    enhancements: [
      "Magical streams of glowing water spiral gracefully around the pet's body. Iridescent shimmering highlights glisten across the fur like sunlight through water. Floating orbs of water hover in the air nearby.",
      "Bioluminescent blue markings glow softly along the pet's fur in flowing patterns. A misty vapor aura drifts off the body. Tiny bubbles rise from around the pet as if it's channeling the ocean.",
      "A crown of crystallized ice forms elegantly around the pet's head like a frozen tiara. Frost gently crystallizes on the whisker tips and ear edges. The fur has a wet, glistening sheen that catches every light.",
      "The pet is surrounded by a swirling vortex of water droplets suspended in mid-air. Glowing jellyfish-like wisps of light float nearby. The fur ripples as if underwater currents flow through it.",
      "Coral and seashell-like ornamental growths accent the pet's shoulders and back like natural jewelry. A trail of glowing water follows behind the tail. Prismatic light refracts through floating water drops casting rainbow patterns.",
      "Snowflake-like ice crystals form in the air around the pet. The fur has an ethereal blue-white frost tinge at the tips. Water streams flow from around the paws, spiraling upward defying gravity.",
    ],
    poses: [
      "leaping majestically above a crashing wave at the peak of its arc",
      "standing regally on a sea rock as enormous waves crash dramatically around it",
      "running impossibly along the surface of the ocean leaving magical ripples with each step",
      "standing on a frozen ice floe in an arctic sea gazing at the northern lights above",
      "riding the crest of a massive turquoise wave like a surfing legend",
      "emerging from a whirlpool with water spiraling around its body",
      "walking along a moonlit beach with glowing bioluminescent waves lapping at its paws",
      "standing tall on a coral reef outcropping with the deep ocean stretching behind",
      "perched on ancient ruins rising from the ocean with spray all around",
      "standing in a shallow tide pool as a massive wave towers behind it",
    ],
    effects: [
      "glowing aqua-blue eyes that shimmer like sunlight through water",
      "deep ocean-teal eyes with bioluminescent pupils",
      "magical water streams spiraling gracefully around the body",
      "floating orbs of water suspended in the air around the pet",
      "a misty vapor aura drifting off the fur",
      "frost crystallizing on the whisker tips and ear edges",
      "bioluminescent blue markings glowing softly on the fur",
      "tiny bubbles rising from the fur into the air",
    ],
    environments: [
      "a vast open ocean at golden hour with towering turquoise waves, the pet and water painted as one flowing composition",
      "a deep underwater coral kingdom glowing with intense bioluminescence, the scene dissolving into soft impressionistic strokes at the edges",
      "a moonlit tropical lagoon with crystal-clear water, the pet blending seamlessly with the reflections and light",
      "a frozen arctic seascape with massive glaciers and vivid aurora borealis painting the sky in soft brushstrokes",
      "a thundering waterfall cascading into a misty jungle pool, the mist and pet merging into the painterly atmosphere",
      "an ancient submerged temple with shafts of golden light breaking through the water surface, everything rendered in soft luminous strokes",
      "a hidden underwater grotto with turquoise water and crystalline formations refracting light everywhere",
      "a stormy sea with massive dark waves under dramatic lightning-filled clouds, the pet commanding the storm",
    ],
    style:
      "Cool oceanic palette — teals, deep blues, aquamarine, shimmering silvers, and touches of bioluminescent cyan. " + ART_STYLE,
  },
  grass: {
    intro:
      "Place this pet in a wild nature-themed fantasy scene. The pet keeps its real body but is enhanced with magical nature effects and a lush environment.",
    enhancements: [
      "Small wildflowers and tiny leaves bloom naturally from the pet's fur along the back and shoulders. A faint green nature aura with floating pollen and dandelion seeds surrounds the body. Vines trail loosely along the tail.",
      "Moss and soft lichen grow in patches along the pet's back like a living cloak. A crown of woven branches and small blooming flowers sits atop the head. Glowing mushrooms sprout from the ground around the paws.",
      "Butterflies and fireflies swirl around the pet's body in a magical dance. Tiny dewdrops cling to the fur glowing with inner light. A carpet of small flowers blooms wherever the pet steps.",
      "Living vines with tiny buds wind loosely around the pet's legs and tail like natural garlands. Bark-like patterns appear subtly in the fur like tree ring markings. Golden sunbeams seem to bend toward the pet.",
      "The pet's fur has a soft green-gold shimmer as if touched by forest magic. Fern fronds unfurl gently from around the ears. Spores and glowing seeds release from the fur and drift on the breeze. Forest sprites float nearby.",
      "A gentle cascade of cherry blossom petals swirls around the pet. The fur has a warm golden-green tint at the tips. Tiny mushrooms and clovers grow in a ring at the pet's feet. Wisps of green light orbit the body.",
    ],
    poses: [
      "bounding joyfully through a field of giant wildflowers twice its size",
      "leaping between massive moss-covered tree branches high in the canopy",
      "standing proudly in a sunlit clearing with ancient vines growing nearby",
      "emerging from dense jungle foliage like a mythical forest guardian",
      "standing alert on a giant lily pad in the middle of a misty pond",
      "walking through a tunnel of flowering vines with petals raining down",
      "perched on a fallen mossy log overlooking a vast magical forest valley",
      "mid-run through enchanted grass with seeds and petals flying everywhere",
      "sitting regally on a throne of twisted roots and exotic blooming flowers",
      "stretching tall on a hilltop as a breeze carries cherry blossoms past",
    ],
    effects: [
      "warm emerald-green glowing eyes full of ancient wisdom",
      "golden-amber glowing eyes like drops of tree sap",
      "a faint green nature aura with floating pollen and dandelion seeds",
      "butterflies and fireflies swirling around the body",
      "a carpet of small flowers blooming wherever it steps",
      "tiny forest sprites or wisps of green light floating nearby",
      "dewdrops clinging to the fur that glow with inner light",
      "golden sunbeams seeming to bend toward the pet",
    ],
    environments: [
      "an ancient magical forest with enormous mossy trees, golden sunbeams breaking through the canopy, the pet and forest painted as one living ecosystem",
      "a hidden grove of giant glowing mushrooms and bioluminescent ferns, everything dissolving into soft impressionistic strokes of green and gold",
      "a sprawling flower meadow stretching to distant mountains, the pet emerging from the flowers as if growing from the earth itself",
      "a sacred grove where massive ancient trees form a natural cathedral, light and leaves and pet all blending in painterly strokes",
      "a hillside of cherry blossom trees in full bloom with millions of petals filling the air",
      "an overgrown ancient ruin being reclaimed by nature, vines and flowers connecting everything to the stone",
      "a mystical bamboo forest at dawn with mist and soft golden light, the pet fading into the misty atmosphere at its edges",
      "a fairy-tale meadow with a winding stream, the water reflections and flowers all painted in flowing connected brushstrokes",
    ],
    style:
      "Warm natural palette — rich greens, golden yellows, warm earth tones, soft pinks and whites from blossoms. " + ART_STYLE,
  },
  electric: {
    intro:
      "Place this pet in a fierce electric-themed fantasy scene. The pet keeps its real body but is enhanced with magical electric effects and a stormy environment.",
    enhancements: [
      "Arcs of blue-white lightning course visibly across the pet's fur. The fur stands slightly on end with static energy crackling between the hairs. Sparks fly from the paws with each step like tiny fireworks.",
      "Jagged bolt-shaped markings glow neon-bright on the pet's body like electric tattoos. A crackling electric aura surrounds the head and shoulders like a mane of pure energy. Plasma trails stream from the tail.",
      "The pet's fur has glowing circuit-board-like patterns running through it. Floating orbs of ball lightning orbit the body slowly. Tiny lightning bolts jump between the ear tips. The eyes pulse with electric blue light.",
      "A corona of electrical discharge surrounds the pet's entire body. The fur crackles with visible static, each hair tipped with a tiny spark. The ground beneath shows scorched pawprint marks glowing with residual charge.",
      "Lightning bolts arc from the pet to nearby objects and the ground. The fur has neon-bright streaks running through the natural coloring. An electromagnetic shimmer distorts the air around the body. Sparks cascade off the back.",
      "The pet is the epicenter of a web of electricity — bolts reach outward from its body to the environment. The eyes are solid crackling blue-white. The tail leaves a glowing plasma trail in the air. Static lifts the fur dramatically.",
    ],
    poses: [
      "mid-sprint across a mountain ridge with lightning striking dramatically behind it",
      "leaping through the air with electricity arcing between all four paws",
      "howling into a thunderstorm as a bolt of lightning channels through its body",
      "charging forward through a neon-lit corridor leaving trails of crackling electricity",
      "standing in the eye of a lightning tornado with bolts spiraling all around",
      "mid-pounce with a massive discharge of energy exploding outward",
      "standing atop a lightning rod during the peak of a supercell storm, fully charged",
      "racing across a metal bridge as electricity arcs to every cable and rail",
      "skidding to a dramatic stop with electricity trailing behind like a speed afterimage",
      "crouching low on a charged surface with sparks cascading in every direction",
    ],
    effects: [
      "bright crackling yellow-gold eyes with electric energy sparking from the corners",
      "electric-blue eyes that pulse and flicker like live wires",
      "arcs of blue-white lightning coursing visibly across the fur",
      "sparks exploding from the paws with each step like tiny fireworks",
      "floating orbs of ball lightning orbiting the body slowly",
      "plasma trails streaming from the tail like an electric comet",
      "electromagnetic field distortion visible as rippling energy in the air",
      "a corona of electrical discharge surrounding the entire body",
    ],
    environments: [
      "a towering mountain peak above a sea of dark thunderclouds with lightning everywhere, the pet and storm painted as one electrical event",
      "a futuristic neon cityscape at night during a massive electrical storm, neon lights and lightning blending into impressionistic streaks of color",
      "a vast open plain with a supercell thunderstorm filling the entire dramatic sky, the pet at the epicenter of the energy",
      "an electric crystal cave with naturally conducting mineral formations, the pet's energy connecting to every crystal in flowing arcs",
      "a lightning-struck wasteland with fulgurite glass craters, the landscape crackling with residual charge",
      "a rain-soaked highway at night with neon reflections, the pet's electricity reflecting in every puddle and wet surface",
      "a magnetic anomaly zone where rocks float and electricity arcs between them, the pet the source of the disturbance",
      "a dark forest where every tree glows with electrical charge, the pet and forest connected by webs of lightning",
    ],
    style:
      "High-contrast electric palette — electric blues, bright golds, deep purples, neon whites, and dramatic black shadows. " + ART_STYLE,
  },
  psychic: {
    intro:
      "Place this pet in a transcendent psychic-themed fantasy scene. The pet keeps its real body but is enhanced with magical psychic effects and a cosmic environment.",
    enhancements: [
      "A bright third-eye gem glows intensely on the pet's forehead. A layered violet-pink psychic aura ripples outward from the body in waves. Floating crystalline shards orbit the pet in a slow mesmerizing circle.",
      "The pet's fur shimmers with subtle cosmic nebula patterns — hints of stars and galaxies visible within the coat. Streams of pure psychic energy flow from the eyes like ethereal ribbons. Objects float nearby defying gravity.",
      "A crown of floating psychic runes and ancient symbols hovers above the pet's head. The fur has a soft ethereal purple glow at the tips. Reality-warping distortion effects bend space around the paws. The eyes shift with iridescent color.",
      "Translucent afterimage echoes trail behind the pet showing past positions like a motion blur. Small galaxies and nebulae form and dissolve around the body. The pet seems to float slightly above the ground. Geometric patterns form in the air.",
      "The pet's body has a faint translucent quality as if partially phasing between dimensions. Glowing runic markings trace along the fur in sacred geometry patterns. A sphere of warped space surrounds the body. Crystal formations float near the paws.",
      "An astral projection — a faint glowing outline of the pet — hovers just above and behind the real body. The eyes are solid glowing orbs of shifting violet. Psychic energy particles drift upward from the fur like reverse snow.",
    ],
    poses: [
      "levitating serenely with eyes half-closed in deep psychic focus, paws dangling slightly",
      "sitting in meditation on a floating platform of crystallized light energy",
      "walking calmly through a shattered reality with dimensions fracturing around it",
      "hovering above the ground surrounded by slowly orbiting crystal shards and ancient symbols",
      "standing in a trance as psychic energy pours upward from its body like reverse rain",
      "floating in a cosmic void surrounded by miniature galaxies and star systems",
      "sitting peacefully with dozens of objects levitating in a perfect sphere around it",
      "walking along a path of pure light that materializes with each step forward",
      "standing still as reality bends and warps in a sphere around it",
      "curled up sleeping while a faint astral glow radiates from its peaceful body",
    ],
    effects: [
      "deep glowing violet eyes radiating visible psychic energy outward",
      "shifting iridescent eyes that change color like an oil slick on water",
      "a layered violet-pink psychic aura rippling outward in waves",
      "floating crystalline shards orbiting in a slow mesmerizing circle",
      "reality-warping distortion effects bending space around the pet",
      "geometric sacred geometry patterns forming spontaneously in the air",
      "streams of pure psychic energy flowing from the eyes like ethereal ribbons",
      "small galaxies and nebulae forming and dissolving around the body",
    ],
    environments: [
      "a transcendent astral plane with vast colorful nebulae, the pet and cosmos painted as one continuous flowing vision",
      "ancient floating stone temple ruins covered in glowing runes drifting in the void",
      "a mirror dimension where the landscape reflects and fractures infinitely, the pet at the center of the distortion",
      "a crystal sanctuary with massive gemstone formations, rainbow light and pet blending in soft prismatic brushstrokes",
      "a dreamlike surreal landscape where gravity doesn't exist, the pet and floating objects all part of the same impossible painting",
      "a cosmic library with floating books and scrolls of pure light",
      "a vast psychic mindscape of floating islands connected by bridges of pure energy, rendered in flowing impressionistic strokes",
      "the space between stars where cosmic dust forms impossible structures, the pet indistinguishable from the cosmos at its edges",
    ],
    style:
      "Cosmic mystical palette — rich purples, deep pinks, ethereal blues, shimmering whites, and void blacks with pinpoint stars. " + ART_STYLE,
  },
  fighting: {
    intro:
      "Place this pet in a fierce fighting-themed fantasy scene. The pet keeps its real body but is enhanced with magical battle effects and a warrior environment.",
    enhancements: [
      "A pulsing blue-white battle aura radiates outward from the pet with visible force. War paint-like glowing markings appear on the face and body. The ground cracks beneath from the sheer energy output. Dust and debris float upward.",
      "The pet wears natural-looking battle wraps on its front paws that glow with stored energy. A flowing martial arts headband trails dramatically in the wind behind it. Impact shockwave rings pulse outward from the paws.",
      "A spectral shadow — a larger, fiercer version of the pet — looms behind it like a ghostly guardian. The eyes glow with intense fighting spirit. Small rocks and debris levitate around the body from the energy output.",
      "A fiery orange battle aura surrounds the pet making the air shimmer and dust rise. Tiger-stripe-like glowing markings trace across the body. The pet's stance radiates power. Cracks form in the ground radiating outward from the paws.",
      "The pet is surrounded by swirling wind and energy. Glowing battle scars trace across the body pulsing with inner power. A focused beam of fighting spirit energy rises from the pet like a pillar. Pebbles hover in the air from the force.",
      "Chains of glowing energy wrap loosely around the pet's forearms like spectral bracers. The eyes burn with crimson fighting spirit. A shockwave ring expands outward from the pet's position. Cherry blossom petals and dust swirl in the energy.",
    ],
    poses: [
      "crouching low in a martial arts stance with one paw extended forward ready to strike",
      "mid-leap delivering a devastating flying kick with impact energy trailing behind",
      "standing tall in a champion's victory pose looking powerful and triumphant",
      "charging forward at full speed with a fierce battle cry expression",
      "breaking through a thick stone wall with debris and dust exploding outward",
      "mid-uppercut with a massive shockwave rippling outward from the impact point",
      "landing from a massive jump that cracks the stone ground in a spider web pattern",
      "meditating under a powerful waterfall with immense restrained power radiating from its still body",
      "squaring up in an ancient arena with focused intensity",
      "blocking an incoming strike with a foreleg guard, energy deflecting in all directions",
    ],
    effects: [
      "intense glowing ice-blue eyes burning with fighting spirit",
      "burning crimson eyes that flare with inner rage and focus",
      "a pulsing blue-white battle aura radiating outward with visible force",
      "a fiery orange battle aura that makes the air shimmer and dust rise",
      "impact shockwave rings visible around the paws",
      "battle scars across the body that glow with inner power",
      "ground cracking and debris floating upward from sheer power",
      "a spectral shadow of a larger more powerful version looming behind",
    ],
    environments: [
      "an ancient stone martial arts dojo courtyard at twilight, lanterns and stone all painted in warm flowing brushstrokes",
      "a Roman-style colosseum arena with dramatic golden spotlights, the crowd dissolving into impressionistic paint strokes in the background",
      "a mountain training ground with smashed boulders and a waterfall, the mist and destruction blending into the painterly atmosphere",
      "a moonlit temple rooftop with cherry blossom petals, the pet and blossoms and moonlight all flowing together as one composition",
      "a destroyed city street after an epic battle, dust and debris fading into abstract painterly textures at the edges",
      "a sacred mountaintop monastery above the clouds at golden sunrise, the pet emerging from the light and mist",
      "a rain-soaked back alley at night with neon signs, reflections painted in bold impressionistic strokes",
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

  const enhancement = pickOne(type.enhancements);
  const pose = pickOne(type.poses);
  const environment = pickOne(type.environments);
  const effects = pickN(type.effects, 2); // 2 extra effects on top of the enhancement

  const prompt = [
    FRAMING_START,
    type.intro,
    CORE_RULES,
    `Elemental enhancements: ${enhancement}`,
    `The pose: ${pose}.`,
    `Additional effects: ${effects.join("; ")}.`,
    `Set the scene: ${environment}.`,
    type.style,
    FRAMING_END,
  ].join(" ");

  return prompt;
}
