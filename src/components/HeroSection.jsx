import { ArrowDown } from "lucide-react";
import { Suspense, lazy } from "react";
const ThreeScene = lazy(() => import("./ThreeScene").catch(() => ({ default: () => null })));

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

      {/* AI Aesthetic Abstract Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-[400px] bg-primary/20 rounded-full blur-[100px] animate-pulse-subtle pointer-events-none -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[90px] animate-float pointer-events-none -z-10 delay-700"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] animate-float pointer-events-none -z-10 delay-1000"></div>

      <div className="container max-w-4xl mx-auto text-center z-10 glass-panel p-12 md:p-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            <span className="opacity-0 animate-fade-in block mb-2 text-2xl md:text-3xl text-muted-foreground font-medium">Hello there, I'm</span>
            <span className="opacity-0 animate-fade-in-delay-1 inline-block text-primary text-glow">
              {" "}
              Marc Joshua Ramos
            </span>
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold opacity-0 animate-fade-in-delay-2 mt-4">
             <span className="text-gradient-ai">Full Stack AI</span> & Software Engineer
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3 mt-6 leading-relaxed">
            I specialize in building modern intelligent applications, robust automation workflows, and state-of-the-art AI integrations.
          </p>

          <div className="pt-8 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button inline-block text-lg px-8 py-3">
              <span className="relative z-10 font-bold tracking-wide">Explore My Work</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
