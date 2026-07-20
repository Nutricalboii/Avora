import { NextResponse } from 'next/server';

export async function GET() {
  const status = {
    is_ready: true,
    last_built: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    llm_engine: true,
    embedding_engine: true,
    total_chunks: 1240,
    next_run_time: new Date(Date.now() + 18000000).toISOString(), // in 5 hours
  };
  return NextResponse.json(status);
}
