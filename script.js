document.addEventListener('DOMContentLoaded', function() {
   showSection('login');
  document.getElementById('mobile-menu').addEventListener('click', function() {
        document.getElementById('mobile-nav').classList.toggle('hidden');
    });
   document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showSection('dashboard');
    });

    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showSection('login');
    });

    // Hide header on login/register
    if(window.location.hash === '#login' || window.location.hash === '#register') {
        document.getElementById('main-header').classList.add('hidden');
    }
});

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hide-section');
    });
    document.getElementById(sectionId).classList.remove('hide-section');
    document.getElementById('mobile-nav').classList.add('hidden');
    if(sectionId === 'login' || sectionId === 'register') {
        document.getElementById('main-header').classList.add('hidden');
    } else {
        document.getElementById('main-header').classList.remove('hidden');
    }
    window.location.hash = sectionId;
}

let chatMessages = [];

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    addMessage('user', message);
    input.value = '';
    addMessage('loading', '');

    try {
        const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/ai', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer AZPfDpiGVkWuBHr0KxEYvcyHQGl1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{
                    role: 'user',
                    content: [{
                        type: 'text',
                        text: `As an agricultural assistant, please answer this farming question: ${message}`
                    }]
                }]
            })
        });

        const data = await response.json();
        removeLoadingMessage();
        addMessage('bot', data.message);
    } catch (error) {
        removeLoadingMessage();
        addMessage('bot', 'Sorry, I encountered an error. Please try again.');
    }
}

function addMessage(role, message) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-4 ${role === 'user' ? 'text-right' : 'text-left'}`;
    
    if (role === 'loading') {
        messageDiv.innerHTML = `<div class="loader inline-block"></div>`;
        messageDiv.classList.add('loading-message');
    } else {
        messageDiv.innerHTML = `
            <div class="${role === 'user' ? 'bg-green-600' : 'bg-gray-700'} inline-block rounded-lg px-4 py-2 max-w-xs md:max-w-md">
                ${message}
            </div>
        `;
    }
    
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeLoadingMessage() {
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}
window.addEventListener('load', function() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    }
});
