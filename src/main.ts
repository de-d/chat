import { UI, POPUP_UI } from "./const";
import { openSettings, closeSettings, openMailConfirmation, WRAPPER_CHAT, SETTINGS, AUTHORIZATION, MAIL_CONFIRMATION } from "./popupLogic";
import { messageHistoryServer, requestCode, changeName, checkName } from "./requests";
import { openSocket, exitChat } from "./webSocket";
import Cookies from "js-cookie";

function getTokenFromCookie() {
  if (POPUP_UI.CODE_INPUT.value === "") {
    alert("Пожалуйста, введите код!");
  } else if (POPUP_UI.CODE_INPUT.value.length < 166) {
    alert("Введите корректный код!");
  } else {
    const TOKEN = POPUP_UI.CODE_INPUT.value;
    POPUP_UI.CODE_INPUT.value = "";
    Cookies.set("cookieToken", TOKEN);
    checkCookieName();
  }
  POPUP_UI.CODE_INPUT.value = "";
}

function checkCookieName() {
  const name = Cookies.get("cookieName");
  if (!name) {
    AUTHORIZATION.style.display = "none";
    MAIL_CONFIRMATION.style.display = "none";
    openSettings();
  } else {
    WRAPPER_CHAT.style.display = "flex";
    SETTINGS.style.display = "none";
    AUTHORIZATION.style.display = "none";
    MAIL_CONFIRMATION.style.display = "none";
  }
}

POPUP_UI.OPEN_MAIL_CONFIRMATION.disabled = true;

if (Cookies.get("cookieEmail")) {
  POPUP_UI.OPEN_MAIL_CONFIRMATION.disabled = false;
} else {
  POPUP_UI.REQUEST_CODE_BUTTON.addEventListener("click", function (event: Event) {
    event.preventDefault();
    POPUP_UI.OPEN_MAIL_CONFIRMATION.disabled = false;
  });
}

POPUP_UI.REQUEST_CODE_BUTTON.addEventListener("click", requestCode);
POPUP_UI.OPEN_MAIL_CONFIRMATION.addEventListener("click", openMailConfirmation);

POPUP_UI.LOG_IN_BUTTON.addEventListener("click", function (event: Event) {
  event.preventDefault();
  getTokenFromCookie();
  messageHistoryServer();
  openSocket();
});

UI.OPEN_SETTINGS.addEventListener("click", openSettings);
POPUP_UI.CLOSE_SETTINGS.addEventListener("click", function () {
  messageHistoryServer();
  closeSettings();
  UI.CHAT_CONTAINER.scrollTop = UI.CHAT_CONTAINER.scrollHeight;
});
POPUP_UI.CHANGE_NAME_BUTTON.addEventListener("click", function (event: Event) {
  event.preventDefault();
  changeName(event);
  checkName();
});

UI.DOWN_BUTTON.addEventListener("click", function (event: Event) {
  event.preventDefault();
  UI.CHAT_CONTAINER.scrollTo({
    top: UI.CHAT_CONTAINER.scrollHeight,
    behavior: "smooth",
  });
});

UI.EXIT_BUTTON.addEventListener("click", function () {
  WRAPPER_CHAT.style.display = "none";
  AUTHORIZATION.style.display = "block";
  exitChat();
});
