document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const savedContactsContainer = document.getElementById('saved-contacts');
    const showSavedContactsButton = document.getElementById('show-saved-contacts');
    const notification = document.getElementById('notification');

    // Load saved contacts from local storage
    function loadSavedContacts() {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        savedContactsContainer.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('div');
            contactItem.className = 'saved-contact-item';
            contactItem.innerHTML = `
                <p><strong>${contact.name}</strong></p>
                <p>Number: ${contact.number}</p>
                <p>Email: ${contact.email}</p>
                <p>Student ID: ${contact.id}</p>
                <p>Batch: ${contact.batch}</p>
                <button onclick="viewContactDetails(${index})">View</button>
                <button onclick="deleteContact(${index})" class="delete-btn">Delete</button>
            `;
            savedContactsContainer.appendChild(contactItem);
        });
    }

    // Show saved contacts
    showSavedContactsButton.addEventListener('click', () => {
        loadSavedContacts();
    });

    // Add contact
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value;
        const number = document.getElementById('contact-number').value;
        const email = document.getElementById('contact-email').value;
        const id = document.getElementById('contact-id').value;
        const batch = document.getElementById('contact-batch').value;

        if (!name || !number || !email || !id || !batch) {
            alert('Please fill in all fields.');
            return;
        }

        const contact = {
            name: name,
            number: number,
            email: email,
            id: id,
            batch: batch
        };

        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        document.getElementById('contact-name').value = '';
        document.getElementById('contact-number').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-id').value = '';
        document.getElementById('contact-batch').value = '';

        notification.textContent = 'Contact saved successfully';
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000);
    });
});

// View contact details
function viewContactDetails(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    alert(`Name: ${contact.name}\nNumber: ${contact.number}\nEmail: ${contact.email}\nStudent ID: ${contact.id}\nBatch: ${contact.batch}`);
}

// Delete a contact
function deleteContact(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1); // Remove contact at index
    localStorage.setItem('contacts', JSON.stringify(contacts)); // Update local storage
    document.querySelector('#show-saved-contacts').click(); // Refresh the contacts list
}
