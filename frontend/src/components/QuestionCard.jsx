import React from 'react'

export default function QuestionCard({ q, onAnswer, value }) {
  // onOptionChange will call onAnswer(qid, key, {auto: true}) to auto-advance
  function onOptionChange(key) {
    if (onAnswer) onAnswer(q.id, key, { auto: true })
  }

  return (
    <fieldset className="question" style={{ borderRadius: 10 }}>
      <legend>{q.id}. {q.question}</legend>
      <div className="options" role="radiogroup" aria-labelledby={`q-${q.id}`}>
        {q.options.map(opt => (
          <label
            key={opt.key}
            className={value === opt.key ? 'opt selected' : 'opt'}
            style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 8, borderRadius: 8, cursor: 'pointer' }}
          >
            <input
              type="radio"
              name={`q${q.id}`}
              value={opt.key}
              checked={value === opt.key}
              onChange={() => onOptionChange(opt.key)}
              style={{ width: 18, height: 18 }}
            />
            <span>{opt.text}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
