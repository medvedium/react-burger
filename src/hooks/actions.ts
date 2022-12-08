import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { ingredientsActions } from "../store/ingredients.slice";
import { burgerConstructorActions } from "../store/burgerConstructor.slice";
import { modalActions } from "../store/modal.slice";
import { authActions } from "../store/auth.slice";
import { useAppDispatch } from "../store";
import { wsActions } from "../store/ws.slice";

const actions = {
  ...ingredientsActions,
  ...burgerConstructorActions,
  ...modalActions,
  ...authActions,
  ...wsActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
