# AssetDash Token Tracker

A React Native application for tracking cryptocurrency tokens with real-time price updates, filtering, and sorting capabilities. Built with TypeScript and modern React Native architecture.

## 🚀 Features

- **Real-time Token Data**: Displays cryptocurrency tokens from AssetDash API with live price updates
- **Advanced Filtering**: Filter tokens by NEW/PRO status and minimum price
- **Flexible Sorting**: Sort by market cap, price, or creation date (ascending/descending)
- **Persistent Filters**: Automatically saves filter preferences using MMKV storage
- **Beautiful UI**: Modern card-based design with token icons and status tags
- **Pull-to-Refresh**: Easy data refresh with gesture support
- **Optimized Performance**: Uses LegendList for efficient rendering of frequently updating data

## 🏗️ Architecture

### Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── FilterControls.tsx    # Filter switches and inputs
│   ├── Header.tsx           # App header with token counts
│   ├── SortControls.tsx     # Sorting button controls
│   ├── TokenItem.tsx        # Individual token card component
│   └── index.ts            # Component exports
├── constants/          # App constants and configuration
│   └── index.ts           # API URLs, intervals, storage keys
├── hooks/             # Custom React hooks
│   └── useTokenData.ts    # Token data management hook
├── screens/           # Screen components
│   └── MainScreen.tsx     # Main token list screen
├── types/             # TypeScript type definitions
│   └── index.ts          # TokenData interface and filter types
└── utils/             # Utility functions
    ├── formatters.ts     # Price and market cap formatters
    └── storage.ts        # MMKV storage wrapper
```

### Technology Stack

- **React Native 0.80.1** with **New Architecture** enabled
- **TypeScript** for type safety
- **@legendapp/list** for high-performance list rendering
- **react-native-mmkv** for fast local storage

## 🔧 Technical Implementation

### LegendList vs FlashList

This app uses **LegendList** instead of FlashList for a practical reason: **real-time data updates**. The token prices update every second via a simulated price feed, and LegendList's `recycleItems` feature provides superior performance when dealing with frequently changing data. This ensures smooth scrolling and UI responsiveness even with constant price fluctuations.

### Data Management

- **API Integration**: Fetches live token data from AssetDash screener API
- **Real-time Updates**: Simulates price changes every 1000ms for demo purposes
- **Filter Persistence**: Saves user preferences (NEW/PRO toggles, price threshold) locally
- **Efficient Rendering**: Only re-renders filtered/sorted data when necessary

## 🚧 React Query Migration (Query Branch)

The `query` branch contains a migration to **@tanstack/react-query** for enhanced data management:

- **Query Caching**: Automatic caching of API responses
- **Background Refetching**: Smart data synchronization
- **Optimistic Updates**: Instant UI updates for filter changes
- **Better Error Handling**: Robust error states and retry logic

To explore the React Query implementation:

```bash
git checkout query
```

## 📱 Getting Started

### Prerequisites

- **Node.js** >= 18
- **React Native CLI** or **Expo CLI**
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)

> **Note**: Complete the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding.

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd AssetDashRNCLI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)

   ```bash
   # Install Ruby dependencies
   bundle install

   # Install CocoaPods dependencies
   cd ios && bundle exec pod install && cd ..
   ```

### Running the App

1. **Start Metro Bundler**

   ```bash
   npm start
   ```

2. **Run on Android**

   ```bash
   npm run android
   ```

3. **Run on iOS**
   ```bash
   npm run ios
   ```

### Development Commands

```bash
# Lint code
npm run lint

# Run tests
npm run test

# Clean and rebuild (Android)
cd android && ./gradlew clean && cd .. && npm run android

# Reset Metro cache
npm start -- --reset-cache
```

## 🔍 API Integration

The app connects to AssetDash's cryptocurrency screener API:

- **Endpoint**: `https://dev-screener-api.assetdash.com/moby_screener/leaderboard/degen_list`
- **Data**: Token prices, market caps, volumes, and metadata
- **Update Frequency**: Real-time with simulated price variations

## 🎨 UI Components

### TokenItem

Displays individual token information including:

- Token icon and symbol
- Wallet address (truncated)
- Current price and market cap
- Status tags (NEW, PRO, PUMP, BONK)

### FilterControls

Provides filtering options:

- Toggle for NEW tokens only
- Toggle for PRO tokens only
- Minimum price threshold input

### SortControls

Sorting options:

- Market Cap (↓/↑)
- Price (↓/↑)
- Creation Date (Newest/Oldest)

## 🔧 Configuration

### Constants (`src/constants/index.ts`)

- `API_URL`: AssetDash API endpoint
- `PRICE_UPDATE_INTERVAL`: Real-time update frequency (1000ms)
- `STORAGE_KEYS`: MMKV storage key definitions

### Storage Keys

- `filter_is_new`: NEW token filter state
- `filter_is_pro`: PRO token filter state
- `filter_min_price`: Minimum price threshold

## 🚀 Performance Optimizations

- **LegendList**: Efficient virtual scrolling with item recycling
- **MMKV**: Fast native storage for filter persistence
- **Memoized Calculations**: Optimized filtering and sorting operations
- **Hermes Engine**: Enhanced JavaScript performance
- **New Architecture**: Modern React Native architecture for better performance
