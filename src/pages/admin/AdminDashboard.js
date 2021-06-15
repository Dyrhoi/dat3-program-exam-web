import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useState } from "react";
import { AdminDogs } from "./AdminDogs";
import { AdminOwners } from "./AdminOwners";
import { AdminUsers } from "./AdminUsers";
import { AdminWalkers } from "./AdminWalkers";

dayjs.extend(relativeTime);

export const AdminDashboard = () => {
	const tabs = { owners: AdminOwners, walkers: AdminWalkers, dogs: AdminDogs, users: AdminUsers };
	const [tab, setTab] = useState(Object.keys(tabs)[0]);

	const RenderedComponent = tabs[tab];

	return (
		<>
			<nav className="navbar border-0">
				<div className="container">
					<ul className="navbar-nav tab">
						{Object.keys(tabs).map((key) => (
							<li key={key} className="nav-item border-1">
								<button onClick={() => setTab(key)} className={"nav-link tab " + (tab === key ? "active" : "")}>
									{key.charAt(0).toUpperCase() + key.slice(1)}
								</button>
							</li>
						))}
					</ul>
				</div>
			</nav>
			<div className="container">
				<div className="content">
					<RenderedComponent />
				</div>
			</div>
		</>
	);
};
