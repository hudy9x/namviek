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

  return (
    <div>
      <Loading enabled={loading} title="Parsing..." />
      <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
        <Page width={800} pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  )
}
