import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "./index";
import { TWsActions } from "../models/models";

const socketMiddleware =
  (wsActions: TWsActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => {
      return (action) => {
        if (action.type === "ws/open") {
          socket = new WebSocket(action.payload.url);
        }

        const { addOrders } = wsActions;

        if (socket) {
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            store.dispatch(addOrders(data));
          };

          if (action.type === "ws/close") {
            socket.close();
          }
        }
        return next(action);
      };
    };
  };

export default socketMiddleware;
