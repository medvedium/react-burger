import { useDispatch } from "react-redux";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import { ingredientsActions } from "../store/ingredients.slice";

const actions = {
  ...ingredientsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
