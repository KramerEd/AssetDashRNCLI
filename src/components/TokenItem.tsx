import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TokenData } from "../types";
import { formatMarketCap, formatPrice } from "../utils/formatters";

interface TokenItemProps {
	item: TokenData;
}

export const TokenItem: React.FC<TokenItemProps> = ({ item }) => {
	return (
		<View style={styles.tokenItem}>
			<View style={styles.tokenHeader}>
				<Image
					source={{
						uri:
							item.token_icon || "https://via.placeholder.com/40",
					}}
					style={styles.tokenIcon}
					defaultSource={{ uri: "https://via.placeholder.com/40" }}
				/>
				<View style={styles.tokenInfo}>
					<Text style={styles.tokenSymbol}>
						{item.token_symbol || "Unknown"}
					</Text>
					<Text style={styles.tokenAddress} numberOfLines={1}>
						{item.token_address}
					</Text>
				</View>
				<View style={styles.tokenPriceInfo}>
					<Text style={styles.tokenPrice}>
						{formatPrice(item.price_usd)}
					</Text>
					<Text style={styles.marketCap}>
						{formatMarketCap(item.market_cap_usd)}
					</Text>
				</View>
			</View>

			<View style={styles.tokenTags}>
				{item.is_new && (
					<Text style={[styles.tag, styles.newTag]}>NEW</Text>
				)}
				{item.is_pro && (
					<Text style={[styles.tag, styles.proTag]}>PRO</Text>
				)}
				{item.is_pump && (
					<Text style={[styles.tag, styles.pumpTag]}>PUMP</Text>
				)}
				{item.is_bonk && (
					<Text style={[styles.tag, styles.bonkTag]}>BONK</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	tokenItem: {
		backgroundColor: "#fff",
		marginHorizontal: 16,
		marginVertical: 4,
		borderRadius: 12,
		padding: 16,
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	tokenHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	tokenIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginRight: 12,
	},
	tokenInfo: {
		flex: 1,
	},
	tokenSymbol: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	tokenAddress: {
		fontSize: 12,
		color: "#666",
		marginTop: 2,
	},
	tokenPriceInfo: {
		alignItems: "flex-end",
	},
	tokenPrice: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
	},
	marketCap: {
		fontSize: 12,
		color: "#666",
		marginTop: 2,
	},
	tokenTags: {
		flexDirection: "row",
		marginTop: 12,
		gap: 6,
	},
	tag: {
		fontSize: 10,
		fontWeight: "600",
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 4,
		overflow: "hidden",
	},
	newTag: {
		backgroundColor: "#4CAF50",
		color: "#fff",
	},
	proTag: {
		backgroundColor: "#FF9800",
		color: "#fff",
	},
	pumpTag: {
		backgroundColor: "#E91E63",
		color: "#fff",
	},
	bonkTag: {
		backgroundColor: "#9C27B0",
		color: "#fff",
	},
});
