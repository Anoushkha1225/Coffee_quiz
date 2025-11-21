import React, { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

/**
 * Full ResultCard
 * - expects `result` = { coffee_key, coffee_name, coffee_desc, counts }
 * - images/videos in public/images/<coffee_key>.(jpg|png|webp|mp4|webm)
 * - includes filters for 'filter_coffee'
 */

// ---------------- suggestion data (includes filter_coffee) ----------------
const SUGGESTIONS = {
  espresso: {
    tip: 'Use freshly ground beans and pull a 25–30s shot.',
    pairing: 'Dark chocolate square',
    track: 'Short, bold beats',
    hack: 'Carry a tiny energy snack for afternoon slumps'
  },
  latte: {
    tip: 'Steam milk to 60–65°C for silky foam.',
    pairing: 'Soft croissant',
    track: 'Chill acoustic playlist',
    hack: 'Sip slowly — a good reminder to breathe'
  },
  cappuccino: {
    tip: 'Equal parts espresso, steamed milk, and foam — try latte art.',
    pairing: 'Almond biscotti',
    track: 'Classic jazz',
    hack: 'Break big tasks into smaller, rewarding chunks'
  },
  americano: {
    tip: 'Add hot water to espresso to preserve flavor.',
    pairing: 'Toast with butter',
    track: 'Low-fi beats for focus',
    hack: 'Make a quick to-do list while sipping'
  },
  mocha: {
    tip: 'Use good cocoa or melted dark chocolate for richer flavor.',
    pairing: 'Chocolate pastry',
    track: 'Upbeat pop',
    hack: 'Pair treats with a short walk to refresh'
  },
  masala_chai: {
    tip: 'Simmer fresh crushed spices in milk for best aroma.',
    pairing: 'Spiced biscuits',
    track: 'Soft instrumental Indian classical',
    hack: 'Use spice aroma as a quick calm cue'
  },
  filter_coffee: {
    tip: 'Use medium-coarse grind and pour slowly for clean, balanced flavour.',
    pairing: 'Butter biscuits or roasted peanuts',
    track: 'Mellow instrumentals',
    hack: 'Use a timer for consistent pour and extraction'
  }
}

function getSuggestion(key) {
  return SUGGESTIONS[key] || {
    tip: 'Try a balanced brew and enjoy the moment.',
    pairing: 'A small sweet',
    track: 'A short playlist',
    hack: 'Take a short focused break'
  }
}

// ---------------- MultiAsset: tries images then videos, falls back --------
const IMAGE_EXTS = ['jpg', 'jpeg', 'png', 'webp', 'avif', 'svg']
const VIDEO_EXTS = ['mp4', 'webm', 'ogg']

function MultiAsset({ safeKey, alt, imgStyle, videoStyle, defaultImg }) {
  const [phase, setPhase] = useState({ type: 'image', idx: 0 })

  useEffect(() => {
    // reset each time key changes
    setPhase({ type: 'image', idx: 0 })
  }, [safeKey])

  function handleImgError() {
    const next = phase.idx + 1
    if (next < IMAGE_EXTS.length) {
      setPhase(p => ({ ...p, idx: next }))
      return
    }
    // try videos next
    if (VIDEO_EXTS.length > 0) setPhase({ type: 'video', idx: 0 })
    else setPhase({ type: 'fallback', idx: 0 })
  }

  function handleVideoError() {
    const next = phase.idx + 1
    if (next < VIDEO_EXTS.length) {
      setPhase(p => ({ ...p, idx: next }))
      return
    }
    setPhase({ type: 'fallback', idx: 0 })
  }

  if (phase.type === 'image') {
    const src = `/images/${safeKey}.${IMAGE_EXTS[phase.idx]}`
    return (
      <img
        key={src}
        src={src}
        alt={alt}
        style={imgStyle}
        onError={handleImgError}
        loading="lazy"
      />
    )
  }

  if (phase.type === 'video') {
    const src = `/images/${safeKey}.${VIDEO_EXTS[phase.idx]}`
    return (
      <video
        key={src}
        style={videoStyle}
        controls
        playsInline
        onError={handleVideoError}
      >
        <source src={src} />
        Your browser does not support this video.
      </video>
    )
  }

  // fallback
  return <img src={defaultImg} alt="coffee default" style={imgStyle} />
}

// ---------------- share helpers ------------------------------------------
function textShareUrl(result) {
  const text = encodeURIComponent(`I got ${result.coffee_name} — which coffee person are you? ☕ https://your-site.example`)
  return {
    whatsapp: `https://wa.me/?text=${text}`,
    twitter: `https://twitter.com/intent/tweet?text=${text}`
  }
}

// ---------------- ResultCard component -----------------------------------
export default function ResultCard({ result, onReset }) {
  const [saved, setSaved] = useState(false)
  if (!result) return null

  const keyRaw = result.coffee_key || 'coffee'
  const safeKey = String(keyRaw).replace(/\s+/g, '_').toLowerCase()
  const suggestion = getSuggestion(safeKey)

  useEffect(() => {
    // fire confetti once per shown result
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } })
    setTimeout(() => confetti({ particleCount: 40, spread: 110, origin: { y: 0.7 } }), 220)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeKey])

  // styles
  const imgStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: 12,
    objectFit: 'cover',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  }
  const videoStyle = { ...imgStyle }

  const urls = textShareUrl(result)

  function handleSave() {
    try {
      const existing = JSON.parse(localStorage.getItem('savedCoffeeResults') || '[]')
      const next = [result, ...existing].slice(0, 10) // keep last 10
      localStorage.setItem('savedCoffeeResults', JSON.stringify(next))
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch (e) {
      console.error('save failed', e)
    }
  }

  return (
    <div className="result-card" style={{ display: 'flex', gap: 18, alignItems: 'center', padding: 18, maxWidth: 1000 }}>
      <div style={{ flex: '0 0 320px' }}>
        <MultiAsset
          safeKey={safeKey}
          alt={`${result.coffee_name} image`}
          imgStyle={imgStyle}
          videoStyle={videoStyle}
          defaultImg="/images/coffee-default.jpg"
        />
      </div>

      <div style={{ flex: 1 }}>
        <h2 style={{ margin: 0 }}>You are: <strong>{result.coffee_name}</strong></h2>
        <p style={{ marginTop: 8 }}>{result.coffee_desc}</p>

        <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ background: '#fafafa', padding: 10, borderRadius: 8 }}>
            <strong>Brewing tip</strong>
            <div style={{ marginTop: 6 }}>{suggestion.tip}</div>
          </div>

          <div style={{ background: '#fafafa', padding: 10, borderRadius: 8 }}>
            <strong>Snack pairing</strong>
            <div style={{ marginTop: 6 }}>{suggestion.pairing}</div>
          </div>

          <div style={{ background: '#fafafa', padding: 10, borderRadius: 8 }}>
            <strong>Playlist idea</strong>
            <div style={{ marginTop: 6 }}>{suggestion.track}</div>
          </div>

          <div style={{ background: '#fafafa', padding: 10, borderRadius: 8 }}>
            <strong>Quick life-hack</strong>
            <div style={{ marginTop: 6 }}>{suggestion.hack}</div>
          </div>
        </div>

        <details style={{ marginTop: 12 }}>
          <summary style={{ cursor: 'pointer' }}>Show raw counts</summary>
          <pre style={{ background: '#fafafa', padding: 10, borderRadius: 8, marginTop: 8 }}>
            {JSON.stringify(result.counts, null, 2)}
          </pre>
        </details>

        <div style={{ marginTop: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn" onClick={onReset}>Try again</button>
          </div>
        </div>
      </div>
    
  )
}
