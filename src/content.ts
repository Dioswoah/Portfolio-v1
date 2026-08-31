// All real, confirmed content. Edit here to update the site.

export const profile = {
  name: "Marc Joshua Ramos",
  brand: "Marc: Prompt",
  portrait: "/portrait.png",
  title: "AI Engineer & IT Lead",
  location: "Mandaluyong, Philippines",
  email: "marcjoshua1019@gmail.com",
  phone: "+63 928 168 0256",
  resume: "/Ramos.MJ - Resume.pdf",
  intro:
    "I build the voice agents, chatbots, and automations that real businesses run on, and the phone systems, networks, and cloud that sit underneath them. One of the first hires at an outsourcing company, where I set up the in-house IT and lead a team of five engineers.",
  socials: {
    github: "https://github.com/Dioswoah",
    linkedin: "https://www.linkedin.com/in/marc-joshua-ramos-943242311/",
  },
};

export const stats = [
  { value: "2023", label: "building for clients since" },
  { value: "5", label: "AI engineers I lead" },
  { value: "Multi-TB", label: "cloud migration led" },
  { value: "3+", label: "industries shipped in" },
];

export type Project = {
  title: string;
  context: string;
  description: string;
  tags: string[];
  link: string | null;
};

export const work: Project[] = [
  {
    title: "Production voice agents",
    context: "Offshore Outsource Operations",
    description:
      "Multi-modal voice and chat agents wired into back-end business logic for a fire protection company, handling inbound and outbound call flows.",
    tags: ["Vapi", "ElevenLabs", "n8n", "Make.com", "GCP", "Vertex AI"],
    link: null,
  },
  {
    title: "RAG chatbot + Slack deal bots",
    context: "RealVantage",
    description:
      "A website RAG chatbot on a proprietary LLM, plus Slack bots wired to a deployed AI agent that surfaced and handled the team's deals data.",
    tags: ["Python", "RAG", "MongoDB", "Slack"],
    link: null,
  },
  {
    title: "Multi-terabyte cloud migration",
    context: "Offshore Outsource Operations",
    description:
      "Led a multi-terabyte migration from Zoho to Google Workspace, writing custom console apps to move enterprise records across clouds with no data loss.",
    tags: ["Google Workspace", "Zoho", "Custom tooling"],
    link: null,
  },
  {
    title: "AI voice agent (lead-getter)",
    context: "Open source",
    description:
      "A real-time voice agent for natural lead-qualification conversations, built on Vapi and ElevenLabs for low-latency speech.",
    tags: ["Vapi", "ElevenLabs", "AI integration"],
    link: "https://github.com/Dioswoah/lead-getter",
  },
  {
    title: "Debtor assistant chatbot",
    context: "Open source",
    description:
      "An agentic chatbot tailored to a collections workflow, combining Google ADK, FlowiseAI, and Botpress over n8n backends.",
    tags: ["Google ADK", "FlowiseAI", "Botpress", "n8n"],
    link: "https://github.com/Dioswoah/Debtor-Assistant",
  },
  {
    title: "Medicinal leaf recognition",
    context: "Research · published at ICEBT 2024",
    description:
      "A computer-vision pipeline that classifies Philippine medicinal leaves using a YOLOv5 model with a ResNet50 backbone.",
    tags: ["YOLOv5", "ResNet50", "Computer Vision"],
    link: null,
  },
];

export const freelance: Project[] = [
  {
    title: "Arabit Pharmacy",
    context: "Freelance · Android",
    description:
      "A native Android ordering app for a local pharmacy, built solo in Android Studio with Firebase. Product catalog, cart, and checkout.",
    tags: ["Android", "Java", "Firebase"],
    link: null,
  },
  {
    title: "Barangay Batis records system",
    context: "Freelance · Web",
    description:
      "A web records system in PHP and phpMyAdmin that replaced a local government unit's paper-based public inquiry tracking.",
    tags: ["PHP", "phpMyAdmin", "MySQL"],
    link: "https://github.com/Dioswoah/IT135-8L-Barangay-Batis",
  },
  {
    title: "Attendance system",
    context: "Side project · Web",
    description:
      "A full-stack attendance management system to track and verify attendance logs, built with TypeScript and Next.js.",
    tags: ["TypeScript", "Next.js", "Full-stack"],
    link: "https://github.com/Dioswoah/Attendance",
  },
];

export const experience = [
  {
    company: "Offshore Outsource Operations Inc.",
    short: "OO",
    role: "AI Engineer & IT Lead",
    meta: "Outsourcing / BPO · Pasig City",
    period: "Sep 2025 — Present",
    summary:
      "One of the company's first hires. Built and now manage the in-house IT department, lead a team of 5 AI engineers, and ship the agents and automations behind a fire protection company's operations.",
    tags: ["Claude Agents", "MCP", "GCP", "n8n", "Xero", "Simpro", "VoIP"],
  },
  {
    company: "RealVantage",
    short: "RV",
    role: "Junior Software Engineer",
    meta: "Real estate investment · Singapore · Remote",
    period: "Jan 2025 — Dec 2025",
    summary:
      "Built a website RAG chatbot on a proprietary LLM and Slack bots tied to a deployed AI agent for deals data. Owned back-end features around MongoDB and internal tooling.",
    tags: ["Python", "RAG", "MongoDB", "React", "Slack"],
  },
  {
    company: "Motolite (Ramcar Group of Companies)",
    short: "MO",
    role: "Software Engineer Intern",
    meta: "Philippines · Hybrid",
    period: "Aug 2024 — Dec 2024",
    summary:
      "Built internal automation for the group's food brands (KFC, Tokyo Tokyo, Mister Donut) on AWS, a Cisco Meraki alerting script, and an internal IT self-help portal.",
    tags: ["AWS Bedrock", "S3", "Python", "Cisco Meraki"],
  },
];

export const stack = [
  {
    group: "AI & Agents",
    items: [
      "Claude Agents", "MCP", "LangChain", "LangGraph", "CrewAI", "RAG",
      "Vapi", "ElevenLabs", "Botpress", "FlowiseAI", "Vertex AI", "AWS Bedrock", "Azure AI Foundry",
    ],
  },
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "PHP", "Java", "C++", "C#", "SQL"],
  },
  {
    group: "Web & Mobile",
    items: ["React", "Next.js", "Node.js", "Tailwind", "Laravel", "Flutter", "Android"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Firebase", "Pinecone"],
  },
  {
    group: "Cloud & DevOps",
    items: ["GCP", "AWS", "Docker", "Vercel", "n8n", "Make.com"],
  },
  {
    group: "Systems & Platforms",
    items: ["Vonex", "ViciDial", "Cisco Meraki", "UniFi", "MikroTik", "Xero", "Simpro"],
  },
];

export const about = [
  "I have been building production software for clients since 2023. Today I am one of the first hires at an outsourcing company, where I set up the in-house IT, lead a team of five AI engineers, and ship the agents and automations our clients depend on.",
  "What I enjoy most is owning a problem all the way through: writing the AI logic, wiring it into platforms like Xero or Google Workspace, deploying it on GCP, then setting up the phone systems and networks it runs on. Outside the AI work I ship full-stack web and mobile apps for real clients.",
];

export const aboutFacts = [
  { k: "based in", v: "Mandaluyong, Philippines" },
  { k: "currently", v: "AI Engineer & IT Lead" },
  { k: "focus", v: "AI agents, automation, full-stack" },
  { k: "education", v: "BS Computer Science · Mapúa" },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Freelance", href: "#freelance" },
  { label: "Stack", href: "#stack" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
