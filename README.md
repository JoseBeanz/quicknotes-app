 *QuickNotes*
 
A lightweight, browser-based note-taking web application built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just open and use.

*Description*

QuickNotes is a clean and responsive note-taking app that lets you quickly capture ideas, tasks, and inspiration without any sign-up or setup. You can add notes with a category (Personal, Work, or Study), search through them in real time, delete individual notes, and even clear everything with a single button. Each note is colour-coded by category, timestamped when created, and automatically saved to your browser's localStorage — meaning your notes persist across page reloads and browser sessions, all without needing a backend or account.

*Features*

1. Add notes with a text input and a category dropdown (Personal, Work, Study)

2. Input validation — rejects empty notes and notes longer than 200 characters with helpful error messages

3. Category colour coding — each note card has a distinct left-border colour (Personal = teal, Work = dark red, Study = blue)

4. Live search — filter notes by text as you type (case-insensitive, multi-word support)

5. Delete notes individually, or use the "Clear all" button with a confirmation prompt

6. Live note counter — displays "You have no notes yet.", "You have 1 note.", or "You have N notes."

7. Persistence — notes are saved to localStorage and reloaded on page open

8. Responsive design — form controls stack vertically on screens 600px or narrower

9. Readable timestamps — each note shows when it was created

10. XSS-safe rendering — note text is escaped before being inserted into the DOM
