import { UI, SERVER_ELEMENTS } from "./const";
import { createMessage, updateNewMessageBadge, newMessageNotification } from "./message";
import Cookies from "js-cookie";

let socket: WebSocket | null = null;
let isWebSocketOpen = false;

export function openSocket() {
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("Соединение с сокетом уже открыто.");
    return;
  }

  socket = new WebSocket(`wss://edu.strada.one/websockets?${SERVER_ELEMENTS.COOKIE_TOKEN}`);

  socket.onmessage = function (event) {
    console.log(event.data);
    const newMessage = JSON.parse(event.data);

    if (newMessage.text !== null) {
      createMessage(newMessage);
    }

    if (newMessage.user.email !== Cookies.get("cookieEmail")) {
      updateNewMessageBadge();
    }
  };

  socket.onopen = function () {
    isWebSocketOpen = true;
    console.log("Соединение с сокетом установлено.");
    UI.FORM.onsubmit = sendMessage;

    UI.CHAT_CONTAINER.scrollTop = UI.CHAT_CONTAINER.scrollHeight;
  };

  socket.onclose = function () {
    if (isWebSocketOpen) {
      console.log("Соединение с сокетом закрыто.");
      setTimeout(openSocket, 2000);
    }
  };

  socket.onerror = function (error) {
    console.error(`WebSocket error: ${error}`);
  };

  newMessageNotification();
}

export function closeSocket() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) {
    socket.close();
    console.log("Соединение с сокетом закрыто.");
    socket = null;
  } else {
    console.log("Соединение с сокетом уже закрыто.");
  }
}

function sendMessage(event: SubmitEvent) {
  event.preventDefault();
  if (UI.MESSAGE_INPUT.value !== "") {
    socket?.send(JSON.stringify({ text: `${UI.MESSAGE_INPUT.value}` }));
  }
  UI.MESSAGE_INPUT.value = "";
}

export function exitChat() {
  isWebSocketOpen = false;
  closeSocket();
}
