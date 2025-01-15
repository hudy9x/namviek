'use client'

import { Loading } from '@shared/ui'
import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

export default function PdfViewer({ src }: { src: string }) {
  const [loading, setLoading] = useState(true)
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setLoading(false)
  }

  const pages = new Array(numPages).fill(1).map((v, i) => i + 1)

  return (
    <div>
      <Loading enabled={loading} title="Parsing..." />
      <Document
        file={src}
        className="space-y-2"
        onLoadSuccess={onDocumentLoadSuccess}>
        {pages.map(p => {
          return <Page key={p} width={800} pageNumber={p} />
        })}
      </Document>
      <p className="text-white">
        Total: {numPages} pages
        {/* Page {pageNumber} of {numPages} */}
      </p>
    </div>
  )
}
