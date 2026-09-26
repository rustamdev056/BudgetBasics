import React, { useState } from 'react';
import testDataRaw from '../data/testData.json';

export default function TestDataViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const testCases = testDataRaw.testData || [];

  return (
    <aside aria-label="Test data verification" style={{ position: 'fixed', bottom: '80px', right: '24px', zIndex: 850 }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'var(--orange)',
          color: 'var(--white)',
          border: 'none',
          borderRadius: '30px',
          padding: '10px 18px',
          fontSize: '13px',
          fontWeight: 700,
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        title="View test-data.json test cases"
      >
        <span>📋</span>
        <span>Test Data ({testCases.length} Cases)</span>
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="testDataViewerTitle"
          style={{
            position: 'fixed',
            bottom: '135px',
            right: '24px',
            width: 'min(480px, 90vw)',
            maxHeight: '520px',
            background: 'var(--white)',
            borderRadius: '16px',
            boxShadow: '0 12px 35px rgba(0,0,0,0.2)',
            border: '1px solid var(--border)',
            padding: '20px',
            zIndex: 999,
            overflowY: 'auto'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
            <div>
              <h3 id="testDataViewerTitle" style={{ color: 'var(--green-dark)', margin: 0, fontSize: '17px' }}>
                test-data.json Test Suite
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: '12px', color: 'var(--muted)' }}>
                {testDataRaw.project} · {testCases.length} Test Cases Verified
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close test data viewer"
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '20px',
                cursor: 'pointer',
                color: 'var(--muted)',
                lineHeight: 1
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {testCases.map((tc) => (
              <div
                key={tc.testId}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px',
                  background: 'var(--cream)',
                  fontSize: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ color: 'var(--green)' }}>{tc.testId}: {tc.feature}</strong>
                  <span
                    style={{
                      background: '#e8f3ef',
                      color: 'green',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontWeight: 700,
                      fontSize: '11px'
                    }}
                  >
                    ✓ {tc.status}
                  </span>
                </div>
                <div style={{ color: 'var(--muted)', marginBottom: '4px' }}>
                  <strong>Input:</strong> {JSON.stringify(tc.input)}
                </div>
                <div style={{ color: 'var(--text)' }}>
                  <strong>Expected:</strong> {typeof tc.expectedResult === 'object' ? JSON.stringify(tc.expectedResult) : tc.expectedResult}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
