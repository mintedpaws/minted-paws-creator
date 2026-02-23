// lib/prompts.js
// Each type has a tailored prompt for GPT-Image-1.5
// v11 — LANDSCAPE orientation to match card art window
//        framing sandwiched at START and END of every prompt
//        richly descriptive with extensive pose/environment menus
// Edit these freely — no code changes needed, just tweak the text and redeploy

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "IMPORTANT: This is a LANDSCAPE composition. The dog must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the dog. " +
      "Transform this dog into a legendary fire-type fantasy creature in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Remove any leash, collar, harness, or accessories. " +
      "Give the dog a powerful dynamic pose — choose something epic and different each time: " +
      "standing defiantly atop a crumbling volcanic cliff, mid-leap through a wall of fire, charging forward through a field of molten rock, " +
      "howling skyward as flames spiral around its body, crouching low ready to pounce with lava pooling beneath it, " +
      "emerging triumphantly from an erupting fissure, perched on a floating chunk of obsidian above a lava lake, " +
      "or mid-stride walking through a burning forest like a force of nature. Pick one and make it feel alive. " +
      "Add fire elemental effects — mix and match creatively from: " +
      "ember-orange or molten-gold glowing eyes, flames erupting from the ear tips or streaming off the tail like a comet, " +
      "glowing lava-crack veins pulsing across the fur, a blazing mane of fire around the neck and shoulders, " +
      "smoldering pawprints left on the ground, rings of fire orbiting the body, " +
      "embers and sparks swirling in the air, heat shimmer distortion radiating off the fur, " +
      "or a phoenix-like aura of flame wings spreading behind the dog. " +
      "Set the scene in an epic fire environment — choose something dramatic and different each time: " +
      "a massive erupting volcano with ash-filled skies, a river of bright molten lava cutting through black volcanic rock, " +
      "the inside of a magma chamber deep underground with glowing stalactites, a burning ancient temple engulfed in wildfire, " +
      "a hellish landscape of fire geysers and sulfur vents under a blood-red sky, " +
      "a volcanic island surrounded by boiling ocean with pillars of steam, " +
      "a crumbling stone bridge over a vast lava canyon, or a scorched battlefield with embers floating like fireflies at dusk. " +
      "Vibrant painterly Pokemon illustration style with rich warm cinematic lighting, dramatic oranges, deep reds, and bright yellows. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "REMINDER: LANDSCAPE composition. The dog's full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.",
  },
  water: {
    prompt:
      "IMPORTANT: This is a LANDSCAPE composition. The dog must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the dog. " +
      "Transform this dog into a majestic water-type fantasy creature in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Remove any leash, collar, harness, or accessories. " +
      "Give the dog a graceful dynamic pose — choose something fluid and different each time: " +
      "leaping majestically above a crashing wave, gliding through crystal-clear water surrounded by fish, " +
      "standing regally on a sea rock as waves crash around it, surfacing from the deep with water streaming off its body, " +
      "running along the surface of the ocean leaving ripples with each step, " +
      "floating serenely in a bioluminescent underwater cavern, diving downward into an ocean trench with a trail of bubbles, " +
      "or standing on a frozen ice floe in an arctic sea with the northern lights above. Pick one and make it feel magical. " +
      "Add water elemental effects — mix and match creatively from: " +
      "glowing aqua-blue or deep ocean-teal eyes, iridescent shimmering highlights across the fur like sunlight through water, " +
      "translucent flowing fins along the ears and tail that ripple like silk, magical water streams spiraling around the body, " +
      "a crown or mane of crystallized ice forming around the head and neck, " +
      "bioluminescent markings glowing on the fur, floating orbs of water suspended around the dog, " +
      "a misty vapor aura, barnacle or coral-like armor growing naturally on the shoulders, " +
      "or a trail of glowing jellyfish-like tendrils flowing from the tail. " +
      "Set the scene in a breathtaking aquatic environment — choose something stunning and different each time: " +
      "a vast open ocean at golden hour with towering turquoise waves, a deep underwater coral kingdom glowing with bioluminescence, " +
      "a moonlit tropical lagoon with crystal-clear water and visible reef below, " +
      "a frozen arctic seascape with glaciers and aurora borealis overhead, " +
      "a thundering waterfall cascading into a misty jungle pool, " +
      "an ancient submerged temple with shafts of light breaking through the water surface, " +
      "a stormy sea with massive waves under dramatic lightning-filled clouds, " +
      "or a serene underwater garden of giant kelp and sea anemones with light filtering from above. " +
      "Luminous painterly Pokemon illustration style with beautiful oceanic lighting, teals, deep blues, and shimmering highlights. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "REMINDER: LANDSCAPE composition. The dog's full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.",
  },
  grass: {
    prompt:
      "IMPORTANT: This is a LANDSCAPE composition. The dog must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the dog. " +
      "Transform this dog into a wild nature-type fantasy creature in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Remove any leash, collar, harness, or accessories. " +
      "Give the dog a playful adventurous pose — choose something lively and different each time: " +
      "bounding joyfully through a field of giant wildflowers, leaping between massive moss-covered tree branches, " +
      "standing proudly in a sunlit clearing with vines growing around its paws, " +
      "mid-run through tall enchanted grass with seeds and petals flying everywhere, " +
      "nuzzling against a glowing ancient tree as leaves swirl around it, " +
      "sitting regally on a throne of twisted roots and blooming flowers, " +
      "playfully rolling in a meadow of bioluminescent mushrooms, " +
      "or emerging from dense jungle foliage like a mythical forest guardian. Pick one and make it feel alive. " +
      "Add nature elemental effects — mix and match creatively from: " +
      "warm emerald-green or golden-amber glowing eyes, small leaves and wildflowers blooming from the fur, " +
      "living vines winding along the tail and legs with tiny buds opening, " +
      "a faint green nature aura with floating pollen and dandelion seeds, " +
      "moss and lichen growing naturally along the back and shoulders like living armor, " +
      "a crown of woven branches and flowers on the head, glowing mushrooms sprouting from the paws, " +
      "butterfly or firefly companions swirling around the body, " +
      "or bark-like patterns forming naturally in the fur like tree rings. " +
      "Set the scene in an enchanted natural environment — choose something magical and different each time: " +
      "an ancient magical forest with enormous mossy trees and golden sunbeams breaking through, " +
      "a hidden grove of giant glowing mushrooms and bioluminescent ferns, " +
      "a sprawling flower meadow stretching to distant mountains under a golden sky, " +
      "a dense tropical jungle canopy with exotic birds and hanging vines, " +
      "a sacred grove where massive ancient trees form a natural cathedral of branches, " +
      "a bamboo forest at dawn with mist rolling through and soft light filtering in, " +
      "a hillside of cherry blossom trees in full bloom with petals filling the air, " +
      "or a mystical swamp with bioluminescent water and twisted mangrove roots. " +
      "Warm painterly Pokemon illustration style with golden-green dappled lighting, rich greens, and warm earth tones. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "REMINDER: LANDSCAPE composition. The dog's full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.",
  },
  electric: {
    prompt:
      "IMPORTANT: This is a LANDSCAPE composition. The dog must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the dog. " +
      "Transform this dog into a fierce electric-type fantasy creature in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Remove any leash, collar, harness, or accessories. " +
      "Give the dog an intense high-energy pose — choose something electrifying and different each time: " +
      "mid-sprint across a mountain ridge with lightning striking behind it, leaping through the air with electricity arcing between its paws, " +
      "standing on a charged tesla coil tower with fur standing on end, " +
      "howling into a thunderstorm as lightning channels through its body, " +
      "crouching low on a rain-soaked rooftop with sparks cascading off its back, " +
      "charging forward through a neon-lit cyber corridor leaving trails of electricity, " +
      "balanced on a crumbling power line tower during a storm, " +
      "or standing in the eye of a lightning tornado with bolts spiraling around it. Pick one and make it feel intense. " +
      "Add electric elemental effects — mix and match creatively from: " +
      "bright crackling yellow-gold or electric-blue eyes, arcs of blue-white lightning coursing across the fur, " +
      "static-charged fur standing on end with visible energy, jagged bolt-shaped markings glowing on the body, " +
      "sparks exploding from the paws with each step, a crackling electric mane around the neck, " +
      "floating orbs of ball lightning orbiting the dog, plasma trails streaming from the tail, " +
      "circuit-board-like glowing patterns running through the fur, " +
      "or a massive lightning bolt striking directly behind the dog creating a dramatic silhouette. " +
      "Set the scene in a dramatic storm environment — choose something powerful and different each time: " +
      "a towering mountain peak above a sea of dark thunderclouds with lightning everywhere, " +
      "a lightning-struck wasteland with glass craters and charged sand, " +
      "a futuristic neon cityscape at night during an electrical storm, " +
      "a vast open plain with a supercell thunderstorm filling the entire sky, " +
      "an electric crystal cave with naturally conducting mineral formations, " +
      "a wind-battered cliff during a hurricane with horizontal rain and constant lightning, " +
      "a power plant rooftop with transformer explosions and arcing electricity, " +
      "or a dark forest where every tree has been struck by lightning and glows with residual charge. " +
      "High-contrast painterly Pokemon illustration style with electric blues, bright golds, deep purples, and dramatic lightning backlighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "REMINDER: LANDSCAPE composition. The dog's full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.",
  },
  psychic: {
    prompt:
      "IMPORTANT: This is a LANDSCAPE composition. The dog must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the dog. " +
      "Transform this dog into a transcendent psychic-type fantasy creature in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Remove any leash, collar, harness, or accessories. " +
      "Give the dog a mystical otherworldly pose — choose something transcendent and different each time: " +
      "levitating serenely with eyes half-closed in deep psychic focus, sitting in meditation on a floating platform of light, " +
      "walking calmly through a shattered reality with dimensions fracturing around it, " +
      "hovering above the ground surrounded by orbiting crystal shards and ancient symbols, " +
      "standing in a trance as psychic energy pours upward from its body like reverse rain, " +
      "phasing through a portal between two different dimensions, " +
      "perched atop a crumbling astral temple spire gazing across infinity, " +
      "or floating in a cosmic void surrounded by miniature galaxies and star systems. Pick one and make it feel transcendent. " +
      "Add psychic elemental effects — mix and match creatively from: " +
      "deep glowing violet or shifting iridescent eyes, a bright third-eye gem or diamond shining on the forehead, " +
      "a layered violet-pink psychic aura rippling outward from the body in waves, " +
      "cosmic nebula patterns and galaxy swirls visible within the fur, " +
      "floating crystalline shards orbiting in a slow circle, objects levitating around the dog, " +
      "reality-warping distortion effects around the paws, " +
      "a crown of floating psychic runes or ancient symbols above the head, " +
      "translucent afterimage echoes trailing behind the body, " +
      "or geometric sacred geometry patterns forming in the air around it. " +
      "Set the scene in a cosmic mystical environment — choose something mind-bending and different each time: " +
      "a transcendent astral plane with vast colorful nebulae filling the sky, " +
      "ancient floating stone temple ruins covered in glowing runes drifting in the void, " +
      "a mirror dimension where the landscape reflects and fractures infinitely, " +
      "a crystal sanctuary with massive gemstone formations refracting light in every direction, " +
      "the surface of a distant alien planet with multiple moons and ring systems visible, " +
      "a dreamlike surreal landscape where gravity doesn't exist and objects float freely, " +
      "a cosmic library with floating books and scrolls of pure light, " +
      "or a meditation garden existing between dimensions with impossible geometry and starfields. " +
      "Deep painterly Pokemon illustration style with rich cosmic purples, pinks, blues, ethereal whites, and mystical ambient glow lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "REMINDER: LANDSCAPE composition. The dog's full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.",
  },
  fighting: {
    prompt:
      "IMPORTANT: This is a LANDSCAPE composition. The dog must be centered in the frame with its ENTIRE body fully visible — top of head, ear tips, all four paws, and tail — with generous empty space on all sides, especially above the head and below the paws. Do not crop any part of the dog. " +
      "Transform this dog into a fearsome fighting-type fantasy creature in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Remove any leash, collar, harness, or accessories. " +
      "Give the dog a fierce battle-ready pose — choose something powerful and different each time: " +
      "crouching low in a martial arts stance with one paw forward ready to strike, " +
      "mid-leap delivering a flying kick with impact energy trailing behind, " +
      "standing tall in a champion's victory pose atop a defeated stone golem, " +
      "charging forward with fists wrapped and a battle cry expression, " +
      "balanced on one leg in a crane stance atop a bamboo pole, " +
      "breaking through a stone wall mid-punch with debris flying everywhere, " +
      "squaring up in a boxing ring with a crowd of shadowy spectators, " +
      "or meditating under a waterfall with immense restrained power radiating from its still body. Pick one and make it feel powerful. " +
      "Add fighting elemental effects — mix and match creatively from: " +
      "intense glowing ice-blue or burning crimson eyes, sleek dark steel or bronze armor plates naturally integrated into the fur, " +
      "a pulsing blue-white or fiery orange battle aura radiating outward, " +
      "wrapped cloth bandages on the front paws with energy crackling through them, " +
      "impact shockwave rings around the fists, battle scars that glow with inner power, " +
      "a flowing martial arts headband or war paint markings on the face, " +
      "a spectral shadow of a larger more powerful version of the dog behind it like a Stand, " +
      "chains wrapped around the forearms that glow with fighting spirit, " +
      "or ground cracking and debris floating upward from the sheer force of its power-up. " +
      "Set the scene in a dramatic battle environment — choose something intense and different each time: " +
      "an ancient stone martial arts dojo courtyard at twilight with paper lanterns, " +
      "a Roman-style colosseum arena with roaring crowds and dramatic spotlights, " +
      "a mountain training ground with smashed boulders and a waterfall, " +
      "a moonlit temple rooftop with cherry blossom petals swirling in the wind, " +
      "an underground fighting pit carved from raw stone with torch-lit walls, " +
      "a destroyed city street after an epic battle with crumbling buildings, " +
      "a sacred mountaintop monastery above the clouds at sunrise, " +
      "or a forest clearing turned into a training ground with slashed trees and impact craters. " +
      "Cool-toned painterly Pokemon illustration style with steel blues, stone grays, deep crimsons, and dramatic directional lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "REMINDER: LANDSCAPE composition. The dog's full body must be completely visible and centered with generous space on all sides. No cropping whatsoever.",
  },
};

// Validation helper
export function getPromptForType(typeId) {
  const entry = TYPE_PROMPTS[typeId];
  if (!entry) {
    throw new Error(
      `Unknown type: ${typeId}. Valid types: ${Object.keys(TYPE_PROMPTS).join(", ")}`
    );
  }
  return entry.prompt;
}
