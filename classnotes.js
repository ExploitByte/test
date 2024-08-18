document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const savedNotesContainer = document.getElementById('saved-notes');
    const showSavedNotesButton = document.getElementById('show-saved-notes');

    // Load saved notes from local storage
    function loadSavedNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        savedNotesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'saved-note-item';
            noteItem.innerHTML = `
                <h3>${note.subject} - ${note.topic}</h3>
                <div class="note-content">${note.content}</div>
                <button onclick="deleteNote(${index})" class="delete-btn">Delete</button>
            `;
            savedNotesContainer.appendChild(noteItem);
        });
    }

    // Show saved notes
    showSavedNotesButton.addEventListener('click', () => {
        loadSavedNotes();
    });

    // Add note
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const subject = document.getElementById('subject').value;
        const topic = document.getElementById('topic').value;
        const content = document.getElementById('note-content').innerHTML;

        if (!subject || !topic || !content) {
            alert('Please fill in all fields.');
            return;
        }

        const note = {
            subject: subject,
            topic: topic,
            content: content
        };

        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        document.getElementById('subject').value = '';
        document.getElementById('topic').value = '';
        document.getElementById('note-content').innerHTML = '';

        alert('Note saved successfully');
    });
});

// Change text color in editor
function changeTextColor(color) {
    document.execCommand('foreColor', false, color);
}

// Function to delete a note
function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1); // Remove note at index
    localStorage.setItem('notes', JSON.stringify(notes)); // Update local storage
    document.querySelector('#show-saved-notes').click(); // Refresh the notes list
}
