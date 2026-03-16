import { useEffect, useRef } from "react";

const ThreeScene = () => {
  const canvasRef = useRef(null);
  const scrollVelocityRef = useRef(0);
  const lastScrollRef = useRef(0);
  const baseRotYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const delta = window.scrollY - lastScrollRef.current;
      // Much gentler scroll effect
      scrollVelocityRef.current += delta * 0.0001;
      // Hard cap so fast scrolling never causes jarring spin
      scrollVelocityRef.current = Math.max(-0.01, Math.min(0.01, scrollVelocityRef.current));
      lastScrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fibonacci sphere — more nodes for a denser full-screen mesh
    const COUNT = 110;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const rawNodes = [];
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      rawNodes.push({
        bx: r * Math.cos(theta),
        by: y,
        bz: r * Math.sin(theta),
        phase: i * 0.47,
        waveAmp: 0.1 + 0.07 * ((i * 17) % 10) / 10,
        waveFreq: 0.7 + 0.6 * ((i * 13) % 10) / 10,
      });
    }

    let rotY = 0;
    let rotX = 0;
    let animId;
    const startTime = performance.now();

    const project = (x, y, z, cx, cy, radius) => {
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 3.2;
      const scale = fov / (fov + z2);
      return {
        sx: cx + x1 * radius * scale,
        sy: cy + y2 * radius * scale,
        depth: z2,
        scale,
      };
    };

    const draw = () => {
      const t = (performance.now() - startTime) / 1000;

      // Radius covers ~90% of screen width
      const radius = canvas.width * 0.45;
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.5;

      // Smooth slow deceleration — velocity decays gently
      baseRotYRef.current += scrollVelocityRef.current;
      scrollVelocityRef.current *= 0.985; // very gentle deceleration

      // Very slow ambient rotation so waves are visible
      rotY = t * 0.01 + baseRotYRef.current;
      rotX = Math.sin(t * 0.05) * 0.18;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fluid wave displacement per node
      const displacedNodes = rawNodes.map((n) => {
        const w1 = n.waveAmp * Math.sin(t * n.waveFreq + n.phase);
        const w2 = n.waveAmp * 0.7 * Math.cos(t * n.waveFreq * 0.8 + n.phase * 1.4);
        return {
          ...n,
          x: n.bx + w1 * (1 - Math.abs(n.bx)),
          y: n.by + w2 * (1 - Math.abs(n.by)),
          z: n.bz + w1 * 0.5 * (1 - Math.abs(n.bz)),
        };
      });

      const projected = displacedNodes.map((n) => ({
        ...n,
        ...project(n.x, n.y, n.z, cx, cy, radius),
      }));
      projected.sort((a, b) => a.depth - b.depth);

      // Draw connection lines
      for (let i = 0; i < rawNodes.length; i++) {
        for (let j = i + 1; j < rawNodes.length; j++) {
          const dx = rawNodes[i].bx - rawNodes[j].bx;
          const dy = rawNodes[i].by - rawNodes[j].by;
          const dz = rawNodes[i].bz - rawNodes[j].bz;
          const baseDist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (baseDist < 0.5) {
            const avgDepth = (projected[i].depth + projected[j].depth) * 0.5;
            const alpha = (1 - baseDist / 0.5) * 0.55 * ((avgDepth + 2) / 4);
            ctx.beginPath();
            ctx.moveTo(projected[i].sx, projected[i].sy);
            ctx.lineTo(projected[j].sx, projected[j].sy);
            ctx.strokeStyle = `rgba(168, 85, 247, ${Math.max(0, alpha).toFixed(2)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of projected) {
        const pulse = 0.8 + 0.25 * Math.sin(t * 2.2 + n.phase);
        const nodeSize = 3.5 * n.scale * pulse;
        const brightness = (n.depth + 2) / 4;
        const alpha = Math.max(0, 0.6 + 0.4 * brightness);

        // Soft outer glow
        const grad = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, nodeSize * 5);
        grad.addColorStop(0, `rgba(192, 132, 252, ${(alpha * 0.65).toFixed(2)})`);
        grad.addColorStop(1, "rgba(139, 92, 246, 0)");
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, nodeSize * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(233, 213, 255, ${alpha.toFixed(2)})`;
        ctx.fill();
      }

      // Central pulsing core
      const cp = project(0, 0, 0, cx, cy, radius);
      const corePulse = 0.85 + 0.2 * Math.sin(t * 1.5);
      const coreR = 22 * corePulse;
      const coreGrad = ctx.createRadialGradient(cp.sx, cp.sy, 0, cp.sx, cp.sy, coreR * 3);
      coreGrad.addColorStop(0, "rgba(233, 213, 255, 0.95)");
      coreGrad.addColorStop(0.3, "rgba(168, 85, 247, 0.5)");
      coreGrad.addColorStop(1, "rgba(109, 40, 217, 0)");
      ctx.beginPath();
      ctx.arc(cp.sx, cp.sy, coreR * 3, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.65 }}
    />
  );
};

export default ThreeScene;
