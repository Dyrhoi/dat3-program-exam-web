import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_MAIN } from "../../utils/api";
import { getRandomColorFromString } from "../../utils/random-color";
import { NotFound } from "../errors/NotFound";

export const IndividualOwner = () => {
	const { id } = useParams();

	const [error, setError] = useState();
	const [person, setPerson] = useState();
	useEffect(() => {
		const doAsynchronousCall = async () => {
			try {
				const response = await API_MAIN.get("people/owners/" + id);
				console.log(response.data);
				setPerson(response.data);
			} catch (_error) {
				const error = _error.response?.data;
				if (error?.code === 404) setError(true);
				else toast.error(error?.message || "Unknown error occured. Try again later.");
			}
		};
		doAsynchronousCall();
	}, [id]);

	if (error) return <NotFound message="No owner exists with this ID." />;
	if (person == null) return "";

	return (
		<>
			<div className="container">
				<div style={{ height: "15rem", backgroundColor: getRandomColorFromString(person.name) }} />
				<div className="position-relative m-auto" style={{ maxWidth: "55rem" }}>
					<div
						className="bg-white position-absolute"
						style={{ width: "100%", boxShadow: "var(--lm-large-shadow)", top: "-10rem" }}
					>
						<div className="content">
							<section>
								<h1 className="mb-5">{person.name}</h1>
							</section>
							<div>
								<h5 className="mb-5">Dogs</h5>
								<ul>
									{person.dogs.map((dog) => (
										<li key={dog.id}>
											<Link to={`/dogs/${dog.id}`}>{dog.name}</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
