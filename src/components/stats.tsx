"use client";

import { useEffect, useRef, useState } from "react";

const targets = [1000, 10, 98, 5] as const;

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const [values, setValues] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValues([...targets]); return; }
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / 1500);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValues(targets.map((value) => Math.round(value * eased)));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.35 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: `+${values[0].toLocaleString("pt-BR")}`, label: "Clientes atendidos" },
    { value: `+${values[1]}`, label: "Anos de experiência" },
    { value: `${values[2]}%`, label: "Clientes satisfeitos", accent: true },
    { value: `+${values[3]}`, label: "Profissionais especializados" },
  ];
  return <section ref={ref} className="stats-section" aria-label="Números da Fisiolife"><i className="stats-ring" /><i className="stats-circle" /><div className="stats-grid shell">{stats.map((stat) => <div key={stat.label}><strong className={stat.accent ? "accent" : ""}>{stat.value}</strong><span>{stat.label}</span></div>)}</div></section>;
}
