import React, { useEffect, useState } from "react";
import axios from "axios";

import { RecordsResponse } from "./types";
import { formatDate } from "./helpers";

import "./styles.css";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

const BASE_URL = "https://sds1-douglas.herokuapp.com";

const Records = () => {
	const [records, setRecords] = useState<RecordsResponse>();
	const [activePage, setActivePage] = useState(0);
	useEffect(() => {
		axios
			.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
			.then((response) => setRecords(response.data));
	}, [activePage]);

	const handlePageChange = (index: number) => {
		setActivePage(index);
	};

	return (
		<div className="page-container">
			<div className="filters-container records-actions">
				<Link to="/charts">
					<button className="action-filters">VER GRÁFICOS</button>
				</Link>
			</div>
			<table className="records-table" cellPadding="0" cellSpacing="0">
				<thead>
					<tr>
						<th>INSTANTE</th>
						<th>NOME</th>
						<th>IDADE</th>
						<th>PLATAFORMA</th>
						<th>GÊNERO</th>
						<th>TÍTULO DO GAME</th>
					</tr>
				</thead>
				<tbody>
					{records?.content.map((r) => (
						<tr key={r.moment}>
							<td>{formatDate(r.moment)}</td>
							<td>{r.name}</td>
							<td>{r.age}</td>
							<td className="text-secondary">{r.gamePlatform}</td>
							<td>{r.genreName}</td>
							<td className="text-primary">{r.gameTitle}</td>
						</tr>
					))}
				</tbody>
			</table>
			<Pagination
				totalPages={records?.totalPages}
				goToPage={handlePageChange}
				activePage={activePage}
			/>
		</div>
	);
};

export default Records;
