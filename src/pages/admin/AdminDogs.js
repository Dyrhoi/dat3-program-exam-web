import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { API_MAIN } from "../../utils/api";

export const AdminDogs = () => {
	const [dogs, setDogs] = useState([]);

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("admin/dogs");
			console.log(response);
			setDogs(response.data);
		};
		doAsynchronousCall();
	}, []);

	return (
		<section>
			<h2>Dogs</h2>
			<p>Displaying all ({dogs.length}) owners.</p>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Owner</th>
						<th>Walkers</th>
						<th>Breed</th>
						<th>Gender</th>
						<th>Birthdate</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{dogs.map((dog) => (
						<tr key={dog.id}>
							<td>{dog.id}</td>
							<td>
								<div className="d-flex align-item-center">
									<div
										className="rounded-circle"
										style={{
											height: "3rem",
											width: "3rem",
											backgroundImage: `url(${dog.imageUrl})`,
											backgroundSize: "cover",
											backgroundPosition: "center",
											backgroundRepeat: "no-repeat",
										}}
									/>
									<div className="d-flex align-items-center ml-10">{dog.name}</div>
								</div>
							</td>
							<td>{dog.owner.name}</td>
							<td>{dog.walkers.map((walker) => walker.name).join(", ")}</td>
							<td>{dog.breed}</td>
							<td>{dog.gender}</td>
							<td>{dayjs(parseInt(dog.birthdate)).format("DD/MM/YYYY")}</td>
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
			<div className="mb-20"></div>
			<div className="bottom-0 position-sticky bg-white d-flex align-items-center" style={{ height: "60px" }}>
				<button className="btn-primary btn d-flex align-items-center">
					<span className="material-icons-outlined mr-10">add_circle</span>
					Create dog
				</button>
			</div>
		</section>
	);
};
