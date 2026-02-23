# Marie Claire Uwimana – Personal Portfolio

**Assignment 1 – Advanced Web Design & Development**  
INES-Ruhengeri | Faculty of Sciences and IT | Year II FEB Day Program | 2025–2026

---

## Live Demo

> Hosted at: *(add GitHub Pages link here after deploying)*  
> GitHub Repo: https://github.com/mcuwimana/portfolio

---

## Project Overview

This is my personal portfolio website built from scratch — no templates, no website builders. It showcases my background as a Computer Science student, my technical skills, three of my projects, a working GPA calculator, my CV, and a contact form.

---

## Project Structure

```
portfolio/
│
├── index.html          ← main page (all 7 sections)
├── css/
│   └── styles.css      ← all styling (flexbox, box model, media queries)
├── js/
│   └── main.js         ← all JavaScript interactivity
├── assets/
│   ├── images/         ← screenshots and profile photo (to be added)
│   └── cv/             ← PDF CV file (to be added)
└── README.md           ← this file
```

---

## Features

| Feature | Status |
|---|---|
| Semantic HTML5 | ✅ |
| Flexbox layout | ✅ |
| Box model usage | ✅ |
| Fluid/responsive design | ✅ |
| Media queries (mobile, tablet, desktop) | ✅ |
| GPA Calculator with validation | ✅ |
| Contact form with validation | ✅ |
| Dark/light mode toggle | ✅ |
| Mobile hamburger menu | ✅ |
| Dynamic footer year | ✅ |
| Skill bar animations (IntersectionObserver) | ✅ |
| Downloadable CV section | ✅ |
| External CSS and JS files | ✅ |
| Git version control | ✅ |

---

## Sections

1. **Hero** – Name, role, tagline, CTA button
2. **About Me** – Background, program, career goal, skills grid
3. **Technical Skills** – Cards with animated progress bars
4. **Projects** – 3 real projects with descriptions and tech tags
5. **GPA Calculator** – Weighted GPA calculator with add/remove courses
6. **Downloadable CV** – Download button + HTML CV preview
7. **Contact** – Contact info + validated contact form

---

## JavaScript Calculator – Option A: GPA Calculator

The calculator works as follows:

- User enters course name, mark out of 100, and credit weight for each course
- Up to 10 courses can be added dynamically
- On calculate: validates all inputs (marks must be 0–100, credits 1–6, names required)
- Converts each percentage to a GPA point (4.0 scale) using the standard Rwandan university grading scale
- Calculates weighted average GPA and percentage
- Outputs: GPA score, percentage average, classification (Distinction / Merit / Credit / Pass / Fail), and total credits

---

## How to Run

No installation needed — open `index.html` directly in any modern browser.

For local development I used VS Code with Live Server extension.

---

## Git Commit History Notes

Commits were made progressively as sections were completed:

- `init: project structure and base HTML`
- `feat: hero section and navigation`
- `feat: about and skills sections`
- `feat: projects section layout`
- `feat: GPA calculator logic and validation`
- `feat: contact form with JS validation`
- `feat: dark mode toggle and mobile menu`
- `style: responsiveness – media queries for tablet and mobile`
- `fix: skill bar animation timing`
- `docs: README and AI usage declaration`

---

## 🤖 AI Usage Declaration

*As required by the assignment brief.*

**What I used AI for:**

1. **Debugging** – When my IntersectionObserver for the skill bars wasn't triggering, I described the problem to Claude and asked why `entry.isIntersecting` might not be working. It explained that my threshold was too high for the skill section height on mobile. I fixed it myself by adjusting the threshold.

2. **Concept explanation** – I asked Claude to explain the difference between `flex: 1`, `flex: 1 1 auto`, and `flex: 1 1 0` in Flexbox, because I kept getting confused about why my cards weren't sizing correctly. I understood the explanation and applied it manually.

3. **Git commands cheat sheet** – I asked for a quick list of the git commands I needed for this workflow (init, add, commit, push, branch) as a reference while working.

**What I implemented entirely myself:**

- All HTML structure and semantic tagging
- All CSS — color scheme, layout, animations, dark mode variables
- The GPA calculator logic (the grading scale, weighted average formula, DOM updates)
- Contact form validation logic
- Mobile menu toggle
- All written content (about me, project descriptions, CV text)

**What I modified after AI explanation:**

- Adjusted IntersectionObserver threshold from 0.5 to 0.3 after understanding the issue
- Corrected my flexbox shorthand properties throughout the CSS

**I did not use AI to generate code for me.** All code was written by hand based on what I've learned in class and from MDN documentation.

---

## References

- MDN Web Docs – HTML, CSS, JavaScript references
- CSS-Tricks – Flexbox Guide
- W3Schools – Media queries examples (for reference, not copied)
- Google Fonts – Sora and DM Mono

---

*INES-Ruhengeri · Musanze, Rwanda · 2025–2026*
