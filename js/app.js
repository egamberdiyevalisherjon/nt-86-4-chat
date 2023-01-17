const userId = localStorage.getItem("userId");

if (!userId) location.replace("./pages/login.html");
else location.replace("./pages/chat-list.html");
