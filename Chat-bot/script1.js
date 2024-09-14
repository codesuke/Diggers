document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('input_text');
    const sendButton = document.querySelector('.fa-arrow-up');
    const chatMessages = document.querySelector('main .flex-col');

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            showLoading();
            fetchBotResponse(message);
        }
    }

    function addMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('bg-[#38a169]', 'p-4', 'rounded-lg', 'max-w-md', 'text-white');
        messageElement.textContent = `${text}`;

        if (sender === 'user') {
            messageElement.classList.add('self-end');
        } else {
            messageElement.classList.add('self-start');
        }

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showLoading() {
        const loadingElement = document.createElement('div');
        loadingElement.classList.add('loading', 'text-white', 'self-start', 'p-4');
        loadingElement.textContent = 'Bot is typing...';
        chatMessages.appendChild(loadingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideLoading() {
        const loadingElement = document.querySelector('.loading');
        if (loadingElement) {
            loadingElement.remove();
        }
    }

    async function fetchBotResponse(message) {
        try {
            const response = await fetch('http://127.0.0.1:5001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (!response.ok) {
                throw new Error('API request failed');
            }

            const data = await response.json();
            hideLoading();
            addMessage('bot', data.response);
        } catch (error) {
            console.error('Error:', error);
            hideLoading();
            addMessage('bot', "Sorry, I couldn't process your request.");
        }
    }
});