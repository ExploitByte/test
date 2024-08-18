document.addEventListener('DOMContentLoaded', () => {
    const newChatButton = document.getElementById('new-chat-btn');
    const popup = document.getElementById('popup');
    const popupCloseButton = document.getElementById('popup-close-btn');
    const addFriendButton = document.getElementById('add-friend-btn');
    const chatWindow = document.getElementById('chat-window');
    const chatTabs = document.getElementById('chat-tabs');
    const successPopup = document.getElementById('success-popup');
    const successPopupCloseButton = document.getElementById('success-popup-close-btn');

    // Open the popup to add a new friend
    newChatButton.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    // Close the popup
    popupCloseButton.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Add a friend and open a new chat
    addFriendButton.addEventListener('click', () => {
        const username = document.getElementById('friend-username').value.trim();
        if (username) {
            // Show success message
            showSuccessMessage('Friend request sent successfully');
            openChat(username);
            popup.style.display = 'none';
        } else {
            alert('Please enter a username or student ID');
        }
    });

    function openChat(username) {
        // Remove previously opened chat windows
        const existingChats = document.querySelectorAll('.chat');
        existingChats.forEach(chat => chat.style.display = 'none');

        // Create a new chat tab
        const tab = document.createElement('div');
        tab.className = 'chat-tab';
        tab.innerHTML = `
            <span onclick="showChat('${username}')">${username}</span>
        `;
        chatTabs.appendChild(tab);

        // Create a new chat window
        const chat = document.createElement('div');
        chat.className = 'chat';
        chat.id = `chat-${username}`;
        chat.innerHTML = `
            <h3>Chat with ${username}</h3>
            <div class="messages"></div>
            <textarea placeholder="Type a message..."></textarea>
            <button class="btn" onclick="sendMessage('${username}')">Send</button>
            <input type="file" id="file-upload-${username}">
            <button class="btn" onclick="document.getElementById('file-upload-${username}').click()">Attach File</button>
        `;
        chatWindow.appendChild(chat);
        showChat(username);
    }

    window.showChat = function(username) {
        // Hide all chats and show the selected chat
        const chats = document.querySelectorAll('.chat');
        chats.forEach(chat => {
            chat.style.display = 'none';
        });
        document.getElementById(`chat-${username}`).style.display = 'block';
    };

    window.sendMessage = function(username) {
        // Send message logic
        const messageBox = document.querySelector(`#chat-${username} textarea`);
        const message = messageBox.value;
        if (message) {
            const messagesContainer = document.querySelector(`#chat-${username} .messages`);
            const messageElement = document.createElement('div');
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);
            messageBox.value = '';
        }
    };

    function showSuccessMessage(message) {
        const successPopup = document.getElementById('success-popup');
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = message;
        successPopup.style.display = 'flex';
        
        setTimeout(() => {
            successPopup.style.display = 'none';
        }, 2000); // Hide after 2 seconds
    }
});
