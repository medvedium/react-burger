import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "./index";
import { TWsActions } from "../models/models";

const socketMiddleware =
  (wsActions: TWsActions): Middleware =>
  (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => {
      return (action) => {
        const { onMessage, open, close } = wsActions;

        if (action.type === open.type) {
          socket = new WebSocket(action.payload.url);
        }

        if (socket) {
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            store.dispatch(onMessage(data));
          };

          if (action.type === close.type) {
            socket.close();
          }
        }
        return next(action);
      };
    };
  };

export default socketMiddleware;
