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

const checkPromise = (promise) => {
  return promise.then((res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);
  });
};
