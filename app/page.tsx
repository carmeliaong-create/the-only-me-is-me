"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Choice = { label: string; response?: string };
type Scene = { part: string; title: string; body?: string; choices: Choice[] };

const scenes: Scene[] = [
  {
    part: "I / GUILT + TIME",
    title: "you are sitting beside someone you love. the clock is loud.",
    body: "you could tell them what they mean to you. you could also wait. waiting feels harmless while you are doing it.",
    choices: [
      {
        label: "say nothing.",
        response: "you were afraid. that is true. you loved them. that is also true. one truth does not cancel the other.",
      },
      {
        label: "tell them: “you make me feel like i could stop running.”",
        response: "you said it. now it exists outside you. this is what you wanted. you are still afraid.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "morning arrives. you have not slept.",
    body: "the light comes in through the blinds. it is not forgiving you. it is not accusing you. it is light.",
    choices: [
      {
        label: "turn away.",
        response: "you turn away because you are tired. later, you may call it avoidance. there are always more precise charges available.",
      },
      {
        label: "let it reach you.",
        response: "you lie still. nothing changes. for a moment, you do not require change.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "a child asks if you are old.",
    body: "you are not old. you are older than you were. this has been happening the entire time.",
    choices: [
      {
        label: "say, “no. i’m cool.”",
        response: "the child does not believe you. this does not matter. you think about it later.",
      },
      {
        label: "say, “we are all decaying at the same rate.”",
        response: "this is not strictly true. it feels true enough. the child leaves.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "you find an unfinished sketch.",
    body: "you remember caring about it. you do not remember why you stopped. you begin looking for a moral explanation.",
    choices: [
      {
        label: "close the notebook.",
        response: "you did not finish it. you call it laziness. later, you call it exhaustion. the name changes when you want grace.",
      },
      {
        label: "leave it open.",
        response: "it remains unfinished. it also remains. you are not sure which fact matters more.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "you leave work while the sun is setting.",
    body: "you could stop. you have things to do. the screen will wait.",
    choices: [
      {
        label: "keep walking.",
        response: "you miss it. there will be another sunset. this is how most losses become acceptable.",
      },
      {
        label: "stop and watch.",
        response: "you notice it. it ends anyway. noticing was not useless. it was also not enough to save it.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "a stranger is crying on the train.",
    body: "you do not know them. you are relieved by this. you are ashamed of the relief.",
    choices: [
      {
        label: "look at them.",
        response: "they see that you saw. you do nothing else. it may have been kind. kindness is sometimes the smallest available action.",
      },
      {
        label: "leave a napkin beside them.",
        response: "you leave before they can thank you. you prefer kindness without witnesses. you prefer many things without witnesses.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "you find an old photograph of yourself.",
    body: "they look hopeful. you know what happens to them.",
    choices: [
      {
        label: "say, “i’m sorry.”",
        response: "you begin listing the ways you failed them. there are enough. there are always enough.",
      },
      {
        label: "say, “i’m still here.”",
        response: "this sounds like a defense. it may also be an achievement. you do not know how much credit survival deserves.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "someone asks how you are.",
    body: "you could answer honestly. you could be polite. you have confused these before.",
    choices: [
      {
        label: "say, “i’m fine.”",
        response: "the conversation continues. no one is harmed. you wonder whether this makes the lie harmless.",
      },
      {
        label: "say, “not well.”",
        response: "they pause. now your pain has entered the room and become partly their problem. you apologize for this without speaking.",
      },
      {
        label: "make a joke.",
        response: "they laugh. you laugh. the truth survives in a form everyone can tolerate.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "it is three in the afternoon. you are still in bed.",
    body: "you have lost most of the day. you begin calculating what a better person would have done with it.",
    choices: [
      {
        label: "stay there.",
        response: "another hour passes. now there is more evidence. guilt is efficient this way.",
      },
      {
        label: "get up.",
        response: "you get up late. the day is not restored. you do one thing. then another. this is either discipline or a very small life.",
      },
      {
        label: "say, “at least i didn’t miss tomorrow.”",
        response: "you laugh. the ceiling does not. you get up anyway. you decide this counts. you are always asking what counts.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "you find their handwriting on an old note.",
    body: "the note says nothing important. this makes it worse. they expected to write again.",
    choices: [
      {
        label: "laugh at how messy it is.",
        response: "for a second, they are not dead. they are only bad at handwriting. then they are dead again.",
      },
      {
        label: "trace the letters.",
        response: "you follow the pressure of their hand. you arrive where their hand stopped. there is nowhere else to go.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "a song they loved begins to play.",
    body: "you did not choose it. this feels meaningful because you need things to feel meaningful.",
    choices: [
      {
        label: "let it play.",
        response: "you listen for them inside it. you find yourself instead. this is not what you wanted.",
      },
      {
        label: "speak to the empty room.",
        response: "you say their name. no one answers. you knew no one would. you said it anyway.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "you dream they are alive.",
    body: "in the dream, nothing is repaired because nothing happened. then you wake up and everything has happened again.",
    choices: [
      {
        label: "try to fall back asleep.",
        response: "you cannot return on command. memory is not a place. sleep is not absolution. you keep trying.",
      },
      {
        label: "say, “thank you for visiting.”",
        response: "you do not know who you are thanking. there may be no one. gratitude occurs without a recipient.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "their things are still here.",
    body: "a jacket. a book. a scarf. ordinary objects made difficult by ownership.",
    choices: [
      {
        label: "keep something small.",
        response: "you take the object. you tell yourself it is not stealing. the dead cannot grant permission. the dead cannot object.",
      },
      {
        label: "promise to care for it.",
        response: "you make a promise to an object because objects are easier to keep than people. this is not your fault. you feel guilty anyway.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "someone says they would not want you to be sad.",
    body: "they are trying to help. you resent them for failing. you resent yourself for the resentment.",
    choices: [
      {
        label: "feel sad anyway.",
        response: "you do. grief continues without permission. so does the day. neither asks what they would have wanted.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "you are laughing. then you remember them.",
    body: "they would have loved this. you think this every time joy arrives without them.",
    choices: [
      {
        label: "keep laughing.",
        response: "you laugh for yourself. then for them. then you feel guilty for turning your life into a memorial. you keep laughing.",
      },
      {
        label: "say what they would have said.",
        response: "you hear them in your own voice. this comforts you. this frightens you. you say it again.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "you pass a place you once knew by heart.",
    body: "the building is still there. the people inside it are not the people you remember. you had expected the place to keep your version of itself.",
    choices: [
      {
        label: "go inside.",
        response: "the room is smaller. you are disappointed by this, as though memory had promised accurate measurements.",
      },
      {
        label: "keep walking.",
        response: "you preserve the room by refusing to see it. this is one way of caring for something. it is also one way of losing it twice.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "someone forgives you before you finish apologizing.",
    body: "you had prepared evidence. you had prepared a sentence. without punishment, you do not know where to put either one.",
    choices: [
      {
        label: "believe them.",
        response: "you try. belief arrives slowly. you have practiced the opposite for longer.",
      },
      {
        label: "explain why they should not.",
        response: "you ask them to offer clemency. they do not. you wonder why their judgment only counts when it hurts.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "you notice that you have become someone your younger self needed.",
    body: "not entirely. not consistently. enough to recognize the shape.",
    choices: [
      {
        label: "allow yourself to be proud.",
        response: "pride feels suspicious. you let it stay for one minute. then another. nothing terrible happens.",
      },
      {
        label: "list what is still wrong.",
        response: "the list is accurate. it is not complete. accuracy and completeness have never been the same thing.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "the same kind of morning arrives again.",
    body: "light through the blinds. an unfinished day. you are not the person you were the first time. you are not free of them either.",
    choices: [
      {
        label: "turn away.",
        response: "you turn away. this time, you do not build a case against yourself. you are tired. the light will still be there.",
      },
      {
        label: "let it reach you.",
        response: "the light reaches you exactly as before. you receive it differently. from inside, change looks like this.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "you are sitting beside someone you love. the clock is loud.",
    body: "you have been here before. not here exactly. time does not circle, but you do. returning shows you what changed.",
    choices: [
      {
        label: "say nothing for a moment. then speak.",
        response: "the silence was not failure. the speaking is not rescue. both belong to you. you tell them anyway.",
      },
      {
        label: "take their hand.",
        response: "you cannot stop the clock. you do not need to. for one moment, you are not asking the moment to last in order to let it matter.",
      },
    ],
  },
];

function TypeText({ text, as: Tag = "h2", className = "", speed = 86 }: { text: string; as?: "h1" | "h2" | "p"; className?: string; speed?: number }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    setShown("");
    let position = 0;
    const timer = window.setInterval(() => {
      position += 1;
      setShown(text.slice(0, position));
      if (position >= text.length) window.clearInterval(timer);
    }, speed);
    return () => window.clearInterval(timer);
  }, [speed, text]);

  return <Tag className={`typed ${className}`} aria-label={text}><span aria-hidden="true">{shown}<span className="cursor">█</span></span></Tag>;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reflection, setReflection] = useState<string | null>(null);
  const [path, setPath] = useState<number[]>([]);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const finished = index >= scenes.length;
  const scene = scenes[index];
  const progress = useMemo(() => Math.round((index / scenes.length) * 100), [index]);

  function startMusic() {
    if (audioRef.current) {
      void contextRef.current?.resume();
      void audioRef.current.play();
      setSoundOn(true);
      return;
    }
    const audio = new Audio("/audio/fading-pixel.mp3");
    audio.loop = true;
    audio.volume = 0.46;
    audio.preload = "auto";
    audioRef.current = audio;
    const context = new AudioContext();
    contextRef.current = context;
    const source = context.createMediaElementSource(audio);
    const highpass = context.createBiquadFilter();
    const lowShelf = context.createBiquadFilter();
    const hollowMid = context.createBiquadFilter();
    const lowpass = context.createBiquadFilter();
    const delay = context.createDelay(1);
    const echo = context.createGain();
    const dry = context.createGain();
    highpass.type = "highpass";
    highpass.frequency.value = 190;
    highpass.Q.value = 0.7;
    lowShelf.type = "lowshelf";
    lowShelf.frequency.value = 520;
    lowShelf.gain.value = -9;
    hollowMid.type = "peaking";
    hollowMid.frequency.value = 980;
    hollowMid.Q.value = 0.85;
    hollowMid.gain.value = -5.5;
    lowpass.type = "lowpass";
    lowpass.frequency.value = 3900;
    lowpass.Q.value = 1.15;
    dry.gain.value = 0.72;
    delay.delayTime.value = 0.34;
    echo.gain.value = 0.11;
    source.connect(highpass).connect(lowShelf).connect(hollowMid).connect(lowpass);
    lowpass.connect(dry).connect(context.destination);
    lowpass.connect(delay).connect(echo).connect(context.destination);
    void context.resume();
    void audio.play();
    setSoundOn(true);
  }

  function toggleMusic() {
    if (!audioRef.current) return startMusic();
    if (soundOn) audioRef.current.pause();
    else void audioRef.current.play();
    setSoundOn(!soundOn);
  }

  function begin() {
    startMusic();
    setStarted(true);
  }

  function choose(choiceIndex: number) {
    if (!scene || reflection) return;
    setPath((p) => [...p, choiceIndex]);
    setReflection(scene.choices[choiceIndex].response ?? "you chose. now you will explain the choice to yourself.");
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
      if (!started && (e.key === "Enter" || e.key === " ")) begin();
      else if (reflection && (e.key === "Enter" || e.key === " ")) advance();
      else if (started && !finished && !reflection && /^[1-3]$/.test(e.key)) {
        const n = Number(e.key) - 1;
        if (n < scene.choices.length) choose(n);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    void contextRef.current?.close();
  }, []);

  return (
    <main className="screen">
      <div className="noise" aria-hidden="true" />
      <header>
        <button className="wordmark" onClick={restart}>C:\MEMORY\TIME.EXE</button>
        <div className="status">
          <span className="connection">LINK:14.4K</span>
          <button className="sound" onClick={toggleMusic} aria-label={soundOn ? "Mute music" : "Play music"}>{soundOn ? "MUSIC: ON" : "MUSIC: OFF"}</button>
          {started && !finished && <span>{String(index + 1).padStart(2, "0")} / {scenes.length}</span>}
        </div>
      </header>

      {!started ? (
        <section className="intro">
          <p className="eyebrow">PERSONAL SYSTEM / SESSION 01<br />A GAME ABOUT GUILT, TIME + GRIEF</p>
          <TypeText as="h1" text={"YOU DO NOT\nHAVE TO\nJUSTIFY YOURSELF."} />
          <p className="byline">by carm</p>
          <p className="lede">there is no correct path, but you can look for one. you will call the looking progress.</p>
          <button className="primary" onClick={begin}>[ ENTER SYSTEM ] <span>↵</span></button>
          <p className="hint">20 SCENES · 8–10 MINUTES · LOCAL MEMORY ENABLED</p>
        </section>
      ) : finished ? (
        <section className="ending">
          <p className="eyebrow">YOUR PATH</p>
          <h1>YOU CHOSE.<br />TIME PASSED.</h1>
          <p className="closing">you acted. you explained. you accused yourself. you defended yourself. nothing was settled. time did not ask for a verdict. you returned to the beginning and found the room unchanged. you were not. you are still here. this is not a defense. it is only what happened.</p>
          <p className="final-message"><strong>I love you. I always will.</strong><br /><em>Take care, my friend.</em></p>
          <div className="pathline" aria-label="Your path">{path.map((p, i) => <i key={i} className={p === 0 ? "dim" : ""} />)}</div>
          <button className="primary" onClick={restart}>BEGIN AGAIN <span>↺</span></button>
        </section>
      ) : (
        <section className="scene" aria-live="polite">
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>
          {!reflection ? <>
            <p className="eyebrow">DIR / PART_{scene.part} / RECORD_{String(index + 1).padStart(2, "0")}</p>
            <TypeText key={`question-${index}`} text={scene.title} />
            {scene.body && <TypeText key={`body-${index}`} as="p" className="bodycopy" text={scene.body} speed={38} />}
            <div className="choices">
              {scene.choices.map((choice, i) => (
                <button key={choice.label} onClick={() => choose(i)}>
                  <b>[0{i + 1}]</b>
                  <span>{choice.label}</span>
                  <em>_</em>
                </button>
              ))}
            </div>
            <p className="hint">SELECT RECORD: PRESS 1–{scene.choices.length}</p>
          </> : <div className="reflection">
            <p className="eyebrow">YOU CHOSE</p>
            <TypeText key={`result-${index}`} text={reflection} />
            <button className="primary" onClick={advance}>
              {index === scenes.length - 1 ? "SEE YOUR PATH" : "CONTINUE"} <span>↵</span>
            </button>
          </div>}
        </section>
      )}

      <footer><span>SYS/1997 · TIME PASSES ANYWAY.</span><span>MEM: 640K · © NOW</span></footer>
    </main>
  );
}
