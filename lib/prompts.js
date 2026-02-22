// lib/prompts.js
// Each type has a tailored prompt for FLUX.1 Kontext Pro
// These get sent alongside the pet photo to guide the AI transformation
// Edit these freely — no code changes needed, just tweak the text and redeploy
//
// PROMPT PRINCIPLES FOR KONTEXT PRO:
// - Kontext Pro EDITS the existing image, so lead with removal instructions
// - Be very explicit about removing leash, collar, harness FIRST
// - Push hard toward "painted illustration" to avoid photorealistic output
// - Keep breed/markings/colors but allow pose and setting to change
// - NEVER mention "trading card" or "card" — Customily handles that
// - End with anti-text instruction

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform the entire image into a dramatic painted fantasy illustration. " +
      "Keep this exact dog breed, face shape, ear shape, and fur color pattern but render it in a painterly illustrated art style. " +
      "Add fire elemental effects: ember-orange glowing eyes, small flames flickering from the ear tips and tail, faint glowing lava-crack patterns in the fur, and floating embers and sparks around the body. " +
      "Replace the background with a dramatic volcanic landscape at twilight with flowing lava rivers and a smoky red-orange sky. " +
      "The dog should look heroic and powerful. " +
      "Rich painterly illustration with bold colors and cinematic lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  water: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform the entire image into a luminous painted fantasy illustration. " +
      "Keep this exact dog breed, face shape, ear shape, and fur color pattern but render it in a painterly illustrated art style. " +
      "Add water elemental effects: glowing aqua-blue eyes, iridescent blue-teal shimmer across the fur, small flowing fins along the ears and tail, and gentle swirling water streams orbiting the body. " +
      "Replace the background with a magical underwater coral reef scene with golden sunbeams filtering through clear blue water and tiny glowing fish. " +
      "The dog should look graceful and majestic. " +
      "Luminous painterly illustration with cool oceanic colors and ethereal lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  grass: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform the entire image into a lush painted fantasy illustration. " +
      "Keep this exact dog breed, face shape, ear shape, and fur color pattern but render it in a painterly illustrated art style. " +
      "Add nature elemental effects: warm emerald-green glowing eyes, small leaves and tiny flowers growing naturally from the fur, delicate vines along the tail, and faint mossy patches with a soft green glow. " +
      "Replace the background with an enchanted ancient forest clearing with golden sunbeams through a lush canopy, glowing mushrooms, and floating pollen and seeds. " +
      "The dog should look curious and alert, as if exploring. " +
      "Warm painterly illustration with golden-green lighting and natural depth. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  electric: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform the entire image into a dynamic painted fantasy illustration. " +
      "Keep this exact dog breed, face shape, ear shape, and fur color pattern but render it in a painterly illustrated art style. " +
      "Add electric elemental effects: bright yellow-gold glowing eyes, small arcs of lightning crackling across the fur, static-charged fur standing slightly on end, tiny bolt-shaped markings on the body, and sparks dancing around the paws. " +
      "Replace the background with a dramatic stormy mountain peak at night with dark purple clouds and bright lightning bolts striking in the distance. " +
      "The dog should look fierce and energized, standing boldly against the storm. " +
      "High-contrast painterly illustration with electric blues and golds and dramatic backlighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  psychic: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform the entire image into a mystical painted fantasy illustration. " +
      "Keep this exact dog breed, face shape, ear shape, and fur color pattern but render it in a painterly illustrated art style. " +
      "Add psychic elemental effects: deep glowing violet eyes, a faint glowing third-eye diamond on the forehead, soft violet-purple aura surrounding the body, cosmic nebula patterns subtly blending into the fur, and small crystalline orbs floating nearby. " +
      "Replace the background with a mystical night sky scene with swirling galaxies, colorful nebulas, and ancient floating stone ruins. " +
      "The dog should look calm and powerful with quiet intensity. " +
      "Deep painterly illustration with cosmic purples and blues and mystical ambient glow. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  fighting: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform the entire image into a dark painted fantasy illustration. " +
      "Keep this exact dog breed, face shape, ear shape, and fur color pattern but render it in a painterly illustrated art style. " +
      "Add fighting elemental effects: intense glowing crimson-red eyes, sleek dark armor-like plating naturally blending into the fur on shoulders and legs, a faint red power aura, subtle battle scars, and wisps of dark energy curling from the paws. " +
      "Replace the background with a crumbling ancient colosseum arena at dusk with dramatic torchlight, dust floating in the air, and dark storm clouds above. " +
      "The dog should look battle-ready and intimidating with a low powerful stance. " +
      "Dark moody painterly illustration with crimson and amber accents and dramatic chiaroscuro lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
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
