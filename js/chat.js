import users from "../data/users.js";

const form = document.querySelector("#new-message-form");
const messagesWrapper = document.querySelector("main#chat .container");
const profileInfo = document.querySelector("#profile-info");
const logoutBtn = document.querySelector("#logout-btn");
const chatListBtn = document.querySelector("#chat-list-btn");

let { userId } = localStorage;

if (!userId) {
  location.replace("./login.html");
}

let friendId = location.hash.slice(1);

if (!friendId) {
  location.replace("./chat-list.html");
}

let chats = JSON.parse(localStorage.getItem("chats") || "[]");

let chatIndex;
let chat = chats.find((ch, index) => {
  if (ch.members.includes(userId) && ch.members.includes(friendId)) {
    chatIndex = index;
    return true;
  }

  return false;
});

if (!chat) {
  chat = {
    members: [userId, friendId],
    messages: [],
  };

  chatIndex = chats.length;

  chats.push(chat);

  localStorage.setItem("chats", JSON.stringify(chats));
}

chat.messages.forEach((message) => {
  let template = `<div class="message ${
    message.fromId === userId
      ? "from-me text-bg-primary"
      : "to-me text-bg-light"
  }">
          <span class="text"
            >${message.text}</span
          >
          <span class="time">${message.date}</span>
        </div>`;

  messagesWrapper.innerHTML += template;
});

const friend = users.find((u) => u.id + "" === friendId + "");

profileInfo.innerHTML = `
<a href="../images/chat-bg-pattern.webp" download="${friend.name}">
  <img
    class="profile-image"
    src="${friend.image}"
    alt="${friend.name}"
  />
</a>
<div class="d-flex flex-column">
  <span class="name h2">${friend.name}</span>
  <span class="status text-info">${
    friend.status === "online" ? "online" : `last seen ${friend.status}`
  }</span>
</div>
`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let messageText = e.target[0].value;

  if (!messageText) return;

  const date = new Date();

  const hour = (date.getHours() + "").padStart(2, "0");
  const minute = (date.getMinutes() + "").padStart(2, "0");

  let template = `
<div class="message from-me text-bg-primary">
  <span class="text"
    >${messageText}</span
  >
  <span class="time">${hour}:${minute}</span>
</div>
  `;

  messagesWrapper.innerHTML += template;

  // { member: [ID], messages: [{ text: "", date: DATE, fromId: ID }] }

  let message = {
    text: messageText,
    date: `${hour}:${minute}`,
    fromId: userId,
  };

  chat.messages.push(message);

  chats[chatIndex] = chat;

  localStorage.setItem("chats", JSON.stringify(chats));

  e.target.reset();
});

logoutBtn.addEventListener("click", () => {
  if (confirm("Are you sure to logout?")) {
    localStorage.removeItem("userId");
    location.replace("./login.html");
  }
});

chatListBtn.addEventListener("click", () => {
  location.replace("./chat-list.html");
});
