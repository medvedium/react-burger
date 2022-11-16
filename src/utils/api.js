import { _GET_USER_URL, _TOKEN_URL } from "./constants";

function request(url, options) {
  return fetch(url, options).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res}`);
  });
}

export const getUserRequest = (token) => {
  return request(_GET_USER_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const userDataPatch = (userData, token) => {
  return request(_GET_USER_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      name: userData.name,
    }),
  });
};

export const refreshTokenRequest = (tokenData) => {
  return request(_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenData),
  });
};

export const getCookie = (cookieName) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        cookieName.replace(/([.$?*|{}()\]\\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = (name, value) => {
  document.cookie = `${name}=${value}; max-age=-1`;
};
