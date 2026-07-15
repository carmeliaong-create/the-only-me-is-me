"use client";

import { useEffect, useMemo, useState } from "react";

type Choice = { label: string; response?: string };
type Scene = { part: string; title: string; body?: string; choices: Choice[] };

const scenes: Scene[] = [
  {
    part: "I / GUILT + TIME",
    title: "THE ROOM IS QUIET. THE CLOCK IS NOT.",
    body: "You could tell them. You could let the moment close.",
    choices: [
      { label: "Say nothing.", response: "YOU SAID NOTHING. THE MOMENT CLOSED." },
      { label: "Tell them: “You make me want to stop running.”", response: "YOU SAID IT. NOW IT EXISTS." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "MORNING ARRIVES.",
    body: "It does not ask what happened.",
    choices: [
      { label: "Turn away.", response: "THE LIGHT MOVES ON." },
      { label: "Stay still.", response: "IT REACHES YOU. NO VERDICT FOLLOWS." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "A CHILD ASKS IF YOU ARE OLD.",
    choices: [
      { label: "“No. I’m cool.”", response: "THE CHILD DOES NOT BELIEVE YOU." },
      { label: "“WE ARE ALL DECAYING.”", response: "THE CHILD LEAVES." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "THE SKETCH IS UNFINISHED.",
    body: "You no longer remember what it was meant to become.",
    choices: [
      { label: "Close the notebook.", response: "THE PAGE REMAINS UNFINISHED." },
      { label: "Leave it open.", response: "NOTHING COMPLETES ITSELF." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "THE SUN IS SETTING.",
    body: "You are late leaving work.",
    choices: [
      { label: "Keep walking.", response: "YOU MISS IT." },
      { label: "Stop.", response: "YOU WATCH. IT ENDS ANYWAY." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "A STRANGER IS CRYING ON THE TRAIN.",
    body: "You do not know why.",
    choices: [
      { label: "Look at them.", response: "THEY SEE YOU SEE THEM." },
      { label: "Leave a napkin beside them.", response: "YOU LEAVE BEFORE IT MEANS MORE." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "YOU FIND AN OLD PHOTO OF YOURSELF.",
    body: "They do not know what happens next.",
    choices: [
      { label: "Apologize.", response: "THE PHOTO CANNOT ABSOLVE YOU." },
      { label: "Say, “I survived.”", response: "THE PHOTO CANNOT ANSWER." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "SOMEONE ASKS HOW YOU ARE.",
    body: "A response is expected.",
    choices: [
      { label: "“Fine.”", response: "THE EXCHANGE COMPLETES." },
      { label: "“Not well.”", response: "THE SCRIPT BREAKS." },
      { label: "Make a joke.", response: "THEY LAUGH. OR THEY DO NOT." },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "IT IS THREE IN THE AFTERNOON.",
    body: "You are still in bed.",
    choices: [
      { label: "Stay there.", response: "ANOTHER HOUR PASSES." },
      { label: "Get up.", response: "THE DAY DOES NOT RESTART." },
      { label: "Say, “At least it isn’t tomorrow.”", response: "NOT YET." },
    ],
  },
  {
    part: "II / GRIEF",
    title: "THEIR HANDWRITING SURVIVED THEM.",
    body: "The note says nothing important.",
    choices: [
      { label: "Laugh at how messy it is.", response: "FOR A SECOND, THEY ARE ORDINARY AGAIN." },
      { label: "Trace the letters.", response: "THE INK HOLDS. THEY DO NOT." },
    ],
  },
  {
    part: "II / GRIEF",
    title: "THEIR SONG STARTS PLAYING.",
    body: "You did not choose it.",
    choices: [
      { label: "Let it play.", response: "THE SONG ENDS." },
      { label: "Speak to the room.", response: "NO ONE ANSWERS." },
    ],
  },
  {
    part: "II / GRIEF",
    title: "YOU DREAM THEY ARE ALIVE.",
    body: "Then you wake up.",
    choices: [
      { label: "Try to go back.", response: "YOU CANNOT RETURN ON COMMAND." },
      { label: "Say, “Thank you.”", response: "THE ROOM STAYS EMPTY." },
    ],
  },
  {
    part: "II / GRIEF",
    title: "THEIR THINGS ARE STILL HERE.",
    body: "A jacket. A book. A scarf.",
    choices: [
      { label: "Keep something.", response: "YOU TAKE THE OBJECT. NOT THE PERSON." },
      { label: "Promise to care for it.", response: "THE OBJECT ACCEPTS NO PROMISES." },
    ],
  },
  {
    part: "II / GRIEF",
    title: "SOMEONE SAYS THEY WOULD NOT WANT YOU SAD.",
    choices: [
      { label: "Be sad.", response: "THE DEAD DO NOT SET TERMS." },
    ],
  },
  {
    part: "II / GRIEF",
    title: "YOU LAUGH. THEN REMEMBER.",
    body: "They would have liked this.",
    choices: [
      { label: "Keep laughing.", response: "THE MOMENT HOLDS BOTH." },
      { label: "Say what they would have said.", response: "YOUR VOICE HAS TO DO." },
    ],
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reflection, setReflection] = useState<string | null>(null);
  const [path, setPath] = useState<number[]>([]);
  const finished = index >= scenes.length;
  const scene = scenes[index];
  const progress = useMemo(() => Math.round((index / scenes.length) * 100), [index]);

  function choose(choiceIndex: number) {
    if (!scene || reflection) return;
    setPath((p) => [...p, choiceIndex]);
    setReflection(scene.choices[choiceIndex].response ?? "CHOICE RECORDED. TIME CONTINUES.");
  }

  function advance() {
    setReflection(null);
    setIndex((i) => i + 1);
  }

  function restart() {
    setStarted(false);
    setIndex(0);
    setPath([]);
    setReflection(null);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!started && (e.key === "Enter" || e.key === " ")) setStarted(true);
      else if (reflection && (e.key === "Enter" || e.key === " ")) advance();
      else if (started && !finished && !reflection && /^[1-3]$/.test(e.key)) {
        const n = Number(e.key) - 1;
        if (n < scene.choices.length) choose(n);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className="screen">
      <div className="noise" aria-hidden="true" />
      <header>
        <button className="wordmark" onClick={restart}>TIME PASSES ANYWAY</button>
        {started && !finished && <span>{String(index + 1).padStart(2, "0")} / {scenes.length}</span>}
      </header>

      {!started ? (
        <section className="intro">
          <p className="eyebrow">A SHORT GAME ABOUT TIME, GUILT + LOSS</p>
          <h1>THE CLOCK<br />DOES NOT<br />NEED YOU.</h1>
          <p className="lede">Choose. Read the result. Continue.</p>
          <button className="primary" onClick={() => setStarted(true)}>BEGIN <span>↵</span></button>
          <p className="hint">15 SCENES · 5–7 MINUTES</p>
        </section>
      ) : finished ? (
        <section className="ending">
          <p className="eyebrow">RUN COMPLETE</p>
          <h1>NOTHING<br />RESOLVED.</h1>
          <p className="closing">You chose. Time passed. What is gone remains gone. You remain.</p>
          <p className="final-message"><strong>I love you. I always will.</strong><br /><em>Take care, my friend.</em></p>
          <div className="pathline" aria-label="Your path">{path.map((p, i) => <i key={i} className={p === 0 ? "dim" : ""} />)}</div>
          <button className="primary" onClick={restart}>RESTART <span>↺</span></button>
        </section>
      ) : (
        <section className="scene" aria-live="polite">
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>
          {!reflection ? <>
            <p className="eyebrow">PART {scene.part}</p>
            <h2>{scene.title}</h2>
            {scene.body && <p className="bodycopy">{scene.body}</p>}
            <div className="choices">
              {scene.choices.map((choice, i) => (
                <button key={choice.label} onClick={() => choose(i)}>
                  <b>› {i + 1}</b>
                  <span>{choice.label}</span>
                  <em>_</em>
                </button>
              ))}
            </div>
            <p className="hint">PRESS 1–{scene.choices.length}</p>
          </> : <div className="reflection">
            <p className="eyebrow">RESULT</p>
            <h2>{reflection}</h2>
            <button className="primary" onClick={advance}>
              {index === scenes.length - 1 ? "VIEW RUN" : "NEXT"} <span>↵</span>
            </button>
          </div>}
        </section>
      )}

      <footer><span>TIME DOES NOT REQUIRE YOUR CONSENT.</span><span>© NOW</span></footer>
    </main>
  );
}
