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

    

    *What I Learned*
    
DOM manipulation with vanilla JavaScript: Building the entire note-rendering pipeline from scratch — creating elements dynamically, attaching event listeners, and re-rendering the list on every state change — gave me a solid understanding of how UI and application state stay in sync without a framework.

The localStorage API and JSON serialization: I learned how to persist structured data (an array of note objects) by serializing it with JSON.stringify() and restoring it with JSON.parse(), including handling edge cases like corrupted data and first-time visitors.

Form validation and defensive coding: Implementing empty-input checks, character limits, and escaping user input before rendering taught me how important it is to validate and sanitize data — both for good UX and to prevent XSS vulnerabilities.

Responsive design with Flexbox and media queries: I practised using flex-wrap, flex-basis, and a single @media (max-width: 600px) breakpoint to gracefully stack form controls and note cards on mobile screens.

Separating concerns across HTML, CSS, and JS: Structuring the project into three files with clear responsibilities (structure, presentation, behaviour) made the code easier to read, debug, and extend.

*Project Structure*

quicknotes-app/

index.html      # Page structure and markup;
style.css       # Layout, colours, responsive design;
cript.js       # App logic: add, delete, search, save;
README.md       # Project documentation;

*Technologies Used*

Technology	            Purpose
HTML5	-               Semantic page structure
CSS -	               Styling, Flexbox layout, media queries
JavaScript -        	App logic, DOM manipulation, localStorage
