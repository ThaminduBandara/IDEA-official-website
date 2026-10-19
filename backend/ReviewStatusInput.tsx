import React from 'react'
import { set, StringInputProps } from 'sanity'

export function ReviewStatusInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props

  const options = [
    {
      value: 'inProgress',
      label: 'In Progress (Drafting)',
      subtitle: 'Employee is writing / editing',
      badge: '🟡',
      bg: '#fefce8',
      activeBg: '#fef08a',
      border: '#fde047',
      activeBorder: '#ca8a04',
      text: '#854d0e',
    },
    {
      value: 'readyForReview',
      label: 'Ready for Review',
      subtitle: 'Awaiting Client Approval',
      badge: '🟠',
      bg: '#fff7ed',
      activeBg: '#fed7aa',
      border: '#fdba74',
      activeBorder: '#ea580c',
      text: '#9a3412',
    },
    {
      value: 'approved',
      label: 'Approved',
      subtitle: 'Ready to Publish on website',
      badge: '🟢',
      bg: '#f0fdf4',
      activeBg: '#bbf7d0',
      border: '#86efac',
      activeBorder: '#16a34a',
      text: '#166534',
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '12px', marginTop: '8px' }}>
      {options.map((opt) => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            disabled={readOnly}
            onClick={() => onChange(set(opt.value))}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '14px 18px',
              borderRadius: '14px',
              border: `2.5px solid ${isSelected ? opt.activeBorder : opt.border}`,
              backgroundColor: isSelected ? opt.activeBg : opt.bg,
              cursor: readOnly ? 'not-allowed' : 'pointer',
              transition: 'all 0.18s ease-in-out',
              boxShadow: isSelected ? '0 6px 16px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.03)',
              transform: isSelected ? 'scale(1.02)' : 'scale(1)',
              textAlign: 'left',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', marginBottom: '4px' }}>
              <span style={{ fontSize: '20px', lineHeight: 1 }}>{opt.badge}</span>
              <strong style={{ fontSize: '15px', fontWeight: 800, color: opt.text, letterSpacing: '-0.01em' }}>
                {opt.label}
              </strong>
              {isSelected && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '11px',
                    fontWeight: 800,
                    backgroundColor: opt.activeBorder,
                    color: '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '20px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Active
                </span>
              )}
            </div>
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#475569', marginLeft: '30px', lineHeight: 1.35 }}>
              {opt.subtitle}
            </span>
          </button>
        )
      })}
    </div>
  )
}
