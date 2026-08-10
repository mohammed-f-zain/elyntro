/** Shared marketing copy for Elyntro as a software company. */

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    body: "Map goals, users, constraints, and the systems already in motion. Align on outcomes before writing code.",
  },
  {
    step: "02",
    title: "Design",
    body: "Shape architecture, UX, and delivery plan around measurable results—not buzzwords.",
  },
  {
    step: "03",
    title: "Build",
    body: "Ship in weekly increments with demos, quality gates, and clear ownership.",
  },
  {
    step: "04",
    title: "Launch & run",
    body: "Production rollout with observability, documentation, and optional retained support.",
  },
];

export const serviceDetails: Record<
  string,
  { points: string[]; outcome: string }
> = {
  "Software Development": {
    points: [
      "Web apps, APIs, and admin dashboards",
      "Modern TypeScript / Node stacks",
      "CI/CD, testing, and release automation",
      "Performance and accessibility baked in",
    ],
    outcome: "Ship a production-ready product in weeks, not quarters.",
  },
  "AI & Automation": {
    points: [
      "Workflow automation and internal agents",
      "Document, support, and ops copilots",
      "Secure model integration patterns",
      "Human-in-the-loop controls where needed",
    ],
    outcome: "Cut repetitive work and accelerate decisions with practical AI.",
  },
  "Enterprise Solutions": {
    points: [
      "Platform modernization and integrations",
      "Identity, permissions, and audit trails",
      "Data pipelines and reporting layers",
      "Hardening for security and scale",
    ],
    outcome: "Connect complex systems into one reliable operating layer.",
  },
};

export const industries = [
  {
    title: "SaaS & product companies",
    body: "Accelerate roadmaps with senior product engineering and reliable release cadence.",
  },
  {
    title: "Operations & logistics",
    body: "Digitize workflows, dashboards, and automation across distributed teams.",
  },
  {
    title: "Finance & professional services",
    body: "Secure portals, reporting, and compliance-minded integrations.",
  },
  {
    title: "Internal platforms",
    body: "Tools that help employees move faster—CRM, ops, and knowledge systems.",
  },
];

export const solutionOutcomes = [
  { label: "Time to first release", value: "4–6 weeks" },
  { label: "Typical squad size", value: "3–6 people" },
  { label: "Engagement length", value: "8–24 weeks" },
  { label: "Support options", value: "Retainer / SLA" },
];

export const aboutHighlights = [
  { value: "50+", label: "Projects delivered" },
  { value: "98%", label: "Client satisfaction" },
  { value: "12+", label: "Industries served" },
  { value: "24/7", label: "Support coverage" },
];

export const contactReasons = [
  {
    title: "New product build",
    body: "Greenfield web or platform work from discovery through launch.",
  },
  {
    title: "Modernization",
    body: "Rebuild or extend an existing system without stopping the business.",
  },
  {
    title: "AI / automation",
    body: "Identify high-ROI workflows and ship assistants that teams actually use.",
  },
  {
    title: "Ongoing partnership",
    body: "A dedicated squad that owns roadmap slices with you quarter after quarter.",
  },
];

export const techStack = [
  "TypeScript",
  "Docker",
  "Python",
  "Next.js",
  "React",
  "Node.js",
  "Nest",
  "MongoDB",
  "3D JS",
];

/** Scattered constellation nodes for the home Technologies section. */
export type TechNode = {
  id: string;
  name: string;
  logo: string;
  /** Position in the constellation (%). */
  x: number;
  y: number;
  keywords: string[];
};

export const techNodes: TechNode[] = [
  {
    id: "ts",
    name: "TypeScript",
    logo: "/tech/typescript.svg",
    x: 18,
    y: 18,
    keywords: ["typescript", "ts", "typed"],
  },
  {
    id: "docker",
    name: "Docker",
    logo: "/tech/docker.svg",
    x: 50,
    y: 14,
    keywords: ["docker", "containers"],
  },
  {
    id: "python",
    name: "Python",
    logo: "/tech/python.svg",
    x: 20,
    y: 52,
    keywords: ["python", "ai", "ml"],
  },
  {
    id: "next",
    name: "Next.js",
    logo: "/tech/nextjs.svg",
    x: 82,
    y: 18,
    keywords: ["next", "nextjs", "next.js"],
  },
  {
    id: "react",
    name: "React",
    logo: "/tech/react.svg",
    x: 84,
    y: 52,
    keywords: ["react", "ui", "frontend"],
  },
  {
    id: "node",
    name: "Node.js",
    logo: "/tech/nodejs.svg",
    x: 18,
    y: 80,
    keywords: ["node", "nodejs", "node.js", "backend"],
  },
  {
    id: "nest",
    name: "Nest",
    logo: "/tech/nestjs.svg",
    x: 68,
    y: 82,
    keywords: ["nest", "nestjs", "nest.js"],
  },
  {
    id: "mongo",
    name: "MongoDB",
    logo: "/tech/mongodb.svg",
    x: 42,
    y: 86,
    keywords: ["mongo", "mongodb", "database", "nosql"],
  },
  {
    id: "three",
    name: "3D JS",
    logo: "/tech/threejs.svg",
    x: 82,
    y: 36,
    keywords: ["3d", "3djs", "three", "threejs", "three.js", "webgl"],
  },
];
