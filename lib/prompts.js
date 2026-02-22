// lib/prompts.js
// Each type has a tailored prompt for GPT-Image-1.5
// v7 — framing directive moved to END of prompt for stronger weight
//       poses kept dramatic but framing ensures full body visibility
// Edit these freely — no code changes needed, just tweak the text and redeploy

export const TYPE_PROMPTS = {
  fire: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Completely change the dog's pose and composition — do not keep the original photo pose. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Place the dog in a powerful heroic pose: rearing up on hind legs atop a volcanic rock ledge, front paws raised, with confidence and power. " +
      "Add fire elemental effects: ember-orange glowing eyes, flames erupting from the ear tips and tail, glowing lava-crack veins across the fur, and a swirl of embers and sparks surrounding the body. " +
      "The background is a massive erupting volcano with rivers of bright molten lava flowing down the slopes, pillars of fire shooting upward, and a deep red-orange smoky sky filled with floating ash. " +
      "Vibrant painterly Pokemon illustration style with rich warm cinematic lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "IMPORTANT FRAMING: This must be a wide shot zoomed out enough that the dog's ENTIRE body from the top of the head and ear tips to the bottom of the paws is fully visible and centered in the frame with generous empty space above the head and below the feet. Do not crop or cut off any part of the dog.",
  },
  water: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Completely change the dog's pose and composition — do not keep the original photo pose. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Place the dog in a graceful swimming pose: body stretched out mid-leap above a crashing ocean wave, water trailing elegantly behind it. " +
      "Add water elemental effects: glowing aqua-blue eyes, iridescent blue-teal shimmer highlights on the fur, translucent flowing fins along the ears and tail, and magical water streams spiraling around the body. " +
      "The background is a vast open ocean at golden hour with towering turquoise waves, sunlight refracting through the spray, a coral reef visible beneath the crystal-clear surface, and bioluminescent jellyfish glowing in the deep water below. " +
      "Luminous painterly Pokemon illustration style with warm golden-hour oceanic lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "IMPORTANT FRAMING: This must be a wide shot zoomed out enough that the dog's ENTIRE body from the top of the head and ear tips to the bottom of the paws is fully visible and centered in the frame with generous empty space above the head and below the feet. Do not crop or cut off any part of the dog.",
  },
  grass: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Completely change the dog's pose and composition — do not keep the original photo pose. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Place the dog in a playful exploring pose: mid-stride bounding through tall grass and wildflowers, one paw raised, ears perked forward, tail up with excitement. " +
      "Add nature elemental effects: warm emerald-green glowing eyes, small leaves and tiny wildflowers blooming from the fur, living vines winding along the tail and legs, and a faint green nature aura with floating pollen. " +
      "The background is a magical ancient forest with enormous mossy trees, a sparkling stream, golden sunbeams breaking through a thick canopy, giant glowing mushrooms, bioluminescent ferns, and floating seeds and flower petals drifting through the air. " +
      "Warm painterly Pokemon illustration style with golden-green dappled forest lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "IMPORTANT FRAMING: This must be a wide shot zoomed out enough that the dog's ENTIRE body from the top of the head and ear tips to the bottom of the paws is fully visible and centered in the frame with generous empty space above the head and below the feet. Do not crop or cut off any part of the dog.",
  },
  electric: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Completely change the dog's pose and composition — do not keep the original photo pose. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Place the dog in a fierce charging pose: lunging forward mid-sprint on a high mountain cliff edge, fur blown back by wind, radiating electric power from every step. " +
      "Add electric elemental effects: bright yellow-gold crackling eyes, arcs of blue-white lightning coursing across the fur, static-charged fur standing on end, jagged bolt-shaped markings glowing on the body, and a burst of sparks exploding from the paws with each step. " +
      "The background is a towering mountain peak above a sea of dark storm clouds, with massive purple-blue lightning bolts striking all around, electric energy arcing between rock spires, and a bright full moon partially hidden behind the swirling thunderstorm. " +
      "High-contrast painterly Pokemon illustration style with electric blues, bright golds, and dramatic lightning backlighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "IMPORTANT FRAMING: This must be a wide shot zoomed out enough that the dog's ENTIRE body from the top of the head and ear tips to the bottom of the paws is fully visible and centered in the frame with generous empty space above the head and below the feet. Do not crop or cut off any part of the dog.",
  },
  psychic: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Completely change the dog's pose and composition — do not keep the original photo pose. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Place the dog in a mystical floating pose: levitating serenely above the ground with eyes half-closed in deep psychic focus, surrounded by orbiting energy, radiating calm otherworldly power. " +
      "Add psychic elemental effects: deep glowing violet eyes, a bright third-eye diamond shining on the forehead, a layered violet-pink psychic aura rippling outward from the body, cosmic nebula patterns swirling through the fur, and glowing crystalline shards floating in a circle around it. " +
      "The background is a transcendent astral dimension with a vast colorful nebula sky, swirling galaxies, ancient floating stone temple ruins covered in glowing runes, beams of moonlight cutting through cosmic clouds, and shimmering stardust filling the air. " +
      "Deep painterly Pokemon illustration style with rich cosmic purples, pinks, blues, and mystical ambient glow lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "IMPORTANT FRAMING: This must be a wide shot zoomed out enough that the dog's ENTIRE body from the top of the head and ear tips to the bottom of the paws is fully visible and centered in the frame with generous empty space above the head and below the feet. Do not crop or cut off any part of the dog.",
  },
  fighting: {
    prompt:
      "Remove the leash, collar, harness, and all accessories completely from this dog. " +
      "Completely change the dog's pose and composition — do not keep the original photo pose. " +
      "Transform this into a fantasy illustration in the style of a Pokemon Illustration Rare artwork. " +
      "Preserve the dog's exact breed, face shape, ear shape, and original fur color pattern and markings — do not tint or shift the base fur colors. " +
      "Place the dog in an intense fighting stance: low to the ground in a martial arts ready position, muscles coiled, eyes locked forward with fierce determination, one paw slightly forward ready to strike. " +
      "Add fighting elemental effects: intense glowing ice-blue eyes, sleek dark steel armor plates naturally integrated into the fur on shoulders chest and legs, a pulsing blue-white battle aura radiating outward, wrapped cloth bandages on the front paws, and crackling impact energy around the fists. " +
      "The background is an ancient stone martial arts dojo courtyard at twilight with weathered stone training pillars, cracked stone floor tiles from past battles, hanging paper lanterns casting cool blue-white light, cherry blossom petals blowing through the air, and misty mountains in the far distance. " +
      "Cool-toned painterly Pokemon illustration style with steel blues, stone grays, and dramatic directional moonlight lighting. " +
      "Do not include any text, words, letters, numbers, card frames, borders, or UI elements. " +
      "IMPORTANT FRAMING: This must be a wide shot zoomed out enough that the dog's ENTIRE body from the top of the head and ear tips to the bottom of the paws is fully visible and centered in the frame with generous empty space above the head and below the feet. Do not crop or cut off any part of the dog.",
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
