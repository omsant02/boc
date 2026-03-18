'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Film,
  TrendingUp,
  Clock,
  ChevronLeft,
  Wallet,
  LogOut,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
} from 'lucide-react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import Link from 'next/link'

const marketsData: Record<
  string,
  {
    id: string
    question: string
    description: string
    yesPercent: number
    noPercent: number
    pool: string
    timeLeft: string
    category: string
    totalBettors: number
    resolved: boolean
    activity: { user: string; action: 'YES' | 'NO'; amount: string; time: string }[]
  }
> = {
  '1': {
    id: '1',
    question: 'Will Dhurandhar 2 hit ₹100cr on Day 1?',
    description:
      'This market resolves YES if Dhurandhar 2 achieves a first-day box office collection of ₹100 crore or more across all formats (Hindi + dubbed versions) in India, as reported by official trade sources.',
    yesPercent: 65,
    noPercent: 35,
    pool: '2.5 ETH',
    timeLeft: '2d 14h',
    category: 'Opening Day',
    totalBettors: 142,
    resolved: false,
    activity: [
      { user: '0x1a2b...3c4d', action: 'YES', amount: '0.15 ETH', time: '2m ago' },
      { user: '0x9f8e...7d6c', action: 'NO', amount: '0.08 ETH', time: '5m ago' },
      { user: '0x3b4c...5d6e', action: 'YES', amount: '0.22 ETH', time: '12m ago' },
      { user: '0x7f6e...4a3b', action: 'YES', amount: '0.05 ETH', time: '18m ago' },
      { user: '0x2c3d...8e9f', action: 'NO', amount: '0.12 ETH', time: '25m ago' },
    ],
  },
  '2': {
    id: '2',
    question: 'Will Animal cross ₹500cr total?',
    description:
      'This market resolves YES if Animal (Bollywood film) achieves a cumulative worldwide box office collection of ₹500 crore or more, as reported by official trade sources within the resolution window.',
    yesPercent: 78,
    noPercent: 22,
    pool: '5.8 ETH',
    timeLeft: '5d 8h',
    category: 'Lifetime',
    totalBettors: 287,
    resolved: false,
    activity: [
      { user: '0x4d5e...6f7a', action: 'YES', amount: '0.3 ETH', time: '1m ago' },
      { user: '0x8b9c...0d1e', action: 'YES', amount: '0.18 ETH', time: '8m ago' },
      { user: '0x2f3a...4b5c', action: 'NO', amount: '0.07 ETH', time: '15m ago' },
      { user: '0x6e7f...8a9b', action: 'YES', amount: '0.25 ETH', time: '22m ago' },
      { user: '0x0c1d...2e3f', action: 'NO', amount: '0.11 ETH', time: '31m ago' },
    ],
  },
  '3': {
    id: '3',
    question: "Will Pushpa 2 be 2024's biggest hit?",
    description:
      "This market resolves YES if Pushpa 2: The Rule has the highest total worldwide box office collection among all Bollywood films released in 2024, as reported by official trade sources by the resolution date.",
    yesPercent: 52,
    noPercent: 48,
    pool: '1.2 ETH',
    timeLeft: '12d 3h',
    category: 'Year End',
    totalBettors: 98,
    resolved: false,
    activity: [
      { user: '0x5a6b...7c8d', action: 'NO', amount: '0.09 ETH', time: '3m ago' },
      { user: '0x1e2f...3a4b', action: 'YES', amount: '0.14 ETH', time: '10m ago' },
      { user: '0x9d0e...1f2a', action: 'NO', amount: '0.06 ETH', time: '19m ago' },
      { user: '0x3b4c...5d6e', action: 'YES', amount: '0.2 ETH', time: '28m ago' },
      { user: '0x7f8a...9b0c', action: 'YES', amount: '0.11 ETH', time: '35m ago' },
    ],
  },
}

function shortAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function MarketPage({ params }: { params: { id: string } }) {
  const market = marketsData[params.id] || marketsData['1']
  const [betAmount, setBetAmount] = useState('')
  const [selectedSide, setSelectedSide] = useState<'YES' | 'NO' | null>(null)
  const [betPlaced, setBetPlaced] = useState(false)

  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  const estimatedReturn = betAmount
    ? selectedSide === 'YES'
      ? ((parseFloat(betAmount) * 100) / market.yesPercent).toFixed(4)
      : ((parseFloat(betAmount) * 100) / market.noPercent).toFixed(4)
    : '0'

  const handlePlaceBet = () => {
    if (!isConnected || !selectedSide || !betAmount) return
    setBetPlaced(true)
    setTimeout(() => setBetPlaced(false), 3000)
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      {/* ── HEADER ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(10,10,10,0.9)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(12px)',
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
          <Link href="/" style={{ textDecoration: 'none' }}>
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
          </Link>

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

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        {/* Back link */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            color: '#9ca3af',
            textDecoration: 'none',
            fontSize: 14,
            marginBottom: 32,
            transition: 'color 200ms',
          }}
        >
          <ChevronLeft size={16} />
          Back to Markets
        </Link>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Market Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'linear-gradient(160deg, rgba(88,28,135,0.4), rgba(107,33,168,0.3), rgba(88,28,135,0.4))',
                border: '1px solid rgba(126,34,206,0.3)',
                borderRadius: 16,
                padding: 28,
              }}
            >
              {/* Category + Timer */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(245,158,11,0.2)',
                      color: '#f59e0b',
                      border: '1px solid rgba(245,158,11,0.3)',
                    }}
                  >
                    ● LIVE
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 999,
                      background: 'rgba(255,255,255,0.05)',
                      color: '#9ca3af',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {market.category}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#34d399', fontSize: 14 }}>
                  <Clock size={14} />
                  <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{market.timeLeft}</span>
                </div>
              </div>

              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 16, lineHeight: 1.3 }}>
                {market.question}
              </h1>
              <p style={{ fontSize: 14, color: '#9ca3af', lineHeight: 1.7, marginBottom: 24 }}>
                {market.description}
              </p>

              {/* Stats row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                  padding: '16px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4, letterSpacing: '0.05em' }}>
                    TOTAL POOL
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b', fontFamily: 'monospace' }}>
                    {market.pool}
                  </div>
                </div>
                <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4, letterSpacing: '0.05em' }}>
                    BETTORS
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>
                    {market.totalBettors}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 4, letterSpacing: '0.05em' }}>
                    CLOSES IN
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#34d399', fontFamily: 'monospace' }}>
                    {market.timeLeft}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Probability Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <Activity size={18} color="#f59e0b" />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Probability</h2>
              </div>

              {/* YES */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ArrowUpRight size={16} color="#34d399" />
                    <span style={{ color: '#34d399', fontWeight: 700 }}>YES</span>
                  </div>
                  <span style={{ color: '#34d399', fontFamily: 'monospace', fontSize: 22, fontWeight: 800 }}>
                    {market.yesPercent}%
                  </span>
                </div>
                <div style={{ height: 14, background: 'rgba(0,0,0,0.4)', borderRadius: 999, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${market.yesPercent}%` }}
                    transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981, #4ade80)',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>

              {/* NO */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ArrowDownRight size={16} color="#fb7185" />
                    <span style={{ color: '#fb7185', fontWeight: 700 }}>NO</span>
                  </div>
                  <span style={{ color: '#fb7185', fontFamily: 'monospace', fontSize: 22, fontWeight: 800 }}>
                    {market.noPercent}%
                  </span>
                </div>
                <div style={{ height: 14, background: 'rgba(0,0,0,0.4)', borderRadius: 999, overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${market.noPercent}%` }}
                    transition={{ delay: 0.4, duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #f43f5e, #ef4444)',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <TrendingUp size={18} color="#f59e0b" />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Recent Activity</h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {market.activity.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: 10,
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          background:
                            item.action === 'YES'
                              ? 'rgba(16,185,129,0.2)'
                              : 'rgba(244,63,94,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: `1px solid ${item.action === 'YES' ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.4)'}`,
                        }}
                      >
                        <Users
                          size={14}
                          color={item.action === 'YES' ? '#34d399' : '#fb7185'}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontFamily: 'monospace', color: '#9ca3af' }}>
                          {item.user}
                        </div>
                        <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{item.time}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: 6,
                          background:
                            item.action === 'YES'
                              ? 'rgba(16,185,129,0.15)'
                              : 'rgba(244,63,94,0.15)',
                          color: item.action === 'YES' ? '#34d399' : '#fb7185',
                          marginBottom: 4,
                          display: 'block',
                        }}
                      >
                        {item.action}
                      </span>
                      <div style={{ fontSize: 12, color: '#f59e0b', fontFamily: 'monospace', fontWeight: 600 }}>
                        {item.amount}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Betting Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            style={{ position: 'sticky', top: 88 }}
          >
            <div
              style={{
                background: 'linear-gradient(160deg, rgba(88,28,135,0.4), rgba(107,33,168,0.3))',
                border: '1px solid rgba(126,34,206,0.3)',
                borderRadius: 16,
                padding: 24,
              }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 20 }}>
                Place Your Bet
              </h2>

              {!isConnected ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: 'rgba(245,158,11,0.1)',
                      border: '1px solid rgba(245,158,11,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <Wallet size={24} color="#f59e0b" />
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 20 }}>
                    Connect your wallet to place bets on this market
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => connect({ connector: injected() })}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: 10,
                      border: 'none',
                      background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: 15,
                      cursor: 'pointer',
                      boxShadow: '0 4px 20px rgba(245,158,11,0.3)',
                    }}
                  >
                    Connect Wallet
                  </motion.button>
                </div>
              ) : betPlaced ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '24px 0' }}
                >
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🎬</div>
                  <h3 style={{ color: '#34d399', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                    Bet Placed!
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: 14 }}>
                    Your {selectedSide} bet of {betAmount} ETH has been submitted
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Side selection */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
                    {(['YES', 'NO'] as const).map(side => (
                      <motion.button
                        key={side}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedSide(side)}
                        style={{
                          padding: '14px',
                          borderRadius: 10,
                          border:
                            selectedSide === side
                              ? `2px solid ${side === 'YES' ? '#10b981' : '#f43f5e'}`
                              : '2px solid rgba(255,255,255,0.1)',
                          background:
                            selectedSide === side
                              ? side === 'YES'
                                ? 'rgba(16,185,129,0.15)'
                                : 'rgba(244,63,94,0.15)'
                              : 'rgba(255,255,255,0.03)',
                          color:
                            selectedSide === side
                              ? side === 'YES'
                                ? '#34d399'
                                : '#fb7185'
                              : '#9ca3af',
                          fontWeight: 700,
                          fontSize: 15,
                          cursor: 'pointer',
                          transition: 'all 200ms',
                        }}
                      >
                        {side}
                        <div
                          style={{
                            fontSize: 12,
                            marginTop: 4,
                            fontFamily: 'monospace',
                            opacity: 0.8,
                          }}
                        >
                          {side === 'YES' ? market.yesPercent : market.noPercent}%
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Amount input */}
                  <div style={{ marginBottom: 16 }}>
                    <label
                      style={{ fontSize: 12, color: '#9ca3af', display: 'block', marginBottom: 8, letterSpacing: '0.05em' }}
                    >
                      BET AMOUNT (ETH)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        placeholder="0.0"
                        value={betAmount}
                        onChange={e => setBetAmount(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 48px 12px 16px',
                          borderRadius: 10,
                          border: '1px solid rgba(255,255,255,0.15)',
                          background: 'rgba(0,0,0,0.4)',
                          color: '#fff',
                          fontSize: 16,
                          fontFamily: 'monospace',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                      <span
                        style={{
                          position: 'absolute',
                          right: 14,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: 12,
                          color: '#6b7280',
                          fontWeight: 600,
                        }}
                      >
                        ETH
                      </span>
                    </div>

                    {/* Quick amounts */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      {['0.05', '0.1', '0.25', '0.5'].map(amt => (
                        <button
                          key={amt}
                          onClick={() => setBetAmount(amt)}
                          style={{
                            flex: 1,
                            padding: '6px',
                            borderRadius: 6,
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: betAmount === amt ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.03)',
                            color: betAmount === amt ? '#f59e0b' : '#6b7280',
                            fontSize: 12,
                            cursor: 'pointer',
                            transition: 'all 200ms',
                          }}
                        >
                          {amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated return */}
                  {betAmount && selectedSide && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 10,
                        background: 'rgba(245,158,11,0.08)',
                        border: '1px solid rgba(245,158,11,0.2)',
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                        <span style={{ color: '#9ca3af' }}>Potential Return</span>
                        <span style={{ color: '#f59e0b', fontFamily: 'monospace', fontWeight: 700 }}>
                          ~{estimatedReturn} ETH
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 6 }}>
                        <span style={{ color: '#6b7280' }}>If {selectedSide} wins</span>
                        <span style={{ color: '#6b7280' }}>
                          {betAmount ? `+${((parseFloat(estimatedReturn) - parseFloat(betAmount)).toFixed(4))} ETH profit` : ''}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Place bet button */}
                  <motion.button
                    whileHover={selectedSide && betAmount ? { scale: 1.02, boxShadow: '0 8px 32px rgba(245,158,11,0.3)' } : {}}
                    whileTap={selectedSide && betAmount ? { scale: 0.98 } : {}}
                    onClick={handlePlaceBet}
                    disabled={!selectedSide || !betAmount}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: 12,
                      border: 'none',
                      background:
                        selectedSide && betAmount
                          ? selectedSide === 'YES'
                            ? 'linear-gradient(135deg, #059669, #16a34a)'
                            : 'linear-gradient(135deg, #e11d48, #dc2626)'
                          : 'rgba(255,255,255,0.05)',
                      color: selectedSide && betAmount ? '#fff' : '#4b5563',
                      fontWeight: 700,
                      fontSize: 16,
                      cursor: selectedSide && betAmount ? 'pointer' : 'not-allowed',
                      transition: 'all 300ms',
                    }}
                  >
                    {selectedSide ? `Bet ${selectedSide}${betAmount ? ` · ${betAmount} ETH` : ''}` : 'Select YES or NO'}
                  </motion.button>

                  <p style={{ fontSize: 11, color: '#4b5563', textAlign: 'center', marginTop: 12 }}>
                    Smart contract will hold funds until resolution
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
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
