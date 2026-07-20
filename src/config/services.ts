export interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  metrics: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "data-generation",
    title: "Data Generation",
    subtitle: "Synthetic datasets for scarce or sensitive training data",
    description:
      "We engineer synthetic datasets when real data is scarce, sensitive, or too expensive to collect. Generation is grounded in domain rules and validated against the downstream task the model must actually perform.",
    features: [
      "Rule-based and generative models (GAN, diffusion)",
      "Differential privacy budgets enforced per release",
      "Distribution validation against real samples",
      "Downstream task performance sign-off",
    ],
    metrics: "Up to 10x training set expansion",
    icon: "Database",
  },
  {
    id: "data-annotation",
    title: "Data Annotation",
    subtitle: "Ontologies, guidelines, and consensus design",
    description:
      "Before any label is applied, we define what the model must learn. We build the ontology, write the annotation guidelines with edge-case examples, and design the consensus workflow that governs labeling.",
    features: [
      "Domain-specific ontology and schema design",
      "Exhaustive annotation guidelines with examples",
      "Inter-annotator agreement targets set up front",
      "Gold-standard benchmark samples",
    ],
    metrics: "Inter-annotator Kappa target ≥ 0.85",
    icon: "Tag",
  },
  {
    id: "labeling",
    title: "Labeling",
    subtitle: "Consensus-verified annotation at scale",
    description:
      "We execute annotation at scale using modality-specific tooling, model-assisted pre-labeling, and multi-pass review. Every batch passes a consensus gate before it is released for training.",
    features: [
      "Model-assisted pre-labeling to reduce manual load",
      "Modality-optimized tooling (CVAT, Prodigy)",
      "Double-blind adjudication on disagreements",
      "Per-batch consensus sign-off",
    ],
    metrics: "Up to 60% reduction in manual effort",
    icon: "Tags",
  },
  {
    id: "auditing",
    title: "Auditing",
    subtitle: "Quality verification before training",
    description:
      "We measure dataset quality across eight dimensions before any model is trained on it. Auditing catches label drift, missing edge cases, and consistency gaps that would otherwise surface as model failures in production.",
    features: [
      "Eight-dimension quality scoring",
      "Statistical drift and distribution checks",
      "Discrepancy review panels",
      "Downstream validation against gold samples",
    ],
    metrics: "Entity-level F1 target ≥ 0.94",
    icon: "ShieldCheck",
  },
  {
    id: "ai-implementation",
    title: "AI Implementation",
    subtitle: "Production ML systems, end to end",
    description:
      "We design, build, and deploy production machine learning systems. Work spans problem framing, model development, integration, deployment, and monitoring. We deliver working systems, not just notebooks.",
    features: [
      "Problem framing tied to measurable KPIs",
      "SHAP-based explainability for stakeholders",
      "Drift monitoring and retraining built in",
      "Three-phase A.I.M. delivery framework",
    ],
    metrics: "Typical first deployment: 2–6 weeks",
    icon: "BrainCircuit",
  },
];
