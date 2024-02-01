import Cookies from "js-cookie";

const UI = {
  MESSAGE_INPUT: document.querySelector("#message-input") as HTMLInputElement,
  SEND_BUTTON: document.querySelector("#send-btn") as HTMLButtonElement,
  EMOJI_BUTTON: document.querySelector("#emoji-button") as HTMLButtonElement,
  CHAT_CONTAINER: document.querySelector("#chat-container") as HTMLElement,
  OPEN_SETTINGS: document.querySelector("#open-settings") as HTMLButtonElement,
  EXIT_BUTTON: document.querySelector("#exit-button") as HTMLButtonElement,
  FORM: document.querySelector("#message-form") as HTMLFormElement,
  NEW_MESSAGE: document.querySelector("#new-message") as HTMLElement,
  DOWN_BUTTON: document.querySelector("#down-arrow") as HTMLButtonElement,
};

const POPUP_UI = {
  REQUEST_CODE_BUTTON: document.querySelector("#request-code-button") as HTMLButtonElement,
  CHANGE_NAME_INPUT: document.querySelector("#change-name-input") as HTMLInputElement,
  CHANGE_NAME_BUTTON: document.querySelector("#change-name") as HTMLButtonElement,
  EMAIL_INPUT: document.querySelector("#email-input") as HTMLInputElement,
  CODE_INPUT: document.querySelector("#code-input") as HTMLInputElement,
  LOG_IN_BUTTON: document.querySelector("#log-in") as HTMLButtonElement,
  CLOSE_SETTINGS: document.querySelector("#close-settings") as HTMLButtonElement,
  CLOSE_AUTHORIZATION: document.querySelector("#close-authorization") as HTMLButtonElement,
  OPEN_MAIL_CONFIRMATION: document.querySelector("#open-mail-confirmation") as HTMLButtonElement,
  CLOSE_MAIL_CONFIRMATION: document.querySelector("#close-mail-confirmation") as HTMLButtonElement,
};

const POPUP_WINDOW = {
  AUTHORIZATION: document.querySelector("#authorization-popup") as HTMLElement,
  SETTINGS: document.querySelector("#settings-popup") as HTMLElement,
  MAIL_CONFIRMATION: document.querySelector("#mail-confirmation-popup") as HTMLElement,
};

const SERVER_ELEMENTS = {
  SERVER_URL: "https://edu.strada.one/api/user",
  SERVER_URL_MESSAGE: "https://edu.strada.one/api/messages/",
  SERVER_URL_ME: "https://edu.strada.one/api/user/me",
  COOKIE_TOKEN: Cookies.get("cookieToken"),
};

const PATCH = "PATCH";
const POST = "POST";
const GET = "GET";

export { UI, POPUP_UI, POPUP_WINDOW, SERVER_ELEMENTS, PATCH, POST, GET };
