import { NextResponse } from 'next/server';

export async function GET() {
  const documents = [
    { name: "Avora_Capabilities_2026.pdf", size: "2.4 MB" },
    { name: "ML_Pipeline_Specs.docx", size: "1.8 MB" },
    { name: "Data_Annotation_Standards.pdf", size: "950 KB" },
    { name: "Security_Hardening_Audit.pdf", size: "4.1 MB" },
  ];
  return NextResponse.json(documents);
}
