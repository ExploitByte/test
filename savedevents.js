document.addEventListener("DOMContentLoaded", function() {
    const savedEventsContainer = document.getElementById('savedEventsContainer');
    
    // Load saved events from localStorage
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    
    if (savedEvents.length === 0) {
        savedEventsContainer.innerHTML = "<p>No saved events found.</p>";
    } else {
        savedEvents.forEach(event => {
            const eventButton = document.createElement('button');
            eventButton.className = 'btn event-btn';
            eventButton.textContent = `${event.title} - ${event.start}`;
            eventButton.onclick = () => alert(`Event: ${event.title}\nStart: ${event.start}\nEnd: ${event.end}`);
            savedEventsContainer.appendChild(eventButton);
        });
    }
});
