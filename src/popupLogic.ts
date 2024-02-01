const WRAPPER_CHAT: HTMLElement = document.querySelector("#wrapper-chat")!;
const SETTINGS: HTMLElement = document.querySelector("#settings-popup")!;
const AUTHORIZATION: HTMLElement = document.querySelector("#authorization-popup")!;
const MAIL_CONFIRMATION: HTMLElement = document.querySelector("#mail-confirmation-popup")!;

function openSettings() {
  WRAPPER_CHAT.style.display = "none";
  SETTINGS.style.display = "block";
}

function closeSettings() {
  SETTINGS.style.display = "none";
  WRAPPER_CHAT.style.display = "flex";
}

function openAuthorization() {
  AUTHORIZATION.style.display = "block";
}

function closeAuthorization() {
  AUTHORIZATION.style.display = "none";
}

function openMailConfirmation(event: Event) {
  event.preventDefault();
  MAIL_CONFIRMATION.style.display = "block";
  AUTHORIZATION.style.display = "none";
}

function closeMailConfirmation(event: Event) {
  event.preventDefault();
  MAIL_CONFIRMATION.style.display = "none";
}

export {
  openSettings,
  closeSettings,
  openAuthorization,
  closeAuthorization,
  openMailConfirmation,
  closeMailConfirmation,
  WRAPPER_CHAT,
  SETTINGS,
  AUTHORIZATION,
  MAIL_CONFIRMATION,
};
