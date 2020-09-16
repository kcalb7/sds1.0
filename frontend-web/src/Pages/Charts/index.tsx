import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

import Filters from "../../components/Filters";

import { barOptions, pieOptions } from "./chart-options";
import {
	buildBarSeries,
	getPlatformChartData,
	getGenderChartData,
} from "./helpers";

import "./styles.css";

const BASE_URL = "https://sds1-douglas.herokuapp.com";

type PieChartData = {
	labels: string[];
	series: number[];
};

const initialPieData = {
	labels: [],
	series: [],
};

type BarChartData = {
	x: string;
	y: number;
};

const Charts = () => {
	const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
	const [platformChartData, setPlatformChartData] = useState<PieChartData>(
		initialPieData
	);
	const [genderChartData, setGenderChartData] = useState<PieChartData>(
		initialPieData
	);

	useEffect(() => {
		console.log("tela de gráficos iniciada");
		async function getData() {
			const recordsResponse = await axios.get(`${BASE_URL}/records`);
			const gamesResponse = await axios.get(`${BASE_URL}/games`);

			setBarChartData(
				buildBarSeries(gamesResponse.data, recordsResponse.data.content)
			);
			setPlatformChartData(getPlatformChartData(recordsResponse.data.content));
			setGenderChartData(getGenderChartData(recordsResponse.data.content));
		}
		getData();
	}, []);

	return (
		<div className="page-container">
			<Filters link="/records" linkText="VER TABELA" />
			<div className="chart-container">
				<div className="top-related">
					<h1 className="top-related-title">Jogos mais Votados</h1>
					<div className="games-container">
						<Chart
							options={barOptions}
							type="bar"
							width="900"
							height="600"
							series={[{ data: barChartData }]}
						/>
					</div>
				</div>
				<div className="charts">
					<div className="platform-chart">
						<h2 className="chart-title">Plataformas</h2>
						<Chart
							options={{ ...pieOptions, labels: platformChartData?.labels }}
							type="donut"
							width="350"
							series={platformChartData?.series}
						/>
					</div>
					<div className="gender-chart">
						<h2 className="chart-title">Gêneros</h2>
						<Chart
							options={{ ...pieOptions, labels: genderChartData?.labels }}
							type="donut"
							width="350"
							series={genderChartData?.series}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Charts;
