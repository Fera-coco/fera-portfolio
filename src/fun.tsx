import { useEffect, useRef, useState, type ReactNode } from "react";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/** Fades children up the first time they scroll into view. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (reduced() || !("IntersectionObserver" in window)) return setShown(true);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { rootMargin: "0px 0px -10% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(28px)", transition: `opacity .7s ease ${delay}ms, transform .7s cubic-bezier(.2,.8,.2,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/** A slow ribbon of words, duplicated so it loops seamlessly. */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-6 pr-6" aria-hidden={hidden}>
      {items.map((s, i) => (
        <li key={s + i} className="flex items-center gap-6 whitespace-nowrap font-serif text-3xl italic md:text-4xl">
          {s}<span className="text-xl not-italic" aria-hidden>✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group flex overflow-hidden border-y-2 border-ink bg-sun py-4">
      <div className="flex animate-[marquee_38s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Polaroid cards you can drag around. Keyboard users get them as plain, still images. */
export function DragStack({ cards }: { cards: { key: string; img: string; label: string; tone: string }[] }) {
  const start = [
    { x: 0, y: 0, r: -6 },
    { x: 22, y: 30, r: 4 },
    { x: 8, y: 58, r: -2 },
  ];
  const [pos, setPos] = useState(start.map((p) => ({ dx: 0, dy: 0, r: p.r })));
  const [order, setOrder] = useState([0, 1, 2]);
  const [moved, setMoved] = useState(false);
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number } | null>(null);

  const down = (i: number) => (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: pos[i].dx, oy: pos[i].dy };
    setOrder((o) => [...o.filter((x) => x !== i), i]);
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
    const dx = clamp(d.ox + e.clientX - d.sx, 160);
    const dy = clamp(d.oy + e.clientY - d.sy, 140);
    setPos((p) => p.map((q, j) => (j === d.i ? { ...q, dx, dy, r: clamp(q.r * 0.85 + (e.movementX || 0) * 0.3, 10) } : q)));
    setMoved(true);
  };
  const up = () => {
    drag.current = null;
  };

  return (
    <div className="relative mx-auto h-[340px] w-full max-w-[460px] touch-none select-none sm:h-[400px]">
      {cards.map((c, i) => (
        <div
          key={c.key}
          onPointerDown={down(i)}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          className={`absolute w-[78%] cursor-grab rounded-2xl border-2 border-ink p-2 shadow-[6px_6px_0_#1E1C1A] active:cursor-grabbing ${c.tone}`}
          style={{
            left: `${start[i].x}%`,
            top: `${start[i].y}%`,
            zIndex: order.indexOf(i) + 1,
            transform: `translate(${pos[i].dx}px, ${pos[i].dy}px) rotate(${pos[i].r}deg)`,
            transition: drag.current?.i === i ? "none" : "transform .25s ease",
          }}
        >
          <img src={c.img} alt="" draggable={false} className="pointer-events-none aspect-[16/10] w-full rounded-lg border-2 border-ink object-cover object-top" />
          <p className="px-1 pt-1.5 text-[13px] font-bold">{c.label}</p>
        </div>
      ))}
      <span className="absolute -right-2 top-2 z-10 rotate-12 rounded-full border-2 border-ink bg-lilac px-3 py-1 text-sm font-bold" aria-hidden>
        {moved ? "Tidy freak? Same." : "Psst, drag us"}
      </span>
      {moved && (
        <button
          type="button"
          onClick={() => {
            setPos(start.map((p) => ({ dx: 0, dy: 0, r: p.r })));
            setMoved(false);
          }}
          className="absolute -bottom-2 right-0 z-10 rounded-full border-2 border-ink bg-paper px-3 py-1 text-xs font-bold hover:bg-sun"
        >
          Put them back
        </button>
      )}
    </div>
  );
}

/** A "View" sticker that follows the cursor inside its area, on mouse devices only. */
export function CursorSticker({ children, label = "View ↗", tone = "bg-ink text-cream" }: { children: ReactNode; label?: string; tone?: string }) {
  const [p, setP] = useState<{ x: number; y: number } | null>(null);
  const enabled = finePointer() && !reduced();
  return (
    <div
      className={`relative ${enabled ? "cursor-none" : ""}`}
      onPointerMove={(e) => {
        if (!enabled || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        setP({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onPointerLeave={() => setP(null)}
    >
      {children}
      {enabled && p && (
        <span className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 -rotate-6 whitespace-nowrap rounded-full border-2 border-ink px-4 py-2 text-sm font-bold ${tone}`} style={{ left: p.x, top: p.y }} aria-hidden>
          {label}
        </span>
      )}
    </div>
  );
}

/** Live local time in Cotonou (West Africa Time). */
export function CotonouClock() {
  const fmt = () =>
    new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Lagos", hour: "numeric", minute: "2-digit", hour12: true });
  const [t, setT] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  const h = Number(new Date().toLocaleString("en-GB", { timeZone: "Africa/Lagos", hour: "numeric", hour12: false }));
  const mood = h < 6 ? "probably asleep" : h < 12 ? "coffee and Figma" : h < 18 ? "deep in code" : h < 22 ? "shipping things" : "winding down";
  return (
    <span>
      It's <span className="font-bold tabular-nums">{t}</span> in Cotonou, {mood}.
    </span>
  );
}

/** Copies the email address, with a tiny confirmation. Falls back to mailto. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className="rounded-full border-2 border-ink bg-paper px-4 py-2 text-sm font-bold transition hover:bg-mint"
      aria-live="polite"
    >
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}
