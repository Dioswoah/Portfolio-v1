import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 99, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js", level: 90, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 85, category: "backend" },
  { name: "PostgreSQL", level: 90, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 95, category: "tools" },
  { name: "Docker", level: 90, category: "tools" },
  { name: "Figma", level: 90, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "GCP", level: 80, category: "tools" },
  { name: "n8n", level: 85, category: "tools" },
  { name: "Make.com", level: 80, category: "tools" },
  
  // AI
  { name: "Vapi", level: 85, category: "ai" },
  { name: "ElevenLabs", level: 90, category: "ai" },
  { name: "Google ADK", level: 85, category: "ai" },
  { name: "Botpress", level: 80, category: "ai" },
  { name: "FlowiseAI", level: 85, category: "ai" },
  { name: "MCP Architecture", level: 80, category: "ai" },
];

const categories = ["all", "frontend", "backend", "tools", "ai"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (key % 3) * 0.1 }}
              className="glass-panel p-6 card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
