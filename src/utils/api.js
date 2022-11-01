import { _GET_USER_URL, _TOKEN_URL } from "./constants";

const checkPromise = (promise) => {
  return promise.then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status} ${res}`);
  });
};

export const fetchGet = (url) => {
  const promise = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json: charset=utf-8",
    },
  });
  return checkPromise(promise);
};

export const fetchPost = (url, orderData) => {
  const promise = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients: orderData }),
  });
  return checkPromise(promise);
};

export const resetPasswordPost = (url, email) => {
  const promise = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  return checkPromise(promise);
};

export const setNewPasswordPost = (url, password, token) => {
  const promise = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
  return checkPromise(promise);
};

export const registerPost = (url, email, password, userName) => {
  const promise = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: userName,
    }),
  });
  return checkPromise(promise);
};

export const loginPost = (url, postData) => {
  const promise = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: postData.email,
      password: postData.password,
    }),
  });
  return checkPromise(promise);
};

export const getUserRequest = (token) => {
  const promise = fetch(_GET_USER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return checkPromise(promise);
};

export const refreshTokenRequest = (tokenData) => {
  const promise = fetch(_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenData),
  });
  return checkPromise(promise);
};

export const getCookie = (cookieName) => {
  return document.cookie
    .split("; ")
    .filter((str) => str.includes(cookieName))[0]
    .split("=")[1];
};

export const setCookie = (name, value) => {
  document.cookie = `${name}=${value}`;
};

export const deleteCookie = (name, value) => {
  document.cookie = `${name}=${value}; max-age=-1`;
};
