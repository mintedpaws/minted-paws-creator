// lib/prompts.js
// Each type has a tailored prompt for FLUX.1 Kontext Pro
// These get sent alongside the pet photo to guide the AI transformation
// Edit these freely — no code changes needed, just tweak the text and redeploy
//
// PROMPT PRINCIPLES FOR KONTEXT PRO:
// - Lead with accessory removal
// - Explicitly protect original fur colors and markings
// - Request a new dynamic pose to avoid copying the photo pose
// - Reference "Pokemon Illustration Rare" for art style without saying "card"
// - NEVER mention "trading card", "card frame", or "card"
// - End with anti-text instruction

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Give the dog a new dynamic heroic pose: standing boldly atop a rocky volcanic ridge, chest forward, looking upward with confidence. " +
      "Add fire elemental effects: ember-orange glowing eyes, small flames flickering from the ear tips and tail, faint glowing lava-crack patterns across the fur, and floating embers and sparks surrounding the body. " +
      "The background should be a dramatic volcanic landscape with rivers of flowing magma, glowing embers swirling upward, and a smoky crimson sky. " +
      "Vibrant painterly Pokemon illustration style with rich warm cinematic lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  water: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Give the dog a new dynamic graceful pose: leaping or gliding through water, body stretched out elegantly mid-motion. " +
      "Add water elemental effects: glowing aqua-blue eyes, iridescent blue-teal shimmer highlights on the fur, small flowing fins along the ears and tail, and gentle streams of magical water swirling around the body. " +
      "The background should be a breathtaking underwater coral reef with shafts of golden sunlight piercing through clear blue water, colorful coral arches, and tiny glowing fish swimming nearby. " +
      "Luminous painterly Pokemon illustration style with ethereal cool oceanic lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  grass: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Give the dog a new dynamic curious pose: mid-stride exploring an enchanted forest, head slightly tilted, ears perked, one paw raised. " +
      "Add nature elemental effects: warm emerald-green glowing eyes, small leaves and tiny wildflowers growing naturally from the fur, delicate vines winding along the tail, and a faint soft green nature glow around the body. " +
      "The background should be an enchanted ancient forest clearing with massive mossy trees, golden sunbeams filtering through the canopy, glowing mushrooms, bioluminescent ferns, and floating pollen and seeds drifting through the air. " +
      "Warm painterly Pokemon illustration style with golden-green dappled lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  electric: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Give the dog a new dynamic fierce pose: charging forward on a rocky cliff peak, fur blown by wind, mid-roar with raw electric power surging through its body. " +
      "Add electric elemental effects: bright yellow-gold glowing eyes, small arcs of lightning crackling across the fur, static-charged fur standing on end, bolt-shaped markings on the body, and sparks dancing around the paws. " +
      "The background should be a dramatic mountain peak above the clouds during a raging thunderstorm with massive lightning bolts striking the landscape and dark purple-blue storm clouds swirling overhead. " +
      "High-contrast painterly Pokemon illustration style with electric blues, golds, and dramatic lightning backlighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  psychic: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Give the dog a new dynamic mystical pose: floating or levitating gently above ancient stone ruins, eyes half-closed in deep psychic focus, with an aura of power radiating outward. " +
      "Add psychic elemental effects: deep glowing violet eyes, a faint glowing third-eye diamond on the forehead, soft violet-purple psychic aura surrounding the body, cosmic nebula patterns subtly blending into the edges of the fur, and small crystalline orbs floating nearby. " +
      "The background should be a transcendent astral scene with a vast starfield, colorful swirling nebulas, ancient floating stone temple ruins, and moonlight casting a silver glow across everything. " +
      "Deep painterly Pokemon illustration style with cosmic purples, blues, and mystical ambient glow lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements.",
  },
  fighting: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Give the dog a new dynamic battle pose: low powerful fighting stance in an arena, muscles tensed, eyes locked forward as if facing a worthy opponent, radiating intimidating energy. " +
      "Add fighting elemental effects: intense glowing crimson-red eyes, sleek dark armor-like plating naturally integrated into the fur on shoulders and legs, a faint crimson power aura, subtle battle scars, and wisps of dark energy curling from the paws. " +
      "The background should be a crumbling ancient colosseum arena at dusk with shattered stone pillars, dramatic red-orange torchlight flickering against deep shadows, dust and debris floating in the air, and dark storm clouds rolling in above. " +
      "Dark moody painterly Pokemon illustration style with crimson and amber accents and dramatic chiaroscuro lighting. " +
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
