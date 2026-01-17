"use client"

interface PDFViewerProps {
  file: string
}

export default function PDFViewer({ file }: PDFViewerProps) {
  return (
    <div className="w-full">
      <iframe
        src={`${file}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
        className="w-full rounded-lg border border-gray-700"
        style={{ height: "calc(100vh - 150px)" }}
        title="Resume PDF"
      />
    </div>
  )
}
