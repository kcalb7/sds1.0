import React from "react";

import "./styles.css";

type Props = {
	totalPages?: number;
	goToPage: Function;
	activePage: number;
};

const Pagination = ({ totalPages = 0, goToPage, activePage }: Props) => {
	const paginationItems = Array.from(Array(totalPages).keys());
	return (
		<div className="pagination-container">
			{paginationItems.map((i) => (
				<button
					key={i}
					className={`pagination-item ${i === activePage ? "" : "in"}active`}
					onClick={() => {
						goToPage(i);
					}}
				>
					{i + 1}
				</button>
			))}
		</div>
	);
};

export default Pagination;
