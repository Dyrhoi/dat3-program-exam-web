import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/ProvideAuth";
import { displayOrUsername } from "../../utils/user";

export const Navbar = () => {
	const auth = useAuth();
	const user = auth.user;

	const loginArea = !user ? (
		<li className="nav-item d-flex align-items-center">
			<NavLink role="button" to="/sign-in" activeClassName="" className="nav btn btn-primary">
				Sign in
			</NavLink>
		</li>
	) : (
		<li className="nav-item dropdown with-arrow">
			<button className="nav-link" data-toggle="dropdown" id="nav-link-dropdown-toggle">
				{displayOrUsername(user)}
			</button>
			<div className="dropdown-menu dropdown-menu-right" aria-labelledby="nav-link-dropdown-toggle">
				<NavLink to="/user/settings" className="dropdown-item d-flex align-items-center justify-content-between">
					Settings <span className="material-icons-outlined">settings</span>
				</NavLink>
				<div className="dropdown-divider"></div>
				{user.roles.includes("admin") && (
					<>
						<NavLink to="/admin" className="dropdown-item d-flex align-items-center justify-content-between">
							Admin
							<span className="material-icons-outlined">admin_panel_settings</span>
						</NavLink>
						<div className="dropdown-divider"></div>
					</>
				)}
				<div className="dropdown-content">
					<button className="btn btn-block btn-danger" onClick={auth.logout}>
						Sign out
					</button>
				</div>
			</div>
		</li>
	);

	return (
		<nav className="navbar">
			<div className="container">
				<NavLink to="/" className="navbar-brand">
					Wadog
				</NavLink>
				<ul className="navbar-nav">
					<li className="nav-item">
						<NavLink className="nav-link" to="/walkers">
							Walkers
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink className="nav-link" to="/owners">
							Owners
						</NavLink>
					</li>
				</ul>
				<ul className="ml-auto navbar-nav">{loginArea}</ul>
			</div>
		</nav>
	);
};
