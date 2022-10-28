import React from "react";
import AppHeader from "../app-header/app-header";
import ErrorBoundary from "../error-boundary/error-boundary";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login";
import RegisterPage from "../../pages/register/register";
import ForgotPasswordPage from "../../pages/forgot-password/forgot-password";
import ResetPasswordPage from "../../pages/reset-password/reset-password";
import ProfilePage from "../../pages/profile/profile";
import IngredientsPage from "../../pages/ingredients/ingredients";
import PageNotFound404 from "../../pages/page-not-found-404/page-not-found-404";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <React.StrictMode>
          <AppHeader />
          <main className="app_container">
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route
                path="/forgot-password"
                exact
                component={ForgotPasswordPage}
              />
              <Route
                path="/reset-password"
                exact
                component={ResetPasswordPage}
              />
              <Route path="/profile" exact component={ProfilePage} />
              <Route path="ingredients" exact component={IngredientsPage} />
              <Route path="*" component={PageNotFound404} />
            </Switch>
          </main>
        </React.StrictMode>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
