import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
	totalCount: number;
	filteredCount: number;
}

const Header: React.FC<HeaderProps> = ({ totalCount, filteredCount }) => {
	return (
		<View style={styles.header}>
			<Text style={styles.title}>AssetDash Token List</Text>
			<Text style={styles.subtitle}>
				Showing {filteredCount} of {totalCount} tokens
			</Text>
		</View>
	);
};

export default memo(Header);

const styles = StyleSheet.create({
	header: {
		padding: 16,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
	},
	subtitle: {
		fontSize: 14,
		color: "#666",
		marginTop: 4,
	},
});
