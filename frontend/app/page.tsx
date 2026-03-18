'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Film, TrendingUp, Users, Clock, ChevronRight, Wallet, LogOut, Zap } from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import Link from 'next/link'

const markets = [
  {
    id: '1',
    question: 'Will Dhurandhar 2 hit ₹100cr on Day 1?',
    yesPercent: 65,
    noPercent: 35,
    pool: '2.5 ETH',
    timeLeft: '2d 14h',
    category: 'Opening Day',
  },
  {
    id: '2',
    question: 'Will Animal cross ₹500cr total?',
    yesPercent: 78,
    noPercent: 22,
    pool: '5.8 ETH',
    timeLeft: '5d 8h',
    category: 'Lifetime',
  },
  {
    id: '3',
    question: "Will Pushpa 2 be 2024's biggest hit?",
    yesPercent: 52,
    noPercent: 48,
    pool: '1.2 ETH',
    timeLeft: '12d 3h',
    category: 'Year End',
  },
]

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      {/* ── HEADER ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: scrolled ? 'rgba(10,10,10,0.85)' : '#0a0a0a',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          transition: 'all 300ms ease',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo + Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px rgba(251,191,36,0.4)',
              }}
            >
              <Film size={20} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, lineHeight: 1.1 }}>
                Business of Cinema
              </div>
              <div style={{ fontSize: 11, color: '#9ca3af', letterSpacing: '0.05em' }}>
                Prediction Markets
              </div>
            </div>
          </div>

          {/* Wallet */}
          <div>
            {isConnected && address ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: '#f59e0b',
                    fontFamily: 'monospace',
                    background: 'rgba(245,158,11,0.1)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(245,158,11,0.2)',
                  }}
                >
                  {shortAddress(address)}
                </span>
                <button
                  onClick={() => disconnect()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#9ca3af',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={14} />
                  Disconnect
                </button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => connect({ connector: injected() })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                }}
              >
                <Wallet size={16} />
                Connect Wallet
              </motion.button>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '100px 24px 80px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 18px',
            borderRadius: 999,
            background: 'rgba(10,10,10,0.8)',
            border: '1px solid rgba(245,158,11,0.3)',
            color: '#f59e0b',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.1em',
            marginBottom: 32,
          }}
        >
          🎬 THE FUTURE OF BOX OFFICE BETTING
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1
            style={{
              fontSize: 'clamp(56px, 10vw, 96px)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 24,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: '#fff', display: 'block' }}>Predict</span>
            <span
              style={{
                display: 'block',
                background: 'linear-gradient(90deg, #fbbf24, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The Blockbuster
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 20,
            color: '#9ca3af',
            maxWidth: 560,
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          India&apos;s first decentralized prediction market for Bollywood box office.{' '}
          <span style={{ color: '#e5e7eb' }}>Your instinct. Your profit.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(245,158,11,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 32px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              boxShadow: '0 4px 24px rgba(245,158,11,0.3)',
            }}
          >
            <Zap size={18} />
            Start Predicting
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '14px 32px',
              borderRadius: 12,
              border: '1px solid rgba(245,158,11,0.3)',
              background: 'transparent',
              color: '#fff',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            How It Works
          </motion.button>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'linear-gradient(135deg, rgba(88,28,135,0.2), rgba(107,33,168,0.2))',
              border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <TrendingUp size={20} color="#f59e0b" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f59e0b' }}>
                TOTAL VOLUME
              </span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: 'monospace', marginBottom: 6 }}>
              ₹9.5 ETH
            </div>
            <div style={{ fontSize: 13, color: '#10b981' }}>+23% this week</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30,58,138,0.2), rgba(29,78,216,0.2))',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Film size={20} color="#f59e0b" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f59e0b' }}>
                LIVE MARKETS
              </span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: 'monospace', marginBottom: 6 }}>
              12
            </div>
            <div style={{ fontSize: 13, color: '#f59e0b' }}>3 ending soon</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              background: 'linear-gradient(135deg, rgba(124,45,18,0.2), rgba(154,52,18,0.2))',
              border: '1px solid rgba(249,115,22,0.2)',
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Users size={20} color="#f59e0b" />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: '#f59e0b' }}>
                PREDICTORS
              </span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: 'monospace', marginBottom: 6 }}>
              1,234
            </div>
            <div style={{ fontSize: 13, color: '#10b981' }}>+156 today</div>
          </motion.div>
        </div>
      </section>

      {/* ── LIVE MARKETS ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 32,
          }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}
          >
            Live Markets
          </motion.h2>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 20px',
              borderRadius: 10,
              border: '1px solid rgba(245,158,11,0.3)',
              background: 'transparent',
              color: '#9ca3af',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            View All
            <ChevronRight size={16} />
          </motion.button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {markets.map((market, i) => (
            <MarketCard key={market.id} market={market} index={i} isConnected={isConnected} />
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '48px 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b, #f97316)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
            boxShadow: '0 0 20px rgba(251,191,36,0.3)',
          }}
        >
          <Film size={20} color="#fff" />
        </div>
        <div style={{ fontWeight: 700, color: '#fff', fontSize: 16, marginBottom: 8 }}>
          Business of Cinema
        </div>
        <div style={{ fontSize: 13, color: '#6b7280' }}>
          Built with 💛 for Bollywood fans | Powered by Ethereum
        </div>
      </footer>
    </main>
  )
}

/* ── MARKET CARD ── */
function MarketCard({
  market,
  index,
  isConnected,
}: {
  market: (typeof markets)[0]
  index: number
  isConnected: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(160deg, rgba(88,28,135,0.4), rgba(107,33,168,0.3), rgba(88,28,135,0.4))',
        border: hovered ? '1px solid rgba(245,158,11,0.5)' : '1px solid rgba(126,34,206,0.3)',
        borderRadius: 16,
        padding: 24,
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 20px 60px rgba(245,158,11,0.15), 0 8px 32px rgba(0,0,0,0.4)'
          : '0 8px 32px rgba(0,0,0,0.3)',
        transition: 'border 500ms ease, box-shadow 500ms ease',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: 999,
            background: 'rgba(245,158,11,0.2)',
            color: '#f59e0b',
            border: '1px solid rgba(245,158,11,0.3)',
            letterSpacing: '0.05em',
          }}
        >
          ● LIVE
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#34d399', fontSize: 13 }}>
          <Clock size={13} />
          <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{market.timeLeft}</span>
        </div>
      </div>

      {/* Question */}
      <Link href={`/markets/${market.id}`} style={{ textDecoration: 'none' }}>
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: hovered ? '#fbbf24' : '#fff',
            lineHeight: 1.4,
            minHeight: '3rem',
            transition: 'color 200ms',
          }}
        >
          {market.question}
        </h3>
      </Link>

      {/* Pool */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9ca3af', fontSize: 14 }}>
        <TrendingUp size={14} />
        Pool:{' '}
        <span style={{ color: '#f59e0b', fontWeight: 700, marginLeft: 4 }}>{market.pool}</span>
      </div>

      {/* YES bar */}
      <div
        style={{
          padding: '10px 12px',
          borderRadius: 10,
          border: '1px solid rgba(16,185,129,0.3)',
          background: 'rgba(16,185,129,0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#34d399', fontWeight: 700, fontSize: 13 }}>YES</span>
          <span style={{ color: '#34d399', fontFamily: 'monospace', fontWeight: 700, fontSize: 18 }}>
            {market.yesPercent}%
          </span>
        </div>
        <div
          style={{
            height: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${market.yesPercent}%` }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #4ade80)',
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* NO bar */}
      <div
        style={{
          padding: '10px 12px',
          borderRadius: 10,
          border: '1px solid rgba(244,63,94,0.3)',
          background: 'rgba(244,63,94,0.05)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#fb7185', fontWeight: 700, fontSize: 13 }}>NO</span>
          <span style={{ color: '#fb7185', fontFamily: 'monospace', fontWeight: 700, fontSize: 18 }}>
            {market.noPercent}%
          </span>
        </div>
        <div
          style={{
            height: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${market.noPercent}%` }}
            transition={{ delay: 0.9 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #f43f5e, #ef4444)',
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      {/* Bet buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <motion.button
          whileHover={isConnected ? { scale: 1.03 } : {}}
          whileTap={isConnected ? { scale: 0.97 } : {}}
          disabled={!isConnected}
          style={{
            padding: '12px',
            borderRadius: 10,
            border: 'none',
            background: isConnected
              ? 'linear-gradient(135deg, #059669, #16a34a)'
              : 'rgba(5,150,105,0.3)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            cursor: isConnected ? 'pointer' : 'not-allowed',
            opacity: isConnected ? 1 : 0.5,
          }}
        >
          Bet YES
        </motion.button>
        <motion.button
          whileHover={isConnected ? { scale: 1.03 } : {}}
          whileTap={isConnected ? { scale: 0.97 } : {}}
          disabled={!isConnected}
          style={{
            padding: '12px',
            borderRadius: 10,
            border: 'none',
            background: isConnected
              ? 'linear-gradient(135deg, #e11d48, #dc2626)'
              : 'rgba(225,29,72,0.3)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            cursor: isConnected ? 'pointer' : 'not-allowed',
            opacity: isConnected ? 1 : 0.5,
          }}
        >
          Bet NO
        </motion.button>
      </div>

      {!isConnected && (
        <p style={{ fontSize: 11, color: '#6b7280', textAlign: 'center', marginTop: -8 }}>
          Connect wallet to place bets
        </p>
      )}
    </motion.div>
  )
}
