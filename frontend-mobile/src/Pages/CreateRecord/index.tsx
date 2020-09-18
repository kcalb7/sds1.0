import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import axios from "axios";
import { RectButton } from "react-native-gesture-handler";

import Header from "../../components/Header";
import PlatformCard from "../../components/PlatformCard";

import { GamePlatform } from "../../components/PlatformCard/type";
import { Game } from "./type";

const placeholder = {
	label: "Selecione o game",
	value: "",
};

const mapSelectValues = (games: Game[]) => {
	return games.map((g) => ({
		...g,
		label: g.title,
		value: g.id,
	}));
};

const BASE_URL = "https://sds1-douglas.herokuapp.com";

const CreateRecord = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [platform, setPlatform] = useState<GamePlatform>();
	const [gameId, setGameId] = useState("");
	const [games, setGames] = useState<Game[]>([]);
	const [filteredGames, setFilteredGames] = useState<Game[]>([]);

	const handlePlatform = (selectedPlatform: GamePlatform) => {
		setPlatform(selectedPlatform);
		setFilteredGames(games.filter((g) => g.platform === selectedPlatform));
	};

	
	const handleSubmit = () => {
		const payload = { name, age, gameId };
		axios
			.post(`${BASE_URL}/records`, payload)
			.then(() => Alert.alert('Sucesso!','Dados registrados'))
			.catch((err) => Alert.alert('Erro ao submeter dados:',err));
		setName("");
		setAge("");
		setGameId("");
		setPlatform(undefined);
	};

	useEffect(() => {
		axios
			.get(`${BASE_URL}/games`)
			.then((res) => {
				setGames(mapSelectValues(res.data));
			})
			.catch((err) => Alert.alert("Erro ao carregar dados:", err));
	}, []);

	return (
		<>
			<Header />
			<View style={styles.container}>
				<TextInput
					style={styles.inputText}
					placeholder="Nome"
					placeholderTextColor="#9e9e9e"
					onChangeText={(t) => setName(t)}
					value={name}
				/>
				<TextInput
					style={styles.inputText}
					placeholder="Idade"
					placeholderTextColor="#9e9e9e"
					onChangeText={(t) => setAge(t)}
					value={age}
					keyboardType="numeric"
					maxLength={3}
				/>
				<View style={styles.platformContainer}>
					<PlatformCard
						platform="PC"
						onChange={handlePlatform}
						icon="laptop"
						activePlatform={platform}
					></PlatformCard>
					<PlatformCard
						platform="XBOX"
						onChange={handlePlatform}
						icon="xbox"
						activePlatform={platform}
					></PlatformCard>
					<PlatformCard
						platform="PLAYSTATION"
						onChange={handlePlatform}
						icon="playstation"
						activePlatform={platform}
					></PlatformCard>
				</View>
				<RNPickerSelect
					placeholder={placeholder}
					items={filteredGames}
					onValueChange={(g) => setGameId(g)}
					value={gameId}
					Icon={() => <Icon name="chevron-down" color="#9e9e9e" size={25} />}
					style={pickerSelect}
				/>
				<View style={styles.footer}>
					<RectButton style={styles.button} onPress={handleSubmit}>
						<Text style={styles.buttonText}>SALVAR</Text>
					</RectButton>
				</View>
			</View>
		</>
	);
};

const pickerSelect = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 20,
		backgroundColor: "#FFF",
		borderRadius: 10,
		color: "#ED7947",
		paddingRight: 30,
		fontFamily: "Play_700Bold",
		height: 50,
	},
	inputAndroid: {
		fontSize: 16,
		paddingVertical: 12,
		paddingHorizontal: 20,
		backgroundColor: "#FFF",
		borderRadius: 10,
		color: "#ED7947",
		paddingRight: 30,
		fontFamily: "Play_700Bold",
		height: 50,
	},
	placeholder: {
		fontSize: 16,
		color: "#9E9E9E",
		fontFamily: "Play_700Bold",
	},
	iconContainer: {
		top: 10,
		right: 12,
	},
});

const styles = StyleSheet.create({
	container: {
		marginTop: "15%",
		paddingRight: "5%",
		paddingLeft: "5%",
		paddingBottom: 50,
	},
	inputText: {
		height: 50,
		backgroundColor: "#FFF",
		borderRadius: 10,
		color: "#ED7947",
		fontFamily: "Play_700Bold",
		fontSize: 16,
		paddingLeft: 20,
		marginBottom: 21,
	},
	platformContainer: {
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	footer: {
		marginTop: "15%",
		alignItems: "center",
	},
	button: {
		backgroundColor: "#00D4FF",
		flexDirection: "row",
		borderRadius: 10,
		height: 60,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontFamily: "Play_700Bold",
		fontWeight: "bold",
		fontSize: 18,
		color: "#0B1F34",
	},
});

export default CreateRecord;
