import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query) {
      return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
    }

    const lowerQuery = query.toLowerCase();
    let answer = "";
    let sources: string[] = [];

    if (lowerQuery.includes("service") || lowerQuery.includes("what do you do") || lowerQuery.includes("capability") || lowerQuery.includes("what you offer")) {
      answer = "Avora Ventures provides specialized enterprise infrastructure and talent under four pillars:\n\n" +
               "1. Specialized Outsourcing: Vetted remote senior software engineers and architects.\n" +
               "2. Specialized Skill Hiring: On-demand fractional ML leads, security experts, and data architects.\n" +
               "3. AI Solutions & Automation: Custom end-to-end ML integration (RAG pipelines, custom LLMs).\n" +
               "4. Data Annotation & Labeling: High-fidelity data processing, named entity recognition, and semantic segmentation.";
      sources = ["Avora_Capabilities_2026.pdf"];
    } else if (lowerQuery.includes("outsourcing") || lowerQuery.includes("remote") || lowerQuery.includes("engineer") || lowerQuery.includes("hire developer")) {
      answer = "Our Specialized Outsourcing program gives you direct access to 500+ pre-vetted senior remote software developers and system architects. We handle all recruitment, validation, management, and compliance so you can scale your engineering velocity without overhead.";
      sources = ["Avora_Capabilities_2026.pdf"];
    } else if (lowerQuery.includes("ai") || lowerQuery.includes("ml") || lowerQuery.includes("model") || lowerQuery.includes("machine learning") || lowerQuery.includes("automation")) {
      answer = "We design, deploy, and scale custom machine learning solutions. From retrieval-augmented generation (RAG) pipelines to bespoke predictive models, our teams build the enterprise infrastructure that drives automated efficiency.";
      sources = ["ML_Pipeline_Specs.docx"];
    } else if (lowerQuery.includes("data") || lowerQuery.includes("annotation") || lowerQuery.includes("labeling") || lowerQuery.includes("dataset")) {
      answer = "Avora processes high-fidelity labeling workloads at scale. We have labeled over 10M+ data points across specialized domains, including medical text recognition, automated checkout systems, and custom image/video segmentation pipelines.";
      sources = ["Data_Annotation_Standards.pdf"];
    } else if (lowerQuery.includes("founder") || lowerQuery.includes("abhay") || lowerQuery.includes("ceo") || lowerQuery.includes("who is")) {
      answer = "Avora Ventures was founded by Abhay Jain, a Stanford (MBA + MS Environment & Resources) and IIT Kanpur alumnus. His professional history includes key engineering and strategic leadership roles at McKinsey & Co., Mitsubishi Heavy Industries, NextEra Energy, and AutoGrid.";
      sources = ["Avora_Capabilities_2026.pdf"];
    } else if (lowerQuery.includes("contact") || lowerQuery.includes("hire") || lowerQuery.includes("call") || lowerQuery.includes("schedule") || lowerQuery.includes("talk") || lowerQuery.includes("email")) {
      answer = "To start a conversation or schedule a strategic call, please fill out the contact form at the bottom of the page, or email us directly at partnerships@avora.io. Our team will get back to you within 24 hours.";
      sources = ["Avora_Capabilities_2026.pdf"];
    } else if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("budget") || lowerQuery.includes("rate") || lowerQuery.includes("fee")) {
      answer = "Our pricing is structured based on the specific operational pillar:\n\n" +
               "- Outsourcing & Skill Hiring: Fixed monthly or fractional hourly rates based on seniority.\n" +
               "- AI Projects & Data Annotations: Milestone-based pricing after the discovery phase.\n\n" +
               "Please submit an inquiry via our contact form with your budget range so our technical leads can provide a detailed proposal.";
      sources = ["Avora_Commercial_Terms_2026.pdf"];
    } else if (lowerQuery.includes("portfolio") || lowerQuery.includes("project") || lowerQuery.includes("case study") || lowerQuery.includes("nexus") || lowerQuery.includes("work")) {
      answer = "Avora Ventures co-develops next-generation infrastructure. Some of our key projects include:\n\n" +
               "- NexusAI: Generative support routing handling 140k queries/hr.\n" +
               "- HealthSync: Secure HIPAA-compliant medical data warehouse scaling to 85k records/sec.\n" +
               "- NexusBuild: Decentralized CI/CD pipeline executing 12k daily builds.\n\n" +
               "Details can be found in the 'Avora Ventures Studio' section of our homepage.";
      sources = ["Avora_Ventures_Studio_Specs.pdf"];
    } else if (lowerQuery.includes("avora") || lowerQuery.includes("who are you") || lowerQuery.includes("what is avora") || lowerQuery.includes("company")) {
      answer = "Avora Ventures is an institutional Venture Studio & Infrastructure provider. We deliver elite remote engineering talent, custom AI/automation systems, and high-fidelity data operations under one integrated roof.\n\nCould you please clarify if you are interested in software outsourcing, custom AI development, or data annotation services?";
      sources = ["Avora_Capabilities_2026.pdf"];
    } else {
      answer = "Avora Ventures is an institutional Venture Studio & Infrastructure provider. We deliver elite remote engineering talent, custom AI/automation systems, and high-fidelity data operations under one integrated roof.\n\nCould you please clarify if you are interested in software outsourcing, custom AI development, or data annotation services?";
      sources = ["Avora_Capabilities_2026.pdf"];
    }

    return NextResponse.json({ answer, sources });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
