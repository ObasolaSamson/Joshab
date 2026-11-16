'use client'

import Script from 'next/script'

export default function BookPage() {
  return (
    <main className="min-h-screen bg-[#f5f0e8] py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="font-display text-4xl text-[#0e1f2e] text-center mb-2">
          Book an Appointment
        </h1>
        <p className="text-center text-[#2a6b6e] text-sm tracking-widest uppercase mb-10">
          Joshab Psychiatric Center
        </p>
        <p className="text-[#0e1f2e] mb-8 text-base leading-relaxed">
          Click below to request an appointment with Abiodun Agbabiaka, PMHNP-BC.
          You will be guided through a secure, HIPAA-compliant booking process.
        </p>

        {/* SimplePractice Widget */}
        <style>{`
          .spwidget-button-wrapper { text-align: center }
          .spwidget-button {
            display: inline-block;
            padding: 14px 32px;
            color: #fff;
            background: #0e1f2e;
            border: 2px solid #b8974a;
            border-radius: 4px;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            letter-spacing: 0.08em;
            text-transform: uppercase;
          }
          .spwidget-button:hover {
            background: #2a6b6e;
            color: #fff;
          }
        `}</style>

        <div
          className="spwidget-button-wrapper"
          dangerouslySetInnerHTML={{
            __html: `<a href="https://abiodun-agbabiaka.clientsecure.me" class="spwidget-button" data-spwidget-scope-id="a7f1f118-fb99-4622-8cb0-cf87ff1c969a" data-spwidget-scope-uri="abiodun-agbabiaka" data-spwidget-application-id="7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b" data-spwidget-type="OAR" data-spwidget-scope-global data-spwidget-autobind>Request Appointment</a>`
          }}
        />

        <Script
          src="https://widget-cdn.simplepractice.com/assets/integration-1.0.js"
          strategy="afterInteractive"
        />
      </div>
    </main>
  )
}
