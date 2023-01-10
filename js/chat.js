import users from "../data/users.js";

const form = document.querySelector("#new-message-form");
const messagesWrapper = document.querySelector("main#chat .container");
const profileInfo = document.querySelector("#profile-info");

let { userId } = localStorage;

if (!userId) {
  location.replace("../login.html");
}

let friendId = location.hash.slice(1);

if (!friendId) {
  location.replace("../chat-list.html");
}

const friend = users.find((u) => u.id + "" === friendId + "");

profileInfo.innerHTML = `
<img
  class="profile-image"
  src="${friend.image}"
  alt="${friend.name}"
/>
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

  const hour = date.getHours();
  const minute = date.getMinutes();

  let template = `
<div class="message from-me text-bg-primary">
  <span class="text"
    >${messageText}</span
  >
  <span class="time">${hour}:${minute}</span>
</div>
  `;

  messagesWrapper.innerHTML += template;

  e.target.reset();
});
