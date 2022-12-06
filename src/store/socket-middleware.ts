import { Middleware } from "redux";
import { ordersActions } from "./orders.slice";

const socketMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => {
    return (action) => {
      if (action.type === "orders/wsOpen") {
        socket = new WebSocket(action.payload);
      }

      if (socket) {
        socket.onopen = () => {
          store.dispatch(ordersActions.addOrders(action));
        };
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          store.dispatch(ordersActions.addOrders(data));
        };

        if (action.type === "orders/wsClose") {
          socket.close();
        }
      }
      return next(action);
    };
  };
};

export default socketMiddleware;
