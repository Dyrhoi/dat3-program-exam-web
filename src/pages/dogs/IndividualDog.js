import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_MAIN } from "../../utils/api";
import { getRandomColorFromString } from "../../utils/random-color";
import { NotFound } from "../errors/NotFound";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const IndividualDog = () => {
	const { id } = useParams();

	const [error, setError] = useState();
	const [dog, setDog] = useState();
	useEffect(() => {
		const doAsynchronousCall = async () => {
			try {
				const response = await API_MAIN.get("dogs/" + id);
				setDog(response.data);
			} catch (_error) {
				const error = _error.response?.data;
				if (error?.code === 404) setError(true);
				else toast.error(error?.message || "Unknown error occured. Try again later.");
			}
		};
		doAsynchronousCall();
	}, [id]);

	if (error) return <NotFound message="No dog exists with this ID." />;
	if (dog == null) return "";

	return (
		<>
			<div className="container">
				<div style={{ height: "15rem", backgroundColor: getRandomColorFromString(dog.name) }} />
				<div className="position-relative m-auto" style={{ maxWidth: "55rem" }}>
					<div
						className="bg-white position-absolute"
						style={{ width: "100%", boxShadow: "var(--lm-large-shadow)", top: "-10rem" }}
					>
						<div className="content">
							<div className="d-flex align-items-center">
								<div
									className="rounded background-avatar"
									style={{
										backgroundImage: `url(${dog.imageUrl})`,
										height: "17rem",
										width: "17rem",
									}}
								/>
								<div className="ml-20 flex-1">
									<section>
										<h1 className="mb-5">{dog.name}</h1>
										<p className="text-muted mt-0 d-flex align-items-center">
											{dog.breed} <span className="material-icons-outlined ml-5">{dog.gender}</span>
										</p>
										<p>
											{dayjs().from(dayjs(dog.birthdate), true)} old ({dayjs(dog.birthdate).format("DD/MM/YYYY")})
										</p>
									</section>
									<section>
										<h5 className="mb-5 d-flex align-items-center">Owner</h5>
										<p className="mt-0">
											<Link to={`/owners/${dog.owner.id}`}>{dog.owner.name}</Link>
										</p>
									</section>
								</div>
							</div>
							<div>
								<h5 className="mb-5">Walkers</h5>
								<ul>
									{dog.walkers.map((walker) => (
										<li key={walker.id}>{walker.name}</li>
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
