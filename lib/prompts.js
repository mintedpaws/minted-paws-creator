// lib/prompts.js
// Each type has a tailored prompt for FLUX.1 Kontext Pro
// These get sent alongside the pet photo to guide the AI transformation
// Edit these freely — no code changes needed, just tweak the text and redeploy

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "Reimagine this pet as a powerful fire-type fantasy creature in the style of a Pokemon Illustration Rare trading card. " +
      "Remove all collars, leashes, harnesses, clothing, and accessories from the pet entirely. " +
      "The creature should have a blazing mane of living flame, ember-orange glowing eyes, subtle lava-crack markings across its fur that pulse with inner heat, and wisps of fire trailing from its tail and paws. " +
      "Place the creature in a dramatic scene: standing boldly atop a crumbling volcanic ridge, silhouetted against rivers of flowing magma below, with ash and glowing embers swirling upward into a smoky crimson sky. " +
      "The creature should be in a confident, heroic pose — chest forward, looking slightly upward. " +
      "Keep the pet's face structure and breed recognizable but fully transformed into this fantasy creature. " +
      "Full-art illustration style with painterly detail, rich color depth, cinematic lighting from the lava below casting warm highlights. Vertical portrait composition framed for a trading card.",
  },
  water: {
    prompt:
      "Reimagine this pet as a majestic water-type fantasy creature in the style of a Pokemon Illustration Rare trading card. " +
      "Remove all collars, leashes, harnesses, clothing, and accessories from the pet entirely. " +
      "The creature should have sleek iridescent fins flowing from its ears and tail, shimmering aqua-blue scales blending into its fur, glowing deep ocean-blue eyes, and a soft aura of swirling water energy around its body. " +
      "Place the creature in a breathtaking underwater scene: gracefully swimming through a sunlit coral reef cathedral, with shafts of golden light piercing down from the surface above, schools of tiny glowing fish swirling around it, and ancient coral arches framing the composition. " +
      "The creature should look serene yet powerful — gliding effortlessly through the current. " +
      "Keep the pet's face structure and breed recognizable but fully transformed into this fantasy creature. " +
      "Full-art illustration style with painterly detail, luminous color depth, ethereal underwater lighting with caustic light patterns. Vertical portrait composition framed for a trading card.",
  },
  grass: {
    prompt:
      "Reimagine this pet as a mystical grass-type fantasy creature in the style of a Pokemon Illustration Rare trading card. " +
      "Remove all collars, leashes, harnesses, clothing, and accessories from the pet entirely. " +
      "The creature should have leaf-shaped ears, a flowing tail of woven vines and blossoms, fur interlaced with living moss and tiny wildflowers, and glowing emerald-green eyes radiating nature energy. " +
      "Place the creature in an enchanted ancient forest scene: standing on a moss-covered fallen tree in a sunlit clearing, surrounded by towering ancient trees with massive roots, floating pollen and seeds drifting through golden-green dappled sunlight, with bioluminescent mushrooms and ferns glowing softly at its feet. " +
      "The creature should look wise and curious — head slightly tilted, ears perked, as if sensing the forest around it. " +
      "Keep the pet's face structure and breed recognizable but fully transformed into this fantasy creature. " +
      "Full-art illustration style with painterly detail, lush green color palette, warm golden-hour forest lighting. Vertical portrait composition framed for a trading card.",
  },
  electric: {
    prompt:
      "Reimagine this pet as a fierce electric-type fantasy creature in the style of a Pokemon Illustration Rare trading card. " +
      "Remove all collars, leashes, harnesses, clothing, and accessories from the pet entirely. " +
      "The creature should have jagged electrified fur crackling with visible arcs of electricity, glowing yellow-gold eyes like lightning, bolt-shaped markings across its body, and a charged aura with sparks dancing around its paws and tail tip. " +
      "Place the creature in an epic storm scene: standing defiantly on a rocky cliff peak above the clouds during a raging thunderstorm, with massive lightning bolts striking the landscape behind it, wind whipping its fur, dark purple-blue storm clouds swirling dramatically overhead, and the creature itself seeming to channel the lightning through its body. " +
      "The creature should look fierce and unstoppable — mid-roar or charging forward with raw electric power. " +
      "Keep the pet's face structure and breed recognizable but fully transformed into this fantasy creature. " +
      "Full-art illustration style with painterly detail, high contrast electric blues and golds, dramatic backlighting from lightning strikes. Vertical portrait composition framed for a trading card.",
  },
  psychic: {
    prompt:
      "Reimagine this pet as an ethereal psychic-type fantasy creature in the style of a Pokemon Illustration Rare trading card. " +
      "Remove all collars, leashes, harnesses, clothing, and accessories from the pet entirely. " +
      "The creature should have a luminous third eye on its forehead, fur that transitions into swirling cosmic nebula patterns at the edges, a shimmering violet-purple aura of psychic energy, floating crystalline runes orbiting slowly around it, and eyes glowing with deep otherworldly violet light. " +
      "Place the creature in a transcendent astral scene: floating serenely above an ancient stone temple ruin at night, surrounded by a vast starfield and colorful nebula clouds, with psychic energy tendrils connecting it to glowing constellations above, and moonlight casting a silver glow across the scene. " +
      "The creature should look calm, all-knowing, and powerful — eyes half-closed in deep focus, levitating gently. " +
      "Keep the pet's face structure and breed recognizable but fully transformed into this fantasy creature. " +
      "Full-art illustration style with painterly detail, deep purples and cosmic blues with bright violet accents, mystical ambient glow lighting. Vertical portrait composition framed for a trading card.",
  },
  fighting: {
    prompt:
      "Reimagine this pet as a fearsome dark fighting-type fantasy creature in the style of a Pokemon Illustration Rare trading card. " +
      "Remove all collars, leashes, harnesses, clothing, and accessories from the pet entirely. " +
      "The creature should have sleek dark armor-like plating naturally integrated into its fur, glowing crimson-red eyes burning with intensity, dark shadow energy wisps curling from its shoulders and paws, subtle battle scars across its body, and a faint red aura of raw fighting power. " +
      "Place the creature in an intense battle arena scene: standing powerfully in the center of a crumbling ancient colosseum at dusk, with shattered stone pillars around it, dramatic red-orange torchlight flickering against dark shadows, dust and debris floating in the air, and dark storm clouds rolling in above the open roof. " +
      "The creature should look battle-ready and intimidating — low stance, muscles tensed, eyes locked forward as if facing a worthy opponent. " +
      "Keep the pet's face structure and breed recognizable but fully transformed into this fantasy creature. " +
      "Full-art illustration style with painterly detail, dark moody palette with crimson and amber accents, dramatic chiaroscuro lighting. Vertical portrait composition framed for a trading card.",
  },
};

// Validation helper
export function getPromptForType(typeId) {
  const entry = TYPE_PROMPTS[typeId];
  if (!entry) {
    throw new Error(`Unknown type: ${typeId}. Valid types: ${Object.keys(TYPE_PROMPTS).join(", ")}`);
  }
  return entry.prompt;
}
