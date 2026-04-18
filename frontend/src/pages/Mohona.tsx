import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

const COLORS = {
  bg: "#080b12",
  surface: "rgba(255,255,255,0.03)",
  text: "#dde6f0",
  textDim: "rgba(221,230,240,0.55)",
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

  return (
    <div className="m-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English&family=Crimson+Pro:wght@300;400;600&family=Courier+Prime&display=swap');
        :root{ --bg: ${COLORS.bg}; --surface: ${COLORS.surface}; --text: ${COLORS.text}; --text-dim: ${COLORS.textDim}; --accent: ${COLORS.accent}; --accent-dim: ${COLORS.accentDim}; --gold: ${COLORS.gold}; --rose: ${COLORS.rose}; --border: ${COLORS.border}; }
        .m-root { position: relative; min-height: 100vh; color: var(--text); background: transparent; font-family: 'Crimson Pro', serif; }
        .m-stars { position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0; }
        .m-star { position: absolute; background: #ffffff; border-radius: 50%; transform: translate(-50%,-50%); box-shadow: 0 0 6px rgba(255,255,255,0.15); opacity: 0.85; }
        @keyframes twinkle { 0% { transform: translate(-50%,-50%) scale(1); opacity: 0.2; } 50% { transform: translate(-50%,-50%) scale(1.4); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.2; } }
        .m-grain { position: fixed; inset: 0; opacity: 0.035; pointer-events: none; z-index: 1; mix-blend-mode: overlay; }
        .m-viewport { position: relative; z-index: 2; min-height: 100vh; display: flex; flex-direction: column; }
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 2rem; box-sizing: border-box; }
        .hero-inner { max-width: 1000px; margin: 0 auto; z-index: 3; }
        .top-label { font-family: 'Courier Prime', monospace; color: var(--accent); letter-spacing: 0.3em; font-size: 0.9rem; margin-bottom: 1rem; opacity: 0.95; }
        .name { font-family: 'IM Fell English', serif; color: var(--text); line-height: 0.9; margin: 0; }
        .name .latin { font-size: clamp(4rem, 12vw, 9rem); }
        .name .bangla { font-family: 'Crimson Pro', serif; font-style: italic; color: var(--gold); font-size: clamp(1.2rem, 4vw, 2.4rem); margin-top: 0.2rem; display:block; }
        .subtitle { font-family: 'Crimson Pro', serif; font-style: italic; color: var(--text-dim); margin: 1.2rem auto 0; max-width: 480px; line-height: 1.8; }
        .scroll-line { position: absolute; left: 50%; transform: translateX(-50%); bottom: 2rem; width: 2px; height: 40px; background: linear-gradient(180deg, var(--accent), transparent); border-radius: 4px; box-shadow: 0 0 12px var(--accent); animation: pulse 1.8s infinite; opacity: 0.95; }
        @keyframes pulse { 0% { transform: translateX(-50%) scaleY(0.9); opacity: 0.7 } 50% { transform: translateX(-50%) scaleY(1.1); opacity: 1 } 100% { transform: translateX(-50%) scaleY(0.9); opacity: 0.7 } }
        .section { padding: 6rem 1.25rem; max-width: 900px; margin: 0 auto; box-sizing: border-box; z-index: 3; position: relative; }
        .label { font-family: 'Courier Prime', monospace; color: var(--accent); letter-spacing: 0.12em; font-size: 0.85rem; margin-bottom: 0.6rem; }
        h2.m-heading { font-family: 'IM Fell English', serif; font-size: 2.2rem; margin: 0 0 1rem 0; color: var(--text); }
        .prose { font-family: 'Crimson Pro', serif; color: var(--text-dim); line-height: 1.9; font-weight: 300; font-size: 1.05rem; margin-bottom: 1rem; white-space: pre-wrap; }
        .eye-wrap { display:flex; justify-content:center; align-items:center; margin: 1.2rem 0 1.4rem; }
        .infty { font-family: 'IM Fell English', serif; font-size: 10rem; color: transparent; -webkit-text-stroke: 1px var(--accent-dim); text-align: center; display:block; width:100%; opacity:0.9; animation: inftyFade 4s infinite ease-in-out; margin: 1rem 0; }
        @keyframes inftyFade { 0% { opacity: 0.35 } 50% { opacity: 0.9 } 100% { opacity: 0.35 } }
        .timeline { border-left: 2px solid var(--border); padding-left: 1.25rem; margin: 2rem 0; position: relative; }
        .timeline-entry { position: relative; margin-bottom: 2rem; padding-left: 1rem; }
        .timeline-dot { position: absolute; left: -12px; top: 0; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px rgba(91,196,214,0.12); }
        .letter { border: 1px solid var(--border); background: var(--surface); padding: 3rem 2.5rem; max-width: 640px; margin: 0 auto; font-family: 'Crimson Pro', serif; color: var(--text-dim); line-height: 1.9; white-space: pre-wrap; box-sizing: border-box; }
        @media (max-width: 640px) { .letter { padding: 2rem 1.5rem; } }
        .letter-heading { font-family: 'IM Fell English', serif; font-size: 1.6rem; margin-bottom: 1rem; color: var(--text); }
        .letter-closing { font-family: 'Crimson Pro', serif; font-style: italic; color: var(--text-dim); text-align:center; margin-top:1.25rem; font-size:1rem; }
        .m-footer { border-top: 1px solid var(--border); text-align:center; padding: 4rem 2rem; color: var(--text-dim); }
        .m-footer .title { font-family: 'IM Fell English', serif; color: var(--gold); font-size: 1.8rem; margin-bottom: 0.6rem; }
        .m-footer small { display:block; margin-top: 1rem; font-family: 'Courier Prime', monospace; color: var(--text-dim); }
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

      <div className="m-viewport">
        <section className="hero" aria-label="Hero">
          <div className="hero-inner">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.3 } } }}>
              <motion.div variants={sectionVariant}><div className="top-label">mohona.mahim.live  .  a page that will never be deleted</div></motion.div>
              <motion.div variants={sectionVariant} style={{ marginTop: 8 }}>
                <h1 className="name" aria-hidden><span className="latin">Mohona</span><span className="bangla">মোহনা</span></h1>
              </motion.div>
              <motion.div variants={sectionVariant}><div className="subtitle">She is one day older than me.
She always was one step ahead.
And I have spent every day since Class Six
carrying something I never said out loud.</div></motion.div>
            </motion.div>
            <div className="scroll-line" role="presentation" />
          </div>
        </section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER I  .  CLASS SIX  .  DEMRA</div>
            <h2 className="m-heading">The First Day I Saw Her</h2>
            <div className="prose">It was the first month of Class Six at Samsul Haque School and College in Demra.
New school. New people. Two shifts. A shared microbus going home.
He saw her once in that microbus.
He never forgot her after that.
Not her name. Not her face. Not the feeling of that one moment.
He never spoke to her properly about any of it.
He just carried her, quietly, from that day forward.
A far-side love. Silent. Unannounced. Completely real.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER II  .  THE MOST BEAUTIFUL THING</div>
            <div className="eye-wrap" aria-hidden>{EyeSVG()}</div>
            <h2 className="m-heading">Those Eyes</h2>
            <div className="prose">He had a few photos of her. Not many.
He would sit alone late at night and stare at those photos
the way you look at a real person sitting right across from you.
Sometimes he would spend one hour. Sometimes two. Just looking.
And sometimes he cried. Not softly. Really hard.
Not because he was broken. Just because loving something that completely
without being able to say it
has to go somewhere.
Her eyes always held him the longest.
Out of everything, out of everyone, out of every face he has ever seen,
her eyes are the most beautiful thing he has witnessed in this entire world.
That is not a metaphor. That is just true.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER III  .  MIDNIGHT</div>
            <div className="infty" aria-hidden>∞</div>
            <div style={{ fontFamily: "'Courier Prime', monospace", color: COLORS.textDim, textAlign: "center", marginBottom: 12 }}>nights spent thinking about her</div>
            <h2 className="m-heading">Philosophy at Midnight</h2>
            <div className="prose">There is a kind of night that belongs only to people who love from a distance.
The world gets quiet. Everyone is asleep.
And you sit there with her photo and your own thoughts
and the distance between you and her feels like the entire universe.
He lived inside those nights for years.
He would remember her name. Her face. Her eyes.
And the thinking would deepen into something beyond sadness,
closer to philosophy. Questions about love. About what it means
that one person can change you this completely
without ever knowing they did.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER IV  .  CLASS SIX TO CLASS EIGHT</div>
            <h2 className="m-heading">Everything I Wrote Was For Her</h2>

            <div className="timeline" role="list">
              <div className="timeline-entry" role="listitem">
                <div className="timeline-dot" />
                <div style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 600, color: COLORS.text }}>Class VI</div>
                <div className="prose">He saw her in the microbus on the first month of high school.
He never forgot her after that moment.</div>
              </div>

              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 600, color: COLORS.text }}>Class VI to VIII</div>
                <div className="prose">Every social media post. Every story. Every caption. Every line.
Secretly, privately, completely dedicated to her.
She never knew.</div>
              </div>

              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 600, color: COLORS.text }}>Class VIII</div>
                <div className="prose">She left.
She moved on.
His world did not.</div>
              </div>

              <div className="timeline-entry">
                <div className="timeline-dot" />
                <div style={{ fontFamily: "'Courier Prime', monospace", fontWeight: 600, color: COLORS.text }}>Six Years Later</div>
                <div className="prose">He never entered a relationship after her.
He never will.
She is happy now. That is enough.</div>
              </div>
            </div>

            <div className="prose">He had a habit, or maybe a delusion, that she was always watching.
That when he posted something, she would see it.
That she would feel something when she did.
Would she be proud? Would it matter to her?
He never found out. He just kept writing, toward her,
even when she had no idea.</div>
          </motion.div>
        </motion.section>

        <motion.section className="section" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          <motion.div variants={sectionVariant}>
            <div className="label">CHAPTER V  .  NOW</div>
            <h2 className="m-heading">I Am Glad She Is Happy</h2>
            <div className="prose">She is with someone else now.
She is happy.
And Mahin, honestly, genuinely, is glad about that.
No jealousy. No bitterness. Nothing like that.
He loves her in a way that does not need her to come back.
He will not interrupt her life. He will not appear.
He will not make things harder for her.
He will watch from a long distance, quietly, invisibly,
and feel glad every time life is good to her.
Six years have passed.
She moved on in Class Eight.
He is still watching from far away.
That is what this kind of love looks like.
It does not ask for anything back.</div>
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
            <div className="label">A LETTER  .  FOR মোহনা</div>
            <h2 className="m-heading">If You Are Ever Reading This</h2>
            <div className="letter" role="article" aria-labelledby="letter-heading">{`মোহনা,

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

Mahin
mahim.live`}</div>
            <div className="letter-closing">She was Class Six. She was a microbus. She was one day older than me.
She was everything.</div>
          </motion.div>
        </motion.section>

        <footer className="m-footer" role="contentinfo">
          <div className="title">Mohona  .  মোহনা</div>
          <div>Samsul Haque School and College, Demra</div>
          <div>Made by M. Mahimmiraj  .  mahim.live  .  mohona.mahim.live</div>
          <div>This page will never be deleted.</div>
          <small>{nowYear}</small>
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
