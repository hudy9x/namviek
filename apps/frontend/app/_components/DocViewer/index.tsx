'use client'

import { Loading } from '@ui-components'
import { useState, useEffect } from 'react'
import { renderAsync } from 'docx-preview'

export default function DocViewer({ src, className }: { src: string, className?: string }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDoc = async () => {
      try {
        // Fetch the document
        const response = await fetch(src)
        const blob = await response.blob()

        // Create container for the document
        const container = document.getElementById('doc-container')
        if (!container) return

        // Render the document
        await renderAsync(blob, container, container)

        setLoading(false)
      } catch (error) {
        console.error('Error loading document:', error)
        setLoading(false)
      }
    }

    loadDoc()
  }, [src])

  return (
    <div className={`${className}`}>
      <Loading enabled={loading} title="Loading document..." />
      <div
        id="doc-container"
        style={{
          height: 'calc(100vh - 100px)'
        }}
      />
    </div>
  )
}
