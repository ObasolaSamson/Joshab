'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

export default function BookPage() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: 'joshabpsychiatry' })
      cal('ui', {
        theme: 'light',
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [])

  return (
    <main className="min-h-screen bg-[#f5f0e8] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl text-[#0e1f2e] text-center mb-2">
          Book an Appointment
        </h1>
        <p className="text-center text-[#2a6b6e] text-sm tracking-widest uppercase mb-10">
          Joshab Psychiatric Center
        </p>
        <Cal
          namespace="joshabpsychiatry"
          calLink="joshabpsychiatry"
          style={{ width: '100%', height: '100%', overflow: 'scroll' }}
          config={{ layout: 'month_view' }}
        />
      </div>
    </main>
  )
}
