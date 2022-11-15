import { useDispatch } from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { ingredientsActions } from "../store/ingredients.slice";
import { burgerConstructorActions } from "../store/burgerConstructor.slice";

const actions = {
  ...ingredientsActions,
  ...burgerConstructorActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
