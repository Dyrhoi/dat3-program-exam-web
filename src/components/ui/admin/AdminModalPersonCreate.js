import DawaAutocomplete2 from "dawa-autocomplete2-react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { API_MAIN } from "../../../utils/api";
import Select from "react-select";
import { timeout } from "../../../utils/util";

export const AdminModalCreate = ({ editing, handleUpdate, personType }) => {
	const [restFormData, setRestFormData] = useState({});
	const [address, setAddress] = useState(null);
	const [dogs, setDogs] = useState([]);
	const [selectedDog, setSelectedDog] = useState(null);
	const [dogsOptions, setDogsOptions] = useState([]);
	const [complete, setComplete] = useState(false);

	const endpoint = personType === "owner" ? "owners" : "walkers";

	const handleSubmit = async (event) => {
		event.preventDefault();
		const builtFormData = { ...restFormData, addressId: address?.id || "", dogs };
		if (address) {
			try {
				await API_MAIN.post("admin/people/" + endpoint, builtFormData);
				handleUpdate();
				toast(builtFormData.name + " was created.");
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
		if (event.target.name) {
			setRestFormData({ ...restFormData, [event.target.name]: event.target.value });
		}
	};

	useEffect(() => {
		const doAsynchronousCall = async () => {
			const response = await API_MAIN.get("dogs");
			setDogsOptions(response.data);
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
							<h1>Create {personType}</h1>
							<form onSubmit={handleSubmit} onChange={handleChange}>
								<div className="form-group">
									<label htmlFor="name" className="required">
										Name
									</label>
									<input id="name" name="name" placeholder="Name" className="form-control" required />
								</div>
								<div className="form-group">
									<label className="required">Address</label>
									<DawaAutocomplete2
										select={(selected) => {
											setAddress(selected.data);
										}}
										classes={{
											root: "dawa-root",
											input: "form-control",
											ul: "dawa-items",
											li: "dawa-items--item",
											selected: "dawa-items--item--selected",
										}}
									/>
								</div>
								<div className="form-group">
									<label className="required">Dogs</label>
									{dogs.map((dog) => (
										<div className="form-group form-inline" key={dog.id}>
											<input defaultValue={dog.name} className="form-control disabled" readOnly />
											<button
												type="button"
												className="btn btn-danger"
												onClick={() => setDogs(dogs.filter((d) => dog.id !== d.id))}
											>
												X
											</button>
										</div>
									))}
									{personType === "owner" ? (
										<p className="form-text font-size-12">
											NOTE: REMOVING A DOG FROM IT'S OWNER WILL DELETE THE DOG FROM THE SYSTEM.
										</p>
									) : (
										<>
											<Select
												options={dogsOptions
													.filter((dog) =>
														dogs.length > 0
															? dogs.length === dogsOptions.length
																? false
																: dogs.find((x) => x.id !== dog.id)
															: true
													)
													.map((dog) => {
														return { label: dog.name, value: dog };
													})}
												placeholder="Add new dog..."
												onChange={(state) => {
													setSelectedDog(state.value);
												}}
												isDisabled={dogs.length === dogsOptions.length}
											/>
											<div className="d-flex justify-content-end">
												{dogs.length === dogsOptions.length ? (
													<p>No more dogs in the system.</p>
												) : (
													<button
														type="button"
														onClick={() => setDogs([...dogs, selectedDog])}
														className="mt-10 btn btn-info"
														disabled={dogs.length === dogsOptions.length || selectedDog === null}
													>
														Add dog to walker
													</button>
												)}
											</div>
										</>
									)}
								</div>
								<div className="form-group">
									<label className="required">Phone number</label>
									<div className="form-inline">
										<p className="mr-5">+45</p>
										<input name="phone" required placeholder="" min="0" className="form-control" />
									</div>
								</div>
								<div className="form-group form-inline d-flex justify-content-between">
									<button type="button" data-dismiss="modal" onClick={handleUpdate} className="btn btn-info">
										Cancel
									</button>
									<input className="btn btn-primary " type="submit" value={`Create ${personType}`} />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
