import users from "../data/users.js";

const namesSelect = document.querySelector("#names-select");
const form = document.querySelector("#login-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let id = e.target[0].value;
  let password = e.target[1].value;

  let user = users.find((u) => u.id + "" === id + "");

  if (!user) {
    alert("Togri user tanlash kere");
    return;
  }

  if (user.password !== password) {
    alert("Notogri parol");
    e.target.reset();
    return;
  }

  localStorage.userId = id;

  window.location.replace("./chat-list.html");
});

users.forEach((user) => {
  let option = document.createElement("option");

  option.setAttribute("value", user.id);
  option.innerText = user.name;

  namesSelect.append(option);
});
