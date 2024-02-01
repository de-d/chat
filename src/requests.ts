import { POPUP_UI, SERVER_ELEMENTS, PATCH, POST, GET } from "./const";
import Cookies from "js-cookie";
import { RequestData } from "./interface";

const getRequestByType = async (requestData: RequestData) => {
  const { type, data, url, headers } = requestData;
  if (type === "GET") {
    return fetch(url, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("cookieToken"),
        ...headers,
      },
    });
  } else {
    return fetch(url, {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("cookieToken"),
        ...headers,
      },
      body: JSON.stringify(data),
    });
  }
};

async function requestCode() {
  const email = POPUP_UI.EMAIL_INPUT.value.trim();

  if (email === "") {
    alert("Please enter your email");
  } else {
    Cookies.set("cookieEmail", email);

    POPUP_UI.REQUEST_CODE_BUTTON.disabled = true;

    try {
      const data = {
        email: email,
      };

      const response = await getRequestByType({
        type: POST,
        data: data,
        url: SERVER_ELEMENTS.SERVER_URL,
        headers: {},
      });
      console.log(await response.json());
    } catch (error) {
      console.log(error);
    }
  }
}

async function changeName(event: Event) {
  event.preventDefault();
  const name = POPUP_UI.CHANGE_NAME_INPUT.value.trim();

  if (name.trim().length < 2) {
    alert("Имя должно содержать не менее 2 символов");
  } else {
    Cookies.set("cookieName", name);
  }

  try {
    const data = {
      name: name,
    };
    const headers = {
      Cookie: "cookieName=" + encodeURIComponent(name),
    };

    const response = await getRequestByType({
      type: PATCH,
      data: data,
      url: SERVER_ELEMENTS.SERVER_URL,
      headers: headers,
    });
    const responseData = await response.json();
    alert("Имя успешно изменено!");
    console.log(responseData);
  } catch (error) {
    console.log(error);
  }
}

async function checkName() {
  try {
    const response = await getRequestByType({
      type: GET,
      data: {},
      url: SERVER_ELEMENTS.SERVER_URL_ME,
      headers: {},
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

let isPageInitialized = false;

async function messageHistoryServer() {
  if (isPageInitialized) {
    return;
  }

  try {
    const response = await getRequestByType({
      type: GET,
      data: {},
      url: SERVER_ELEMENTS.SERVER_URL_MESSAGE,
      headers: {},
    });
    const responseData = await response.json();
    console.log(responseData);

    localStorage.setItem("messageHistory", JSON.stringify(responseData));
  } catch (error) {
    console.log(error);
  }

  isPageInitialized = true;
}

export { messageHistoryServer, requestCode, changeName, checkName };
