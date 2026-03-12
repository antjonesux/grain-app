import { useEffect, useRef, type CSSProperties } from 'react'
import { PrimaryButton } from '@/components/onboarding/PrimaryButton'
import { InlineLinkButton } from '@/components/onboarding/InlineLinkButton'
import { InlineLinkRow } from '@/components/onboarding/InlineLinkRow'
import LogoIcon from '@/assets/logo_icon.svg?react'

interface WelcomeScreenProps {
  onNext: () => void
  onSignIn: () => void
}

// ─── Animation keyframes injected once ───────────────────────────────────────
const KEYFRAMES = `
  @keyframes grainShift {
    0%   { transform: translate(0, 0); }
    20%  { transform: translate(-4%, -3%); }
    40%  { transform: translate(3%, 5%); }
    60%  { transform: translate(-2%, 4%); }
    80%  { transform: translate(4%, -2%); }
    100% { transform: translate(0, 0); }
  }
  @keyframes ws-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes ws-fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ws-lineGrow {
    from { transform: scaleX(0); opacity: 0; }
    to   { transform: scaleX(1); opacity: 1; }
  }
  @keyframes ws-wordReveal {
    from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
  }
  @keyframes ws-pillPop {
    0%   { opacity: 0; transform: translateY(8px) scale(0.93); }
    60%  { transform: translateY(-2px) scale(1.02); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes ws-glowPulse {
    0%, 100% { opacity: 0.07; }
    50%       { opacity: 0.14; }
  }
`

function useInjectKeyframes() {
  const injected = useRef(false)
  useEffect(() => {
    if (injected.current) return
    injected.current = true
    const style = document.createElement('style')
    style.textContent = KEYFRAMES
    document.head.appendChild(style)
  }, [])
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function anim(
  name: string,
  duration: string,
  delay: string,
  easing = 'ease',
  fill = 'both',
): CSSProperties {
  return {
    animation: `${name} ${duration} ${delay} ${easing} ${fill}`,
    opacity: 0,
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const GrainLogo = () => (
  <LogoIcon
    width={28}
    height={27}
    aria-hidden="true"
    style={{
      color: 'var(--text-primary)',
      filter: 'drop-shadow(0 0 24px color-mix(in srgb, var(--accent) 30%, transparent))',
    }}
  />
)

const PILLS = ['Declare', 'Log', 'Review', 'Align'] as const

// ─── Styles ───────────────────────────────────────────────────────────────────
const screen: CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  minHeight: '100dvh',
  background: 'var(--bg)',
  maxWidth: 480,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0 24px',
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
}

// Grain noise overlay
const noiseLayer: CSSProperties = {
  position: 'absolute',
  inset: '-40%',
  width: '180%',
  height: '180%',
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  backgroundSize: '180px 180px',
  opacity: 0.08,
  pointerEvents: 'none',
  animation: 'grainShift 0.85s steps(1) infinite',
  zIndex: 0,
}

// Top radial glow
const glowTop: CSSProperties = {
  position: 'absolute',
  top: -160,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 560,
  height: 560,
  background:
    'radial-gradient(circle, color-mix(in srgb, var(--accent) 11%, transparent) 0%, color-mix(in srgb, var(--accent) 3%, transparent) 45%, transparent 70%)',
  pointerEvents: 'none',
  animation: 'ws-glowPulse 4s ease-in-out infinite',
  zIndex: 0,
}

// Bottom radial glow
const glowBottom: CSSProperties = {
  position: 'absolute',
  bottom: -80,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 600,
  height: 320,
  background:
    'radial-gradient(ellipse, color-mix(in srgb, var(--accent) 5%, transparent) 0%, transparent 65%)',
  pointerEvents: 'none',
  zIndex: 0,
}

const topSection: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}

const logoArea: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  paddingTop: '40px',
  gap: '16px',
}

const logoGroupStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
}

const logoTextStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-serif)',
  fontSize: '28px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  letterSpacing: '0.09px',
  textShadow: '0 0 24px color-mix(in srgb, var(--accent) 30%, transparent)',
}

// Eyebrow row: line + label
const eyebrowRow: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  paddingTop: '96px',
  ...anim('ws-fadeUp', '0.55s', '0.5s'),
}

const eyebrowLine: CSSProperties = {
  height: 1,
  width: 28,
  background: 'var(--accent)',
  transformOrigin: 'left center',
  ...anim('ws-lineGrow', '0.5s', '0.75s'),
}

const eyebrowText: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: 'var(--accent)',
}

// Headline — outer wrapper (no padding, words handle their own spacing)
const headlineWrap: CSSProperties = {
  margin: '16px 0 0',
  textAlign: 'left',
}

function wordStyle(delay: string): CSSProperties {
  return {
    display: 'inline-block',
    fontFamily: 'var(--grain-font-sans)',
    fontSize: '40px',
    fontWeight: 700,
    lineHeight: '40px',
    color: 'var(--text-primary)',
    ...anim('ws-wordReveal', '0.6s', delay),
  }
}

const wordAccent: CSSProperties = { color: 'var(--accent)' }

const taglineStyle: CSSProperties = {
  fontFamily: 'var(--grain-font-sans)',
  fontSize: '15px',
  fontWeight: 400,
  lineHeight: '24px',
  color: 'var(--text-secondary)',
  textAlign: 'left',
  margin: '8px 0 0',
  ...anim('ws-fadeUp', '0.55s', '1.55s'),
}

const dividerStyle: CSSProperties = {
  width: '100%',
  height: 1,
  background:
    'linear-gradient(90deg, transparent, var(--border) 30%, var(--border) 70%, transparent)',
  margin: '28px 0 24px',
  ...anim('ws-fadeIn', '0.4s', '1.7s'),
}

const pillsRow: CSSProperties = {
  display: 'flex',
  gap: 16,
  justifyContent: 'center',
  flexWrap: 'nowrap' as const,
}

function pillStyle(delay: string): CSSProperties {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '7px 13px',
    borderRadius: 999,
    background: 'var(--bg-elevated)',
    border: '1px solid var(--border)',
    fontFamily: 'var(--grain-font-sans)',
    fontSize: '12px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    whiteSpace: 'nowrap' as const,
    ...anim('ws-pillPop', '0.5s', delay),
  }
}

const pillDot: CSSProperties = {
  width: 5,
  height: 5,
  borderRadius: '50%',
  background: 'var(--accent)',
  flexShrink: 0,
}

const ctaZone: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '48px',
  paddingBottom: '40px',
  gap: '12px',
}

// ─── Component ────────────────────────────────────────────────────────────────
export const WelcomeScreen = ({ onNext, onSignIn }: WelcomeScreenProps) => {
  useInjectKeyframes()

  const pillDelays = ['1.8s', '1.95s', '2.1s', '2.25s']

  return (
    <div style={screen}>
      {/* Texture + glow layers */}
      <div style={noiseLayer} />
      <div style={glowTop} />
      <div style={glowBottom} />

      {/* Top content */}
      <div style={topSection}>
        {/* Logo — unchanged */}
        <div style={logoArea}>
          <div style={logoGroupStyle}>
            <GrainLogo />
            <span style={logoTextStyle}>Grain</span>
          </div>
        </div>

        {/* Eyebrow */}
        <div style={eyebrowRow}>
          <div style={eyebrowLine} />
          <span style={eyebrowText}>Time as intention</span>
        </div>

        {/* Headline — word by word */}
        <div style={headlineWrap}>
          <span style={wordStyle('0.9s')}>Your</span>{' '}
          <span style={wordStyle('1.0s')}>time</span>{' '}
          <span style={wordStyle('1.1s')}>tells</span>{' '}
          <span style={wordStyle('1.2s')}>the</span>{' '}
          <span style={{ ...wordStyle('1.35s'), ...wordAccent }}>truth.</span>
        </div>

        {/* Tagline */}
        <p style={taglineStyle}>
          See if your week reflects what you say matters most.
        </p>

        {/* Divider */}
        <div style={dividerStyle} />

        {/* Core loop pills */}
        <div style={pillsRow}>
          {PILLS.map((label, i) => (
            <div key={label} style={pillStyle(pillDelays[i])}>
              <div style={pillDot} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* CTA — unchanged from original */}
      <div style={ctaZone}>
        <PrimaryButton onClick={onNext}>Get started</PrimaryButton>
        <InlineLinkRow>
          Already have an account?{' '}
          <InlineLinkButton underline onClick={onSignIn}>
            Sign in
          </InlineLinkButton>
        </InlineLinkRow>
      </div>
    </div>
  )
}