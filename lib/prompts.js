// lib/prompts.js
// Each type has a tailored prompt for FLUX.1 Kontext Pro
// These get sent alongside the pet photo to guide the AI transformation
// Edit these freely — no code changes needed, just tweak the text and redeploy

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "Transform this pet into an anime-style fire elemental creature. " +
      "Give it a blazing fiery mane with flickering flames, glowing ember-orange eyes, " +
      "subtle lava-crack patterns across the fur, and a warm aura of fire energy radiating outward. " +
      "The background should have swirling embers and a deep volcanic glow. " +
      "Keep the pet's face and body shape recognizable. Fantasy trading card art style, highly detailed.",
  },
  water: {
    prompt:
      "Transform this pet into an anime-style water elemental creature. " +
      "Give it flowing aquatic fins, shimmering blue-teal scales blending into the fur, " +
      "glowing ocean-blue eyes, and swirling water currents orbiting around it. " +
      "The background should have deep ocean blues with bubbles and bioluminescent light. " +
      "Keep the pet's face and body shape recognizable. Fantasy trading card art style, highly detailed.",
  },
  grass: {
    prompt:
      "Transform this pet into an anime-style nature elemental creature. " +
      "Give it leaf-like ears and tail, vines gently winding through the fur, " +
      "glowing green eyes with forest energy, and small flowers or buds blooming along its body. " +
      "The background should have lush emerald foliage and dappled sunlight. " +
      "Keep the pet's face and body shape recognizable. Fantasy trading card art style, highly detailed.",
  },
  electric: {
    prompt:
      "Transform this pet into an anime-style electric elemental creature. " +
      "Give it crackling lightning bolts arcing across its fur, glowing yellow-gold eyes, " +
      "jagged electrified fur tips, and sparks of electricity dancing around its body. " +
      "The background should have storm clouds with electric arcs and a charged atmosphere. " +
      "Keep the pet's face and body shape recognizable. Fantasy trading card art style, highly detailed.",
  },
  psychic: {
    prompt:
      "Transform this pet into an anime-style psychic elemental creature. " +
      "Give it a glowing third eye on the forehead, ethereal purple aura, " +
      "fur that fades into cosmic nebula patterns, floating mystical runes around it, " +
      "and eyes that glow with deep violet psychic energy. " +
      "The background should have swirling astral mist and starfield patterns. " +
      "Keep the pet's face and body shape recognizable. Fantasy trading card art style, highly detailed.",
  },
  fighting: {
    prompt:
      "Transform this pet into an anime-style dark fighting elemental creature. " +
      "Give it a battle-hardened look with shadowy armor-like plating across the fur, " +
      "glowing crimson-red eyes, dark energy wisps swirling around its paws, " +
      "and a fierce battle-ready stance with subtle scars of honor. " +
      "The background should have a dark arena with smoldering embers and dramatic lighting. " +
      "Keep the pet's face and body shape recognizable. Fantasy trading card art style, highly detailed.",
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
