const sendbutton = document.getElementById("send");
const chat = document.getElementById("chat");
const msgbox = document.getElementById("msg");

sendbutton.onclick = function()
{
	if(socket)
	{
		socket.send(msgbox.value);
		msgbox.value = '';
	}
}

let socket = new WebSocket("wss://rust-wistful-butterkase.glitch.me");

socket.onopen = function(e)
{
	alert("Connection established");
};

socket.onmessage = function(event)
{
	//alert("Data received from server: " + event.data);
	chat.textContent += "\n--> " + event.data;
	chat.screenTop = chat.scrollHeight;
};

socket.onclose = function(event)
{
	if (event.wasClean)
	{
		alert("Connection closed cleanly, code: " + event.code + ", reason: " + event.reason);
	}
	else
	{
		alert("Connection died");
	}
};

socket.onerror = function(error)
{
	alert("[error] " + error.data);
};