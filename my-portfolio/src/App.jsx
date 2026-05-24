import { useState, useEffect, useRef } from "react";

const USER = "hivin";
const HOSTNAME = "portfolio";

const ABOUT = {
  name: "Hivin Dodangoda",
  title: "Computer Science Undergraduate | Aspiring DevOps Engineer | Tech Enthusiast",
  university: "University of Westminster, UK",
  bio: [
    "Hi! I'm Hivin, an CS undergraduate student at the University of Westminster.",
    "I'm passionate about DevOps, cloud infrastructure, and building things that scale.",
    "Always exploring new technologies and looking for opportunities to grow.",
  ],
};

const SKILLS = {
  languages: ["Python", "Java", "JavaScript", "HTML", "CSS", "SQL"],
  frameworks: ["React", "Flutter"],
  tools: [
    "Docker",
    "XAMPP",
    "Android Studio",
    "Xcode",
    "VSCode",
    "Jupyter Notebooks",
    "Git",
  ],
  interests: ["DevOps","AI/ML", "Cloud Infrastructure", "Mobile Development", "CI/CD"],
};

const PROJECTS = [
  {
    name: "Terminal Portfolio",
    desc: "A personal portfolio website that mimics a terminal interface, built with React.",
    tech: ["React", "HTML", "JavaScript", "CSS"],
    link: "https://github.com/",
    status: "in progress",
  },
];


const CONTACT = {
  email: "hivinhiruna@gmail.com",
  github: "github.com/DHHHDodangoda",
  linkedin: "www.linkedin.com/in/hivin-dodangoda/",
  location: "Mathugama, Sri Lanka",
};

const COMMANDS = {
  help: () => ({
    type: "help",
    content: [
      { cmd: "about",    desc: "Learn about me" },
      { cmd: "skills",   desc: "View my tech skills" },
      { cmd: "projects", desc: "Browse my projects" },
      { cmd: "contact",  desc: "Get in touch" },
      { cmd: "education",desc: "My academic background" },
      { cmd: "clear",    desc: "Clear the terminal" },
      { cmd: "whoami",   desc: "Who are you?" },
      { cmd: "banner",   desc: "Show the welcome banner" },
    ],
  }),
  about: () => ({ type: "about" }),
  skills: () => ({ type: "skills" }),
  projects: () => ({ type: "projects" }),
  contact: () => ({ type: "contact" }),
  education: () => ({ type: "education" }),
  whoami: () => ({ type: "text", lines: [`visitor`] }),
  banner: () => ({ type: "banner" }),
  clear: () => ({ type: "clear" }),
};

const C = {
  bg:       "#000000",
  surface:  "#181818",
  border:   "#30363d",
  text:     "#e6edf3",
  muted:    "#8b949e",
  accent:   "#58a6ff",
  green:    "#3fb950",
  yellow:   "#d29922",
  red:      "#f85149",
  cyan:     "#79c0ff",
  purple:   "#bc8cff",
  orange:   "#ffa657",
};

const s = {
  term: {
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace",
    fontSize: "14px",
    lineHeight: "1.7",
    backgroundColor: C.bg,
    color: C.text,
    minHeight: "100vh",
    padding: "0",
    margin: "0",
  },
  window: {
    maxWidth: "860px",
    margin: "0 auto",
    padding: "0 0 120px",
  },
  titlebar: {
    backgroundColor: C.surface,
    borderBottom: `1px solid ${C.border}`,
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  dot: (color) => ({
    width: "12px", height: "12px",
    borderRadius: "50%",
    backgroundColor: color,
  }),
  titleText: {
    marginLeft: "8px",
    color: C.text,
    fontSize: "15px",
    fontWeight: "bold",
  },
  body: { padding: "24px 24px 0" },
  prompt: { display: "flex", alignItems: "flex-start", gap: "6px", marginBottom: "4px" },
  ps1: { color: C.green, whiteSpace: "nowrap" },
  at: { color: C.muted },
  host: { color: C.cyan },
  dollar: { color: C.text },
  cmd: { color: C.text },
  output: { marginBottom: "20px", paddingLeft: "0" },
  line: { marginBottom: "2px" },
  label: (color = C.accent) => ({ color, fontWeight: "bold" }),
  tag: (color = C.surface) => ({
    display: "inline-block",
    backgroundColor: color,
    border: `1px solid ${C.border}`,
    borderRadius: "4px",
    padding: "1px 7px",
    fontSize: "12px",
    marginRight: "4px",
    marginBottom: "3px",
    color: C.accent,
  }),
  statusTag: (status) => ({
    display: "inline-block",
    padding: "1px 7px",
    borderRadius: "4px",
    fontSize: "11px",
    marginLeft: "8px",
    backgroundColor: status === "completed" ? "#1a3a1a" : "#2d2006",
    color: status === "completed" ? C.green : C.yellow,
    border: `1px solid ${status === "completed" ? "#2ea043" : "#9e6a03"}`,
  }),
  inputRow: {
    position: "fixed",
    bottom: 0, left: 0, right: 0,
    backgroundColor: C.bg,
    borderTop: `1px solid ${C.border}`,
    padding: "14px 24px",
    zIndex: 20,
  },
  inputInner: {
    maxWidth: "860px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  input: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: C.text,
    fontFamily: "inherit",
    fontSize: "14px",
    flex: 1,
    caretColor: C.green,
  },
  divider: {
    borderTop: `1px solid ${C.border}`,
    margin: "4px 0 12px",
  },
  ascii: {
    color: C.accent,
    fontSize: "8px",
    lineHeight: "1.1",
    whiteSpace: "pre",
    userSelect: "none",
  },
  blink: {
    display: "inline-block",
    width: "8px",
    height: "15px",
    backgroundColor: C.green,
    marginLeft: "2px",
    verticalAlign: "text-bottom",
    animation: "blink 1s step-end infinite",
  },
};

const ASCII_BANNER = `
                                                                                                
 /$$   /$$ /$$            /$$                 /$$$$$$$                  /$$                                               /$$          
| $$  | $$|__/           |__/                | $$__  $$                | $$                                              | $$          
| $$  | $$ /$$ /$$    /$$ /$$ /$$$$$$$       | $$  \\ $$  /$$$$$$   /$$$$$$$  /$$$$$$  /$$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$$  /$$$$$$ 
| $$$$$$$$| $$|  $$  /$$/| $$| $$__  $$      | $$  | $$ /$$__  $$ /$$__  $$ |____  $$| $$__  $$ /$$__  $$ /$$__  $$ /$$__  $$ |____  $$
| $$__  $$| $$ \\  $$/$$/ | $$| $$  \\ $$      | $$  | $$| $$  \\ $$| $$  | $$  /$$$$$$$| $$  \\ $$| $$  \\ $$| $$  \\ $$| $$  | $$  /$$$$$$$
| $$  | $$| $$  \\  $$$/  | $$| $$  | $$      | $$  | $$| $$  | $$| $$  | $$ /$$__  $$| $$  | $$| $$  | $$| $$  | $$| $$  | $$ /$$__  $$
| $$  | $$| $$   \\  $/   | $$| $$  | $$      | $$$$$$$/|  $$$$$$/|  $$$$$$$|  $$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$/|  $$$$$$$|  $$$$$$$
|__/  |__/|__/    \\_/    |__/|__/  |__/      |_______/  \\______/  \\_______/ \\_______/|__/  |__/ \\____  $$ \\______/  \\_______/ \\_______/
                                                                                                /$$  \\ $$                              
                                                                                               |  $$$$$$/                              
                                                                                                \\______/                                                                                                                              
`;

function Banner() {
  return (
    <div style={s.output}>
      <pre style={s.ascii}>{ASCII_BANNER}</pre>
      <div style={{ color: C.muted, marginTop: "4px" }}>
        Welcome to <span style={{ color: C.accent }}>Hivin&apos;s</span> terminal portfolio.
        Type <span style={{ color: C.green }}>&apos;help&apos;</span> to see available commands.
      </div>
    </div>
  );
}

function HelpOutput({ content }) {
  return (
    <div style={s.output}>
      <div style={{ color: C.muted, marginBottom: "8px" }}>Available commands:</div>
      {content.map(({ cmd, desc }) => (
        <div key={cmd} style={{ display: "flex", gap: "0", marginBottom: "3px" }}>
          <span style={{ color: C.green, minWidth: "120px" }}>{cmd}</span>
          <span style={{ color: C.muted }}>— {desc}</span>
        </div>
      ))}
    </div>
  );
}

function AboutOutput() {
  return (
    <div style={s.output}>
      <div style={{ marginBottom: "10px" }}>
        <span style={s.label(C.cyan)}>Name:       </span>
        <span>{ABOUT.name}</span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span style={s.label(C.cyan)}>Title:      </span>
        <span style={{ color: C.muted }}>{ABOUT.title}</span>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <span style={s.label(C.cyan)}>University: </span>
        <span style={{ color: C.purple }}>{ABOUT.university}</span>
      </div>
      <div style={s.divider} />
      {ABOUT.bio.map((line, i) => (
        <div key={i} style={{ color: C.muted, marginBottom: "4px" }}>
          &gt; {line}
        </div>
      ))}
    </div>
  );
}

function SkillsOutput() {
  const sections = [
    { label: "Languages",   color: C.accent,  items: SKILLS.languages },
    { label: "Frameworks",  color: C.purple,  items: SKILLS.frameworks },
    { label: "Tools",       color: C.orange,  items: SKILLS.tools },
    { label: "Interests",   color: C.green,   items: SKILLS.interests },
  ];
  return (
    <div style={s.output}>
      {sections.map(({ label, color, items }) => (
        <div key={label} style={{ marginBottom: "12px" }}>
          <div style={{ color, marginBottom: "5px", fontWeight: "bold" }}>{label}</div>
          <div>
            {items.map((item) => (
              <span key={item} style={s.tag()}>
                <span style={{ color: color }}>{item}</span>
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsOutput() {
  return (
    <div style={s.output}>
      {PROJECTS.map((p, i) => (
        <div
          key={p.name}
          style={{
            marginBottom: "16px",
            paddingLeft: "12px",
            borderLeft: `2px solid ${C.border}`,
          }}
        >
          <div style={{ marginBottom: "3px" }}>
            <span style={{ color: C.green, fontWeight: "bold" }}>{p.name}</span>
            <span style={s.statusTag(p.status)}>{p.status}</span>
          </div>
          <div style={{ color: C.muted, marginBottom: "5px" }}>{p.desc}</div>
          <div style={{ marginBottom: "4px" }}>
            {p.tech.map((t) => (
              <span key={t} style={s.tag()}>
                <span style={{ color: C.cyan }}>{t}</span>
              </span>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: C.muted }}>
            <span style={{ color: C.purple }}>link</span>{" "}
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              style={{ color: C.accent, textDecoration: "none" }}
            >
              {p.link}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactOutput() {
  const rows = [
    { icon: "✉", label: "Email",    value: CONTACT.email,    href: `mailto:${CONTACT.email}` },
    { icon: "⌥", label: "GitHub",   value: CONTACT.github,   href: `https://${CONTACT.github}` },
    { icon: "⊞", label: "LinkedIn", value: CONTACT.linkedin, href: `https://${CONTACT.linkedin}` },
    { icon: "◎", label: "Location", value: CONTACT.location, href: null },
  ];
  return (
    <div style={s.output}>
      {rows.map(({ icon, label, value, href }) => (
        <div key={label} style={{ display: "flex", gap: "12px", marginBottom: "8px", alignItems: "center" }}>
          <span style={{ color: C.muted, minWidth: "16px" }}>{icon}</span>
          <span style={{ color: C.cyan, minWidth: "80px" }}>{label}</span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ color: C.accent, textDecoration: "none" }}
            >
              {value}
            </a>
          ) : (
            <span style={{ color: C.muted }}>{value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationOutput() {
  return (
    <div style={s.output}>

      <div style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: `2px solid ${C.accent}` }}>
        <div style={{ color: C.accent, fontWeight: "bold", marginBottom: "3px" }}>
        BSc (Hons) Computer Science (undergraduate)
        </div>
        <div style={{ color: C.muted, marginBottom: "3px" }}>
        University of Westminster, UK
        </div>
        <div style={{ fontSize: "12px", color: C.muted }}>
          Expected Graduation: 2029
        </div>
      </div>

      <div style={{ marginBottom: "4px" }}>
        <span style={{ color: C.green }}>Focus areas: </span>
        <span style={{ color: C.muted }}>OOP · Data Structures · Algorithms · Linux · </span>
      </div>

      <div style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: `2px solid ${C.accent}` }}>
        <div style={{ color: C.accent, fontWeight: "bold", marginBottom: "3px" }}>
          GCE A/L (Advanced Level)
        </div>
        <div style={{ color: C.muted, marginBottom: "3px" }}>
          Taxila Central College, Horana, Sri Lanka
        </div>
        <div style={{ fontSize: "12px", color: C.muted }}>
          Completed: 2024
        </div>
      </div>

      <div style={{ marginBottom: "4px" }}>
        <span style={{ color: C.green }}>Focus areas: </span>
        <span style={{ color: C.muted }}>Mathematics · Physics · Chemistry</span>
      </div>

      <div style={{ marginBottom: "12px", paddingLeft: "12px", borderLeft: `2px solid ${C.accent}` }}>
        <div style={{ color: C.accent, fontWeight: "bold", marginBottom: "3px" }}>
          GCE O/L (Ordinary Level)
        </div>
        <div style={{ color: C.muted, marginBottom: "3px" }}>
          Taxila Central College, Horana, Sri Lanka
        </div>
        <div style={{ fontSize: "12px", color: C.muted }}>
          Completed: 2020
        </div>
      </div>
    </div>
  );
}

function TextOutput({ lines }) {
  return (
    <div style={s.output}>
      {lines.map((l, i) => (
        <div key={i} style={{ color: C.muted }}>
          {l}
        </div>
      ))}
    </div>
  );
}

function NotFound({ cmd }) {
  return (
    <div style={{ ...s.output, color: C.red }}>
      command not found: <span style={{ color: C.text }}>{cmd}</span> — type{" "}
      <span style={{ color: C.green }}>&apos;help&apos;</span> for available commands.
    </div>
  );
}

function HistoryEntry({ input, output }) {
  const renderOutput = () => {
    if (!output) return null;
    switch (output.type) {
      case "banner":    return <Banner />;
      case "help":      return <HelpOutput content={output.content} />;
      case "about":     return <AboutOutput />;
      case "skills":    return <SkillsOutput />;
      case "projects":  return <ProjectsOutput />;
      case "contact":   return <ContactOutput />;
      case "education": return <EducationOutput />;
      case "text":      return <TextOutput lines={output.lines} />;
      case "notfound":  return <NotFound cmd={output.cmd} />;
      default:          return null;
    }
  };

  return (
    <div>
      <div style={s.prompt}>
        <span style={s.ps1}>{USER}</span>
        <span style={s.at}>@</span>
        <span style={s.host}>{HOSTNAME}</span>
        <span style={s.at}>:~$</span>
        <span style={{ ...s.cmd, marginLeft: "6px" }}>{input}</span>
      </div>
      {renderOutput()}
    </div>
  );
}

export default function TerminalPortfolio() {
  const [history, setHistory] = useState([
    { input: "banner", output: { type: "banner" } },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [blink, setBlink] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [cmd, ...prev]);
    setHistIdx(-1);

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    const fn = COMMANDS[cmd];
    const output = fn ? fn() : { type: "notfound", cmd };
    setHistory((prev) => [...prev, { input: raw, output }]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInputVal(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInputVal(next === -1 ? "" : cmdHistory[next]);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS);
      const match = cmds.find((c) => c.startsWith(inputVal.toLowerCase()));
      if (match) setInputVal(match);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        a:hover { text-decoration: underline !important; }
      `}</style>

      <div style={s.term} onClick={() => inputRef.current?.focus()}>
        <div style={s.titlebar}>
          <div style={s.dot("#ff5f56")} />
          <div style={s.dot("#ffbd2e")} />
          <div style={s.dot("#27c93f")} />
          <span style={s.titleText}>
            {USER}@{HOSTNAME}: ~
          </span>
        </div>

        <div style={s.window}>
          <div style={s.body}>
            {history.map((entry, i) => (
              <HistoryEntry key={i} input={entry.input} output={entry.output} />
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <div style={s.inputRow}>
          <div style={s.inputInner}>
            <span style={s.ps1}>{USER}</span>
            <span style={s.at}>@</span>
            <span style={s.host}>{HOSTNAME}</span>
            <span style={s.at}>:~$</span>
            <input
              ref={inputRef}
              style={s.input}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <span style={{ ...s.blink, opacity: blink ? 1 : 0 }} />
          </div>
        </div>
      </div>
    </>
  );
}
