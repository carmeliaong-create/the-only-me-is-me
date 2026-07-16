"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Choice = { label: string; response?: string };
type Scene = { part: string; title: string; body?: string; choices: Choice[]; intentional?: boolean };

const SESSION_COUNT_KEY = "time-passes-anyway-session-count";
const LAST_ROUTE_KEY = "time-passes-anyway-last-route";

const scenes: Scene[] = [
  {
    part: "I / GUILT + TIME",
    title: "you sit beside someone you love. neither of you speaks. the clock fills the silence.",
    body: "you could tell them what they mean to you. you could also wait. waiting feels harmless while you are doing it.",
    choices: [
      {
        label: "say nothing.",
        response: "you were afraid. that is true. you loved them. that is also true. one truth does not cancel the other.",
      },
      {
        label: "say something.",
        response: "you said it. now it exists outside you. this is what you wanted. you are still afraid.",
      },
    ],
  },
  {
    part: "I / GUILT + TIME",
    title: "morning comes. you have not slept.",
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
        response: "the child does not believe you. you think about it later.",
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
    body: "the date in the corner is six years old. you remember caring about it. you do not remember why you stopped.",
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
    body: "the light will be gone in eight minutes. you could stop and look. the screen will wait.",
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
        response: "they see that you saw. it may have been kind. kindness is sometimes the smallest available action.",
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
    body: "a date is printed along the bottom. they look hopeful. you know what happens.",
    choices: [
      {
        label: "say, “i’m sorry.”",
        response: "you begin listing the ways you failed them. the list does not end.",
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
        response: "you laugh. the ceiling does not. you get up anyway. you decide this counts. you keep deciding what qualifies.",
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
        response: "you follow the pressure of their hand. the mark ends where their hand stopped. there is nowhere else to go.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "a song they loved begins to play.",
    body: "it lasts three minutes and forty-two seconds. you did not choose it. this feels meaningful because you need things to feel meaningful.",
    choices: [
      {
        label: "let it play.",
        response: "you listen for them inside it. you find yourself instead. this is not what you wanted.",
      },
      {
        label: "speak to the empty room.",
        response: "you say their name. no one answers. you knew no one would, but you said it anyway.",
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
        response: "you cannot return on command. memory is not a place. sleep is not absolution. you can keep trying.",
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
        response: "you take the object. you tell yourself it is not stealing. the dead cannot grant permission. the dead also cannot object.",
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
        response: "you do. grief moves through you without permission. it does not matter what you wanted.",
      },
    ],
  },
  {
    part: "II / GRIEF",
    title: "you are laughing. then you remember them.",
    body: "they would have loved this. you think this whenever joy finds you without them.",
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
    body: "the clock above the door is twelve minutes slow. the building is still there. the people inside it are not the people you remember.",
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
        response: "you try. you have practiced the opposite for longer.",
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
    body: "not entirely or consistently. only enough to recognize the outline.",
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
    title: "the same kind of morning returns.",
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
    title: "you know what must change. you have known for some time.",
    body: "knowing has become another form of waiting. it asks nothing of you.",
    intentional: true,
    choices: [
      {
        label: "name it.",
        response: "you name it without defending the delay. the name is plain. it leaves you with less room to hide.",
      },
      {
        label: "keep it vague.",
        response: "you protect every possibility by choosing none. the protection feels like a life from the inside.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "the life you keep postponing asks for a date.",
    body: "not someday. a day. the calendar does not care whether you feel ready.",
    intentional: true,
    choices: [
      {
        label: "choose the day.",
        response: "the date guarantees nothing. it removes one excuse.",
      },
      {
        label: "leave the space blank.",
        response: "the blank remains available. so does the life you already have.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "you reach the point where you usually turn back.",
    body: "there is no sign. no witness. only the old instruction to stop.",
    intentional: true,
    choices: [
      {
        label: "continue.",
        response: "you continue. the fear comes with you.",
      },
      {
        label: "turn back.",
        response: "you know this route. knowing it does not make it yours. you take it anyway.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "no one is coming to authorize your life.",
    body: "permission was useful while you believed someone else would grant it.",
    intentional: true,
    choices: [
      {
        label: "act without it.",
        response: "nothing confirms the decision. you act. authority begins as the absence of permission.",
      },
      {
        label: "wait once more.",
        response: "you wait. this is also an act. the cost remains yours.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "you reach another point where you could turn back.",
    body: "the earlier choice remains behind you. this time, the choice presents itself again. it will not always.",
    intentional: true,
    choices: [
      {
        label: "continue from here.",
        response: "you continue. not from the beginning.",
      },
      {
        label: "turn back from here.",
        response: "you turn back. you do not return to where you were.",
      },
    ],
  },
  {
    part: "III / RETURN",
    title: "you sit beside someone you love. neither of you speaks. the clock fills the silence.",
    body: "you have been here before. not here exactly. time does not circle, but you do. returning shows you what changed.",
    choices: [
      {
        label: "say nothing for a moment. then speak.",
        response: "the silence was not failure. the speaking is not rescue. both belong to you.",
      },
      {
        label: "take their hand.",
        response: "you cannot stop the clock. you do not need to. for one moment, you are not asking the moment to last in order to let it matter.",
      },
    ],
  },
];

function TypeText({ text, as: Tag = "h2", className = "", speed = 86, onComplete }: { text: string; as?: "h1" | "h2" | "p"; className?: string; speed?: number; onComplete?: () => void }) {
  const [shown, setShown] = useState("");
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 640px)").matches;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches && !mobile) {
      setShown(text);
      onCompleteRef.current?.();
      return;
    }
    setShown("");
    let position = 0;
    const intervalSpeed = mobile ? Math.min(speed, Tag === "p" ? 24 : 48) : speed;
    const timer = window.setInterval(() => {
      position += 1;
      setShown(text.slice(0, position));
      if (!/\s/.test(text[position - 1] ?? "")) {
        window.dispatchEvent(new CustomEvent("typing-character", { detail: { title: Tag !== "p" } }));
      }
      if (position >= text.length) {
        setShown(text);
        window.clearInterval(timer);
        onCompleteRef.current?.();
      }
    }, intervalSpeed);
    return () => window.clearInterval(timer);
  }, [Tag, speed, text]);

  return <Tag className={`typed ${className}`} aria-label={text}><span aria-hidden="true">{shown}<span className="cursor">█</span></span></Tag>;
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reflection, setReflection] = useState<string | null>(null);
  const [path, setPath] = useState<number[]>([]);
  const [farewell, setFarewell] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [systemTime, setSystemTime] = useState("00:00:00");
  const [sessionNumber, setSessionNumber] = useState(1);
  const [previousPath, setPreviousPath] = useState<number[] | null>(null);
  const [routeChanges, setRouteChanges] = useState<number | null>(null);
  const [pendingChoice, setPendingChoice] = useState<number | null>(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);
  const [bodyComplete, setBodyComplete] = useState(false);
  const [reflectionComplete, setReflectionComplete] = useState(false);
  const [farewellComplete, setFarewellComplete] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const completionRecordedRef = useRef(false);
  const finished = index >= scenes.length;
  const scene = scenes[index];
  const sceneComplete = titleComplete && (!scene?.body || bodyComplete);
  const progress = useMemo(() => Math.round((index / scenes.length) * 100), [index]);

  useEffect(() => {
    const completedSessions = Number.parseInt(window.localStorage.getItem(SESSION_COUNT_KEY) ?? "0", 10);
    setSessionNumber((Number.isFinite(completedSessions) ? completedSessions : 0) + 1);
    const savedRoute = window.localStorage.getItem(LAST_ROUTE_KEY);
    if (savedRoute) {
      try {
        const parsedRoute = JSON.parse(savedRoute);
        if (Array.isArray(parsedRoute) && parsedRoute.every((choice) => Number.isInteger(choice))) setPreviousPath(parsedRoute);
      } catch {
        window.localStorage.removeItem(LAST_ROUTE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (!finished || completionRecordedRef.current || path.length !== scenes.length) return;
    completionRecordedRef.current = true;
    const changes = previousPath
      ? path.reduce((total, choice, position) => total + (choice === previousPath[position] ? 0 : 1), 0)
      : null;
    setRouteChanges(changes);
    window.localStorage.setItem(SESSION_COUNT_KEY, String(sessionNumber));
    window.localStorage.setItem(LAST_ROUTE_KEY, JSON.stringify(path));
  }, [finished, path, previousPath, sessionNumber]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setSystemTime([now.getHours(), now.getMinutes(), now.getSeconds()].map((value) => String(value).padStart(2, "0")).join(":"));
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  function startMusic() {
    if (!contextRef.current || contextRef.current.state === "closed") contextRef.current = new AudioContext();
    void contextRef.current.resume();
    if (musicRef.current) {
      void musicRef.current.play();
      setSoundOn(true);
      return;
    }
    const music = new Audio(`${import.meta.env.BASE_URL}audio/falling-pixels.mp3`);
    music.loop = true;
    music.preload = "auto";
    music.volume = 0.33;
    musicRef.current = music;
    void music.play();
    setSoundOn(true);
  }

  useEffect(() => {
    startMusic();
    const resumeAutoplay = () => {
      if (contextRef.current?.state === "suspended") void contextRef.current.resume();
      if (musicRef.current) void musicRef.current.play();
    };
    window.addEventListener("pointerdown", resumeAutoplay, { once: true });
    window.addEventListener("keydown", resumeAutoplay, { once: true });
    return () => {
      window.removeEventListener("pointerdown", resumeAutoplay);
      window.removeEventListener("keydown", resumeAutoplay);
    };
  }, []);

  function toggleMusic() {
    if (!musicRef.current) return startMusic();
    if (soundOn) musicRef.current.pause();
    else void musicRef.current.play();
    setSoundOn(!soundOn);
  }

  function begin() {
    if (!introComplete) return;
    startMusic();
    setStarted(true);
  }

  function playKeypadBeep() {
    const context = contextRef.current;
    if (!context || context.state !== "running") return;
    const now = context.currentTime;
    [697, 1209].forEach((frequency) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "square";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.08);
    });
  }

  function playContinueBeep() {
    const context = contextRef.current;
    if (!context || context.state !== "running") return;
    const now = context.currentTime;
    const master = context.createGain();
    master.gain.value = 1;
    master.connect(context.destination);
    const chime: Array<[number, number, number, OscillatorType]> = [
      [523.25, 0, 0.42, "sine"],
      [783.99, 0.085, 0.32, "sine"],
      [1046.5, 0.17, 0.22, "triangle"],
    ];
    chime.forEach(([frequency, delay, volume, type]) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = now + delay;
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.58);
      oscillator.connect(gain).connect(master);
      oscillator.start(start);
      oscillator.stop(start + 0.6);
    });
  }

  function choose(choiceIndex: number) {
    if (!scene || reflection || !sceneComplete) return;
    if (scene.intentional && pendingChoice !== choiceIndex) {
      setPendingChoice(choiceIndex);
      return;
    }
    setPendingChoice(null);
    setReflectionComplete(false);
    setPath((p) => [...p, choiceIndex]);
    setReflection(scene.choices[choiceIndex].response ?? "you chose. now you will explain the choice to yourself.");
  }

  function advance() {
    if (!reflectionComplete) return;
    setPendingChoice(null);
    setReflection(null);
    setTitleComplete(false);
    setBodyComplete(false);
    setReflectionComplete(false);
    setIndex((i) => i + 1);
  }

  function restart() {
    if (!started) return;
    if (finished && path.length === scenes.length) {
      setPreviousPath(path);
      setSessionNumber((number) => number + 1);
    }
    completionRecordedRef.current = false;
    setStarted(false);
    setIndex(0);
    setPath([]);
    setReflection(null);
    setFarewell(false);
    setPendingChoice(null);
    setIntroComplete(false);
    setTitleComplete(false);
    setBodyComplete(false);
    setReflectionComplete(false);
    setFarewellComplete(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (farewell && farewellComplete && (e.key === "Enter" || e.key === " ")) {
        playKeypadBeep();
        restart();
      } else if (finished && (e.key === "Enter" || e.key === " ")) {
        playKeypadBeep();
        setFarewell(true);
      } else if (!started && introComplete && (e.key === "Enter" || e.key === " ")) {
        begin();
        window.setTimeout(playKeypadBeep, 0);
      } else if (reflection && reflectionComplete && (e.key === "Enter" || e.key === " ")) {
        playContinueBeep();
        advance();
      }
      else if (started && !finished && !reflection && sceneComplete && /^[1-3]$/.test(e.key)) {
        const n = Number(e.key) - 1;
        if (n < scene.choices.length) {
          playKeypadBeep();
          choose(n);
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const onButtonClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button");
      if (!button) return;
      if (!button.dataset.sound) playKeypadBeep();
    };
    window.addEventListener("click", onButtonClick);
    return () => window.removeEventListener("click", onButtonClick);
  }, []);

  useEffect(() => {
    const onType = (event: Event) => {
      const context = contextRef.current;
      if (!soundOn || !context || context.state !== "running") return;
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(76 + Math.random() * 12, now);
      oscillator.frequency.exponentialRampToValueAtTime(58, now + 0.042);
      const title = (event as CustomEvent<{ title?: boolean }>).detail?.title;
      gain.gain.setValueAtTime(title ? 0.0052 : 0.0035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.05);
    };
    window.addEventListener("typing-character", onType as EventListener);
    return () => window.removeEventListener("typing-character", onType as EventListener);
  }, [soundOn]);

  useEffect(() => () => {
    musicRef.current?.pause();
    void contextRef.current?.close();
  }, []);

  return (
    <main className="screen">
      <div className="noise" aria-hidden="true" />
      <header>
        <button className="wordmark" onClick={restart}>C:\MEMORY\TIME.EXE</button>
        <div className="status">
          <span className="connection">LINK:14.4K</span>
          <span className="system-clock">TIME:{systemTime}</span>
          <button className="sound" onClick={toggleMusic} aria-label={soundOn ? "Mute music" : "Play music"}>{soundOn ? "MUSIC: ON" : "MUSIC: OFF"}</button>
          {started && !finished && <span>{String(index + 1).padStart(2, "0")} / {scenes.length}</span>}
        </div>
      </header>

      {!started ? (
        <section className="intro">
          <p className="eyebrow">PERSONAL SYSTEM / SESSION {String(sessionNumber).padStart(2, "0")}<br />A MEDITATION ON GUILT, TIME + GRIEF</p>
          <TypeText as="h1" text={"YOU DO NOT\nHAVE TO\nJUSTIFY YOURSELF."} onComplete={() => setIntroComplete(true)} />
          <p className="byline">by carm</p>
          <p className="lede">there is no correct path, but you can look for one and call the looking progress.</p>
          {introComplete && <button className="primary" onClick={begin}>[ ENTER SYSTEM ] <span>↵</span></button>}
          <p className="hint">{scenes.length} SCENES · 10–12 MINUTES · LOCAL MEMORY ENABLED</p>
        </section>
      ) : farewell ? (
        <section className="farewell">
          <p className="eyebrow">SESSION {String(sessionNumber).padStart(2, "0")} COMPLETE / CONNECTION CLOSING</p>
          <TypeText as="p" className="farewell-message" text="take care, my friend." speed={76} onComplete={() => setFarewellComplete(true)} />
          <p className="signoff-code">END OF TRANSMISSION · {systemTime}</p>
          {farewellComplete && <button className="primary" onClick={restart}>[ RESTART ] <span>↺</span></button>}
        </section>
      ) : finished ? (
        <section className="ending">
          <p className="eyebrow">YOUR PATH / SESSION {String(sessionNumber).padStart(2, "0")} RECORD</p>
          <h1>YOU CHOSE.<br />TIME PASSED.</h1>
          <p className="closing">you act, you explain, you accuse yourself, then defend yourself. nothing is settled. you return to the beginning and find the room unchanged, but you are not. you are still here.</p>
          <div className="route-summary"><span>{scenes.length} RECORDS READ</span><span>{routeChanges === null ? "FIRST ROUTE RECORDED" : routeChanges === 0 ? "ROUTE REPEATED" : `NEW ROUTE · ${routeChanges} ${routeChanges === 1 ? "CHOICE" : "CHOICES"} CHANGED`}</span><span>SESSION SAVED: NOW</span></div>
          <div className="pathline" aria-label="Your path">{path.map((p, i) => <i key={i} className={`${p === 0 ? "dim" : ""}${previousPath && previousPath[i] !== p ? " changed" : ""}`} />)}</div>
          <button className="primary" onClick={() => setFarewell(true)}>CLOSE SESSION <span>↵</span></button>
        </section>
      ) : (
        <section className="scene" aria-live="polite">
          <div className="progress"><i style={{ width: `${progress}%` }} /></div>
          {!reflection ? <>
            <p className="eyebrow">DIR / PART_{scene.part} / RECORD_{String(index + 1).padStart(2, "0")}</p>
            <TypeText key={`question-${index}`} text={scene.title} onComplete={() => setTitleComplete(true)} />
            {scene.body && titleComplete && <TypeText key={`body-${index}`} as="p" className="bodycopy" text={scene.body} speed={38} onComplete={() => setBodyComplete(true)} />}
            {titleComplete && <><div className={`choices${sceneComplete ? "" : " loading"}`}>
              {scene.choices.map((choice, i) => (
                <button key={choice.label} className={pendingChoice === i ? "pending" : ""} data-sound="selection" disabled={!sceneComplete} onClick={() => { playKeypadBeep(); choose(i); }}>
                  <b>[0{i + 1}]</b>
                  <span>{pendingChoice === i ? `confirm: ${choice.label}` : choice.label}</span>
                  <em>_</em>
                </button>
              ))}
            </div>
            <p className="hint">{!sceneComplete ? "RECORD LOADING..." : scene.intentional ? pendingChoice === null ? "SELECT RECORD. PRESS AGAIN TO CONFIRM." : "CONFIRM OR CHOOSE AGAIN." : `SELECT RECORD: PRESS 1–${scene.choices.length}`}</p>
            </>}
          </> : <div className="reflection">
            <p className="eyebrow">YOU CHOSE</p>
            <TypeText key={`result-${index}`} text={reflection} onComplete={() => setReflectionComplete(true)} />
            {reflectionComplete && <div className="reflection-actions">
              <button className="primary" data-sound="continue" onClick={() => { playContinueBeep(); advance(); }}>
                {index === scenes.length - 1 ? "SEE YOUR PATH" : "CONTINUE"} <span>↵</span>
              </button>
            </div>}
          </div>}
        </section>
      )}

      <footer><span>SYS/1997 · TIME PASSES ANYWAY.</span><span>MEM: 640K · © NOW</span></footer>
    </main>
  );
}
