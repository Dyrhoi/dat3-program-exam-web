import { useEffect, useState } from "react";
import { API_MAIN } from "../../utils/api";

export const AdminOwners = () => {
	const [people, setPeople] = useState([]);

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("admin/people/owners");
			setPeople(response.data);
		};
		doAsynchronousCall();
	}, []);

	return (
		<section>
			<h2>Owners</h2>
			<p>Displaying all ({people.length}) owners.</p>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Owns</th>
						<th>Address</th>
						<th>Phone</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{people.map((person) => (
						<tr key={person.id}>
							<td>{person.id}</td>
							<td>{person.name}</td>
							<td>{person.dogs.map((dog) => dog.name).join(", ")}</td>
							<td>{person.address.designation}</td>
							<td>{person.phone}</td>
							<td>
								<div className="d-flex justify-content-end">
									<button className="btn btn-secondary d-flex align-items-center">
										<span className="material-icons-outlined">edit</span>
									</button>
									<button className="btn btn-danger d-flex align-items-center ml-10">
										<span className="material-icons-outlined">delete</span>
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};
