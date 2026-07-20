import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    // Connect to the deployed Hugging Face Backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL 
      || "https://namitkumar22-avora-chatbot-backend.hf.space/api/chat";
      
    // Ensure we hit the /api/chat endpoint
    const chatEndpoint = backendUrl.endsWith('/chat') ? backendUrl : 
                         backendUrl.endsWith('/api') ? `${backendUrl}/chat` : 
                         `${backendUrl}/api/chat`;

    const res = await fetch(chatEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      throw new Error(`Cognitive Engine returned status ${res.status}`);
    }

    const data = await res.json();
    
    return NextResponse.json({ 
      answer: data.answer || "No response generated.",
      sources: data.sources || []
    });

  } catch (error) {
    console.error("Chatbot API Proxy Error:", error);
    return NextResponse.json({ 
      error: "Connection timeout. Failed to reach the intelligence node." 
    }, { status: 500 });
  }
}
