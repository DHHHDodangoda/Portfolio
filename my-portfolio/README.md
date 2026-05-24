# Terminal Portfolio

A React-based terminal-style portfolio website built with Vite.

This project renders a command-line aesthetic in the browser and supports interactive commands such as `about`, `skills`, `projects`, `contact`, `education`, `whoami`, and `banner`.

## Features

- Terminal-inspired portfolio interface
- ASCII banner output
- Interactive command input and output
- Sections for about, skills, projects, education, and contact information
- Easy customization via `src/App.jsx`

## Tech Stack

- React 19
- Vite
- ESLint
- JavaScript

## Getting Started

### Install dependencies

```bash
cd my-portfolio
npm install
```

### Run locally

```bash
npm run dev
```

Open the local development server URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Commands

In the terminal interface, try the following commands:

- `help` — display available commands
- `about` — show personal bio and summary
- `skills` — view technical skills
- `projects` — browse featured projects
- `contact` — show contact information
- `education` — show academic qualifications
- `whoami` — display the portfolio owner
- `banner` — show the ASCII welcome banner
- `clear` — clear the terminal output

## Customization

Edit `src/App.jsx` to customize:

- personal details and bio
- skills and project list
- contact links
- education entries
- ASCII banner text and styling

### Key sections in `src/App.jsx`

- `ABOUT` — personal profile data
- `SKILLS` — languages, frameworks, tools, and interests
- `PROJECTS` — project cards and links
- `CONTACT` — email, GitHub, LinkedIn, and location
- `EducationOutput` — academic qualification display
- `ASCII_BANNER` — banner text shown by the `banner` command

## Notes

This repository is intended as a quick portfolio template and can be extended with additional commands, sections, or styling as needed.

