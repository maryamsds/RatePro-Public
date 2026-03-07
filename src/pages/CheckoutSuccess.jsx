import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaCog, FaSpinner, FaExclamationTriangle, FaExternalLinkAlt } from 'react-icons/fa'
import PublicAPI from '../api/publicApi'

const CheckoutSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    const navigate = useNavigate()
    const [status, setStatus] = useState('polling') // polling | ready | timeout | error
    const [adminUrl, setAdminUrl] = useState(null)
    const [pollCount, setPollCount] = useState(0)

    const checkStatus = useCallback(async () => {
        if (!sessionId) {
            setStatus('error')
            return false
        }

        try {
            const res = await PublicAPI.get(`/subscriptions/status?session_id=${sessionId}`)
            const data = res.data

            if (data.success && data.provisioned) {
                setAdminUrl(data.adminUrl)
                setStatus('ready')
                return true
            }
        } catch (err) {
            console.error('[CheckoutSuccess] Polling error:', err.message)
        }
        return false
    }, [sessionId])

    useEffect(() => {
        if (!sessionId) {
            setStatus('error')
            return
        }

        let timer
        let count = 0

        const poll = async () => {
            count++
            setPollCount(count)

            const isReady = await checkStatus()
            if (isReady) return

            // Adaptive polling: 2s × 5 → 5s × 6 → timeout at 40s total
            if (count < 5) {
                timer = setTimeout(poll, 2000)
            } else if (count < 11) {
                timer = setTimeout(poll, 5000)
            } else {
                setStatus('timeout')
            }
        }

        poll()

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [checkStatus, sessionId])

    const handleRetry = async () => {
        setStatus('polling')
        setPollCount(0)
        const isReady = await checkStatus()
        if (!isReady) {
            setStatus('timeout')
        }
    }

    if (!sessionId) {
        return (
            <div style={containerStyle}>
                <div style={cardStyle}>
                    <FaExclamationTriangle size={60} color="#e74c3c" />
                    <h2 style={{ marginTop: '1.5rem', color: '#333' }}>Invalid Session</h2>
                    <p style={{ color: '#666', marginTop: '0.5rem' }}>
                        No checkout session found. Please try again from the pricing page.
                    </p>
                    <button onClick={() => navigate('/pricing')} style={primaryBtnStyle}>
                        Go to Pricing
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {status === 'polling' && (
                    <>
                        <FaCog
                            size={60}
                            color="#667eea"
                            style={{ animation: 'spin 2s linear infinite' }}
                        />
                        <h2 style={{ marginTop: '1.5rem', color: '#333' }}>
                            Payment Successful! 🎉
                        </h2>
                        <p style={{ color: '#666', marginTop: '0.5rem' }}>
                            Your workspace is being prepared. This usually takes just a few seconds...
                        </p>
                        <div style={progressBoxStyle}>
                            <FaSpinner
                                size={20}
                                color="#667eea"
                                style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }}
                            />
                            <span style={{ color: '#888', fontSize: '0.9rem' }}>
                                Setting up your workspace... ({pollCount}/11)
                            </span>
                        </div>
                    </>
                )}

                {status === 'ready' && (
                    <>
                        <FaCheckCircle size={60} color="#28a745" />
                        <h2 style={{ marginTop: '1.5rem', color: '#333' }}>
                            Your Workspace is Ready! 🚀
                        </h2>
                        <p style={{ color: '#666', marginTop: '0.5rem' }}>
                            Your subscription is active and your admin dashboard is ready.
                            A confirmation email has also been sent to your inbox.
                        </p>
                        {adminUrl && (
                            <a
                                href={adminUrl}
                                style={primaryBtnStyle}
                            >
                                Access Your Dashboard <FaExternalLinkAlt size={14} style={{ marginLeft: '8px' }} />
                            </a>
                        )}
                        <p style={{ color: '#999', fontSize: '0.85rem', marginTop: '1rem' }}>
                            You'll need to log in to your admin dashboard to complete setup.
                        </p>
                    </>
                )}

                {status === 'timeout' && (
                    <>
                        <FaExclamationTriangle size={60} color="#ffc107" />
                        <h2 style={{ marginTop: '1.5rem', color: '#333' }}>
                            Taking Longer Than Expected
                        </h2>
                        <p style={{ color: '#666', marginTop: '0.5rem' }}>
                            Your payment was successful! Workspace setup is still processing.
                            You'll receive a confirmation email with your dashboard link shortly.
                        </p>
                        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button onClick={handleRetry} style={primaryBtnStyle}>
                                Check Again
                            </button>
                            <button onClick={() => navigate('/pricing')} style={secondaryBtnStyle}>
                                Back to Pricing
                            </button>
                        </div>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <FaExclamationTriangle size={60} color="#e74c3c" />
                        <h2 style={{ marginTop: '1.5rem', color: '#333' }}>Something Went Wrong</h2>
                        <p style={{ color: '#666', marginTop: '0.5rem' }}>
                            We couldn't verify your checkout session. If you completed payment,
                            please check your email for a confirmation.
                        </p>
                        <button onClick={() => navigate('/pricing')} style={primaryBtnStyle}>
                            Go to Pricing
                        </button>
                    </>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    )
}

// ─── Styles ───
const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '2rem'
}

const cardStyle = {
    background: 'white',
    borderRadius: '16px',
    padding: '3rem',
    maxWidth: '520px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
}

const progressBoxStyle = {
    marginTop: '1.5rem',
    background: '#f8f9fa',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const primaryBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5rem',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s'
}

const secondaryBtnStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1.5rem',
    padding: '14px 32px',
    background: 'transparent',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    textDecoration: 'none'
}

export default CheckoutSuccess
