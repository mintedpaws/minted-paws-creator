// lib/prompts.js
// v15 — CREATURE TRANSFORMATION
//        Transform the pet INTO an elemental creature while keeping it recognizable
//        Keep the pet's face, coloring, breed traits, and personality
//        Add elemental body features, anime/illustration rendering
//        Pokémon-inspired creature design — not a photo, a character

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
  "IMPORTANT: This is a LANDSCAPE composition. The creature must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the creature.";

const FRAMING_END =
  "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
  "REMINDER: LANDSCAPE composition. The full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.";

const CORE_RULES =
  "CRITICAL IDENTITY RULES: The creature must clearly be THIS specific pet — preserve the exact face shape, eye placement, ear shape, snout, fur color, fur pattern, and breed characteristics so the owner instantly recognizes their pet. " +
  "The creature should look like an evolved, elemental version of this pet — the same animal but transformed with fantasy features. " +
  "Remove any leash, collar, harness, or human accessories from the original photo.";

const ART_STYLE =
  "Render in a vibrant anime-illustration style inspired by Pokémon character art and Japanese TCG illustrations. " +
  "Bold clean lines, cel-shaded lighting with strong highlights and deep shadows, vivid saturated colors. " +
  "The creature should look like an official Pokémon or Digimon character illustration — stylized but detailed, dynamic and full of personality. " +
  "Smooth gradients on the body, sharp expressive eyes with visible highlights, and a polished illustrative finish. " +
  "The background should be painterly and atmospheric while the creature itself has clean defined edges.";

// ---- Type definitions ----
const TYPES = {
  fire: {
    intro:
      "Transform this pet into a powerful fire-type elemental creature. It should look like an evolved fire Pokémon version of this specific pet.",
    enhancements: [
      "The creature's fur transitions from its natural color at the core to blazing orange and ember-red at the tips, as if its coat is literally smoldering. A mane of living flame flows from the neck and head. The tail becomes a torch of swirling fire.",
      "Glowing magma-like cracks run through the creature's fur revealing molten energy beneath the surface. The paws leave burning embers with each step. Two small flame horns curl upward from the forehead.",
      "The creature's back is lined with a ridge of crystallized fire — jagged ember crystals that glow orange and red. The ears have flame wisps trailing from their tips. The eyes are molten gold with flame-shaped pupils.",
      "A fiery ruff of flame encircles the creature's neck like a burning lion's mane. The paws are wrapped in hardened magma that glows at the cracks. Sparks and embers constantly drift upward from the body.",
      "The creature's fur is streaked with veins of glowing lava that pulse with energy. Its tail splits into two flickering flame tongues. A crown of small floating fireballs orbits the head. Smoke wisps trail from the nostrils.",
      "Armor-like plates of cooled obsidian cover the shoulders and haunches, with glowing orange magma visible between the plates. The creature's ear tips and tail blaze with intense white-hot fire. The chest has a glowing ember core visible through the fur.",
    ],
    poses: [
      "standing powerfully atop volcanic rock, head raised with fierce confidence",
      "mid-howl with a massive eruption of fire spiraling upward from its body",
      "charging forward through flames, body low and determined",
      "rearing up on hind legs roaring, fire exploding outward from its mane",
      "crouched on a lava rock ready to pounce, tail blazing behind it",
      "standing defiantly with one paw raised, flames whipping in the wind",
      "leaping through a ring of fire, body fully extended in a dynamic action pose",
      "sitting regally on an obsidian throne, surveying its volcanic domain",
    ],
    effects: [
      "molten gold eyes with flame-shaped pupils and intense glow",
      "ember-red eyes that flicker and burn with fierce energy",
      "embers and sparks constantly drifting upward from the fur",
      "heat shimmer distortion radiating visibly around the body",
      "burning pawprints left glowing on the ground",
      "small floating fireballs orbiting the creature",
      "smoke and flame wisps trailing from ears and tail",
      "a visible internal glow showing through the chest fur",
    ],
    environments: [
      "a massive erupting volcano with rivers of lava under ash-filled orange skies, painted in dramatic warm brushstrokes",
      "a primordial landscape of obsidian spires and magma pools, the sky ablaze with volcanic lightning",
      "the heart of a magma chamber deep underground, glowing stalactites and pools of liquid fire illuminating the scene",
      "a scorched volcanic wasteland at dusk with embers floating like fireflies and the horizon glowing molten orange",
      "an ancient fire temple with lava cascading down massive stone steps, runes glowing on the walls",
      "a volcanic island surrounded by a boiling sea, steam pillars rising into a blood-red sky",
      "a crumbling obsidian fortress with rivers of fire flowing through its halls",
      "a field of fire geysers and lava vents under a dramatic crimson aurora",
    ],
    style:
      "Dramatic warm palette — deep crimsons, volcanic oranges, bright yellows, ember golds, and deep blacks. " + ART_STYLE,
  },
  water: {
    intro:
      "Transform this pet into a majestic water-type elemental creature. It should look like an evolved water Pokémon version of this specific pet.",
    enhancements: [
      "The creature's fur flows like liquid water — smooth and glossy with iridescent blue-green highlights that shimmer as if wet. Elegant fin-like crests extend from the ears and along the back. The tail becomes a flowing wave of translucent water.",
      "Crystalline ice armor forms naturally on the shoulders, forehead, and paws — clear blue ice with an inner glow. The creature's fur transitions from its natural color to deep ocean blue at the extremities. Delicate fin membranes connect between the toes.",
      "Bioluminescent markings trace flowing wave patterns across the creature's body, glowing soft cyan. A coral-like crown grows from the forehead. The tail is wrapped in spiraling streams of living water. Tiny bubbles float upward from the fur.",
      "The creature's coat has the sheen of polished abalone shell — iridescent blues, greens, and purples shifting with the light. Graceful water-fin crests flow from the spine. The eyes are deep ocean blue with luminous ring pupils.",
      "Streams of floating water orbit the creature in elegant ribbons, defying gravity. The paws are encased in translucent aqua crystal. A regal trident-shaped crest of ice rises from the forehead. The fur ripples as if submerged in a gentle current.",
      "The creature's body is partially wrapped in living coral and sea crystal that has grown into natural armor. Jellyfish-like tendrils of glowing water trail from the ears and tail. The chest has a deep blue gem-like core that pulses with tidal energy.",
    ],
    poses: [
      "rising majestically from crashing ocean waves, water streaming off its body",
      "standing on a coral throne surrounded by swirling water vortexes",
      "leaping gracefully over enormous ocean waves, body arched like a dolphin",
      "sitting regally on a sea cliff with massive waves crashing behind it",
      "diving downward into a deep ocean trench, surrounded by bioluminescent creatures",
      "standing in shallow tide pools, commanding a massive wall of water rising behind it",
      "surfing atop a colossal wave with perfect balance and poise",
      "floating serenely in a bubble of water suspended in mid-air",
    ],
    effects: [
      "deep ocean-blue eyes with luminous turquoise ring pupils",
      "iridescent aqua eyes that shimmer like sunlight through water",
      "floating ribbons of water orbiting the body gracefully",
      "tiny bubbles constantly rising from the fur",
      "bioluminescent cyan glow along the body's markings",
      "a misty aura of sea spray surrounding the creature",
      "ice crystals forming and dissolving in the air around it",
      "wet glistening fur with rainbow light refractions",
    ],
    environments: [
      "a towering coral reef kingdom deep underwater, sunbeams filtering through the ocean surface above, painted in dreamy aquatic blues",
      "the crest of a massive tsunami wave under dramatic storm clouds, lightning reflecting off the water",
      "an underwater crystal cavern with glowing bioluminescent plants and streams of light piercing through cracks above",
      "a frozen arctic seascape with towering icebergs and aurora borealis reflecting off still dark water",
      "a mystical ocean temple half-submerged in crystal-clear water, ancient pillars covered in coral and sea life",
      "a deep ocean abyss with bioluminescent creatures and glowing thermal vents illuminating the darkness",
      "a waterfall paradise with multiple cascading falls flowing into a luminous turquoise lagoon",
      "a stormy sea with massive dark waves under dramatic lightning, the creature commanding the tempest",
    ],
    style:
      "Cool oceanic palette — teals, deep blues, aquamarine, iridescent silvers, and bioluminescent cyan. " + ART_STYLE,
  },
  grass: {
    intro:
      "Transform this pet into a wild grass-type elemental creature. It should look like an evolved grass/nature Pokémon version of this specific pet.",
    enhancements: [
      "The creature's fur blends with living plant matter — vines and small leaves grow naturally through the coat. A mane of lush fern fronds and flower buds crowns the head. The tail is a thick woody vine ending in a bloom of glowing flowers.",
      "Bark-like natural armor covers the shoulders, spine, and forehead — rough textured wood with green moss growing in the cracks. The paws have root-like extensions that grip the earth. Small mushrooms and flowers sprout from the back.",
      "The creature's body is wrapped in spiraling vines with luminous flowers that glow soft green and gold. Leaf-shaped ears replace the natural ones, veined and translucent. Spores and pollen drift upward from the fur in a gentle cloud.",
      "A magnificent antler-like growth of living wood branches from the creature's head, covered in tiny leaves and hanging moss. The fur has a green-gold tint with patches of soft moss. Firefly-like seed pods float around the body.",
      "The creature's coat transitions from natural fur to a mossy green texture at the extremities. A flowering vine wraps around one leg and up the body like natural decoration. The eyes glow warm amber with leaf-shaped pupils. Petals drift in the air.",
      "Crystal-like seed pods grow along the creature's spine, each glowing with trapped sunlight. The tail is a thick braided vine covered in small blooms. Root-like patterns trace across the paws glowing with earth energy. A leaf crest fans from the forehead.",
    ],
    poses: [
      "standing in a sunlit forest clearing with roots growing from its paws into the earth",
      "leaping through a canopy of giant magical trees with leaves swirling around it",
      "sitting peacefully in a meadow of glowing flowers, vines growing outward from its body",
      "rearing up as a massive ancient tree grows behind it, their energies connected",
      "prowling through dense enchanted undergrowth with glowing eyes visible through the leaves",
      "standing atop a giant moss-covered tree stump, commanding the forest around it",
      "running through tall grass that parts and blooms in its wake",
      "curled around the base of a great tree, flowers blooming wherever it touches",
    ],
    effects: [
      "warm amber eyes with leaf-shaped pupils and a soft inner glow",
      "emerald green eyes with golden sunburst patterns",
      "glowing spores and pollen drifting upward from the fur",
      "small flowers and leaves sprouting from the coat",
      "firefly-like seed pods floating around the body",
      "vines and roots extending from the paws into the ground",
      "a soft green bioluminescent glow along natural markings",
      "petals and leaves swirling in the air around the creature",
    ],
    environments: [
      "an ancient enchanted forest with massive trees whose trunks glow with inner light, painted in lush greens and dappled gold",
      "a hidden jungle temple overgrown with luminous vines and giant exotic flowers, shafts of sunlight breaking through the canopy",
      "a mystical mushroom forest with enormous glowing fungi and floating spores creating a dreamlike atmosphere",
      "a vast meadow of wildflowers stretching to the horizon under golden hour light, every plant bending toward the creature",
      "an enormous hollow tree interior with a natural throne of roots and a canopy of glowing leaves above",
      "a primordial rainforest with waterfalls, giant ferns, and trees so old they've become living stone",
      "a cherry blossom grove in eternal bloom, petals filling the air like pink snow under soft golden light",
      "a mossy ancient grove with standing stones overgrown with glowing vines, the forest alive with magic",
    ],
    style:
      "Natural vibrant palette — emerald greens, warm golds, earthy browns, soft pinks, and dappled sunlight yellows. " + ART_STYLE,
  },
  electric: {
    intro:
      "Transform this pet into a crackling electric-type elemental creature. It should look like an evolved electric Pokémon version of this specific pet.",
    enhancements: [
      "The creature's fur stands on end with static charge, each hair tip glowing with electric energy. Lightning bolt-shaped markings zigzag across the body in bright yellow. The tail crackles with arcing electricity. A spiky electric crest rises from the forehead.",
      "Crystalline conductors grow from the creature's shoulders and spine like circuit-board spikes, channeling visible electricity between them. The paws spark with every step. The ear tips glow neon yellow with constant tiny lightning arcs between them.",
      "The creature's body is wrapped in a web of visible electrical circuits — glowing lines tracing geometric patterns across the fur in neon blue and yellow. A pair of antenna-like crests extend from the head, arcing electricity between their tips.",
      "Plasma orbs orbit the creature, connected by arcs of lightning. The fur has a metallic sheen with patches that glow bright electric blue. A thunder-bolt shaped crest crowns the head. The eyes crackle with visible voltage.",
      "The creature's coat shifts between its natural color and bright electric yellow in jagged patches, like a living lightning bolt. Capacitor-like nodes dot the spine, each humming with stored charge. The tail splits into two lightning-bolt shapes.",
      "A magnetic field is visible around the creature — iron filings and metallic dust hover in patterns around its body. The paws are encased in conductive crystal that sparks on contact with the ground. Electric arcs dance across the fur constantly.",
    ],
    poses: [
      "howling as a massive lightning bolt strikes directly through its body into the ground",
      "charging forward at blinding speed with electrical afterimages trailing behind",
      "rearing up as lightning arcs outward from its body in all directions",
      "crouched low with electricity building between its teeth, about to release a thunderbolt",
      "standing atop a power conduit or tesla coil, drawing in electrical energy",
      "mid-leap surrounded by a cage of lightning bolts",
      "dashing in a zigzag pattern with electric streaks marking its impossible speed",
      "standing on a storm-charged cliff, fur and crest whipping in the electric wind",
    ],
    effects: [
      "bright electric-yellow eyes with lightning bolt pupils",
      "neon blue eyes crackling with visible voltage",
      "constant small lightning arcs dancing across the fur",
      "static-charged fur standing on end and glowing at the tips",
      "plasma orbs orbiting the body connected by arcs",
      "sparks erupting from the paws with each step",
      "a visible electromagnetic field distorting the air around it",
      "afterimage trails of electric energy showing rapid movement",
    ],
    environments: [
      "a massive electrical storm with lightning striking all around, the creature at the eye of the tempest channeling the energy",
      "a futuristic power plant interior with tesla coils and plasma conduits, electricity arcing everywhere in neon blue and yellow",
      "a mountain peak during a superstorm, dark clouds swirling overhead with constant lightning illuminating the scene",
      "a crystalline cave filled with naturally conductive minerals that glow and arc with electricity",
      "a neon-lit cyberpunk cityscape at night during an electrical storm, reflections everywhere",
      "a vast open plain under a sky filled with ball lightning and electrical phenomena, the air itself alive with charge",
      "an ancient lightning temple with metal conductors and stone, electricity flowing through channels carved in the walls",
      "a thundercloud interior — the creature standing ON the clouds with lightning flashing below and above",
    ],
    style:
      "Electric high-contrast palette — bright yellows, neon blues, electric white, deep blacks, and crackling cyan. " + ART_STYLE,
  },
  psychic: {
    intro:
      "Transform this pet into a mystical psychic-type elemental creature. It should look like an evolved psychic Pokémon version of this specific pet.",
    enhancements: [
      "The creature's forehead bears a glowing third eye — a luminous gem-like organ that radiates psychic energy in rings of purple light. The fur has an ethereal shimmer as if existing between dimensions. The tail moves independently as if controlled by telekinesis.",
      "Crystalline psychic growths emerge from the creature's head and spine — translucent purple-pink crystals that pulse with mental energy. The eyes are pure glowing lavender with no visible pupils. A halo of orbiting crystal fragments circles the head.",
      "The creature's body phases partially transparent, revealing a galaxy-like energy core within. Geometric sacred symbols float around it in rotating rings. The fur tips dissolve into starlight particles. Multiple afterimages trail behind suggesting precognition.",
      "Telekinetic energy makes the creature hover slightly above the ground. Objects around it float and orbit slowly. The eyes glow with deep violet psychic power. Rune-like markings trace across the body pulsing with each thought.",
      "A massive psychic aura extends from the creature like ethereal wings made of pure mental energy — translucent purple-pink and slowly rippling. The creature's shadow moves independently. Dream-like imagery flickers in the air around it.",
      "The creature's fur shifts through impossible iridescent colors — purples, pinks, and blues that shouldn't exist. A crown of psychic crystals orbits the head. Its gaze causes visible ripples in reality. Thought-form butterflies made of pure energy flutter nearby.",
    ],
    poses: [
      "hovering in meditation with eyes closed, surrounded by orbiting objects and psychic energy",
      "standing with intense focus, one paw raised as psychic energy blasts forward",
      "sitting serenely while reality warps and bends in a sphere around it",
      "looking directly at the viewer with an all-knowing penetrating psychic gaze",
      "leaping through a rift in space-time with dimensional energy swirling around the opening",
      "standing in a trance state as massive psychic symbols materialize in the air around it",
      "floating above the ground with head tilted, telekinetically controlling its entire environment",
      "rearing back as a massive pulse of psychic energy erupts outward from its third eye",
    ],
    effects: [
      "glowing pure lavender eyes with no visible pupils radiating psychic power",
      "a luminous third eye on the forehead pulsing with purple energy",
      "orbiting crystal fragments and geometric symbols around the head",
      "a translucent psychic aura extending outward like ethereal wings",
      "fur tips dissolving into starlight particles",
      "visible telekinetic distortions warping the air",
      "dream-like afterimages trailing behind suggesting precognition",
      "sacred geometry symbols floating and rotating around the body",
    ],
    environments: [
      "a cosmic void filled with nebulae and distant galaxies, the creature floating among the stars as if the universe is its mind",
      "an ancient psychic temple with floating stone platforms and crystals pulsing with mental energy, painted in deep purples",
      "a dreamscape where reality melts and reforms — impossible architecture, floating islands, and surreal colors",
      "a crystal cavern where every surface reflects psychic visions and alternate realities",
      "a twilight astral plane with floating geometric structures and pathways of pure light stretching into infinity",
      "a serene zen garden that transitions into cosmic space at the edges, the boundary between material and mental world",
      "a library of infinite knowledge — endless floating books and scrolls with glowing text surrounding the creature",
      "the interior of a massive crystal sphere showing visions of past and future in every facet",
    ],
    style:
      "Mystical ethereal palette — deep purples, luminous lavenders, cosmic pinks, midnight blues, and starlight whites. " + ART_STYLE,
  },
  dark: {
    intro:
      "Transform this pet into a sinister dark-type shadow creature. It should look like an evolved dark/ghost Pokémon version of this specific pet.",
    enhancements: [
      "The creature's fur darkens to near-black with an otherworldly sheen, and living shadow tendrils curl from its body like dark smoke. The eyes glow with an eerie pale violet light. A spectral dark aura clings to the fur like a second skin that absorbs nearby light.",
      "A massive ghostly shadow — a larger, more menacing version of the creature — looms behind it with glowing white eyes. The fur is streaked with dark energy veins that pulse faintly purple. Shadow wisps trail from the paws and tail like dark flames.",
      "The creature's body phases between solid and shadow — parts of its silhouette dissolve into dark mist and reform. One eye glows icy blue, the other deep crimson. Spectral wing-like shadows extend from its back, made of pure darkness.",
      "Dark crystalline growths — like black amethyst — emerge from the creature's shoulders, spine, and forehead. The fur absorbs light making the creature darker than its surroundings. A crown of shadow energy orbits the head like a dark halo.",
      "The creature's shadow on the ground is alive — far larger than it should be, with its own glowing eyes and independent movement. Dark energy crackles around the body in arcs of deep purple and black lightning. The tail is wreathed in shadow flame.",
      "The creature emerges from a rift of pure shadow energy — a tear in reality with swirling darkness behind it. Phantom masks or faces appear and dissolve in the dark mist around it. The eyes burn with cold supernatural intensity.",
    ],
    poses: [
      "sitting perfectly still on a high ledge silhouetted against a massive blood moon",
      "emerging from deep shadow with glowing eyes and dark energy swirling around it",
      "prowling forward with predatory grace, shadow tendrils spreading across the ground ahead of it",
      "standing atop crumbling gothic ruins looking down with calm menacing presence",
      "mid-stride through thick fog with shadow wings flared behind it",
      "perched on a gnarled dead tree overlooking a misty graveyard below",
      "rearing up with shadow energy exploding outward in all directions",
      "turning to look over its shoulder with one glowing eye visible, shadows swirling around it",
    ],
    effects: [
      "glowing pale violet eyes that pierce through absolute darkness",
      "eerie mismatched eyes — one icy blue and one deep crimson",
      "living shadow tendrils curling and writhing from the body",
      "a spectral dark aura that visibly absorbs surrounding light",
      "dark purple-black lightning crackling around the form",
      "a shadow on the ground that is far larger and moves on its own",
      "ghostly wisps and phantom faces flickering in the dark mist",
      "fur marked with faintly glowing dark runes and sigils",
    ],
    environments: [
      "a fog-choked graveyard under a massive blood moon, ancient tombstones and twisted iron fences fading into painted mist",
      "a dark enchanted forest where the trees have glowing eyes and shadow creatures lurk between the trunks",
      "the rooftop of a gothic cathedral at midnight with gargoyles and moonlight, the city below lost in shadow",
      "a still black lake reflecting a blood-red moon, dead trees lining the shore like skeletal hands",
      "ancient catacombs lit only by floating spectral candles, the darkness alive with movement and glowing runes",
      "a crumbling dark castle throne room with moonlight streaming through shattered stained glass, shadow and dust swirling",
      "a void between worlds — abstract swirling darkness with floating stone fragments and dying stars",
      "a desolate moor under a stormy sky with lightning illuminating ancient standing stones",
    ],
    style:
      "Dark supernatural palette — deep purples, midnight blues, black shadows, pale moonlight silver, and eerie violet accents. " + ART_STYLE,
  },
};

// ---- Build the final prompt ----
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
  const effects = pickN(type.effects, 2);

  const prompt = [
    FRAMING_START,
    type.intro,
    CORE_RULES,
    `Creature features: ${enhancement}`,
    `The pose: ${pose}.`,
    `Additional effects: ${effects.join("; ")}.`,
    `Set the scene: ${environment}.`,
    type.style,
    FRAMING_END,
  ].join(" ");

  return prompt;
}
