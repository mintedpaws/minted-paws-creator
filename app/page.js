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
  { id: "fighting", name: "Fighting", color: "#D05028", glow: "rgba(208,80,40,0.4)", desc: "Ready to rumble. Never backs down.", icon: "👊" },
];

const LOADING_MESSAGES = {
  fire: ["Igniting the flames...", "Channeling fire energy...", "Forging your legend in flame...", "Almost there..."],
  water: ["Summoning the tides...", "Channeling water energy...", "Shaping your legend from the deep...", "Almost there..."],
  grass: ["Calling the wild...", "Channeling nature's energy...", "Growing your legend from the earth...", "Almost there..."],
  electric: ["Charging up...", "Channeling electric energy...", "Sparking your legend to life...", "Almost there..."],
  psychic: ["Opening the third eye...", "Channeling psychic energy...", "Manifesting your legend...", "Almost there..."],
  fighting: ["Entering the arena...", "Channeling fighting spirit...", "Forging your legend through battle...", "Almost there..."],
};

// Orb image paths — files go in /public/orbs/
const ORB_PATHS = {
  fire: "/orbs/fire_orb.png",
  water: "/orbs/water_orb.png",
  grass: "/orbs/grass_orb.png",
  electric: "/orbs/electric_orb.png",
  psychic: "/orbs/psychic_orb.png",
  fighting: "/orbs/dark_orb.png",
};

// ============================================================
// Image resize — shrinks to max 1024px before upload
// Fixes phone uploads (Vercel 4.5MB body limit) and cuts API costs
// ============================================================
const MAX_DIMENSION = 1024;

function resizeImage(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
        resolve(dataUrl);
        return;
      }

      if (width > height) {
        height = Math.round(height * (MAX_DIMENSION / width));
        width = MAX_DIMENSION;
      } else {
        width = Math.round(width * (MAX_DIMENSION / height));
        height = MAX_DIMENSION;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.src = dataUrl;
  });
}

// ============================================================
// Session token — persists in localStorage, identifies visitor
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
// Orb component with image + emoji fallback
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
    fighting: "radial-gradient(circle at 38% 32%, #f08060 0%, #D05028 45%, #7a2010 100%)",
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: !imgOk ? gradients[type] : "transparent",
        fontSize: !imgOk ? size * 0.4 : 0,
        boxShadow: selected
          ? `0 0 20px ${tp.color}88, 0 0 40px ${tp.glow}, 0 0 60px ${tp.color}33`
          : `0 0 8px ${tp.color}22`,
        transition: "all 0.35s ease",
        transform: selected ? "scale(1.08)" : "scale(1)",
        cursor: onClick ? "pointer" : "default",
        flexShrink: 0,
      }}
    >
      {imgOk ? (
        <img
          src={ORB_PATHS[type]}
          alt={tp.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={() => setImgOk(false)}
        />
      ) : (
        <span style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.3))" }}>{tp.icon}</span>
      )}
    </div>
  );
}

// ============================================================
// Floating particles canvas
// ============================================================
function FloatingParticles({ color, active }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 400, H = 400;
    canvas.width = W;
    canvas.height = H;
    if (!active) {
      ctx.clearRect(0, 0, W, H);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }
    const particles = Array.from({ length: 50 }, () => ({
      x: W / 2 + (Math.random() - 0.5) * 60,
      y: H / 2 + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: Math.random() * 3 + 1,
      life: Math.random(),
      speed: Math.random() * 0.01 + 0.003,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.life -= p.speed;
        if (p.life <= 0) { p.x = W/2+(Math.random()-0.5)*80; p.y = H/2+(Math.random()-0.5)*80; p.life = 1; }
        const dx = p.x-W/2, dy = p.y-H/2, dist = Math.sqrt(dx*dx+dy*dy)||1;
        p.vx += (dx/dist)*0.08; p.vy += (dy/dist)*0.08; p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        const a = Math.max(0, Math.min(1, p.life));
        ctx.globalAlpha = a*0.7; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = color; ctx.fill();
        ctx.globalAlpha = a*0.1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r*3, 0, Math.PI*2);
        ctx.fillStyle = color; ctx.fill();
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [color, active]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", width: 400, height: 400,
        pointerEvents: "none", opacity: active ? 0.7 : 0, transition: "opacity 0.5s",
      }}
    />
  );
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

  // Gallery: stores all generated images, persisted in localStorage
  const [gallery, setGallery] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("mp_gallery");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(null);

  // — Persist gallery to localStorage ————————————————
  useEffect(() => {
    try {
      localStorage.setItem("mp_gallery", JSON.stringify(gallery));
    } catch {}
  }, [gallery]);

  // — URL param auto-select ————————————————————
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      if (typeParam) {
        const found = TYPES.find((t) => t.id === typeParam.toLowerCase());
        if (found) {
          setSelectedType(found);
          setStep(2);
        }
      }
    } catch (e) {}
  }, []);

  // — Loading message rotation —————————————————
  useEffect(() => {
    if (!generating || !selectedType) return;
    const msgs = LOADING_MESSAGES[selectedType.id];
    let i = 0;
    const iv = setInterval(() => { i = (i + 1) % msgs.length; setLoadingIdx(i); }, 2800);
    return () => clearInterval(iv);
  }, [generating, selectedType]);

  // — Progress bar animation ———————————————————
  useEffect(() => {
    if (!generating) { setProgress(0); return; }
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 4 + 1;
      if (p > 90) p = 90;
      setProgress(p);
    }, 1000);
    return () => clearInterval(iv);
  }, [generating]);

  // — Photo upload handler (with resize) —————————
  const onPhoto = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 10485760) {
      setError("Image must be under 10MB");
      return;
    }
    const r = new FileReader();
    r.onload = async (ev) => {
      try {
        const resized = await resizeImage(ev.target.result);
        setPetPhoto(resized);
        setError(null);
      } catch (err) {
        setError("Failed to process image. Please try another photo.");
      }
    };
    r.readAsDataURL(f);
  };

  // — Type click handler — go straight to step 2 ——————
  const selectType = (tp) => {
    setSelectedType(tp);
    setStep(2);
    window.history.replaceState(null, "", `?type=${tp.id}`);
  };

  // — AI Generation — calls our server-side API ——————
  const generate = useCallback(async () => {
    if (!selectedType || !petPhoto) return;

    setGenerating(true);
    setLoadingIdx(0);
    setError(null);
    setGeneratedImage(null);
    setSelectedGalleryIdx(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType.id,
          image: petPhoto,
          sessionToken: getSessionToken(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setProgress(100);
      await new Promise((r) => setTimeout(r, 500));

      const newEntry = {
        imageUrl: data.imageUrl,
        type: selectedType.id,
        typeName: selectedType.name,
        typeColor: selectedType.color,
        timestamp: Date.now(),
      };

      setGeneratedImage(data.imageUrl);
      setGallery((prev) => [newEntry, ...prev]);
      setSelectedGalleryIdx(0);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
    }
  }, [selectedType, petPhoto]);

  // — Select image from gallery ———————————————————
  const selectFromGallery = (idx) => {
    const entry = gallery[idx];
    setSelectedGalleryIdx(idx);
    setGeneratedImage(entry.imageUrl);
    const matchType = TYPES.find((t) => t.id === entry.type);
    if (matchType) {
      setSelectedType(matchType);
      window.history.replaceState(null, "", `?type=${matchType.id}`);
    }
  };

  // — Proceed to Shopify/Customily ————————————————
  const buildCard = () => {
    window.location.href = `https://mintedpaws.co/products/${selectedType.id}?image=${encodeURIComponent(generatedImage)}`;
  };

  // — Reset ————————————————————————————————————
  const reset = () => {
    setStep(1);
    setSelectedType(null);
    setPetPhoto(null);
    setGeneratedImage(null);
    setError(null);
    setGallery([]);
    setSelectedGalleryIdx(null);
    localStorage.removeItem("mp_gallery");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // — Try different type (keep photo, go back to type select) ——
  const tryDifferentType = () => {
    setGeneratedImage(null);
    setSelectedGalleryIdx(null);
    setStep(1);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const t = selectedType;

  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#fff", fontFamily: "'Cinzel',Georgia,serif", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", background: t ? `radial-gradient(ellipse at 50% 20%, ${t.glow} 0%, transparent 55%)` : "radial-gradient(ellipse at 50% 20%, rgba(212,168,83,0.06) 0%, transparent 55%)", transition: "background 1s ease" }} />

      {/* Header */}
      <header style={{ textAlign: "center", padding: "32px 20px 10px", position: "relative", zIndex: 10 }}>
        <h1 onClick={reset} style={{ fontSize: "clamp(1.4rem,4vw,2rem)", background: "linear-gradient(135deg,#f0d68a,#d4a853,#a67c2e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.18em", margin: 0, fontWeight: 700, cursor: "pointer" }}>MINTED PAWS</h1>
        <p style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color: "rgba(212,168,83,0.5)", fontSize: "0.78rem", letterSpacing: "0.3em", textTransform: "uppercase", marginTop: 4 }}>Your Pet. Your Card. Your Legend.</p>
      </header>

      {/* Progress steps */}
      <div style={{ display: "flex", justifyContent: "center", gap: 0, padding: "8px 20px 24px", position: "relative", zIndex: 10 }}>
        {["Choose Type", "Upload Pet", "Transform"].map((label, i) => {
          const sn = i + 1;
          const active = step >= sn;
          const cur = step === sn;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, background: active ? "linear-gradient(135deg,#d4a853,#a67c2e)" : "rgba(255,255,255,0.04)", color: active ? "#000" : "rgba(255,255,255,0.25)", border: cur ? "2px solid #f0d68a" : "2px solid transparent", transition: "all 0.4s", boxShadow: cur ? "0 0 14px rgba(212,168,83,0.25)" : "none" }}>{sn}</div>
                <span style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.06em", color: active ? "rgba(212,168,83,0.7)" : "rgba(255,255,255,0.15)", fontFamily: "system-ui,sans-serif" }}>{label}</span>
              </div>
              {i < 2 && <div style={{ width: 40, height: 2, margin: "0 8px", marginBottom: 16, background: step > sn ? "linear-gradient(90deg,#d4a853,#a67c2e)" : "rgba(255,255,255,0.06)" }} />}
            </div>
          );
        })}
      </div>

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px 50px", position: "relative", zIndex: 10 }}>
        {/* ===== STEP 1: Choose Type ===== */}
        {step === 1 && (
          <div className="fadeIn">
            <h2 style={{ textAlign: "center", fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#f0d68a", marginBottom: 4 }}>Choose Your Type</h2>
            <p style={{ textAlign: "center", fontFamily: "system-ui,sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: 30 }}>Tap a type to get started</p>

            <div className="typeGrid">
              {TYPES.map((tp) => {
                const sel = t?.id === tp.id;
                return (
                  <button key={tp.id} onClick={() => selectType(tp)} className="typeCard" style={{
                    background: sel ? `radial-gradient(ellipse at 50% 30%, ${tp.color}15 0%, transparent 70%)` : "rgba(255,255,255,0.015)",
                    border: sel ? `2px solid ${tp.color}` : "2px solid rgba(255,255,255,0.06)",
                    borderRadius: 18, padding: "22px 10px 18px", cursor: "pointer",
                    transition: "all 0.35s ease", textAlign: "center",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    position: "relative",
                    boxShadow: sel ? `0 0 30px ${tp.glow}, inset 0 0 20px ${tp.color}06` : "none",
                  }}>
                    <ElementOrb type={tp.id} size={72} selected={sel} />
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, color: sel ? tp.color : "rgba(255,255,255,0.7)", fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.3s", marginTop: 2 }}>{tp.name}</div>
                    <div style={{ fontSize: "0.65rem", color: sel ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif", fontStyle: "italic", lineHeight: 1.35, transition: "color 0.3s" }}>{tp.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ===== STEP 2: Upload Pet ===== */}
        {step === 2 && (
          <div className="fadeIn">
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: `${t?.color}10`, border: `1px solid ${t?.color}30`, borderRadius: 50, padding: "5px 16px 5px 6px" }}>
                <ElementOrb type={t?.id} size={26} selected={false} />
                <span style={{ fontFamily: "system-ui,sans-serif", fontSize: "0.78rem", color: t?.color, fontWeight: 600 }}>{t?.name} Type</span>
                <button onClick={() => { setStep(1); window.history.replaceState(null, "", window.location.pathname); }} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", cursor: "pointer", fontFamily: "system-ui,sans-serif", textDecoration: "underline", marginLeft: 2 }}>change</button>
              </div>
            </div>

            <h2 style={{ textAlign: "center", fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#f0d68a", marginBottom: 4 }}>Upload Your Pet</h2>
            <p style={{ textAlign: "center", fontFamily: "system-ui,sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: 22 }}>Clear photo, any pet, any angle</p>

            <div onClick={() => fileRef.current?.click()} style={{
              maxWidth: 360, margin: "0 auto", aspectRatio: "1", borderRadius: 18,
              border: petPhoto ? "none" : `3px dashed ${t?.color}22`,
              background: petPhoto ? "none" : "rgba(255,255,255,0.015)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer", overflow: "hidden", position: "relative",
            }}>
              {petPhoto ? (
                <>
                  <img src={petPhoto} alt="Pet" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 18 }} />
                  <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.6)", color: "#f0d68a", padding: "5px 12px", borderRadius: 16, fontSize: "0.65rem", fontFamily: "system-ui,sans-serif", backdropFilter: "blur(8px)" }}>Tap to change</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "2.2rem", marginBottom: 10, opacity: 0.22 }}>📸</div>
                  <div style={{ color: "rgba(212,168,83,0.4)", fontSize: "0.85rem", fontFamily: "system-ui,sans-serif" }}>Tap to upload a photo</div>
                  <div style={{ color: "rgba(255,255,255,0.14)", fontSize: "0.68rem", fontFamily: "system-ui,sans-serif", marginTop: 4 }}>JPG, PNG — max 10MB</div>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={onPhoto} style={{ display: "none" }} />
            </div>

            {error && <p style={{ textAlign: "center", color: "#ff6b6b", fontSize: "0.78rem", fontFamily: "system-ui,sans-serif", marginTop: 10 }}>{error}</p>}

            <div style={{ maxWidth: 360, margin: "14px auto 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
              {["Clear face visible", "Good lighting", "Not blurry", "Any pet works"].map((tip) => (
                <div key={tip} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.62rem", color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif" }}>
                  <span style={{ color: `${t?.color}55` }}>✓</span> {tip}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 24 }}>
              <button onClick={() => { setStep(1); window.history.replaceState(null, "", window.location.pathname); }} style={{ background: "none", border: "2px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)", padding: "11px 26px", borderRadius: 50, fontSize: "0.82rem", fontFamily: "'Cinzel',serif", cursor: "pointer" }}>BACK</button>
              <button onClick={() => petPhoto && setStep(3)} disabled={!petPhoto} style={{
                background: petPhoto ? "linear-gradient(135deg,#d4a853,#a67c2e)" : "rgba(255,255,255,0.04)",
                color: petPhoto ? "#000" : "rgba(255,255,255,0.25)",
                border: "none", padding: "11px 34px", borderRadius: 50, fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Cinzel',serif", letterSpacing: "0.1em", cursor: petPhoto ? "pointer" : "not-allowed",
                boxShadow: petPhoto ? "0 4px 18px rgba(212,168,83,0.25)" : "none", transition: "all 0.3s",
              }}>CONTINUE</button>
            </div>
          </div>
        )}

        {/* ===== STEP 3: Transform ===== */}
        {step === 3 && (
          <div className="fadeIn">
            {/* Pre-generation confirmation */}
            {!generating && !generatedImage && (
              <div style={{ textAlign: "center" }}>
                <h2 style={{ fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#f0d68a", marginBottom: 4 }}>Ready to Transform</h2>
                <p style={{ fontFamily: "system-ui,sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: 26 }}>
                  Our AI will create a <strong style={{ color: t?.color }}>{t?.name}</strong> type creature
                </p>

                <div style={{ maxWidth: 260, margin: "0 auto 26px", background: "rgba(255,255,255,0.02)", borderRadius: 14, padding: 14, border: `2px solid ${t?.color}20` }}>
                  <img src={petPhoto} alt="Pet" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 10, marginBottom: 10 }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <ElementOrb type={t?.id} size={22} selected={false} />
                    <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.22)", fontFamily: "system-ui,sans-serif" }}>{t?.name} Type</span>
                  </div>
                </div>

                {error && <p style={{ color: "#ff6b6b", fontSize: "0.78rem", fontFamily: "system-ui,sans-serif", marginBottom: 14 }}>{error}</p>}

                <button onClick={generate} style={{
                  background: `linear-gradient(135deg,${t?.color},${t?.color}bb)`,
                  color: "#000", border: "none", padding: "15px 40px", borderRadius: 50,
                  fontSize: "0.9rem", fontWeight: 700, fontFamily: "'Cinzel',serif",
                  letterSpacing: "0.06em", boxShadow: `0 4px 28px ${t?.glow}`,
                  cursor: "pointer",
                }}>✨ TRANSFORM MY PET ✨</button>

                <button onClick={() => setStep(2)} style={{ display: "block", margin: "12px auto 0", background: "none", border: "none", color: "rgba(255,255,255,0.22)", fontSize: "0.7rem", fontFamily: "system-ui,sans-serif", textDecoration: "underline", cursor: "pointer" }}>Go back</button>
              </div>
            )}

            {/* Generating state */}
            {generating && (
              <div style={{ textAlign: "center", minHeight: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <FloatingParticles color={t?.color} active={true} />
                <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ position: "relative", marginBottom: 26, width: 100, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "absolute", inset: -8, borderRadius: "50%", border: `3px solid ${t?.color}15`, borderTopColor: t?.color, animation: "spin 1.2s linear infinite" }} />
                    <ElementOrb type={t?.id} size={84} selected={true} />
                  </div>
                  <p style={{ fontSize: "1.05rem", color: t?.color, fontFamily: "'Cinzel',serif", minHeight: 34 }}>{LOADING_MESSAGES[t?.id]?.[loadingIdx]}</p>
                  <div style={{ width: 220, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, margin: "14px auto 0", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: t?.color, borderRadius: 2, width: `${progress}%`, transition: "width 0.8s ease" }} />
                  </div>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.18)", fontFamily: "system-ui,sans-serif", marginTop: 8 }}>Usually takes 30–45 seconds</p>
                </div>
              </div>
            )}

            {/* Result */}
            {!generating && generatedImage && (
              <div style={{ textAlign: "center" }} className="fadeIn">
                <h2 style={{ fontSize: "clamp(1.1rem,3vw,1.5rem)", color: "#f0d68a", marginBottom: 4 }}>Your {t?.name} Transformation</h2>
                <p style={{ fontFamily: "system-ui,sans-serif", color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", marginBottom: 20 }}>Tap the image to see it full size</p>

                <div style={{ display: "flex", gap: 12, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginBottom: 26 }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.22)", marginBottom: 5, fontFamily: "system-ui,sans-serif" }}>Before</div>
                    <img src={petPhoto} alt="Original" style={{ width: 130, height: 130, objectFit: "cover", borderRadius: 10, opacity: 0.55, border: "2px solid rgba(255,255,255,0.06)" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <ElementOrb type={t?.id} size={28} selected={true} />
                    <div style={{ fontSize: "0.9rem", color: t?.color }}>→</div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.15em", color: t?.color, marginBottom: 5, fontFamily: "system-ui,sans-serif" }}>After</div>
                    <div
                      onClick={() => setLightbox(generatedImage)}
                      style={{ position: "relative", width: 200, height: 200, borderRadius: 14, overflow: "hidden", border: `3px solid ${t?.color}`, boxShadow: `0 0 30px ${t?.glow}`, cursor: "pointer" }}
                    >
                      <img src={generatedImage} alt="Transformed" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <div style={{ position: "absolute", bottom: 6, right: 0, left: 0, textAlign: "center", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", fontFamily: "system-ui,sans-serif", backdropFilter: "blur(4px)", background: "rgba(0,0,0,0.4)", padding: "3px 0" }}>Tap to expand</div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <button onClick={buildCard} style={{
                  background: "linear-gradient(135deg,#d4a853,#a67c2e)", color: "#000", border: "none", padding: "15px 42px", borderRadius: 50,
                  fontSize: "0.9rem", fontWeight: 700, fontFamily: "'Cinzel',serif", letterSpacing: "0.1em",
                  boxShadow: "0 4px 24px rgba(212,168,83,0.3)", cursor: "pointer",
                }}>BUILD YOUR CARD →</button>

                <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
                  <button onClick={generate} style={{ background: "none", border: "none", color: "rgba(212,168,83,0.45)", fontSize: "0.72rem", fontFamily: "system-ui,sans-serif", textDecoration: "underline", cursor: "pointer" }}>🔄 Try again ({t?.name})</button>
                  <button onClick={tryDifferentType} style={{ background: "none", border: "none", color: "rgba(212,168,83,0.45)", fontSize: "0.72rem", fontFamily: "system-ui,sans-serif", textDecoration: "underline", cursor: "pointer" }}>🔀 Try different type</button>
                  <button onClick={reset} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.22)", fontSize: "0.72rem", fontFamily: "system-ui,sans-serif", textDecoration: "underline", cursor: "pointer" }}>Start over</button>
                </div>

                {/* ===== GENERATION GALLERY ===== */}
                {gallery.length > 1 && (
                  <div style={{ marginTop: 30 }}>
                    <div style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(212,168,83,0.35)", fontFamily: "system-ui,sans-serif", marginBottom: 10 }}>Your Generations ({gallery.length})</div>
                    <div style={{
                      display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap",
                      padding: "12px", background: "rgba(255,255,255,0.015)", borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      {gallery.map((entry, idx) => {
                        const isSelected = selectedGalleryIdx === idx;
                        const entryType = TYPES.find((tp) => tp.id === entry.type);
                        return (
                          <div
                            key={entry.timestamp}
                            onClick={() => selectFromGallery(idx)}
                            style={{
                              width: 64, height: 64, borderRadius: 10, overflow: "hidden",
                              border: isSelected ? `2px solid ${entryType?.color}` : "2px solid rgba(255,255,255,0.08)",
                              cursor: "pointer", position: "relative",
                              boxShadow: isSelected ? `0 0 16px ${entryType?.glow}` : "none",
                              transition: "all 0.3s",
                              opacity: isSelected ? 1 : 0.6,
                            }}
                          >
                            <img src={entry.imageUrl} alt={`Generation ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <div style={{
                              position: "absolute", bottom: 0, left: 0, right: 0,
                              background: "rgba(0,0,0,0.6)", padding: "1px 0",
                              textAlign: "center", fontSize: "0.42rem", color: entryType?.color,
                              fontFamily: "system-ui,sans-serif", fontWeight: 600,
                            }}>{entryType?.name}</div>
                            {isSelected && (
                              <div style={{
                                position: "absolute", top: 3, right: 3,
                                width: 14, height: 14, borderRadius: "50%",
                                background: entryType?.color, display: "flex",
                                alignItems: "center", justifyContent: "center",
                                fontSize: "0.5rem", color: "#000", fontWeight: 900,
                              }}>✓</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.15)", fontFamily: "system-ui,sans-serif", marginTop: 6 }}>Tap any image to select it for your card</div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, cursor: "pointer", padding: 20,
          }}
        >
          <img src={lightbox} alt="Full size" style={{ maxWidth: "95%", maxHeight: "90vh", borderRadius: 12, boxShadow: `0 0 60px ${t?.glow}` }} />
          <div style={{ position: "absolute", top: 20, right: 20, color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontFamily: "system-ui,sans-serif" }}>Tap anywhere to close</div>
        </div>
      )}

      <footer style={{ textAlign: "center", padding: "14px", borderTop: "1px solid rgba(212,168,83,0.06)", position: "relative", zIndex: 10 }}>
        <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.12)", fontFamily: "system-ui,sans-serif" }}>© 2026 Minted Paws · mintedpaws.co</p>
      </footer>
    </div>
  );
}
