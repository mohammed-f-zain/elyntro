"use client";

import { useEffect, useRef, useState } from "react";
import { ServiceCard } from "@/components/site/ServiceCard";
import { cn } from "@/lib/utils";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  points?: string[];
  outcome?: string;
};

type ServicesCarouselProps = {
  services: ServiceItem[];
};

function scrollCardIntoScroller(scroller: HTMLElement, card: HTMLElement) {
  const left =
    card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
  scroller.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
}

export function ServicesCarousel({ services }: ServicesCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const cards = [...el.querySelectorAll<HTMLElement>("[data-service-card]")];
      if (!cards.length) return;
      const mid = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      setActive(best);
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [services.length]);

  useEffect(() => {
    if (paused || !inView || services.length < 2) return;
    const id = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const next = (active + 1) % services.length;
      const card = el.querySelectorAll<HTMLElement>("[data-service-card]")[next];
      if (card) scrollCardIntoScroller(el, card);
    }, 4200);
    return () => window.clearInterval(id);
  }, [active, paused, inView, services.length]);

  function goTo(index: number) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-service-card]")[index];
    if (card) scrollCardIntoScroller(el, card);
  }

  return (
    <div
      ref={rootRef}
      className="relative md:hidden"
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={scrollerRef}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            data-service-card
            className="w-[min(85vw,22rem)] shrink-0 snap-center"
          >
            <ServiceCard
              title={service.title}
              description={service.description}
              icon={service.icon}
              index={index}
              points={service.points}
              outcome={service.outcome}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {services.map((service, index) => (
          <button
            key={service.id}
            type="button"
            aria-label={`Go to ${service.title}`}
            onClick={() => goTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              index === active ? "w-6 bg-cyan" : "w-1.5 bg-cool-gray/40",
            )}
          />
        ))}
      </div>
    </div>
  );
}
