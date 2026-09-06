# Hemanth Reddy Nalabolu — Portfolio

Personal portfolio site: a single-page React app covering experience,
projects, skills, and contact info.

Live content is kept in sync with [`resume.txt`](../Aegis/resume.txt) and the
underlying project repositories
([Aegis](https://github.com/HemanthReddy-1408/Aegis),
[MedAssist X](https://github.com/HemanthReddy-1408/medassist-ai),
[Anomaly Transformer](https://github.com/HemanthReddy-1408/Anomaly-Transformer)).

## Stack

- React 18 (Create React App)
- Tailwind CSS
- [lucide-react](https://lucide.dev/) for icons
- No backend — fully static, deployable to any static host (Vercel, Netlify, GitHub Pages)

## Local development

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build -> build/
```

## Structure

```
public/
  index.html      Document shell, meta tags, fonts
  resume.pdf      Downloadable resume (compiled from resume.txt)
src/
  Portfolio.js    The entire site: nav, hero, about, experience, skills,
                  projects, education, contact — all in one component,
                  with small reusable primitives (Reveal, StatChip, TechTag)
  index.css       Tailwind entrypoint + small global niceties
  index.js        React root
tailwind.config.js  Custom fonts (Space Grotesk / Inter / JetBrains Mono),
                    animation keyframes
```

## Updating content

Project descriptions, stats, and experience bullets are plain data objects
at the top of `src/Portfolio.js` (`PROJECTS`, `EXPERIENCE`, `SKILLS`,
`EDUCATION`, `CONTACT_LINKS`) — edit those rather than the JSX below them.

To refresh the downloadable resume, regenerate `public/resume.pdf` from
[`resume.txt`](../Aegis/resume.txt) and copy it in, then `npm run build`.
