var socket = io();
function setUsername() {
	socket.emit("setUsername", document.getElementById("name").value);
}
var user;
socket.on("userExists", function (data) {
	document.getElementById("error-container").innerHTML = data;
});
socket.on("userSet", function (data) {
	user = data.username;
	document.getElementById("HOMEPAGE").style.display = "none";
	document.getElementById("CHATPAGE").style.display = "flex";
});
function sendMessage() {
	var msg = document.getElementById("message").value;
	if (msg) {
		socket.emit("msg", { message: msg, user: user });
	}
	document.getElementById("message").value = "";
}
socket.on("newmsg", function (data) {
	if (user) {
		document.getElementById("message-container").innerHTML +=
			"<div><b>" + data.user + "</b>: " + data.message + "</div>";
	}
});
