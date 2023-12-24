const chatList = document.getElementById("chat-list");
const chatView = document.getElementsByClassName("chat-view")[0];
const chatheader = document.getElementsByClassName("chat-header")[0];
let selectedChatItem = null;
const chatFilterInput = document.getElementById("chat-filter");
function dateFormat(timestamp) {
  var date = new Date(timestamp);

  var day = ("0" + date.getDate()).slice(-2);
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  var formattedDate = day + "/" + month + "/" + year;

  return formattedDate;
}

fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
  .then((response) => response.json())
  .then((data) => {
    const chatList = document.querySelector(".chat-list ul");
    const renderChatList = (chats) => {
      chatList.innerHTML = "";

      chats.forEach((chat) => {
        const chatItem = document.createElement("li");
        let date = dateFormat(chat.latestMessageTimestamp);
        chatItem.classList.add("chat-item");
        chatItem.innerHTML = `
                <img src="${chat.imageURL}" alt="${chat.title}">
                <div class="chat-order">
                <span class="chat-title">${chat.title}</span>
                <span class="order-id">${chat.orderId}</span>
                </div>
                
                <span class="last-message-date">${date}</span>
            `;
        chatItem.addEventListener("click", () => {
          if (selectedChatItem) {
            selectedChatItem.style.background = "transparent";
          }
          chatItem.style.background = "rgba(0,0,0,0.5)";
          selectedChatItem = chatItem;
          displayChat(chat.title, chat.messageList, chat.imageURL);
        });
        chatList.appendChild(chatItem);
      });
    };

    renderChatList(data);

    chatFilterInput.addEventListener("input", () => {
      const searchText = chatFilterInput.value.toLowerCase().trim();

      const filteredChats = data.filter(
        (chat) =>
          chat.orderId.toLowerCase().includes(searchText) ||
          chat.title.toLowerCase().includes(searchText)
      );
      renderChatList(filteredChats);
    });
  });

function renderOptionedMessage(message) {
  const options = message.options
    .map((option) => `<div>${option.optionText}</div>`)
    .join("");

  return `<div>${message.message}</div><div class="options">${options}</div>`;
}

function displayChat(chat, messages, imageURL) {
  chatView.style.display = "block";
  chatheader.innerHTML = `
        <img src="${imageURL}" alt="${chat} id="header-img" ">
        <h2>${chat}</h2>
        <!-- Display chat messages and other chat details -->
    `;

  const chatMessages = document.getElementById("chat-messages");

  chatMessages.innerHTML = "";

  messages.forEach((message) => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    if (message.sender === "BOT") {
      messageDiv.classList.add("bot");
      messageDiv.innerHTML =
        message.messageType === "optionedMessage"
          ? renderOptionedMessage(message)
          : `<div>${message.message}</div>`;
    } else if (message.sender === "USER") {
      messageDiv.classList.add("user");
      messageDiv.innerHTML = `<div>${message.message}</div>`;
    }

    chatMessages.appendChild(messageDiv);
  });
}
