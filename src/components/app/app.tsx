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
import FeedPage from "../../pages/feed/feed";
import Modal from "../modal/modal";
import { useGetIngredientsQuery } from "../../store/api";
import { useActions } from "../../hooks/actions";
import { ILocationState } from "../../models/models";
import { Location } from "history";
import FeedDetailsPage from "../../pages/feed-details-page/feed-details-page";
import FeedDetails from "../feed-details/feed-details";
import OrderDetailsPage from "../../pages/order-details/order-details";

function App() {
  const { getIngredients, getIngredientsFailed, openModal, closeModal } =
    useActions();

  const {
    isError: isIngredientsError,
    data: ingredients,
    isSuccess: isIngredientsGetSuccess,
  } = useGetIngredientsQuery("");

  useEffect(() => {
    isIngredientsGetSuccess && getIngredients(ingredients);
    isIngredientsError && getIngredientsFailed();
  }, [
    ingredients,
    isIngredientsGetSuccess,
    isIngredientsError,
    getIngredients,
    getIngredientsFailed,
  ]);
  const history = useHistory();
  const location = useLocation<ILocationState | Location<any> | any>();
  const background = location.state && location.state.background;

  const ModalSwitch = () => {
    useEffect(() => {
      if (background) {
        openModal();
      }
    });

    const handleModalClose = () => {
      history.goBack();
      window.history.replaceState(null, "", "/");
      closeModal();
    };

    return (
      <React.StrictMode>
        <AppHeader />
        <main className="app_container">
          <Switch location={background || location}>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <Route
              path="/forgot-password"
              exact
              component={ForgotPasswordPage}
            />
            <Route path="/reset-password" exact component={ResetPasswordPage} />
            <ProtectedRoute path="/profile" exact component={ProfilePage} />
            <ProtectedRoute
              path="/profile/orders"
              exact
              component={OrdersPage}
            />
            <ProtectedRoute
              path="/profile/orders/:id"
              exact
              component={OrderDetailsPage}
            />
            <Route
              path="/ingredients/:ingredientId"
              exact
              component={IngredientsPage}
            />
            <Route path="/feed" exact component={FeedPage} />
            <Route path="/feed/:id" component={FeedDetailsPage} />
            <Route component={PageNotFound404} />
          </Switch>

          {background && (
            <Switch>
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
              <Route
                path="/feed/:id"
                children={
                  <Modal onClose={() => handleModalClose()}>
                    <FeedDetails />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:id"
                children={
                  <Modal onClose={() => handleModalClose()}>
                    <FeedDetails />
                  </Modal>
                }
              />
            </Switch>
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
