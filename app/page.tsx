"use client";

import { useEffect, useMemo, useState } from "react";

type Choice = { label: string; response?: string };
type Scene = { part: string; title: string; body?: string; choices: Choice[] };

const scenes: Scene[] = [
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "THE CLOCK IS LOUDER WHEN NO ONE ELSE IS IN THE ROOM.", body: "You look at someone you love and recognize, suddenly, the possibility of rest. Do you—", choices: [
    { label: "Say nothing. The moment passes, although the feeling does not.", response: "THE MOMENT PASSES. BUT YOU LOVED THEM ANYWAY. I WONDER IF THAT'S ENOUGH." },
    { label: "Blurt out, “You make me feel like I could stop running.”", response: "FOR ONCE, YOU LET THE FEELING ARRIVE BEFORE THE FEAR COULD NAME IT." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "MORNING ENTERS WITHOUT ASKING WHAT HAPPENED THE NIGHT BEFORE.", body: "Light moves through the blinds with a purity that feels undeserving. It lands on your face anyway. Do you—", choices: [
    { label: "Turn away.", response: "THE DARK DOESN'T ASK YOU TO EXPLAIN YOURSELF." },
    { label: "Let it reach you. Remain still long enough to discover that softness does not always have to be earned.", response: "WARMTH, IT TURNS OUT, DOESN'T KEEP A LEDGER." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "A CHILD POINTS AT YOU AND ASKS, “ARE YOU OLD?”", choices: [
    { label: "“No, I’m cool.”", response: "THE CHILD LOOKS UNCONVINCED. YOU SURVIVE." },
    { label: "Whisper, “We are all decaying at approximately the same rate.”", response: "THE CHILD LEAVES WITH A NEW AND UNNECESSARY AWARENESS OF TIME." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "YOU FIND AN UNFINISHED SKETCH IN YOUR OLD NOTEBOOK.", body: "You remember loving it once but can’t remember where you were going with it. Do you—", choices: [
    { label: "Close the notebook. Not everything has to be finished to matter.", response: "THE UNFINISHED THING KEEPS ITS DIGNITY." },
    { label: "Leave it as it is. It’s honest this way.", response: "A FRAGMENT IS STILL EVIDENCE THAT YOU WERE HERE." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "THE SKY IS BURNT ORANGE, EXCESSIVE AND TEMPORARY.", body: "You leave the office just as the sun is setting. Do you—", choices: [
    { label: "Keep walking. There will be another sunset.", response: "THERE WILL BE. BUT NOT THIS ONE." },
    { label: "Stop and watch until it disappears.", response: "I WON THIS ONE, TIME. I NOTICED." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "A STRANGER IS CRYING QUIETLY ON THE TRAIN.", body: "You cannot repair the cause. You cannot know what it is. Is privacy another name for looking away?", choices: [
    { label: "Meet their eyes for one second—long enough to register that they are there.", response: "SOMETIMES, NOTICING IS ENOUGH—A QUIET ACKNOWLEDGMENT." },
    { label: "Place a crumpled napkin beside them and leave.", response: "KINDNESS CAN BE ANONYMOUS." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "YOU FIND AN OLD PHOTOGRAPH OF YOURSELF.", body: "The person in it has not yet lived through what you now use to explain them. Do you—", choices: [
    { label: "Apologize: “I’m sorry for what I allowed to happen to us.”", response: "…BUT I WAS DOING MY BEST, AND THE PHOTO DOESN'T ARGUE." },
    { label: "Report back: “You would be proud of me. I am still here.”", response: "THE PERSON IN THE PHOTO BELIEVES YOU." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "SOMEONE ASKS HOW YOU ARE DOING.", body: "The question is usually procedural. A complete answer would stop the machinery. Do you—", choices: [
    { label: "Say, “I’m fine.”", response: "SOMETIMES LANGUAGE EXISTS PRIMARILY TO KEEP THE DAY MOVING." },
    { label: "Say, “Not well, but I am still trying.”", response: "THE MACHINERY PAUSES. NOTHING BREAKS." },
    { label: "Laugh. “We’re all on fire a little, right?”", response: "LAUGHING IS BREATHING, AND BREATHING IS SURVIVING." },
  ]},
  { part: "I / GUILT + THE PASSAGE OF TIME", title: "YOU WAKE UP AT THREE IN THE AFTERNOON.", body: "The ceiling stares back as you tally the hours already gone.", choices: [
    { label: "Remain in bed. Beginning late feels worse than not beginning.", response: "THE DAY WAITS WITHOUT ACCUSING YOU." },
    { label: "Say, “You win, time,” then get up anyway.", response: "LOSING DOESN'T MEAN YOU CAN'T STILL PLAY." },
    { label: "Squint at the sun. “At least I didn’t miss tomorrow.”", response: "TIME IS A HUMAN INVENTION. SO IS GUILT." },
  ]},
  { part: "II / GRIEF", title: "GRIEF IS THE SHIP, SINKING BENEATH YOU.", body: "The lifeboats are there, but stepping in feels like leaving them behind. You find their handwriting on an old note. Do you—", choices: [
    { label: "Smile through tears. Their handwriting is messier than you remembered.", response: "IT IS PROOF THAT THEY WERE REAL. YOU DIDN'T IMAGINE THEM." },
    { label: "Trace the letters and whisper, “You were here.”", response: "THE PAPER HOLDS THE PRESSURE OF THEIR HAND." },
  ]},
  { part: "II / GRIEF", title: "A SONG THEY LOVED BEGINS TO PLAY.", body: "Suddenly it feels like they’re sitting next to you again. Do you—", choices: [
    { label: "Close your eyes and let it play.", response: "THE ACHE IS JUST LOVE WEARING ITS HEAVIEST COAT." },
    { label: "Say to the empty room, “You really loved this one, didn’t you?”", response: "THE EMPTY ROOM LISTENS." },
  ]},
  { part: "II / GRIEF", title: "YOU DREAM ABOUT THEM.", body: "For a moment, they’re next to you. You wake with the lingering feeling of their voice. Do you—", choices: [
    { label: "Try to fall back asleep. Ask your brain to let them stay.", response: "THE DREAM IS ALREADY CLOSING ITS DOOR." },
    { label: "Lie still and whisper, “Thank you for visiting.”", response: "FOR A MOMENT, THE SILENCE FEELS WARM." },
  ]},
  { part: "II / GRIEF", title: "YOU’RE SORTING THROUGH THEIR OLD BELONGINGS.", body: "A jacket, a favorite book, a scarf that still smells like them. Do you—", choices: [
    { label: "Keep something small—a pen, a bookmark, a piece of their life.", response: "SHHHH… YOU SLIP IT INTO YOUR POCKET LIKE A SECRET." },
    { label: "Whisper, “I’ll take care of this for you.”", response: "THE ORDINARY OBJECT BECOMES SACRED." },
  ]},
  { part: "II / GRIEF", title: "SOMEONE SAYS, “THEY WOULDN’T WANT YOU TO BE SAD.”", choices: [
    { label: "Feel sad anyway.", response: "GRIEF DOESN'T LISTEN TO LOGIC. YOU ARE ALLOWED TO MISS THEM." },
  ]},
  { part: "II / GRIEF", title: "YOU’RE LAUGHING AT SOMETHING RIDICULOUS.", body: "Then it catches in your throat: how much they would have loved this moment. Do you—", choices: [
    { label: "Laugh harder. You’re laughing for both of you.", response: "FOR A SECOND, IT FEELS LIKE THEY'RE SITTING NEXT TO YOU AGAIN." },
    { label: "Say something you know would’ve made them laugh.", response: "MEMORY DOESN'T HAVE TO BE PERFECT TO BE TRUE." },
  ]},
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
    setReflection(scene.choices[choiceIndex].response ?? "YOU CHOSE. TIME CONTINUES.");
  }
  function advance() { setReflection(null); setIndex((i) => i + 1); }
  function restart() { setStarted(false); setIndex(0); setPath([]); setReflection(null); }

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
          <p className="eyebrow">AN INTERACTIVE MEDITATION ON TIME, GUILT + GRIEF</p>
          <h1>THE CLOCK<br />IS LOUDER<br />WHEN YOU’RE ALONE.</h1>
          <p className="lede">This is not a test. Nothing here can tell you who you are. It can only ask what you noticed while time was passing.</p>
          <button className="primary" onClick={() => setStarted(true)}>BEGIN <span>↵</span></button>
          <p className="hint">HEADPHONES RECOMMENDED · 8–10 MINUTES</p>
        </section>
      ) : finished ? (
        <section className="ending">
          <p className="eyebrow">YOUR PATH FORWARD</p>
          <h1>TAKE CARE,<br />MY FRIEND.</h1>
          <p className="closing">Grief isn’t something you get over. It is something you carry, tucked into all the little spaces they left behind. The details fade first. The love stays—stubborn and unrelenting.</p>
          <div className="pathline" aria-label="Your path">{path.map((p, i) => <i key={i} className={p === 0 ? "dim" : ""} />)}</div>
          <button className="primary" onClick={restart}>BEGIN AGAIN <span>↺</span></button>
        </section>
      ) : (
        <section className="scene" aria-live="polite">
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>
          {!reflection ? <>
            <p className="eyebrow">PART {scene.part}</p>
            <h2>{scene.title}</h2>
            {scene.body && <p className="bodycopy">{scene.body}</p>}
            <div className="choices">
              {scene.choices.map((choice, i) => <button key={choice.label} onClick={() => choose(i)}><b>› {i + 1}</b><span>{choice.label}</span><em>_</em></button>)}
            </div>
            <p className="hint">PRESS 1–{scene.choices.length} TO CHOOSE</p>
          </> : <div className="reflection">
            <p className="eyebrow">THE MOMENT PASSES</p>
            <h2>{reflection}</h2>
            <button className="primary" onClick={advance}>{index === scenes.length - 1 ? "SEE YOUR PATH" : "CONTINUE"} <span>↵</span></button>
          </div>}
        </section>
      )}
      <footer><span>THE DAY IS NOT ACCUSING YOU.</span><span>© NOW</span></footer>
    </main>
  );
}
