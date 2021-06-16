import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { API_MAIN } from "../../../utils/api";
import Select from "react-select";
import dayjs from "dayjs";
import { timeout } from "../../../utils/util";

export const AdminModalCreateDog = ({ personType, handleUpdate }) => {
	const [restFormData, setRestFormData] = useState({});
	const [walkers, setWalkers] = useState([]);
	const [selectedWalker, setSelectedWalker] = useState(null);
	const [owner, setOwner] = useState(null);
	const [ownerOptions, setOwnerOptions] = useState([]);
	const [walkerOptions, setWalkerOptions] = useState([]);
	const [complete, setComplete] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const builtFormData = { ...restFormData, walkers, owner };
		if (owner) {
			try {
				await API_MAIN.post("admin/dogs", builtFormData);
				toast(builtFormData.name + " was created.");
				handleUpdate();
				setComplete(true);
				await timeout(100);
				setComplete(false);
			} catch (_error) {
				const error = _error.response.data;
				toast.error(error.message);
			}
		}
	};

	const handleChange = (event) => {
		let target = event.target;
		if (target.name) {
			let value = target.value;
			if (target.name === "birthdate") value = dayjs(value).valueOf();
			setRestFormData({ ...restFormData, [event.target.name]: value });
		}
	};

	useEffect(() => {
		const doAsynchronousCall = async () => {
			let response = await API_MAIN.get("admin/people/walkers");
			setWalkerOptions(response.data);

			response = await API_MAIN.get("admin/people/owners");
			setOwnerOptions(response.data);
		};
		doAsynchronousCall();
	}, [complete]);

	if (complete) return "";

	return (
		<div
			className="modal"
			id="modal-create"
			tabIndex="-1"
			role="dialog"
			data-overlay-dismissal-disabled="true"
			data-esc-dismissal-disabled="true"
		>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="container" style={{ maxWidth: "40rem" }}>
						<div className="content">
							<h1>Create dog</h1>
							<form onSubmit={handleSubmit} onChange={handleChange}>
								<div className="form-group">
									<label htmlFor="name" className="required">
										Name
									</label>
									<input id="name" name="name" placeholder="Name" className="form-control" required />
								</div>
								<div className="form-group">
									<label htmlFor="breed" className="required">
										Breed
									</label>
									<input id="breed" name="breed" placeholder="Breed" className="form-control" required />
								</div>
								<div className="form-group">
									<label className="required">Birthdate</label>
									<input type="date" name="birthdate" id="birthdate" className="form-control" />
								</div>
								<div className="form-group">
									<label className="required">Gender</label>
									<br />
									<div>
										<input type="radio" name="gender" value="male" id="male" required />
										<label htmlFor="male" className="ml-5">
											Male
										</label>
									</div>
									<div>
										<input type="radio" name="gender" value="female" id="female" required />
										<label htmlFor="female" className="ml-5">
											Female
										</label>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="imageUrl" className="required">
										Image (URL)
									</label>
									<input
										id="imageUrl"
										name="imageUrl"
										placeholder="https://i.imgur.com/uYHvkuW.jpg"
										className="form-control"
										required
									/>
								</div>
								<div className="form-group">
									<label className="required">Walkers</label>
									{walkers.map((dog) => (
										<div className="form-group form-inline" key={dog.id}>
											<input defaultValue={dog.name} className="form-control disabled" readOnly />
											<button
												type="button"
												className="btn btn-danger"
												onClick={() => setWalkers(walkers.filter((d) => dog.id !== d.id))}
											>
												X
											</button>
										</div>
									))}
									<Select
										options={walkerOptions
											.filter((walker) =>
												walkers.length > 0
													? walkers.length === walkerOptions.length
														? false
														: walkers.find((x) => x.id !== walker.id)
													: true
											)
											.map((walker) => {
												return { label: walker.name, value: walker };
											})}
										placeholder="Add new walker..."
										onChange={(state) => {
											setSelectedWalker(state.value);
										}}
										isDisabled={walkers.length === walkerOptions.length}
									/>
									<div className="d-flex justify-content-end">
										{walkers.length === walkerOptions.length ? (
											<p>No more walkers in the system.</p>
										) : (
											<button
												type="button"
												onClick={() => setWalkers([...walkers, selectedWalker])}
												className="mt-10 btn btn-info"
												disabled={walkers.length === walkerOptions.length || selectedWalker === null}
											>
												Add dog to walker
											</button>
										)}
									</div>
								</div>
								<div className="form-group">
									<label className="required">Owner</label>
									<Select
										options={ownerOptions.map((owner) => {
											return { label: owner.name, value: owner };
										})}
										required
										placeholder="Set owner"
										onChange={(state) => {
											setOwner(state.value);
										}}
									/>
								</div>
								<div className="form-group form-inline d-flex justify-content-between">
									<button type="button" data-dismiss="modal" className="btn btn-info">
										Cancel
									</button>
									<input className="btn btn-primary " type="submit" value={`Create dog`} />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
