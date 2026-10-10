(function() {
  'use strict';

  // ---------- STATE ----------
  let notes = [];               // array of note objects
  const STORAGE_KEY = 'quicknotes_notes';

  // DOM refs
  const form = document.getElementById('note-form');
  const noteInput = document.getElementById('note-input');
  const categorySelect = document.getElementById('category-select');
  const errorMessage = document.getElementById('error-message');
  const notesList = document.getElementById('notes-list');
  const noteCount = document.getElementById('note-count');
  const searchInput = document.getElementById('search-input');

  // ---------- UTILS ----------
  // Generate a simple unique id
  function generateId() {
    return Date.now() + '-' + Math.random().toString(36).substring(2, 9);
  }

  // Get readable date and time (e.g., "Apr 7, 2025, 3:45 PM")
  function getReadableTimestamp() {
    const now = new Date();
    return now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // Save notes to localStorage
  function saveNotes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.warn('Could not save notes to localStorage', e);
    }
  }

  // Load notes from localStorage
  function loadNotes() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        notes = JSON.parse(stored);
        // ensure notes is an array
        if (!Array.isArray(notes)) notes = [];
      } else {
        notes = [];
      }
    } catch (e) {
      console.warn('Could not load notes', e);
      notes = [];
    }
  }

  // ---------- RENDER (with search filter) ----------
  function render() {
    // 1. update count (using total notes, not filtered)
    updateNoteCount();

    // 2. get search query (case-insensitive, trimmed)
    const query = searchInput.value.trim().toLowerCase();

    // 3. filter notes
    let filteredNotes = notes;
    if (query !== '') {
      const searchWords = query.split(/\s+/).filter(w => w.length > 0);
      filteredNotes = notes.filter(note => {
        const lowerText = note.text.toLowerCase();
        // every search word must be included in the note text
        return searchWords.every(word => lowerText.includes(word));
      });
    }

    // 4. render notes list
    if (filteredNotes.length === 0) {
      // different message when search yields nothing vs no notes at all
      if (notes.length > 0 && query !== '') {
        notesList.innerHTML = `<div class="empty-search-message">No notes match your search.</div>`;
      } else if (notes.length === 0) {
        notesList.innerHTML = `<div class="empty-search-message">✨ Your notes will appear here. Add one above!</div>`;
      } else {
        // only happens if query is empty and notes exist (should not happen)
        notesList.innerHTML = '';
      }
      return;
    }

    // build note cards
    notesList.innerHTML = ''; // clear
    filteredNotes.forEach(note => {
      const card = document.createElement('div');
      // category class: category-personal, category-work, category-study
      const categoryClass = `category-${note.category.toLowerCase()}`;
      card.className = `note-card ${categoryClass}`;

      // inner structure
      card.innerHTML = `
        <div class="note-content">
          <div class="note-text">${escapeHtml(note.text)}</div>
          <div class="note-meta">
            <span class="note-category-badge">${escapeHtml(note.category)}</span>
            <span class="note-date">${escapeHtml(note.createdAt)}</span>
          </div>
        </div>
        <button class="delete-btn" data-id="${note.id}" aria-label="Delete note">✕ Delete</button>
      `;

      notesList.appendChild(card);
    });

    // attach delete listeners (event delegation could be used, but direct is fine)
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        deleteNoteById(id);
      });
    });
  }

  // simple escape to avoid XSS (text & category)
  function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------- UPDATE COUNT ----------
  function updateNoteCount() {
    const total = notes.length;
    if (total === 0) {
      noteCount.textContent = 'You have no notes yet.';
    } else if (total === 1) {
      noteCount.textContent = 'You have 1 note.';
    } else {
      noteCount.textContent = `You have ${total} notes.`;
    }
  }

  // ---------- DELETE NOTE ----------
  function deleteNoteById(id) {
    notes = notes.filter(note => note.id !== id);
    saveNotes();
    render();
  }

  // ---------- ADD NOTE ----------
  function addNote(text, category) {
    const trimmedText = text.trim();

    // validation
    if (trimmedText === '') {
      errorMessage.textContent = 'Please type a note first.';
      return false;
    }
    if (trimmedText.length > 200) {
      errorMessage.textContent = 'Notes must be 200 characters or fewer.';
      return false;
    }

    // clear any previous error
    errorMessage.textContent = '';

    // create note object
    const newNote = {
      id: generateId(),
      text: trimmedText,
      category: category,
      createdAt: getReadableTimestamp()
    };

    notes.push(newNote);
    saveNotes();

    // clear input field, keep category as is
    noteInput.value = '';
    render();
    return true;
  }

  // ---------- FORM SUBMIT ----------
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = noteInput.value;
    const category = categorySelect.value;
    addNote(text, category);
    // focus back on input for easy adding
    noteInput.focus();
  });

  // ---------- SEARCH LISTENER ----------
  searchInput.addEventListener('input', () => {
    render();
  });

  // ---------- BONUS: CLEAR ALL BUTTON ----------
  function addClearAllButton() {
    const yourNotesSection = document.querySelector('.card:last-child');
    const searchWrapper = yourNotesSection.querySelector('.search-wrapper');

    // Create clear all button
    const clearAllBtn = document.createElement('button');
    clearAllBtn.textContent = '🗑️ Clear all';
    clearAllBtn.setAttribute('aria-label', 'Delete all notes');
    clearAllBtn.style.background = '#f4f7fb';
    clearAllBtn.style.border = '1px solid #d9e2ec';
    clearAllBtn.style.padding = '0.6rem 1.4rem';
    clearAllBtn.style.borderRadius = '40px';
    clearAllBtn.style.fontWeight = '600';
    clearAllBtn.style.fontSize = '0.85rem';
    clearAllBtn.style.color = '#a12d2d';
    clearAllBtn.style.cursor = 'pointer';
    clearAllBtn.style.transition = '0.15s';
    clearAllBtn.style.flexShrink = '0';

    // Hover effect
    clearAllBtn.addEventListener('mouseenter', () => {
      clearAllBtn.style.background = '#ffe6e6';
      clearAllBtn.style.borderColor = '#c62828';
    });
    clearAllBtn.addEventListener('mouseleave', () => {
      clearAllBtn.style.background = '#f4f7fb';
      clearAllBtn.style.borderColor = '#d9e2ec';
    });

    // Add to search wrapper
    searchWrapper.appendChild(clearAllBtn);

    // Click handler: confirm and clear
    clearAllBtn.addEventListener('click', () => {
      if (notes.length === 0) {
        alert('There are no notes to delete.');
        return;
      }
      if (confirm('Delete all notes?')) {
        notes = [];
        saveNotes();
        searchInput.value = '';
        errorMessage.textContent = '';
        render();
      }
    });
  }

  // ---------- INITIALISATION ----------
  function init() {
    loadNotes();
    render();
    addClearAllButton();
    noteInput.focus();

    // Clear error message as user types
    noteInput.addEventListener('input', () => {
      if (errorMessage.textContent !== '') {
        errorMessage.textContent = '';
      }
    });
  }

  // start the app
  init();
})();