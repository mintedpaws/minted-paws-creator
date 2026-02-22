// lib/prompts.js
// Each type has a tailored prompt for FLUX.1 Kontext Pro
// These get sent alongside the pet photo to guide the AI transformation
// Edit these freely — no code changes needed, just tweak the text and redeploy
//
// IMPORTANT PROMPT PRINCIPLES FOR KONTEXT PRO:
// - Kontext Pro EDITS the existing image, so it already sees the pet
// - Use directive language: "transform", "add", "change the style"
// - Lead with what to KEEP (breed, colors, markings, body shape)
// - Add elemental features as enhancements, not replacements
// - NEVER mention "trading card", "card frame", or "card" — Customily handles that
// - ALWAYS end with "no text, no words, no letters" to prevent garbled text
// - Keep prompts focused and concise — Kontext Pro follows shorter prompts better

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "Transform this pet into a magical fire-element fantasy creature. " +
      "Keep the pet's exact breed, face shape, ear shape, fur colors, and body proportions clearly recognizable. " +
      "Add subtle fire effects: warm ember-orange glow in the eyes, small flames flickering from the tips of the ears and tail, faint lava-crack patterns glowing through the fur, and tiny floating embers around the body. " +
      "Change the background to a dramatic volcanic landscape at twilight with soft molten lava glow and drifting ash. " +
      "The pet should be in a confident standing pose, looking heroic. " +
      "Painterly digital illustration style with rich warm lighting and cinematic depth. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements in the image.",
  },
  water: {
    prompt:
      "Transform this pet into a magical water-element fantasy creature. " +
      "Keep the pet's exact breed, face shape, ear shape, fur colors, and body proportions clearly recognizable. " +
      "Add subtle water effects: iridescent blue-teal shimmer across the fur, small flowing fins along the ears and tail, gentle streams of water swirling around the body, and soft aqua glow in the eyes. " +
      "Change the background to a beautiful underwater coral reef scene with shafts of sunlight filtering down through clear blue water and tiny glowing fish nearby. " +
      "The pet should look graceful and serene, as if gliding through water. " +
      "Painterly digital illustration style with luminous cool lighting and ethereal depth. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements in the image.",
  },
  grass: {
    prompt:
      "Transform this pet into a magical grass-element fantasy creature. " +
      "Keep the pet's exact breed, face shape, ear shape, fur colors, and body proportions clearly recognizable. " +
      "Add subtle nature effects: small leaves and tiny flowers growing from the fur, delicate vines winding along the tail, faint mossy patches with a soft green glow, and warm emerald-green glow in the eyes. " +
      "Change the background to an enchanted forest clearing with golden sunbeams filtering through a lush canopy, glowing mushrooms, and floating pollen. " +
      "The pet should look curious and alert, head slightly tilted as if exploring. " +
      "Painterly digital illustration style with warm golden-green lighting and natural depth. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements in the image.",
  },
  electric: {
    prompt:
      "Transform this pet into a magical electric-element fantasy creature. " +
      "Keep the pet's exact breed, face shape, ear shape, fur colors, and body proportions clearly recognizable. " +
      "Add subtle electric effects: small arcs of lightning crackling along the fur, static-charged fur standing slightly on end, bright yellow-gold glow in the eyes, tiny bolt-shaped markings on the body, and small sparks dancing around the paws. " +
      "Change the background to a dramatic stormy mountain peak with dark purple clouds and lightning bolts in the distance. " +
      "The pet should look fierce and energized, standing boldly against the storm. " +
      "Painterly digital illustration style with high contrast electric blues and golds and dramatic backlighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements in the image.",
  },
  psychic: {
    prompt:
      "Transform this pet into a magical psychic-element fantasy creature. " +
      "Keep the pet's exact breed, face shape, ear shape, fur colors, and body proportions clearly recognizable. " +
      "Add subtle psychic effects: a faint glowing third-eye mark on the forehead, soft violet-purple aura surrounding the body, cosmic nebula patterns subtly blending into the fur at the edges, small crystalline orbs floating nearby, and deep glowing violet eyes. " +
      "Change the background to a mystical night sky scene with swirling galaxies, colorful nebulas, and ancient floating stone ruins below. " +
      "The pet should look calm and powerful, eyes focused with quiet intensity. " +
      "Painterly digital illustration style with deep purples and cosmic blues and mystical ambient glow lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements in the image.",
  },
  fighting: {
    prompt:
      "Transform this pet into a magical fighting-element fantasy creature. " +
      "Keep the pet's exact breed, face shape, ear shape, fur colors, and body proportions clearly recognizable. " +
      "Add subtle fighting effects: sleek dark armor-like plating naturally blending into the fur on the shoulders and legs, a faint crimson-red power aura, small battle scars, intense glowing red eyes, and wisps of dark energy curling from the paws. " +
      "Change the background to a crumbling ancient colosseum arena at dusk with dramatic torchlight and dust floating in the air. " +
      "The pet should look battle-ready and intimidating, low stance with muscles tensed. " +
      "Painterly digital illustration style with dark moody palette with crimson and amber accents and dramatic chiaroscuro lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements in the image.",
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
