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
	document.getElementById("currentUser").innerHTML =
		"You are signed in as " + user;
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
		var newMessage = document.createElement("div");

		if (data.user === user) {
			newMessage.innerHTML = "<div>" + data.message + "</div>";
			newMessage.style.textAlign = "right";
		} else {
			newMessage.innerHTML =
				"<div>" +
				"<b>" +
				data.user +
				"</b> : " +
				data.message +
				"</div>";
			newMessage.style.textAlign = "left";
		}
		document.getElementById("message-container").appendChild(newMessage);
	}
	if (data.user !== user) {
		alert("you have recieved a msg!");
		play1();
	}
});
function play1() {
	/* Audio link for notification */
	var mp3 = '<source src="notification.wav" type="audio/mpeg">';
	document.getElementById("sound").innerHTML =
		'<audio autoplay="autoplay">' + mp3 + "</audio>";
}
