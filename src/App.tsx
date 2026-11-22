import { useMemo, useState } from "react";
import { contact, education, experience, projects, skills, type Project, type Track } from "./data";
import { CopyEmail, CotonouClock, CursorSticker, DragStack, Marquee, Reveal } from "./fun";

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function App() {
  return (
    <>
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-cream">Skip to work</a>
      <Header />
      <main>
        <Hero />
        <Marquee items={["React", "UX research", "TypeScript", "Figma", "Next.js", "Prototyping", "Tailwind CSS", "Design systems", "Supabase", "User flows", "Framer Motion", "Accessibility"]} />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="border-t-2 border-ink px-5 py-8 text-sm md:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <p>© 2026 Segun-Babs Peace Oluwaferanmi (Fera)</p>
        </div>
      </footer>
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="font-serif text-3xl italic leading-none">fera<span className="text-tangerine">.</span></a>
        <nav className="flex items-center gap-1 text-[15px] font-semibold" aria-label="Main">
          <a href="#work" className="rounded-full px-3 py-2 hover:bg-sun/60">Work</a>
          <a href="#about" className="hidden rounded-full px-3 py-2 hover:bg-sun/60 sm:inline">About</a>
          <a href={`mailto:${contact.email}`} className="ml-1 rounded-full border-2 border-ink bg-ink px-4 py-1.5 text-cream transition hover:bg-pink hover:text-ink">Hire me</a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  const stack = [projects[1], projects[0], projects[3]];
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-12 md:px-10 md:pt-20 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <p className="pill border-mint bg-mint/15">
          <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />Open to freelance projects and full-time roles
        </p>
        <h1 className="mt-6 font-serif text-[56px] leading-[0.95] tracking-tight md:text-[88px]">
          Hi, I'm Fera.
          <br />I <em className="text-tangerine">design</em> and <em className="text-pink">build</em> things people actually use.
        </h1>
        <p className="mt-6 max-w-lg text-lg text-ink/80">
          Frontend developer and UI/UX designer in Cotonou. I take an idea from research and Figma all the way to a fast, live website, for businesses in Nigeria and Benin and anyone else who needs one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#work" className="rounded-full border-2 border-ink bg-sun px-6 py-3 font-bold shadow-[4px_4px_0_#1E1C1A] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1E1C1A]">See my work</a>
          <a href={`mailto:${contact.email}`} className="rounded-full border-2 border-ink bg-paper px-6 py-3 font-bold transition hover:bg-pink">Email me</a>
        </div>
        <p className="mt-6 text-[15px] text-muted"><CotonouClock /></p>
      </div>
      <DragStack cards={stack.map((p) => ({ key: p.slug, img: p.cover, label: p.title, tone: p.tone }))} />
    </section>
  );
}

function Work() {
  const [track, setTrack] = useState<"all" | Track>("all");
  const shown = useMemo(() => projects.filter((p) => track === "all" || p.tracks.includes(track)), [track]);
  const count = (t: Track) => projects.filter((p) => p.tracks.includes(t)).length;
  return (
    <section id="work" className="scroll-mt-20 border-y-2 border-ink bg-paper px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 className="mt-2 font-serif text-5xl md:text-6xl">Things I've made</h2>
          </div>
          <div className="flex gap-1 rounded-full border-2 border-ink bg-cream p-1" role="tablist" aria-label="Filter projects">
            {([["all", `All ${projects.length}`], ["build", `Build ${count("build")}`], ["design", `Design ${count("design")}`]] as const).map(([k, t]) => (
              <button key={k} role="tab" aria-selected={track === k} onClick={() => setTrack(k)}
                className={cx("rounded-full px-4 py-2 text-sm font-bold transition", track === k ? "bg-ink text-cream" : "hover:bg-sun/60")}>{t}</button>
            ))}
          </div>
        </div>
        <div className="mt-12 space-y-16 md:space-y-24">
          {shown.map((p, i) => <Reveal key={p.slug}><ProjectRow p={p} flip={i % 2 === 1} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ p, flip }: { p: Project; flip: boolean }) {
  const main = p.links[0];
  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div className={cx(flip && "md:order-2")}>
      <CursorSticker label={main.label + " ↗"}>
      <a href={main.href} target="_blank" rel="noopener noreferrer" className={cx("group block rounded-3xl border-2 border-ink p-3 shadow-[8px_8px_0_#1E1C1A] transition hover:-translate-y-1 hover:rotate-[-1deg] md:p-5", p.tone)} aria-label={`${main.label}: ${p.title}`}>
        <img src={p.cover} alt={`${p.title} screenshot`} loading="lazy" className="aspect-[16/10] w-full rounded-xl border-2 border-ink bg-paper object-cover object-top transition group-hover:scale-[1.01]" />
      </a>
      </CursorSticker>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
          <span className="text-muted">{p.year}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{p.kind}</span>
          <span className={cx("rounded-full border-2 border-ink px-2.5 py-0.5", p.status === "Live" ? "bg-mint" : p.status === "In progress" ? "bg-sun" : "bg-lilac")}>{p.note ?? p.status}</span>
        </div>
        <h3 className="mt-3 font-serif text-4xl md:text-5xl">{p.title}</h3>
        <p className="mt-3 text-[17px] leading-relaxed text-ink/80">{p.summary}</p>
        <p className="eyebrow mt-6">What I did</p>
        <ul className="mt-2 space-y-1.5">
          {p.did.map((d) => <li key={d} className="flex gap-2 text-[15px]"><span className="text-tangerine">✦</span>{d}</li>)}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <span key={s} className="rounded-full bg-cream px-3 py-1 text-[13px] font-semibold ring-1 ring-ink/15">{s}</span>)}
          {p.tracks.map((t) => <span key={t} className={cx("rounded-full px-3 py-1 text-[13px] font-bold", t === "build" ? "bg-pink/25" : "bg-sky/25")}>{t === "build" ? "Build" : "Design"}</span>)}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {p.links.map((l, i) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              className={cx("rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold transition", i === 0 ? "bg-ink text-cream hover:bg-tangerine hover:text-ink" : "bg-paper hover:bg-sun")}>
              {l.label} ↗
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
      <p className="eyebrow">Two halves of the same job</p>
      <h2 className="mt-2 max-w-2xl font-serif text-5xl md:text-6xl">I can design it, and I can ship it.</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {([["build", "I build", "bg-pink", "Fast, accessible websites and apps, from landing pages to stores with dashboards and databases."], ["design", "I design", "bg-sky", "Research, flows and interfaces in Figma that make sense to the people who'll use them."]] as const).map(([k, t, tone, d]) => (
          <div key={k} className={cx("rounded-3xl border-2 border-ink p-6 shadow-[6px_6px_0_#1E1C1A] md:p-8", tone)}>
            <h3 className="font-serif text-4xl italic">{t}</h3>
            <p className="mt-2 max-w-sm text-[15px]">{d}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {skills[k].map((s) => <li key={s} className="rounded-full border-2 border-ink bg-paper px-3 py-1 text-[14px] font-semibold">{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="scroll-mt-20 border-y-2 border-ink bg-lilac/25 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <p className="eyebrow">About</p>
          <h2 className="mt-2 font-serif text-5xl md:text-6xl">From radio studios to React.</h2>
          <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-ink/85">
            <p>I'm Segun-Babs Peace Oluwaferanmi, but everyone calls me Fera. I started out in electrical engineering, working in broadcast engineering and IT support at radio stations in Ibadan and Ado-Ekiti.</p>
            <p>That pulled me into computers, then into Computer Science, and now into designing and building for the web. I like work where the research, the design and the code all come from the same head.</p>
            <p>Today I run Fera's Studio, where I build websites for small businesses, and I'm studying product management at TS Academy.</p>
          </div>
          <div className="mt-8 rotate-[-1.5deg] rounded-2xl border-2 border-ink bg-sun p-5 shadow-[5px_5px_0_#1E1C1A]">
            <p className="eyebrow !text-ink">Currently</p>
            <ul className="mt-3 space-y-2 text-[15px]">
              <li>🛠️ <span className="font-bold">Building</span> an online store for a Nigerian hair brand</li>
              <li>📚 <span className="font-bold">Learning</span> product management at TS Academy</li>
              <li>🎀 <span className="font-bold">Running</span> the Open Call: free websites for small businesses</li>
            </ul>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <p className="eyebrow">Experience</p>
            <ol className="mt-3 space-y-3">
              {experience.map((e) => (
                <li key={e.role + e.org} className="rounded-2xl border-2 border-ink bg-paper p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold">{e.role}</p>
                    <p className="text-sm font-semibold text-muted">{e.when}</p>
                  </div>
                  <p className="text-[15px]">{e.org}{e.place && `, ${e.place}`}</p>
                  {e.text && <p className="mt-1 text-sm text-muted">{e.text}</p>}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="eyebrow">Education</p>
            <ul className="mt-3 divide-y-2 divide-ink/10 rounded-2xl border-2 border-ink bg-paper">
              {education.map((e) => (
                <li key={e.what} className="flex flex-wrap items-baseline justify-between gap-2 p-4">
                  <span><span className="font-bold">{e.what}</span> · {e.where}</span>
                  <span className="text-sm font-semibold text-muted">{e.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-20 text-center md:px-10 md:py-28">
      <p className="eyebrow">Contact</p>
      <h2 className="mx-auto mt-3 max-w-3xl font-serif text-6xl leading-[0.95] md:text-8xl">Let's make something <em className="text-tangerine">good.</em></h2>
      <p className="mx-auto mt-5 max-w-md text-lg text-ink/80">Hiring, or need a website or app designed and built? Send me a message.</p>
      <a href={`mailto:${contact.email}`} className="mt-8 inline-block rounded-full border-2 border-ink bg-sun px-8 py-4 text-lg font-bold shadow-[5px_5px_0_#1E1C1A] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#1E1C1A]">{contact.email}</a>
      <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold">
        <CopyEmail email={contact.email} />
        <a href={contact.github} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-ink bg-paper px-4 py-2 hover:bg-pink">GitHub ↗</a>
        <a href={contact.studio} target="_blank" rel="noopener noreferrer" className="rounded-full border-2 border-ink bg-paper px-4 py-2 hover:bg-mint">Fera's Studio ↗</a>
      </div>
    </section>
  );
}
