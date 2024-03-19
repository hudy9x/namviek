'use client'

import { useState } from 'react'
import { Document, Page } from 'react-pdf'
// import 'react-pdf/dist/Page/AnnotationLayer.css'

export default function PdfViewer() {
  const [numPages, setNumPages] = useState<number>()
  const [pageNumber, setPageNumber] = useState<number>(1)

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  return (
    <div>
      <Document
        file="https://ecomgrows-storage.s3.ap-southeast-1.amazonaws.com/65d6ee7893180a33c22085de/65e979bf34df285397fd0bee/Nguyen_Viet_Phuong_CV_Fullstack_Developer-7e7a72d8-c45a-4758-a6e2-5099839382a8.pdf"
        onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>{/* Page {pageNumber} of {numPages} */}</p>
    </div>
  )
}
