import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_MAIN } from "../utils/api";

export const Dogs = () => {
	const [people, setPeople] = useState([]);

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("dogs");
			setPeople(response.data);
		};
		doAsynchronousCall();
	}, []);

	return (
		<div className="container">
			<div className="content">
				<h1>Walkers</h1>
				<p>Currently active dog walkers.</p>
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Name</th>
							<th>Walks</th>
						</tr>
					</thead>
					<tbody>
						{people.map((person) => (
							<tr key={person.id}>
								<td>{person.name}</td>
								<td>
									{person.dogs.map((dog) => (
										<Link key={dog.id} className="mr-10" to={`dogs/${dog.id}`}>
											{dog.name}
										</Link>
									))}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
