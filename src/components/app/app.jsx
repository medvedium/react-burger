import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import {
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientsPage from "../../pages/ingredients/ingredients";
import PageNotFound404 from "../../pages/page-not-found-404/page-not-found-404";
import ProtectedRoute from "../protected-route/protected-route";
import OrdersPage from "../../pages/orders/orders";
import {
  GET_INGREDIENTS_SUCCESS,
  getIngredients,
} from "../../services/actions/ingredient";
import { useDispatch } from "react-redux";
import Modal from "../modal/modal";
import { MODAL_CLOSE, MODAL_OPEN } from "../../services/actions/modal";
import { useGetIngredientsQuery } from "../../store/api";
import { useActions } from "../../hooks/actions";

function App() {
  const { getIngredients } = useActions();

  const dispatch = useDispatch();
  const {
    isLoading: isIngredientsLoading,
    isError: isIngredientsError,
    data,
    isSuccess,
  } = useGetIngredientsQuery();

  useEffect(() => {
    isSuccess && getIngredients(data);
    // dispatch({
    //   type: GET_INGREDIENTS_SUCCESS,
    //   payload: data,
    // });
  }, [dispatch, data]);
  // useEffect(() => {
  //   dispatch(getIngredients(data));
  // }, [dispatch]);
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  const ModalSwitch = () => {
    useEffect(() => {
      if (background) {
        dispatch({ type: MODAL_OPEN });
      }
    });

    const handleModalClose = () => {
      history.goBack();
      dispatch({ type: MODAL_CLOSE });
    };

    return (
      <React.StrictMode>
        <AppHeader />
        <main className="app_container">
          <Switch location={background || location}>
            <Route
              path="/"
              exact
              component={HomePage}
              isIngredientsLoading
              isIngredientsError
            />
            {/*<Route path="/login" exact component={LoginPage} />*/}
            {/*<Route path="/register" exact component={RegisterPage} />*/}
            {/*<Route*/}
            {/*  path="/forgot-password"*/}
            {/*  exact*/}
            {/*  component={ForgotPasswordPage}*/}
            {/*/>*/}
            {/*<Route path="/reset-password" exact component={ResetPasswordPage} />*/}
            {/*<ProtectedRoute path="/profile" exact component={ProfilePage} />*/}
            {/*<ProtectedRoute*/}
            {/*  path="/profile/orders"*/}
            {/*  exact*/}
            {/*  component={OrdersPage}*/}
            {/*/>*/}
            <Route
              path="/ingredients/:ingredientId"
              exact
              component={IngredientsPage}
            />
            {/*<Route component={PageNotFound404} />*/}
          </Switch>

          {background && (
            <Route
              path="/ingredients/:ingredientId"
              children={
                <Modal
                  onClose={() => handleModalClose()}
                  header="Детали ингредиента"
                >
                  <IngredientsPage />
                </Modal>
              }
            />
          )}
        </main>
      </React.StrictMode>
    );
  };

  return (
    <div>
      <Router history={history}>
        <ModalSwitch />
      </Router>
    </div>
  );
}

export default App;
