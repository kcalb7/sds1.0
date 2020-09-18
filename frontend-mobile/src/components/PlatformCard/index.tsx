import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { FontAwesome5 as Icon } from "@expo/vector-icons";

import { GamePlatform } from "./type";

type Props = {
	platform: GamePlatform;
	onChange: (platform: GamePlatform) => void;
	icon: string;
	activePlatform?: GamePlatform;
};

const PlatformCard = ({ platform, onChange, icon, activePlatform }: Props) => {
	const isActive = platform === activePlatform;
	const backgroundColor = isActive ? "#fad7c8" : "#fff";
	const color = isActive ? "#ed7947" : "#9e9e9e";

	return (
		<RectButton
			onPress={() => onChange(platform)}
			style={[styles.platformCard, { backgroundColor }]}
		>
			<Icon name={icon} size={60} color={color} />
			<Text style={[styles.platformCardText, { color }]}>
				{platform === "PLAYSTATION" ? "PS" : platform}
			</Text>
		</RectButton>
	);
};

const styles = StyleSheet.create({
	platformCard: {
		paddingTop: 30,
		paddingBottom: 20,
		width: "30%",
		backgroundColor: "#FFF",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	platformCardText: {
		marginTop: 40,
		color: "#9E9E9E",
		fontSize: 24,
		fontFamily: "Play_700Bold",
		textAlign: "center",
	},
});

export default PlatformCard;
