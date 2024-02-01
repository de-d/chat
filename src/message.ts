import { UI } from "./const";
import { DateMessages, ItemMessage } from "./interface";
import { messageHistoryServer } from "./requests";
import Cookies from "js-cookie";

const messageHistory = JSON.parse(localStorage.getItem("messageHistory") as string);

function getTime(date: Date) {
  const time = new Date(date).toLocaleTimeString();
  return time.substring(0, time.length - 3);
}

function createMessageTemplate(item: ItemMessage): HTMLElement {
  const template = document.querySelector("#msg") as HTMLTemplateElement;
  const messageTemplate = template.content.cloneNode(true) as HTMLElement;

  const messageName = messageTemplate.querySelector("#message-name")!;
  const messageText = messageTemplate.querySelector("#message-text")!;
  const messageTime = messageTemplate.querySelector("#message-time")!;
  const messageBlock = messageTemplate.querySelector(".message-block")!;
  const messageContainer = messageTemplate.querySelector(".other-message")!;

  if (item.user.email !== Cookies.get("cookieEmail")) {
    messageContainer.className = "other-message";
    messageName.textContent = item.user.name + ":";
    messageText.textContent = item.text;
    messageBlock.classList.add("received-message");
    if (messageTime) messageTime.textContent = getTime(item.createdAt);
  } else if (item.user.email === Cookies.get("cookieEmail")) {
    messageContainer.className = "my-message";
    messageBlock.classList.add("sent-message");
    messageName.textContent = `Я(${item.user.name}): `;
    messageText.textContent = item.text;
    if (messageTime) messageTime.textContent = getTime(item.createdAt);
  }

  return messageTemplate;
}

export function createMessage(item: ItemMessage): void {
  const messageTemplate = createMessageTemplate(item);
  UI.CHAT_CONTAINER.append(messageTemplate);
}

function createHistoryMessage(item: ItemMessage): void {
  const messageTemplate = createMessageTemplate(item);
  UI.CHAT_CONTAINER.prepend(messageTemplate);
}

const maxMessagesToLoad = 20;
let totalMessagesAdded = 0;

if (messageHistory) {
  addHistoryMessages(messageHistory);
} else {
  alert("История сообщений пуста");
  messageHistoryServer();
}

let isScrolling = false;

export function addHistoryMessages(messageHistory: DateMessages) {
  if (messageHistory.messages === undefined) {
    messageHistoryServer();
    return;
  } else {
    const reversedMessages = messageHistory.messages;
    const messagesToAdd = reversedMessages.slice(totalMessagesAdded, totalMessagesAdded + maxMessagesToLoad);
    messagesToAdd.forEach((key: ItemMessage) => {
      createHistoryMessage(key);
      totalMessagesAdded++;
    });

    if (totalMessagesAdded >= 300) {
      alert("Больше сообщений нет");
    } else {
      UI.CHAT_CONTAINER.addEventListener("scroll", function () {
        handleScroll();
        isScrolling = true;
      });
    }
  }
}

function handleScroll(): void {
  if (UI.CHAT_CONTAINER.scrollTop === 0) {
    addHistoryMessages(messageHistory);
    showScrollButton();
  } else if (UI.CHAT_CONTAINER.scrollHeight - UI.CHAT_CONTAINER.scrollTop > 1350) {
    showScrollButton();
  } else {
    hideScrollButton();
  }
}

function showScrollButton() {
  UI.DOWN_BUTTON.style.display = "block";
  UI.DOWN_BUTTON.style.opacity = "1";
}

function hideScrollButton() {
  UI.DOWN_BUTTON.style.display = "none";
  UI.DOWN_BUTTON.style.opacity = "0";
}

UI.CHAT_CONTAINER.addEventListener("scroll", function () {
  isScrolling = true;
});

// функции для веб сокета

let currentCount = 0;

export function updateNewMessageBadge() {
  const newMessageBadge = document.getElementById("new-message")!;
  const newMessageCount = newMessageBadge.querySelector(".new-message-text");

  if (newMessageBadge) {
    newMessageBadge.style.display = "inline-block";
  }

  if (newMessageCount) {
    currentCount += 1;
    newMessageCount.textContent = currentCount.toString();
  }
}

export function newMessageNotification() {
  const resetButton = document.getElementById("new-message");
  if (resetButton) {
    resetButton.addEventListener("click", function (event) {
      event.preventDefault();
      UI.CHAT_CONTAINER.scrollTop = UI.CHAT_CONTAINER.scrollHeight;
      const newMessageBadge = document.getElementById("new-message")!;
      const newMessageBadgeNumber = document.getElementById("new-message-text")!;
      if (newMessageBadge) {
        newMessageBadge.style.display = "none";
      }
      if (newMessageBadgeNumber) {
        newMessageBadgeNumber.style.display = "none";
      }
      currentCount = 0;
    });
  }
}
