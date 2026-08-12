import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@elyntro.com";
  const password = process.env.ADMIN_PASSWORD ?? "elyntro-admin-change-me";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash },
  });

  await prisma.siteSetting.upsert({
    where: { key: "site" },
    update: {},
    create: {
      key: "site",
      value: {
        name: "Elyntro",
        tagline: "Think forward. Build smarter.",
        email: "hello@elyntro.com",
        phone: "+1 (555) 010-2030",
        address: "Global · Remote-first",
        ctaPrimary: "Start a Project",
        ctaSecondary: "Explore Solutions",
        social: {
          linkedin: "https://linkedin.com",
          twitter: "https://x.com",
          github: "https://github.com",
        },
      },
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "home" },
    update: {},
    create: {
      slug: "home",
      sections: {
        hero: {
          eyebrow: "ELYNTRO",
          titleLead: "THINK FORWARD.",
          titleAccent: "BUILD SMARTER.",
          subtitle:
            "Intelligent technology built around your business. We design scalable software, connected systems, and AI-powered automation that turn complex challenges into measurable growth.",
        },
        stats: [
          { label: "Projects Delivered", value: "50+" },
          { label: "Client Satisfaction", value: "98%" },
          { label: "Security", value: "Enterprise" },
          { label: "Support", value: "24/7" },
        ],
        servicesIntro: {
          title: "From vision to execution.",
          subtitle: "Capabilities that move products from idea to production with clarity and speed.",
        },
        cta: {
          title: "Ready to build what’s next?",
          subtitle: "Tell us about your product, systems, or automation goals.",
          button: "Let’s Talk",
        },
      },
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "about" },
    update: {
      sections: {
        hero: {
          title: "A software partner built for compounding results.",
          subtitle:
            "Elyntro is a product engineering company. We design and ship software, platforms, and AI systems that stay sharp as your business scales.",
        },
        mission: {
          title: "Our mission",
          body: "Help organizations think forward—shipping intelligent products that are secure, measurable, and built for the long run.",
        },
        approach: {
          title: "How we work",
          items: [
            {
              title: "Discover",
              body: "Workshops with stakeholders to define success metrics, constraints, and system reality.",
            },
            {
              title: "Design",
              body: "Architecture and experience plans that balance speed, security, and maintainability.",
            },
            {
              title: "Deliver",
              body: "Weekly shipping, transparent demos, and production-ready handoff with documentation.",
            },
          ],
        },
        values: {
          title: "What we value",
          items: [
            { title: "Clarity", body: "We speak in outcomes and trade-offs—so decisions stay fast and shared." },
            { title: "Craft", body: "Interfaces and systems should feel intentional, durable, and easy to operate." },
            { title: "Momentum", body: "Progress every week: visible demos, measured quality, and continuous learning." },
          ],
        },
      },
    },
    create: {
      slug: "about",
      sections: {
        hero: {
          title: "A software partner built for compounding results.",
          subtitle:
            "Elyntro is a product engineering company. We design and ship software, platforms, and AI systems that stay sharp as your business scales.",
        },
        mission: {
          title: "Our mission",
          body: "Help organizations think forward—shipping intelligent products that are secure, measurable, and built for the long run.",
        },
        approach: {
          title: "How we work",
          items: [
            {
              title: "Discover",
              body: "Workshops with stakeholders to define success metrics, constraints, and system reality.",
            },
            {
              title: "Design",
              body: "Architecture and experience plans that balance speed, security, and maintainability.",
            },
            {
              title: "Deliver",
              body: "Weekly shipping, transparent demos, and production-ready handoff with documentation.",
            },
          ],
        },
        values: {
          title: "What we value",
          items: [
            { title: "Clarity", body: "We speak in outcomes and trade-offs—so decisions stay fast and shared." },
            { title: "Craft", body: "Interfaces and systems should feel intentional, durable, and easy to operate." },
            { title: "Momentum", body: "Progress every week: visible demos, measured quality, and continuous learning." },
          ],
        },
      },
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "services" },
    update: {
      sections: {
        hero: {
          title: "Technology services built around your business.",
          subtitle:
            "From high-performing websites and mobile applications to custom business systems, AI automation, and ongoing technical support, Elyntro turns ideas and operational challenges into reliable digital solutions.",
        },
        cta: {
          title: "Have an idea—or a process that needs improving?",
          subtitle:
            "Tell us what you want to build, fix, or automate. We will help you identify the right approach and define a practical next step.",
          button: "Start Your Project",
        },
      },
    },
    create: {
      slug: "services",
      sections: {
        hero: {
          title: "Technology services built around your business.",
          subtitle:
            "From high-performing websites and mobile applications to custom business systems, AI automation, and ongoing technical support, Elyntro turns ideas and operational challenges into reliable digital solutions.",
        },
        cta: {
          title: "Have an idea—or a process that needs improving?",
          subtitle:
            "Tell us what you want to build, fix, or automate. We will help you identify the right approach and define a practical next step.",
          button: "Start Your Project",
        },
      },
    },
  });

  await prisma.pageContent.upsert({
    where: { slug: "contact" },
    update: {
      sections: {
        hero: {
          title: "Tell us what you want to build.",
          subtitle:
            "Share your product, platform, or automation goals. Messages go straight to the Elyntro team inbox—we typically reply within one business day.",
        },
      },
    },
    create: {
      slug: "contact",
      sections: {
        hero: {
          title: "Tell us what you want to build.",
          subtitle:
            "Share your product, platform, or automation goals. Messages go straight to the Elyntro team inbox—we typically reply within one business day.",
        },
      },
    },
  });

  const coreServices = [
    {
      title: "Website Development",
      description:
        "We design and develop fast, responsive websites that communicate your value clearly, strengthen your credibility, and help turn visitors into customers.",
      icon: "globe",
      sortOrder: 1,
    },
    {
      title: "Mobile App Development",
      description:
        "We build intuitive mobile applications for iOS and Android that connect your customers, employees, and operations wherever they are.",
      icon: "mobile",
      sortOrder: 2,
    },
    {
      title: "Custom Business Systems",
      description:
        "When off-the-shelf software cannot support your workflow, we build a system around the way your business actually operates.",
      icon: "systems",
      sortOrder: 3,
    },
    {
      title: "Landing Page Development",
      description:
        "We create focused landing pages for products, services, campaigns, and new business launches—designed to capture attention and encourage action.",
      icon: "landing",
      sortOrder: 4,
    },
    {
      title: "AI & Workflow Automation",
      description:
        "We help businesses automate repetitive work, connect disconnected tools, and use AI where it creates real operational value.",
      icon: "spark",
      sortOrder: 5,
    },
    {
      title: "Technical Consulting & Support",
      description:
        "We provide practical technical guidance to help you make confident decisions, solve problems, and choose the right technology for your business.",
      icon: "consult",
      sortOrder: 6,
    },
    {
      title: "Maintenance & Continuous Improvement",
      description:
        "Launching a solution is only the beginning. We keep your website, application, or business system secure, stable, and ready to evolve.",
      icon: "shield",
      sortOrder: 7,
    },
  ];

  for (const service of coreServices) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: {
          description: service.description,
          icon: service.icon,
          sortOrder: service.sortOrder,
          published: true,
        },
      });
    } else {
      await prisma.service.create({ data: { ...service, published: true } });
    }
  }

  await prisma.service.deleteMany({
    where: { title: { notIn: coreServices.map((s) => s.title) } },
  });

  const testimonials = [
    {
      name: "Amelia Chen",
      position: "VP Product, Northline",
      content:
        "Elyntro rebuilt our customer platform in months, not quarters. The squad stayed sharp on outcomes and the handoff was production-ready.",
      image: "/testimonials/avatar-a.svg",
      sortOrder: 1,
    },
    {
      name: "Jordan Reyes",
      position: "CTO, Fieldspan",
      content:
        "They turned a messy stack of tools into one coherent system. Latency dropped, ops calmed down, and our team finally trusts the data.",
      image: "/testimonials/avatar-b.svg",
      sortOrder: 2,
    },
    {
      name: "Sara Kline",
      position: "Head of Operations, Meridian",
      content:
        "The automation work removed hours of manual triage every week. Clear roadmap, weekly demos, zero drama.",
      image: "/testimonials/avatar-c.svg",
      sortOrder: 3,
    },
    {
      name: "Noah Lee",
      position: "Founder, OrbitPay",
      content:
        "We needed a partner who could ship AI features without reinventing the product. Elyntro delivered with discipline and taste.",
      image: "/testimonials/avatar-d.svg",
      sortOrder: 4,
    },
    {
      name: "Maya Cole",
      position: "Director of Engineering, Helix",
      content:
        "Security and scale were non-negotiable. Their enterprise work held up under audit and under load.",
      image: "/testimonials/avatar-e.svg",
      sortOrder: 5,
    },
    {
      name: "Theo Park",
      position: "Product Lead, Cascade",
      content:
        "From discovery to launch, the collaboration felt like an extension of our own team—fast, thoughtful, and relentlessly practical.",
      image: "/testimonials/avatar-f.svg",
      sortOrder: 6,
    },
  ];

  for (const item of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { name: item.name } });
    if (existing) {
      await prisma.testimonial.update({
        where: { id: existing.id },
        data: { ...item, published: true },
      });
    } else {
      await prisma.testimonial.create({ data: { ...item, published: true } });
    }
  }

  await prisma.pageContent.upsert({
    where: { slug: "solutions" },
    update: {
      sections: {
        hero: {
          title: "Solutions mapped to real business problems.",
          subtitle:
            "We assemble platforms, automation, and integrations around the outcomes that matter to your team.",
        },
        items: [
          {
            title: "Customer platforms",
            body: "Portals, SaaS products, and self-serve experiences with auth, billing hooks, and analytics.",
            icon: "network",
          },
          {
            title: "Operations automation",
            body: "Replace spreadsheet and ticket loops with workflows, alerts, and AI-assisted triage.",
            icon: "spark",
          },
          {
            title: "Data & integrations",
            body: "Connect CRMs, ERPs, and internal tools into a reliable source of truth.",
            icon: "cube",
          },
        ],
      },
    },
    create: {
      slug: "solutions",
      sections: {
        hero: {
          title: "Solutions mapped to real business problems.",
          subtitle:
            "We assemble platforms, automation, and integrations around the outcomes that matter to your team.",
        },
        items: [
          {
            title: "Customer platforms",
            body: "Portals, SaaS products, and self-serve experiences with auth, billing hooks, and analytics.",
            icon: "network",
          },
          {
            title: "Operations automation",
            body: "Replace spreadsheet and ticket loops with workflows, alerts, and AI-assisted triage.",
            icon: "spark",
          },
          {
            title: "Data & integrations",
            body: "Connect CRMs, ERPs, and internal tools into a reliable source of truth.",
            icon: "cube",
          },
        ],
      },
    },
  });

  const seoRoutes = [
    {
      path: "/",
      title: "Elyntro — Think Forward. Build Smarter.",
      description:
        "Intelligent technology built around your business. Scalable software, connected systems, and AI-powered automation.",
      keywords: "Elyntro, software, AI, automation, enterprise",
    },
    {
      path: "/about",
      title: "About Elyntro",
      description: "Learn how Elyntro designs technology that compounds—mission, approach, and values.",
      keywords: "about Elyntro, mission, technology partner",
    },
    {
      path: "/services",
      title: "Services — Elyntro",
      description:
        "Website, mobile, custom business systems, landing pages, AI automation, consulting, and maintenance services from Elyntro.",
      keywords: "Elyntro services, website development, mobile apps, AI automation, business systems",
    },
    {
      path: "/solutions",
      title: "Solutions — Elyntro",
      description: "Connected platforms, intelligent automation, and enterprise systems.",
      keywords: "solutions, platforms, automation, enterprise",
    },
    {
      path: "/contact",
      title: "Contact Elyntro",
      description: "Start a project with Elyntro. Messages go straight to our team inbox.",
      keywords: "contact Elyntro, start a project",
    },
  ];

  for (const route of seoRoutes) {
    await prisma.seoMeta.upsert({
      where: { path: route.path },
      update: {
        title: route.title,
        description: route.description,
        keywords: route.keywords,
      },
      create: {
        ...route,
        ogImage: "/brand/Logo.jpeg",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
