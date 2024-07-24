import React, {ReactElement, useEffect} from "react";
import {Redirect, Route, RouteProps, useLocation} from "react-router-dom";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookie";
import {useAppSelector} from "../../hooks/redux";
import {useGetUserQuery, useRefreshTokenMutation} from "../../store/api";
import {useActions} from "../../hooks/actions";
import {ILocationState} from "../../models/models";

interface ProtectedRouteProps {
	component: () => ReactElement;
	exact: boolean;
	path: string;
}

const ProtectedRoute = ({
													component: Comp,
													path,
													...rest
												}: ProtectedRouteProps) => {
	const location = useLocation<ILocationState>();
	const {isAuth} = useAppSelector((state) => state.auth);
	const {loginSuccess, refreshUser} = useActions();
	const token = document.cookie ? getCookie("token") : "";
	const refreshToken = document.cookie ? getCookie("refreshToken") : "";
	const {
		isSuccess: isGetUserSuccess,
		isError: isGetUserError,
		data: userData,
	} = useGetUserQuery(token);
	const [
		refreshTokenPost,
		{isError: isRefreshError, isLoading: isRefreshLoading},
	] = useRefreshTokenMutation();

	useEffect(() => {
		isGetUserSuccess && loginSuccess();
		isGetUserSuccess && refreshUser(userData);

		if (
			!isRefreshError &&
			!isRefreshLoading &&
			isGetUserError &&
			refreshToken
		) {
			refreshTokenPost(refreshToken)
				.unwrap()
				.then((res) => {
					if (res) {
						const authToken = res.accessToken?.split("Bearer ")[1];
						if (authToken) {
							deleteCookie("token", getCookie("token"));
							deleteCookie("refreshToken", getCookie("refreshToken"));
							setCookie("token", authToken);
							setCookie("refreshToken", res.refreshToken);
						}
						refreshUser(res);
					}
				})
				.catch(() => {
				});
		}
	});

	return (
		<Route
			path={path}
			{...rest}
			render={(props: RouteProps) => {
				return isAuth ? (
					<Comp  />
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: {
								from: location,
								error: "You need to login first!",
							},
						}}
					/>
				);
			}}
		/>
	);
};

export default ProtectedRoute;
