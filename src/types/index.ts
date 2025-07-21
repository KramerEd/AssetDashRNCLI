export interface TokenData {
	token_address: string;
	token_symbol: string;
	token_icon: string;
	token_created: number;
	price_usd: number;
	market_cap_usd: number;
	total_supply: number;
	price_change_percent: {
		m5: number | null;
		m30: number | null;
		h1: number | null;
		h4: number | null;
		h8: number | null;
		h24: number | null;
	};
	whale_count: object;
	whale_trades_count: object;
	whale_buys_count: object;
	whale_buy_volume_usd: object;
	whale_sells_count: object;
	whale_sell_volume_usd: object;
	whale_net_flow_usd: object;
	whale_buy_amount: object;
	whale_sell_amount: object;
	whale_net_amount: object;
	whale_holder_retention_percent: object;
	whale_buy_supply_percent: object;
	whale_sell_supply_percent: object;
	whale_net_supply_percent: object;
	volume_usd: {
		m5: number;
		m30: number;
		h1: number;
		h4: number;
		h8: number;
		h24: number;
	};
	liquidity_usd: number;
	transactions_count: object;
	is_new: boolean;
	is_pump: boolean;
	is_pro: boolean;
	is_bonk: boolean;
	is_believe: boolean;
	is_xstocks: boolean | null;
	is_ray: boolean;
	antirug_score: any;
	launchpad: any;
	score_values: object;
}

export type SortOption =
	| "market_cap_desc"
	| "market_cap_asc"
	| "price_desc"
	| "price_asc"
	| "created_desc"
	| "created_asc";

export interface FilterState {
	isNew: boolean;
	isPro: boolean;
	minPrice: string;
}
