document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('event-form');
    const savedEventsContainer = document.getElementById('saved-events');
    const showSavedEventsButton = document.getElementById('show-saved-events');
    const notification = document.getElementById('notification');

    // Load saved events from local storage
    function loadSavedEvents() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        savedEventsContainer.innerHTML = '';
        events.forEach((event, index) => {
            const eventItem = document.createElement('div');
            eventItem.className = 'event-item';
            eventItem.innerHTML = `
                <p><strong>${event.name}</strong></p>
                <p>Start: ${event.start}</p>
                <p>End: ${event.end}</p>
                <button onclick="showEventDetails(${index})">Details</button>
                <button onclick="deleteEvent(${index})" class="delete-btn">Delete</button>
            `;
            savedEventsContainer.appendChild(eventItem);
        });
    }

    // Show saved events
    showSavedEventsButton.addEventListener('click', () => {
        loadSavedEvents();
    });

    // Add event
    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const eventName = document.getElementById('event-name').value;
        const eventStart = document.getElementById('event-start').value;
        const eventEnd = document.getElementById('event-end').value;

        if (!eventName || !eventStart || !eventEnd) {
            alert('Please fill in all fields.');
            return;
        }

        const event = {
            name: eventName,
            start: eventStart,
            end: eventEnd
        };

        let events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));

        document.getElementById('event-name').value = '';
        document.getElementById('event-start').value = '';
        document.getElementById('event-end').value = '';

        notification.textContent = 'Event saved successfully';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    });
});

// Function to show details of an event (to be implemented)
function showEventDetails(index) {
    alert('Show details for event index ' + index);
}

// Function to delete an event
function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1); // Remove event at index
    localStorage.setItem('events', JSON.stringify(events)); // Update local storage
    document.querySelector('#show-saved-events').click(); // Refresh the events list
}
