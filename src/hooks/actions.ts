import { useDispatch } from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { ingredientsActions } from "../store/ingredients.slice";
import { burgerConstructorActions } from "../store/burgerConstructor.slice";
import { modalActions } from "../store/modal.slice";
import { authActions } from "../store/auth.slice";
import { ordersActions } from "../store/orders.slice";

const actions = {
  ...ingredientsActions,
  ...burgerConstructorActions,
  ...modalActions,
  ...authActions,
  ...ordersActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
