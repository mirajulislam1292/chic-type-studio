import React, { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

const COLORS = {
  bg: "#080b12",
  surface: "rgba(255,255,255,0.03)",
  text: "#f7fbff",
  textDim: "rgba(247,250,252,0.78)",
  accent: "#5bc4d6",
  accentDim: "#2a6b78",
  gold: "#c9a05a",
  rose: "#c97a80",
  border: "rgba(91,196,214,0.12)",
};

type Star = { id: number; top: string; left: string; size: number; delay: number; opacity: number };

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Mohona(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stars: Star[] = useMemo(() => {
    const arr: Star[] = [];
    for (let i = 0; i < 180; i++) {
      const size = Math.random() * 1.6 + 0.3;
      arr.push({ id: i, top: `${Math.floor(Math.random() * 100)}%`, left: `${Math.floor(Math.random() * 100)}%`, size: Math.round(size * 10) / 10, delay: Math.random() * 4, opacity: 0.4 + Math.random() * 0.7 });
    }
    return arr;
  }, []);

  const nowYear = new Date().getFullYear();

  useEffect(() => {
    // fonts imported in component CSS below
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch {
        // Browsers may block autoplay with sound until the user interacts.
      }
    };

    playAudio();
  }, []);

  return (
    <div className="m-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English&family=Crimson+Pro:wght@300;400;600&family=Courier+Prime&display=swap');
        :root{ --bg: ${COLORS.bg}; --surface: ${COLORS.surface}; --text: ${COLORS.text}; --text-dim: ${COLORS.textDim}; --accent: ${COLORS.accent}; --accent-dim: ${COLORS.accentDim}; --gold: ${COLORS.gold}; --rose: ${COLORS.rose}; --border: ${COLORS.border}; }
  .m-root { position: relative; min-height: 100vh; color: var(--foreground); background: transparent; font-family: 'Crimson Pro', serif; }
        .m-stars { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .m-star { position: absolute; background: #ffffff; border-radius: 50%; transform: translate(-50%,-50%); box-shadow: 0 0 6px rgba(255,255,255,0.15); opacity: 0.85; }
        @keyframes twinkle { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.2; } 50% { transform: translate(-50%,-50%) scale(1.4); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.2; } }
        .m-grain { position: fixed; inset: 0; opacity: 0.035; pointer-events: none; z-index: 1; mix-blend-mode: overlay; }
        .m-viewport { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; box-sizing: border-box; }
        .hero-inner { max-width: 1000px; margin: 0 auto; z-index: 3; }
  /* top label removed to match main site style */
        .name { font-family: 'IM Fell English', serif; color: var(--text); line-height: 0.9; margin: 0; }
  .name .latin { font-size: clamp(3.2rem, 9vw, 6rem); }
  .name .bangla { font-family: 'Crimson Pro', serif; font-style: italic; color: hsl(var(--primary)); font-size: clamp(1rem, 3.5vw, 1.8rem); margin-top: 0.2rem; display:block; }
  .subtitle { font-family: 'Crimson Pro', serif; font-style: italic; color: var(--muted-foreground); margin: 0.8rem auto 0; max-width: 640px; line-height: 1.6; }
  /* scroll indicator removed for cleaner layout */
        @keyframes pulse { 0% { transform: translateX(-50%) scaleY(0.9); opacity: 0.7 } 50% { transform: translateX(-50%) scaleY(1.1); opacity: 1 } 100% { transform: translateX(-50%) scaleY(0.9); opacity: 0.7 } }
  .section { padding: 3.5rem 1.25rem; max-width: 900px; margin: 0 auto; box-sizing: border-box; z-index: 3; position: relative; }
        .label { font-family: 'Courier Prime', monospace; color: var(--accent); letter-spacing: 0.12em; font-size: 0.85rem; margin-bottom: 0.6rem; }
  h2.m-heading { font-family: 'IBM Plex Mono', 'Courier Prime', monospace; font-size: 1.6rem; margin: 0 0 0.75rem 0; color: var(--foreground); }
  .prose { font-family: 'Crimson Pro', serif; color: var(--muted-foreground); line-height: 1.8; font-weight: 300; font-size: 1rem; margin-bottom: 0.9rem; white-space: pre-wrap; }
        .eye-wrap { display:flex; justify-content:center; align-items:center; margin: 1.2rem 0 1.4rem; }
  /* large decorative infinity removed for simplicity */
  /* simplified timeline removed; entries consolidated into prose */
  .letter { border: 1px solid rgba(var(--border),0.18); background: rgba(var(--card),0.04); padding: 2.2rem 1.75rem; max-width: 720px; margin: 0 auto; font-family: 'Crimson Pro', serif; color: var(--foreground); line-height: 1.7; white-space: pre-wrap; box-sizing: border-box; }
        @media (max-width: 640px) { .letter { padding: 2rem 1.5rem; } }
        .letter-heading { font-family: 'IM Fell English', serif; font-size: 1.6rem; margin-bottom: 1rem; color: var(--text); }
  .letter-closing { font-family: 'Crimson Pro', serif; font-style: italic; color: var(--text); text-align:center; margin-top:1.25rem; font-size:1rem; }
  .m-footer { border-top: 1px solid rgba(var(--border),0.12); text-align:center; padding: 2rem 1rem; color: var(--muted-foreground); }
  .m-footer .title { font-family: 'IBM Plex Mono', 'Courier Prime', monospace; color: hsl(var(--primary)); font-size: 1.1rem; margin-bottom: 0.4rem; }
  .m-footer small { display:block; margin-top: 0.5rem; font-family: 'Courier Prime', monospace; color: var(--muted-foreground); }
  .profile-card { max-width: 460px; margin: 0 auto; padding: 1rem; }
  .profile-frame {
    position: relative;
    padding: 0.9rem;
    border-radius: 28px;
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.28);
    backdrop-filter: blur(10px) saturate(1.15);
    -webkit-backdrop-filter: blur(10px) saturate(1.15);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
    overflow: hidden;
  }
  .profile-frame::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top left, rgba(255,255,255,0.24), transparent 34%), radial-gradient(circle at bottom right, rgba(91,196,214,0.12), transparent 38%);
    pointer-events: none;
  }
  .profile-image { width: 100%; height: auto; display: block; aspect-ratio: 3 / 4; object-fit: cover; border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.18); transform: scale(0.96); }
  .profile-meta { padding-top: 1rem; text-align: center; }
  .profile-name { font-family: 'IM Fell English', serif; font-size: clamp(1.4rem, 3.2vw, 2rem); color: var(--text); margin: 0; }
  .profile-date { margin-top: 0.35rem; font-family: 'Courier Prime', monospace; font-size: 0.9rem; color: var(--muted-foreground); letter-spacing: 0.08em; }
  .profile-line { margin-top: 0.7rem; font-family: 'Crimson Pro', serif; font-style: italic; color: var(--text-dim); font-size: 1rem; line-height: 1.5; }
      `}</style>

      <div className="m-stars" aria-hidden>
        {stars.map((s) => (
          <div
            key={s.id}
            className="m-star"
            style={{ top: s.top, left: s.left, width: `${s.size}px`, height: `${s.size}px`, opacity: s.opacity, animation: `twinkle 3.6s ease-in-out ${s.delay}s infinite` }}
          />
        ))}
      </div>

      <svg className="m-grain" width="100%" height="100%" viewBox="0 0 800 600" preserveAspectRatio="none" aria-hidden>
        <filter id="grain"><feTurbulence baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /><feComponentTransfer><feFuncA type="table" tableValues="0 0.08" /></feComponentTransfer></filter>
        <rect width="100%" height="100%" filter="url(#grain)" fill="#ffffff" />
      </svg>

      <audio
        ref={audioRef}
        src="/NEW%20WEST%20-%20THOSE%20EYES%20(Instrumental).mp3"
        autoPlay
        loop
        preload="auto"
        aria-hidden="true"
      />

      <div className="m-viewport">
        <section className="hero" aria-label="Hero">
          <div className="hero-inner">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
              {/* top label removed to match site theme */}
              <motion.div variants={sectionVariant} style={{ marginTop: 8 }}>
                <h1 className="name" aria-hidden><span className="latin">Mohona</span></h1>
              </motion.div>
              <motion.div variants={sectionVariant}><div className="subtitle">She is one day older than me.
She always was one step ahead.
And I have spent every day since Class Six
carrying something I never said out loud.</div></motion.div>
            </motion.div>
            {/* simpler hero - no scroll indicator */}
          </div>
        </section>

    <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
      <div className="label">CHAPTER I  .  CLASS SIX  .  DEMRA</div>
            <h2 className="m-heading">The First Day I Saw Her</h2>
      <div className="prose">It was the first month of Class Six. New school. New people. Two shifts. A shared microbus going home. He saw her once in that microbus and never forgot that moment. He never spoke to her; he only carried the memory quietly from that day forward.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER II  .  THE MOST BEAUTIFUL THING</div>
            <h2 className="m-heading">Those Eyes</h2>
            <div className="prose">He had a few photos of her. Not many.
He would sit alone late at night and stare at those photos the way you look at a real person sitting right across from you. Sometimes he would spend one hour. Sometimes two. Just looking. Sometimes he would cry, not from being broken but because loving something so completely without saying it must go somewhere. Her eyes held him the longest; they were the most beautiful thing he had ever seen.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER III  .  MIDNIGHT</div>
            <h2 className="m-heading">Philosophy at Midnight</h2>
            <div className="prose">There is a kind of night that belongs only to people who love from a distance. The world gets quiet and you sit there with her photo and your thoughts. The distance feels like the entire universe. He lived inside those nights for years; the thinking deepened into something beyond sadness, closer to philosophy, questions about love and how one person can change you without knowing it.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER IV  .  CLASS SIX TO CLASS EIGHT</div>
            <h2 className="m-heading">Everything I Wrote Was For Her</h2>

            <div className="prose">From Class VI onward he carried her in small ways, posts, captions, private lines written for nobody. She left in Class VIII; his world did not. Years passed. He continued to write toward her even when she had no idea.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER V  .  NOW</div>
            <h2 className="m-heading">I Am Glad She Is Happy</h2>
            <div className="prose">She is with someone else now and he is glad. No jealousy or bitterness, just a quiet happiness for her. He watches from a distance, content that she is well.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER VI  .  HONEST TRUTH</div>
            <h2 className="m-heading">This Was the Only One</h2>
            <div className="prose">After her, he never pursued anyone.
He never went into a relationship.
He never will.
Not because he is dramatic about it.
Not because he is punishing himself.
But because what he felt for Mohona
was something specific, something unrepeatable.
It was built over years in silence.
It became so much a part of who he is
and he is not sure anymore where he ends
and this love begins.
Some feelings are like that.
They do not leave room for anything else.
And he is fine with that.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">A LETTER  .  FOR MOHONA</div>
            <h2 className="m-heading">If You Are Ever Reading This</h2>
            <div className="letter" role="article" aria-labelledby="letter-heading">{`Mohona,

I do not know if you will ever find this page.
Maybe you never will.
Maybe it will just sit here quietly on the internet,
seen by nobody, least of all you.

But I built it anyway.

Because you deserve to be written about.
Because the years I spent loving you from a distance
were not wasted. They were some of the most real years of my life.

You are one day older than me.
You were always one step ahead.
You left in Class Eight.
It has been six years.

I never loved anyone after you.
I am not angry about that. I am not sad about it.
It is just true.

When I think about you being happy with someone else,
I feel glad. Not pretend glad. Actually glad.
That is the kind of love this was.

Your eyes are the most beautiful thing I have ever seen in my life.
That will not change.

You will live in my heart forever.
Not as a ghost.
Not as a regret.
As the most beautiful thing
that ever walked into my life
without knowing it.

`}</div>
            <div className="letter-closing">She was Class Six. She was one day older than me.
She was everything.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant} className="profile-card">
            <div className="profile-frame">
              <img
                src="/IMG_6733.jpeg"
                alt="Hasbun Nahar Mohona"
                className="profile-image"
              />
              <div className="profile-meta">
                <h2 className="profile-name">Hasbun Nahar Mohona</h2>
                <div className="profile-line">08 Sept 2006<br />The day the girl I loved was born,<br />and without knowing it, she would one day become the only one my heart never moved on from.</div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <footer className="m-footer" role="contentinfo">
          <div className="title">Uploaded on April 2026</div>
          <div>Made with love and respect by Alu Mota Bhalu</div>
        </footer>

      </div>
    </div>
  );
}

function EyeSVG(): JSX.Element {
  return (
    <svg width="130" height="130" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Eye">
      <g transform="translate(5,5)">
        <path d="M10 60 C30 10, 90 10, 110 60 C90 110, 30 110, 10 60 Z" fill="none" stroke={COLORS.gold} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <motion.circle cx="60" cy="60" r="20" fill={COLORS.gold} animate={{ opacity: [0.15,0.55,0.15] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <circle cx="60" cy="60" r="7" fill="#080b12" />
        <circle cx="68" cy="52" r="2.2" fill="#ffffff" opacity="0.9" />
      </g>
    </svg>
  );
}
