import React, { useEffect, useState } from 'react'
import StartPage from './components/StartPage'
import QuestionCard from './components/QuestionCard'
import ResultCard from './components/ResultCard'

// Use Vite env variable if present, otherwise local dev backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'

export default function App() {
  const [quiz, setQuiz] = useState([])
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0) // which question (0-based)
  const [started, setStarted] = useState(false) // start screen

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/quiz`)
        const json = await res.json()
        setQuiz(json.quiz)
      } catch (e) {
        console.error('Failed to load quiz', e)
      }
    }
    load()
  }, [])

  function startQuiz() {
    setStarted(true)
    setIndex(0)
    setAnswers({})
    setResult(null)
  }

  function handleAnswer(qid, key, { auto = false } = {}) {
    setAnswers(prev => ({ ...prev, ['q' + qid]: key }))
    if (auto) {
      // small delay so selection is visible before moving
      setTimeout(() => setIndex(prev => Math.min(prev + 1, quiz.length - 1)), 120)
    }
  }

  function goPrev() {
    setIndex(prev => Math.max(prev - 1, 0))
  }

  function goNext() {
    setIndex(prev => Math.min(prev + 1, quiz.length - 1))
  }

  async function handleSubmit(e) {
    e?.preventDefault?.()
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(answers)
      })
      const json = await res.json()
      setResult(json)
      // scroll to top so confetti/result shows
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err) {
      console.error('submit failed', err)
    } finally {
      setLoading(false)
    }
  }

  // If the start screen hasn't been acknowledged, show it
  if (!started) {
    return <StartPage onStart={startQuiz} />
  }

  // If result present, show it
  if (result) {
    return (
      <div className="container" style={{ padding: 20 }}>
        <ResultCard
          result={result}
          onReset={() => { setResult(null); setAnswers({}); setIndex(0); setStarted(false) }}
        />
      </div>
    )
  }

  // Quiz not yet loaded
  if (!quiz || quiz.length === 0) {
    return (
      <div className="container" style={{ padding: 20 }}>
        <header>
          <h1>Which Coffee Person Are You?</h1>
          <p className="lead">Loading questions…</p>
        </header>
      </div>
    )
  }

  const current = quiz[index]
  const answeredCount = Object.keys(answers).length
  const isLast = index === quiz.length - 1
  const currentValue = answers['q' + current.id] || ''

  return (
    <div className="container" style={{ padding: 20 }}>
      <header>
        <h1>Which Coffee Person Are You?</h1>
        <p className="lead">Answer a few quick questions and find your coffee match ☕</p>
      </header>

      <div style={{ marginTop: 12, marginBottom: 8 }}>
        <small>Question {index + 1} of {quiz.length} — answered {answeredCount}/{quiz.length}</small>
        <div style={{ height: 8, background: '#eee', borderRadius: 8, marginTop: 6 }}>
          <div style={{
            height: '100%',
            width: `${Math.round(((index + (currentValue ? 1 : 0)) / quiz.length) * 100)}%`,
            background: '#6b4f2b',
            borderRadius: 8,
            transition: 'width .25s'
          }} />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <QuestionCard
          q={current}
          onAnswer={(qid, key, opts) => handleAnswer(qid, key, opts)}
          value={currentValue}
        />

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <button
            type="button"
            className="btn"
            onClick={goPrev}
            disabled={index === 0}
            aria-disabled={index === 0}
          >
            ← Previous
          </button>

          {!isLast ? (
            <button
              type="button"
              className="btn"
              onClick={goNext}
              disabled={index === quiz.length - 1}
              aria-disabled={index === quiz.length - 1}
              style={{ marginLeft: 'auto' }}
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              className="btn"
              disabled={loading || Object.keys(answers).length < quiz.length}
              style={{ marginLeft: 'auto' }}
            >
              {loading ? 'Finding your coffee...' : 'Submit'}
            </button>
          )}
        </div>
      </form>

      <footer style={{ marginTop: 22, color: '#666' }}>
        Tip: choosing an option automatically advances to the next question. Use Previous to go back and change answers.
      </footer>
    </div>
  )
}
