import users from "../data/users.js";

let { userId } = localStorage;

if (!userId) {
  window.location.replace("../pages/login.html");
}

const friendsList = document.querySelector("#friends-list");

users.forEach((user) => {
  if (user.id + "" !== userId + "") {
    let template = `
<li class="list-group-item">
  <a
    href="./chat.html#${user.id}"
    class="text-reset text-decoration-none d-flex align-items-center gap-3"
  >
    <img
      src="${user.image}"
      alt="${user.name}"
      style="
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      "
    />
    <span class="name h3">${user.name}</span>
  </a>
</li>
        `;
    friendsList.innerHTML += template;
  }
});
