"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// Types config
// ============================================================
const TYPES = [
  { id: "fire", name: "Fire", color: "#E8651A", glow: "rgba(232,101,26,0.4)", desc: "Chaotic. Fearless. Born to burn.", icon: "🔥" },
  { id: "water", name: "Water", color: "#1E90FF", glow: "rgba(30,144,255,0.4)", desc: "Chill. Unbothered. Peak zen.", icon: "💧" },
  { id: "grass", name: "Grass", color: "#32CD32", glow: "rgba(50,205,50,0.4)", desc: "Wild. Curious. One with nature.", icon: "🌿" },
  { id: "electric", name: "Electric", color: "#FFD700", glow: "rgba(255,215,0,0.4)", desc: "Unlimited energy. Never stops.", icon: "⚡" },
  { id: "psychic", name: "Psychic", color: "#9B59B6", glow: "rgba(155,89,182,0.4)", desc: "Mysterious. Judging you. Always.", icon: "🔮" },
  { id: "dark", name: "Dark", color: "#2d5a72", glow: "rgba(45,90,114,0.4)", desc: "Silent. Watching. From the shadows.", icon: "🌙" },
];

const LOADING_MESSAGES = {
  fire: ["Igniting the flames...", "Channeling fire energy...", "Forging your legend in flame...", "Almost there..."],
  water: ["Summoning the tides...", "Channeling water energy...", "Shaping your legend from the deep...", "Almost there..."],
  grass: ["Calling the wild...", "Channeling nature's energy...", "Growing your legend from the earth...", "Almost there..."],
  electric: ["Charging up...", "Channeling electric energy...", "Sparking your legend to life...", "Almost there..."],
  psychic: ["Opening the third eye...", "Channeling psychic energy...", "Manifesting your legend...", "Almost there..."],
  dark: ["Summoning the shadows...", "Channeling dark energy...", "Forging your legend from the void...", "Almost there..."],
};

const ORB_PATHS = {
  fire: "/orbs/fire_orb.png",
  water: "/orbs/water_orb.png",
  grass: "/orbs/grass_orb.png",
  electric: "/orbs/electric_orb.png",
  psychic: "/orbs/psychic_orb.png",
  dark: "/orbs/dark_orb.png",
};

// ============================================================
// Theme constants
// ============================================================
const THEME = {
  bg: "#ffffff",
  navy: "#1a1a2e",
  orange: "#E8651A",
  blue: "#3B82F6",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  textLight: "#9ca3af",
  border: "rgba(0,0,0,0.06)",
  cardBg: "#f9f9f9",
  headingFont: "'Fredoka', sans-serif",
  bodyFont: "'Outfit', sans-serif",
};

// ============================================================
// Image resize
// ============================================================
const MAX_DIMENSION = 1024;

function resizeImage(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;
      if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) { resolve(dataUrl); return; }
      if (width > height) { height = Math.round(height * (MAX_DIMENSION / width)); width = MAX_DIMENSION; }
      else { width = Math.round(width * (MAX_DIMENSION / height)); height = MAX_DIMENSION; }
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.src = dataUrl;
  });
}

// ============================================================
// Session token
// ============================================================
function getSessionToken() {
  if (typeof window === "undefined") return null;
  let token = localStorage.getItem("mp_session");
  if (!token) {
    token = "mp_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("mp_session", token);
  }
  return token;
}

// ============================================================
// State persistence helpers
// ============================================================
function loadPersistedState() {
  try {
    const saved = localStorage.getItem("mp_state");
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

function loadPersistedGallery() {
  try {
    const saved = localStorage.getItem("mp_gallery");
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

// ============================================================
// Orb component (unchanged — uses real orb images with gradient fallback)
// ============================================================
function ElementOrb({ type, size = 72, selected, onClick }) {
  const tp = TYPES.find((t) => t.id === type);
  const [imgOk, setImgOk] = useState(true);
  const gradients = {
    fire: "radial-gradient(circle at 38% 32%, #ffb347 0%, #E8651A 45%, #a33a00 100%)",
    water: "radial-gradient(circle at 38% 32%, #7ec8e3 0%, #1E90FF 45%, #0a4f8a 100%)",
    grass: "radial-gradient(circle at 38% 32%, #90ee90 0%, #32CD32 45%, #1a7a1a 100%)",
    electric: "radial-gradient(circle at 38% 32%, #fff4a3 0%, #FFD700 45%, #b8960f 100%)",
    psychic: "radial-gradient(circle at 38% 32%, #d4a6e8 0%, #9B59B6 45%, #5b2d7a 100%)",
    dark: "radial-gradient(circle at 38% 32%, #4a8aa8 0%, #2d5a72 45%, #1a3545 100%)",
  };
  return (
    <div onClick={onClick} style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: !imgOk ? gradients[type] : "transparent", fontSize: !imgOk ? size * 0.4 : 0, boxShadow: selected ? `0 4px 20px ${tp.color}33` : `0 2px 8px ${tp.color}15`, transition: "all 0.35s ease", transform: selected ? "scale(1.08)" : "scale(1)", cursor: onClick ? "pointer" : "default", flexShrink: 0 }}>
      {imgOk ? (<img src={ORB_PATHS[type]} alt={tp.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setImgOk(false)} />) : (<span style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))" }}>{tp.icon}</span>)}
    </div>
  );
}

// ============================================================
// Floating particles (kept but adapted for light theme)
// ============================================================
function FloatingParticles({ color, active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 400, H = 400;
    canvas.width = W; canvas.height = H;
    if (!active) { ctx.clearRect(0, 0, W, H); if (animRef.current) cancelAnimationFrame(animRef.current); return; }
    const particles = Array.from({ length: 50 }, () => ({ x: W/2+(Math.random()-0.5)*60, y: H/2+(Math.random()-0.5)*60, vx: (Math.random()-0.5)*1.5, vy: (Math.random()-0.5)*1.5, r: Math.random()*3+1, life: Math.random(), speed: Math.random()*0.01+0.003 }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.life -= p.speed;
        if (p.life <= 0) { p.x = W/2+(Math.random()-0.5)*80; p.y = H/2+(Math.random()-0.5)*80; p.life = 1; }
        const dx = p.x-W/2, dy = p.y-H/2, dist = Math.sqrt(dx*dx+dy*dy)||1;
        p.vx += (dx/dist)*0.08; p.vy += (dy/dist)*0.08; p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        const a = Math.max(0, Math.min(1, p.life));
        ctx.globalAlpha = a*0.5; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fillStyle = color; ctx.fill();
        ctx.globalAlpha = a*0.08; ctx.beginPath(); ctx.arc(p.x, p.y, p.r*3, 0, Math.PI*2); ctx.fillStyle = color; ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [color, active]);
  return (<canvas ref={canvasRef} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 400, pointerEvents: "none", opacity: active ? 0.5 : 0, transition: "opacity 0.5s" }} />);
}

// ============================================================
// Main Creator Component
// ============================================================
export default function Home() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [petPhoto, setPetPhoto] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [loadingIdx, setLoadingIdx] = useState(0);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const fileRef = useRef(null);
  const [gallery, setGallery] = useState([]);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // ---- Restore persisted state on client mount ----
  useEffect(() => {
    const restored = loadPersistedState();
    const savedGallery = loadPersistedGallery();
    if (restored) {
      if (restored.step) setStep(restored.step);
      if (restored.typeId) {
        const found = TYPES.find((t) => t.id === restored.typeId);
        if (found) setSelectedType(found);
      }
      if (restored.petPhoto) setPetPhoto(restored.petPhoto);
      if (restored.generatedImage) {
        setGeneratedImage(restored.generatedImage);
        if (savedGallery.length > 0) {
          const idx = savedGallery.findIndex((e) => e.imageUrl === restored.generatedImage);
          if (idx >= 0) setSelectedGalleryIdx(idx);
        }
      }
    }
    if (savedGallery.length > 0) setGallery(savedGallery);
    try {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      if (typeParam) {
        const found = TYPES.find((t) => t.id === typeParam.toLowerCase());
        if (found) { setSelectedType(found); setStep(2); }
      }
    } catch (e) {}
    setHydrated(true);
  }, []);

  // ---- Persist state ----
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("mp_state", JSON.stringify({ step, typeId: selectedType?.id || null, petPhoto, generatedImage }));
    } catch {}
  }, [step, selectedType, petPhoto, generatedImage, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem("mp_gallery", JSON.stringify(gallery)); } catch {}
  }, [gallery, hydrated]);

  // ---- Loading message rotation ----
  useEffect(() => {
    if (!generating || !selectedType) return;
    const msgs = LOADING_MESSAGES[selectedType.id];
    let i = 0;
    const iv = setInterval(() => { i = (i + 1) % msgs.length; setLoadingIdx(i); }, 2800);
    return () => clearInterval(iv);
  }, [generating, selectedType]);

  // ---- Progress bar ----
  useEffect(() => {
    if (!generating) { setProgress(0); return; }
    let p = 0;
    const iv = setInterval(() => { p += Math.random() * 4 + 1; if (p > 90) p = 90; setProgress(p); }, 1000);
    return () => clearInterval(iv);
  }, [generating]);

  // ---- Photo upload ----
  const onPhoto = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10485760) { setError("Image must be under 10MB"); return; }
    const r = new FileReader();
    r.onload = async (ev) => {
      try {
        const resized = await resizeImage(ev.target.result);
        setPetPhoto(resized);
        setError(null);
      } catch (err) { setError("Failed to process image. Please try another photo."); }
    };
    r.readAsDataURL(f);
  };

  // ---- Type click ----
  const selectType = (tp) => {
    setSelectedType(tp);
    setStep(2);
    window.history.replaceState(null, "", `?type=${tp.id}`);
  };

  // ---- AI Generation ----
  const generate = useCallback(async () => {
    if (!selectedType || !petPhoto) return;
    setGenerating(true); setLoadingIdx(0); setError(null);
    setGeneratedImage(null); setSelectedGalleryIdx(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: selectedType.id, image: petPhoto, sessionToken: getSessionToken() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed");
      setProgress(100);
      await new Promise((r) => setTimeout(r, 500));
      const newEntry = { imageUrl: data.imageUrl, type: selectedType.id, typeName: selectedType.name, typeColor: selectedType.color, timestamp: Date.now() };
      setGeneratedImage(data.imageUrl);
      setGallery((prev) => [newEntry, ...prev]);
      setSelectedGalleryIdx(0);
    } catch (err) { setError(err.message || "Something went wrong. Please try again."); }
    finally { setGenerating(false); }
  }, [selectedType, petPhoto]);

  // ---- Gallery select ----
  const selectFromGallery = (idx) => {
    const entry = gallery[idx];
    setSelectedGalleryIdx(idx);
    setGeneratedImage(entry.imageUrl);
    const matchType = TYPES.find((t) => t.id === entry.type);
    if (matchType) { setSelectedType(matchType); window.history.replaceState(null, "", `?type=${matchType.id}`); }
  };

  // ---- Proceed to Shopify ----
  const buildCard = () => {
    window.location.href = `https://mintedpaws.co/products/${selectedType.id}?image=${encodeURIComponent(generatedImage)}`;
  };

  // ---- Reset ----
  const reset = () => {
    setStep(1); setSelectedType(null); setPetPhoto(null);
    setGeneratedImage(null); setError(null);
    setGallery([]); setSelectedGalleryIdx(null);
    localStorage.removeItem("mp_state");
    localStorage.removeItem("mp_gallery");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // ---- Try different type ----
  const tryDifferentType = () => {
    setGeneratedImage(null); setSelectedGalleryIdx(null); setStep(1);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const t = selectedType;

  if (!hydrated) {
    return (
      <div style={{ minHeight: "100vh", background: THEME.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: THEME.textLight, fontFamily: THEME.bodyFont, fontSize: "0.85rem" }}>Loading...</div>
      </div>
    );
  }

  // ---- Stepper component ----
  const Stepper = () => (
    <div style={{ display: "flex", justifyContent: "center", gap: 0, padding: "12px 20px 26px", position: "relative", zIndex: 10 }}>
      {["Type", "Upload", "Transform"].map((label, i) => {
        const sn = i + 1;
        const done = step > sn;
        const active = step === sn;
        const inactive = step < sn;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.78rem", fontWeight: 700, fontFamily: THEME.headingFont,
                background: done ? THEME.orange : active ? THEME.navy : "#f0f0f0",
                color: done ? "#fff" : active ? "#fff" : "#ccc",
                boxShadow: active ? `0 2px 12px ${THEME.navy}33` : done ? `0 2px 12px ${THEME.orange}33` : "none",
                transition: "all 0.4s"
              }}>{done ? "✓" : sn}</div>
              <span style={{
                fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: 600,
                fontFamily: THEME.bodyFont,
                color: done ? THEME.orange : active ? THEME.navy : "#ccc"
              }}>{label}</span>
            </div>
            {i < 2 && <div style={{
              width: 50, height: 2, margin: "0 10px", marginBottom: 18, borderRadius: 1,
              background: done ? THEME.orange : "#eee"
            }} />}
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: THEME.bg, color: THEME.text, fontFamily: THEME.bodyFont, position: "relative", overflow: "hidden" }}>

      {/* Header */}
      <header style={{ textAlign: "center", padding: "20px 20px 6px", position: "relative", zIndex: 10 }}>
        <img onClick={reset} src="/logo-badge.png" alt="Minted Paws" style={{ height: 48, cursor: "pointer" }} />
        <p style={{ fontFamily: THEME.bodyFont, color: THEME.textLight, fontSize: "0.75rem", letterSpacing: "0.3px", marginTop: 6 }}>Your Pet. Your Card. Your Legend.</p>
      </header>

      <Stepper />

      <main style={{ maxWidth: 520, margin: "0 auto", padding: "0 20px 50px", position: "relative", zIndex: 10 }}>

        {/* ===== STEP 1: Choose Type ===== */}
        {step === 1 && (
          <div className="fadeIn">
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem,4vw,1.8rem)", fontFamily: THEME.headingFont, fontWeight: 700, color: THEME.navy, marginBottom: 6 }}>Choose Your Type</h2>
            <p style={{ textAlign: "center", color: THEME.textMuted, fontSize: "0.9rem", marginBottom: 26 }}>Tap a type to get started</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }} className="typeGrid">
              {TYPES.map((tp) => {
                const sel = t?.id === tp.id;
                return (
                  <button key={tp.id} onClick={() => selectType(tp)} className="typeCard" style={{
                    background: sel ? `${tp.color}08` : THEME.cardBg,
                    border: sel ? `2px solid ${tp.color}` : "2px solid transparent",
                    borderRadius: 18, padding: "20px 10px 16px", cursor: "pointer",
                    transition: "all 0.3s ease", textAlign: "center",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    boxShadow: sel ? `0 4px 20px ${tp.color}18` : "none",
                    transform: sel ? "translateY(-2px)" : "none"
                  }}>
                    <ElementOrb type={tp.id} size={64} selected={sel} />
                    <div style={{
                      fontSize: "0.9rem", fontWeight: 600, fontFamily: THEME.headingFont,
                      color: sel ? tp.color : THEME.navy, letterSpacing: "0.3px", marginTop: 2, transition: "color 0.3s"
                    }}>{tp.name}</div>
                    <div style={{
                      fontSize: "0.68rem", color: sel ? THEME.textMuted : THEME.textLight,
                      fontStyle: "italic", lineHeight: 1.35, transition: "color 0.3s"
                    }}>{tp.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== STEP 2: Upload Pet ===== */}
        {step === 2 && (
          <div className="fadeIn">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: `${t?.color}08`, border: `1px solid ${t?.color}20`,
                borderRadius: 50, padding: "4px 14px 4px 5px"
              }}>
                <ElementOrb type={t?.id} size={22} selected={false} />
                <span style={{ fontSize: "0.78rem", color: t?.color, fontWeight: 600 }}>{t?.name} Type</span>
                <button onClick={() => { setStep(1); window.history.replaceState(null, "", window.location.pathname); }}
                  style={{ background: "none", border: "none", color: THEME.textLight, fontSize: "0.62rem", cursor: "pointer", textDecoration: "underline", marginLeft: 2 }}>change</button>
              </div>
            </div>

            <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem,4vw,1.8rem)", fontFamily: THEME.headingFont, fontWeight: 700, color: THEME.navy, marginBottom: 6 }}>Upload Your Pet</h2>
            <p style={{ textAlign: "center", color: THEME.textMuted, fontSize: "0.9rem", marginBottom: 22 }}>Clear photo, any pet, any angle</p>

            <div onClick={() => fileRef.current?.click()} style={{
              maxWidth: 340, margin: "0 auto", aspectRatio: "1", borderRadius: 20,
              border: petPhoto ? "none" : `2.5px dashed ${t?.color}20`,
              background: petPhoto ? "none" : THEME.cardBg,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer", overflow: "hidden", position: "relative",
              transition: "all 0.3s"
            }}>
              {petPhoto ? (
                <>
                  <img src={petPhoto} alt="Pet" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 20 }} />
                  <div style={{
                    position: "absolute", bottom: 10, right: 10,
                    background: "rgba(255,255,255,0.9)", color: THEME.navy,
                    padding: "4px 12px", borderRadius: 16, fontSize: "0.62rem", fontWeight: 600,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", backdropFilter: "blur(8px)"
                  }}>Tap to change</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "2.2rem", marginBottom: 10, opacity: 0.25 }}>📸</div>
                  <div style={{ color: THEME.textMuted, fontSize: "0.85rem" }}>Tap to upload a photo</div>
                  <div style={{ color: THEME.textLight, fontSize: "0.68rem", marginTop: 4 }}>JPG, PNG — max 10MB</div>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhoto} style={{ display: "none" }} />
            </div>

            {error && <p style={{ textAlign: "center", color: "#ef4444", fontSize: "0.78rem", marginTop: 10 }}>{error}</p>}

            <div style={{ maxWidth: 340, margin: "12px auto 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {["Clear face visible", "Good lighting", "Not blurry", "Any pet works"].map((tip) => (
                <div key={tip} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.6rem", color: THEME.textLight }}>
                  <span style={{ color: `${t?.color}88`, fontWeight: 700 }}>✓</span> {tip}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24 }}>
              <button onClick={() => { setStep(1); window.history.replaceState(null, "", window.location.pathname); }}
                style={{
                  background: "none", border: `2px solid #e8e8e8`, color: THEME.textMuted,
                  padding: "12px 28px", borderRadius: 14, fontSize: "0.9rem", fontFamily: THEME.headingFont,
                  fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
                }}>Back</button>
              <button onClick={() => petPhoto && setStep(3)} disabled={!petPhoto}
                style={{
                  background: petPhoto ? THEME.navy : "#e0e0e0",
                  color: petPhoto ? "#fff" : "#aaa",
                  border: "none", padding: "12px 34px", borderRadius: 14,
                  fontSize: "0.9rem", fontWeight: 700, fontFamily: THEME.headingFont,
                  cursor: petPhoto ? "pointer" : "not-allowed",
                  boxShadow: petPhoto ? `0 4px 16px ${THEME.navy}22` : "none",
                  transition: "all 0.3s"
                }}>Continue</button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: Transform ===== */}
        {step === 3 && (
          <div className="fadeIn">

            {/* Pre-generate */}
            {!generating && !generatedImage && (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(1.4rem,4vw,1.8rem)", fontFamily: THEME.headingFont, fontWeight: 700, color: THEME.navy, marginBottom: 6 }}>Ready to Transform</h2>
                <p style={{ color: THEME.textMuted, fontSize: "0.9rem", marginBottom: 24 }}>
                  Our AI will create a <strong style={{ color: t?.color }}>{t?.name}</strong> type creature
                </p>

                <div style={{
                  maxWidth: 280, margin: "0 auto 24px", background: THEME.cardBg,
                  borderRadius: 16, padding: 12, border: `2px solid ${t?.color}15`
                }}>
                  <img src={petPhoto} alt="Pet" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 10, marginBottom: 8 }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                    <ElementOrb type={t?.id} size={20} selected={false} />
                    <span style={{ fontSize: "0.65rem", color: THEME.textLight }}>{t?.name} Type</span>
                  </div>
                </div>

                {error && <p style={{ color: "#ef4444", fontSize: "0.78rem", marginBottom: 14 }}>{error}</p>}

                <button onClick={generate} style={{
                  background: THEME.orange, color: "#fff", border: "none",
                  padding: "16px 42px", borderRadius: 14,
                  fontSize: "1rem", fontWeight: 700, fontFamily: THEME.headingFont,
                  boxShadow: `0 4px 20px ${THEME.orange}33`, cursor: "pointer",
                  transition: "all 0.2s"
                }}>✨ Transform My Pet ✨</button>
                <button onClick={() => setStep(2)} style={{
                  display: "block", margin: "10px auto 0", background: "none", border: "none",
                  color: THEME.textLight, fontSize: "0.7rem", textDecoration: "underline", cursor: "pointer"
                }}>Go back</button>
              </div>
            )}

            {/* Generating */}
            {generating && (
              <div style={{
                textAlign: "center", minHeight: 340, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", position: "relative"
              }}>
                <FloatingParticles color={t?.color} active={true} />
                <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ position: "relative", marginBottom: 22, width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{
                      position: "absolute", inset: -6, borderRadius: "50%",
                      border: `3px solid #eee`, borderTopColor: t?.color,
                      animation: "spin 1.2s linear infinite"
                    }} />
                    <ElementOrb type={t?.id} size={78} selected={true} />
                  </div>
                  <p style={{ fontSize: "1.1rem", fontFamily: THEME.headingFont, fontWeight: 600, color: t?.color, minHeight: 30 }}>
                    {LOADING_MESSAGES[t?.id]?.[loadingIdx]}
                  </p>
                  <div style={{ width: 200, height: 4, background: "#eee", borderRadius: 2, margin: "12px auto 0", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: t?.color, borderRadius: 2, width: `${progress}%`, transition: "width 0.8s ease" }} />
                  </div>
                  <p style={{ fontSize: "0.62rem", color: THEME.textLight, marginTop: 8 }}>Usually takes 30–45 seconds</p>
                </div>
              </div>
            )}

            {/* Result */}
            {!generating && generatedImage && (
              <div style={{ textAlign: "center" }} className="fadeIn">
                <h2 style={{ fontSize: "clamp(1.4rem,4vw,1.8rem)", fontFamily: THEME.headingFont, fontWeight: 700, color: THEME.navy, marginBottom: 6 }}>
                  Your {t?.name} Transformation
                </h2>
                <p style={{ color: THEME.textMuted, fontSize: "0.9rem", marginBottom: 22 }}>Tap the image to see it full size</p>

                <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: 26 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "1px", color: THEME.textLight, marginBottom: 5, fontWeight: 600 }}>Before</div>
                    <img src={petPhoto} alt="Original" style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 12, opacity: 0.5, border: "2px solid #eee" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <ElementOrb type={t?.id} size={30} selected={true} />
                    <div style={{ fontSize: "1.1rem", color: THEME.textLight }}>→</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "1px", color: t?.color, marginBottom: 5, fontWeight: 600 }}>After</div>
                    <div onClick={() => setLightbox(generatedImage)} style={{
                      position: "relative", width: 220, height: 220, borderRadius: 16, overflow: "hidden",
                      border: `3px solid ${t?.color}`, boxShadow: `0 4px 24px ${t?.color}22`, cursor: "pointer"
                    }}>
                      <img src={generatedImage} alt="Transformed" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, textAlign: "center",
                        fontSize: "0.55rem", color: "rgba(255,255,255,0.8)", backdropFilter: "blur(4px)",
                        background: "rgba(0,0,0,0.35)", padding: "3px 0"
                      }}>Tap to expand</div>
                    </div>
                  </div>
                </div>

                <button onClick={buildCard} style={{
                  background: THEME.navy, color: "#fff", border: "none",
                  padding: "16px 44px", borderRadius: 14,
                  fontSize: "1rem", fontWeight: 700, fontFamily: THEME.headingFont,
                  boxShadow: `0 4px 20px ${THEME.navy}22`, cursor: "pointer",
                  transition: "all 0.2s"
                }}>Build Your Card →</button>

                <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
                  <button onClick={generate} style={{ background: "none", border: "none", color: THEME.textLight, fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}>🔄 Try again ({t?.name})</button>
                  <button onClick={tryDifferentType} style={{ background: "none", border: "none", color: THEME.textLight, fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}>🔀 Try different type</button>
                  <button onClick={reset} style={{ background: "none", border: "none", color: "#d4d4d4", fontSize: "0.8rem", textDecoration: "underline", cursor: "pointer" }}>Start over</button>
                </div>

                {gallery.length > 1 && (
                  <div style={{ marginTop: 26 }}>
                    <div style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "1.5px", color: THEME.textLight, fontWeight: 600, marginBottom: 8 }}>Your Generations ({gallery.length})</div>
                    <div style={{
                      display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap",
                      padding: 10, background: THEME.cardBg, borderRadius: 14, border: `1px solid ${THEME.border}`
                    }}>
                      {gallery.map((entry, idx) => {
                        const isSelected = selectedGalleryIdx === idx;
                        const entryType = TYPES.find((tp) => tp.id === entry.type);
                        return (
                          <div key={entry.timestamp} onClick={() => selectFromGallery(idx)} style={{
                            width: 64, height: 64, borderRadius: 10, overflow: "hidden",
                            border: isSelected ? `2px solid ${entryType?.color}` : "2px solid #eee",
                            cursor: "pointer", position: "relative",
                            boxShadow: isSelected ? `0 2px 12px ${entryType?.color}22` : "none",
                            transition: "all 0.3s", opacity: isSelected ? 1 : 0.55
                          }}>
                            <img src={entry.imageUrl} alt={`Generation ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{
                              position: "absolute", bottom: 0, left: 0, right: 0,
                              background: "rgba(255,255,255,0.85)", padding: "1px 0", textAlign: "center",
                              fontSize: "0.38rem", color: entryType?.color, fontWeight: 700, backdropFilter: "blur(4px)"
                            }}>{entryType?.name}</div>
                            {isSelected && (<div style={{
                              position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: "50%",
                              background: entryType?.color, display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.5rem", color: "#fff", fontWeight: 900
                            }}>✓</div>)}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ fontSize: "0.52rem", color: "#d4d4d4", marginTop: 6 }}>Tap any image to select it for your card</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 9999, cursor: "pointer", padding: 20
        }}>
          <img src={lightbox} alt="Full size" style={{ maxWidth: "95%", maxHeight: "90vh", borderRadius: 12, boxShadow: `0 0 60px ${t?.glow}` }} />
          <div style={{ position: "absolute", top: 20, right: 20, color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Tap anywhere to close</div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "14px", borderTop: `1px solid ${THEME.border}`, position: "relative", zIndex: 10 }}>
        <p style={{ fontSize: "0.6rem", color: THEME.textLight }}>© 2026 Minted Paws · mintedpaws.co</p>
      </footer>

      {/* Global styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .fadeIn { animation: fadeIn 0.4s ease-out; }
        .typeGrid { max-width: 460px; margin: 0 auto; }
        .typeCard:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #ffffff; }
      `}</style>
    </div>
  );
}
