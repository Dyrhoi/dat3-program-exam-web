import { useEffect, useState } from "react";
import { AdminModalCreate } from "../../components/ui/admin/AdminModalPersonCreate";
import { AdminModalDelete } from "../../components/ui/admin/AdminModalPersonDelete";
import { AdminModalEdit } from "../../components/ui/admin/AdminModalPersonEdit";
import { API_MAIN } from "../../utils/api";

export const AdminOwners = () => {
	const [people, setPeople] = useState([]);

	const [updated, setUpdated] = useState();

	const [editing, setEditing] = useState(null);

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("admin/people/owners");
			setPeople(response.data);
		};
		doAsynchronousCall();
	}, [updated]);

	const openModal = (person) => {
		const newEditPerson = { ...person, _update: new Date() };
		setEditing(newEditPerson);
	};

	const handleUpdate = () => {
		setUpdated(new Date());
		setEditing(null);
	};

	return (
		<>
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
										<button
											className="btn btn-secondary d-flex align-items-center"
											data-toggle="modal"
											data-target="modal-edit"
											onClick={() => openModal(person)}
										>
											<span className="material-icons-outlined">edit</span>
										</button>
										<button
											className="btn btn-danger d-flex align-items-center ml-10"
											data-toggle="modal"
											data-target="modal-delete"
											onClick={() => openModal(person)}
										>
											<span className="material-icons-outlined">delete</span>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<div className="mb-20"></div>
				<div className="bottom-0 position-sticky bg-white d-flex align-items-center" style={{ height: "60px" }}>
					<button
						className="btn-primary btn d-flex align-items-center"
						className="btn btn-primary d-flex align-items-center ml-10"
						data-toggle="modal"
						data-target="modal-create"
					>
						<span className="material-icons-outlined mr-10">add_circle</span>
						Create owner
					</button>
				</div>
			</section>
			<AdminModalEdit editing={editing} personType="owner" handleUpdate={handleUpdate} />
			<AdminModalDelete deleting={editing} personType="owner" handleUpdate={handleUpdate} />
			<AdminModalCreate personType="owner" handleUpdate={handleUpdate} />
		</>
	);
};
