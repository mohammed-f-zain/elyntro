/** Shared marketing copy for Elyntro as a software company. */

/** Default engagement rhythm used on About / Solutions until those pages are revised. */
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

/** Services process — Understand → Launch & Improve (content guide). */
export const servicesProcessSteps = [
  {
    step: "01",
    title: "Understand",
    body: "We learn about your goals, customers, current processes, and technical requirements.",
  },
  {
    step: "02",
    title: "Plan",
    body: "We define the solution, scope, priorities, timeline, and delivery approach.",
  },
  {
    step: "03",
    title: "Build",
    body: "We design and develop in clear stages, with regular updates and opportunities for feedback.",
  },
  {
    step: "04",
    title: "Launch & Improve",
    body: "We deploy, document, support, and continuously improve the solution when required.",
  },
];

export type ServiceTreatment =
  | "featured"
  | "split"
  | "panel"
  | "compact"
  | "dynamic"
  | "strategic"
  | "stable";

export type ServiceOffering = {
  slug: string;
  title: string;
  description: string;
  points: string[];
  outcome: string;
  icon: string;
  treatment: ServiceTreatment;
  /** Future dedicated page path. */
  href: string;
};

/** Canonical service catalog from the Elyntro Website Content Guide. */
export const serviceOfferings: ServiceOffering[] = [
  {
    slug: "website-development",
    title: "Website Development",
    description:
      "We design and develop fast, responsive websites that communicate your value clearly, strengthen your credibility, and help turn visitors into customers.",
    points: [
      "Corporate and service websites",
      "Responsive UI/UX across all devices",
      "Content management and admin dashboards",
      "SEO, performance, and analytics foundations",
    ],
    outcome: "A professional digital presence designed to grow with your business.",
    icon: "globe",
    treatment: "featured",
    href: "/services/website-development",
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    description:
      "We build intuitive mobile applications for iOS and Android that connect your customers, employees, and operations wherever they are.",
    points: [
      "Cross-platform mobile applications",
      "User experience and interface design",
      "Backend, API, and database integration",
      "Testing, deployment, and release support",
    ],
    outcome: "A reliable mobile experience that makes your services easier to access and use.",
    icon: "mobile",
    treatment: "split",
    href: "/services/mobile-app-development",
  },
  {
    slug: "custom-business-systems",
    title: "Custom Business Systems",
    description:
      "When off-the-shelf software cannot support your workflow, we build a system around the way your business actually operates.",
    points: [
      "CRM and operations management systems",
      "Internal portals and admin dashboards",
      "Approvals, permissions, and automated workflows",
      "Reporting, integrations, and data migration",
    ],
    outcome: "One connected system that reduces manual work and gives your team better control.",
    icon: "systems",
    treatment: "panel",
    href: "/services/custom-business-systems",
  },
  {
    slug: "landing-page-development",
    title: "Landing Page Development",
    description:
      "We create focused landing pages for products, services, campaigns, and new business launches—designed to capture attention and encourage action.",
    points: [
      "Conversion-focused page structure",
      "Responsive design and development",
      "Contact forms, WhatsApp, CRM, and analytics integration",
      "Performance and SEO optimization",
    ],
    outcome: "A focused, high-performing page built to generate leads and support your campaigns.",
    icon: "landing",
    treatment: "compact",
    href: "/services/landing-page-development",
  },
  {
    slug: "ai-workflow-automation",
    title: "AI & Workflow Automation",
    description:
      "We help businesses automate repetitive work, connect disconnected tools, and use AI where it creates real operational value.",
    points: [
      "Business process and automation analysis",
      "AI assistants and intelligent workflows",
      "n8n, API, and system integrations",
      "Document processing, notifications, and data synchronization",
    ],
    outcome: "Faster operations, fewer manual tasks, and more time for meaningful work.",
    icon: "spark",
    treatment: "dynamic",
    href: "/services/ai-workflow-automation",
  },
  {
    slug: "technical-consulting-support",
    title: "Technical Consulting & Support",
    description:
      "We provide practical technical guidance to help you make confident decisions, solve problems, and choose the right technology for your business.",
    points: [
      "Technology and architecture recommendations",
      "Technical audits and troubleshooting",
      "Integration and deployment guidance",
      "Project planning and technical roadmaps",
    ],
    outcome: "Clear technical direction without unnecessary complexity.",
    icon: "consult",
    treatment: "strategic",
    href: "/services/technical-consulting-support",
  },
  {
    slug: "maintenance-continuous-improvement",
    title: "Maintenance & Continuous Improvement",
    description:
      "Launching a solution is only the beginning. We keep your website, application, or business system secure, stable, and ready to evolve.",
    points: [
      "Bug fixes and software updates",
      "Performance and security monitoring",
      "Backups and deployment management",
      "Feature improvements and ongoing support",
    ],
    outcome: "A dependable digital product that continues performing as your business grows.",
    icon: "shield",
    treatment: "stable",
    href: "/services/maintenance-continuous-improvement",
  },
];

/** Lookup helpers for cards that still key by title (home carousel, CMS). */
export const serviceDetails: Record<string, { points: string[]; outcome: string; slug?: string }> =
  Object.fromEntries(
    serviceOfferings.map((s) => [s.title, { points: s.points, outcome: s.outcome, slug: s.slug }]),
  );

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
