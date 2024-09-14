document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.querySelector(".chat-messages");

  sendButton.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
      addMessage("user", message);
      userInput.value = "";
      showLoading();
      fetchBotResponse(message);
    }
  }

  function addMessage(sender, text) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(
      "message",
      sender === "user" ? "right" : "left"
    );

    const messageContent = document.createElement("div");
    const nameTag = document.createElement("p");
    nameTag.classList.add("name");
    nameTag.textContent = sender === "user" ? "User" : "ChatBot";

    const messageText = document.createElement("p");
    messageText.textContent = text;

    messageContent.appendChild(nameTag);
    messageContent.appendChild(messageText);
    messageElement.appendChild(messageContent);

    chatMessages.appendChild(messageElement);

    // Scroll to bottom after adding message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showLoading() {
    const loadingElement = document.createElement("div");
    loadingElement.classList.add("loading", "text-white", "self-start", "p-4");
    loadingElement.textContent = "Bot is typing...";
    chatMessages.appendChild(loadingElement);

    // Scroll to bottom when showing loading
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function hideLoading() {
    const loadingElement = document.querySelector(".loading");
    if (loadingElement) {
      loadingElement.remove();
    }
  }

  async function fetchBotResponse(message) {
    try {
      const response = await fetch("http://127.0.0.1:5001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      hideLoading();
      addMessage("bot", data.response);
    } catch (error) {
      console.error("Error:", error);
      hideLoading();
      addMessage("bot", "Sorry, I couldn't process your request.");
    }
  }
});
