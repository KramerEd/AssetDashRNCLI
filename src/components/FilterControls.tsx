import React from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import { FilterState } from "../types";

interface FilterControlsProps {
	filters: FilterState;
	onFilterChange: (
		filterType: keyof FilterState,
		value: boolean | string
	) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
	filters,
	onFilterChange,
}) => {
	return (
		<View style={styles.filtersContainer}>
			<Text style={styles.sectionTitle}>Filters</Text>

			<View style={styles.filterRow}>
				<Text style={styles.filterLabel}>Show only NEW tokens:</Text>
				<Switch
					value={filters.isNew}
					onValueChange={(value) => onFilterChange("isNew", value)}
				/>
			</View>

			<View style={styles.filterRow}>
				<Text style={styles.filterLabel}>Show only PRO tokens:</Text>
				<Switch
					value={filters.isPro}
					onValueChange={(value) => onFilterChange("isPro", value)}
				/>
			</View>

			<View style={styles.filterRow}>
				<Text style={styles.filterLabel}>Min price ($):</Text>
				<TextInput
					style={styles.priceInput}
					value={filters.minPrice}
					onChangeText={(value) => onFilterChange("minPrice", value)}
					placeholder="0.001"
					keyboardType="decimal-pad"
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	filtersContainer: {
		backgroundColor: "#fff",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#e0e0e0",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		marginBottom: 12,
	},
	filterRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
	},
	filterLabel: {
		fontSize: 16,
		color: "#333",
		flex: 1,
	},
	priceInput: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 8,
		paddingHorizontal: 12,
		paddingVertical: 8,
		width: 100,
		textAlign: "right",
	},
});
