import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { SignIn, SignUp } from "../pages/Authentication";
import { Dogs } from "../pages/Dogs";
import { IndividualDog } from "../pages/dogs/IndividualDog";
import { Settings } from "../pages/user/Settings";
import { Walkers } from "../pages/Walkers";
import { Welcome } from "../pages/Welcome";

export const routes = [
	/**
	 *
	 * Global Routes
	 *
	 */
	{
		path: "/",
		exact: true,
		component: Welcome,
	},
	{
		path: "/sign-in",
		component: SignIn,
	},
	{
		path: "/sign-up",
		component: SignUp,
	},
	/**
	 *
	 * Authenticated routes.
	 *
	 */
	{
		path: "/user/settings",
		protected: true,
		component: Settings,
	},
	{
		path: "/walkers",
		protected: true,
		component: Walkers,
	},
	{
		path: "/dogs",
		exact: true,
		protected: true,
		component: Dogs,
	},
	{
		path: "/dogs/:id",
		exact: true,
		protected: true,
		component: IndividualDog,
	},
	/**
	 *
	 * Admin routes.
	 *
	 */
	{
		path: "/admin",
		protected: true,
		admin: true,
		component: AdminDashboard,
	},
];
