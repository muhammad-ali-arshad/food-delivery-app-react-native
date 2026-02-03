## Food Delivery App (React Native & Expo)

Modern food delivery UI built with **React Native**, **Expo**, **Redux Toolkit**, **React Navigation**, **NativeWind (Tailwind for RN)** and a **Sanity.io** backend.

This `client` folder contains the mobile app that lets users:

- **Browse restaurants and categories**
- **View restaurant details and menus**
- **Add/remove items from a cart**
- **Place an order and see an order preparing screen**
- **Track delivery on a live map with a rider card**

The Sanity content backend lives in the `delivery-app` folder inside `client`.

---

## Tech stack

- **Expo / React Native**: App runtime and bundler
- **React Navigation (native stack)**: Screen navigation (`Home`, `Restaurant`, `Cart`, `OrderPrepairing`, `Delivery`)
- **Redux Toolkit + React Redux**: Global state for cart and selected restaurant
- **NativeWind + Tailwind CSS**: Utility-first styling with `className` support
- **Sanity.io**: Headless CMS for restaurants, dishes, categories, and featured sections
- **React Native Maps**: Delivery map with marker and ETA
- **Expo Image / assets**: Rich visuals and animations (gifs, food images, rider, etc.)

---

## Main features

- **Home screen (`HomeScreen`)**
  - Search bar and location display
  - Category list fetched from Sanity
  - Featured restaurant sections from Sanity via `getFeaturedRestaurants`
  - Loading and error states while fetching data

- **Restaurant details (`RestaurantScreen`)**
  - Big header image, rating, cuisine type, address and description
  - Restaurant stored in Redux via `setRestaurant`
  - Menu listing using reusable `DishRow` component
  - Guard UI when no restaurant is selected

- **Cart (`CartScreen`)**
  - Shows selected restaurant and delivery information
  - Groups cart items by dish id and displays counts, images and prices
  - Calculates **subtotal**, **delivery fee** and **total**
  - Allows removing items and auto-navigates back when cart is empty
  - Button to proceed to the order preparing screen

- **Order preparing (`OrderPrepairingScreen`)**
  - Simple full-screen loading animation using a delivery GIF
  - After a short delay it automatically navigates to the `Delivery` screen

- **Delivery tracking (`DeliveryScreen`)**
  - Map centered on the selected restaurant (with safe fallbacks when no coords)
  - Marker with restaurant name and address
  - Estimated arrival time and order status text
  - Rider information card with call and cancel buttons
  - Cancel button empties the cart and navigates back to `Home`

- **Navigation (`navigation/appNavigation.js`)**
  - `NavigationContainer` with a native stack navigator
  - Registered routes: `Home`, `Restaurant`, `Cart`, `OrderPrepairing`, `Delivery`

- **State management (`store.js`, `CartSlice.js`, `RestaurantSlice.js`)**
  - `cart` slice: add / remove items, empty cart, selectors for items and totals
  - `restaurant` slice: currently selected restaurant with selector helper

---

## Project structure (client)

Some key files and folders:

- `App.js` – wraps the app in Redux `Provider` and mounts `AppNavigation`
- `navigation/appNavigation.js` – React Navigation stack configuration
- `screens/` – main screen components (`HomeScreen`, `RestaurantScreen`, `CartScreen`, `OrderPrepairingScreen`, `DeliveryScreen`)
- `components/` – UI building blocks like `CartIcon`, `Categories`, `FeaturedRow`, `DishRow`, `ResturantsCard`
- `slices/` – Redux slices for cart and restaurant
- `store.js` – Redux store configuration
- `api.js` – Sanity-backed data fetching helpers
- `sanity.js` – Sanity client and image URL builder
- `theme/` – theme utilities and color helpers
- `assets/images/` – all images and GIFs used across the app
- `delivery-app/` – Sanity Studio project (schemas, config, etc.)

---

## Getting started

### 1. Install dependencies

From the `client` folder:

```bash
cd client
npm install
```

### 2. Configure Sanity (content backend)

The mobile app reads data from Sanity via `sanity.js`:

- `sanity.js` uses your **projectId** and **dataset**:
  - `projectId: '8r65v0t1'`
  - `dataset: 'production'`
- Sanity schemas live in `delivery-app/schemaTypes` (restaurant, dish, category, featured, etc.).

To run the Sanity Studio (optional but recommended):

```bash
cd client/delivery-app
npm install
npm run dev
```

Make sure the projectId / dataset in Sanity match what you use in `sanity.js`.

### 3. Run the mobile app

From the `client` folder:

```bash
npm start          # same as: expo start
# or, platform-specific:
npm run android    # run on Android device/emulator
npm run ios        # run on iOS simulator
npm run web        # run in the browser
```

Use the Expo CLI output to open the app in:

- Expo Go
- Android emulator
- iOS simulator
- Or a development build

---

## How data flows

1. **Sanity** stores restaurants, dishes, categories and featured groups.
2. The app calls helpers from `api.js` (for example `getFeaturedRestaurants`) which use the Sanity client.
3. **Home screen** displays categories and featured sections using this data.
4. When a user taps a restaurant card, `RestaurantScreen` is opened and the restaurant is stored in Redux.
5. From the menu, the user adds dishes to the **cart**.
6. The **Cart screen** reads items from Redux, groups them and calculates totals.
7. On placing the order, the app shows **OrderPrepairingScreen**, then moves to **DeliveryScreen**, which uses restaurant coordinates on a map.

---

## Scripts (from `client/package.json`)

- `npm start` – start the Expo dev server
- `npm run android` – start on Android
- `npm run ios` – start on iOS
- `npm run web` – start on web
- `npm run lint` – run ESLint with Expo config

---

## Notes & future improvements

- Authentication and real payment integration are **not** implemented yet.
- Real-time driver tracking could be added using a backend (e.g. websockets / realtime DB).
- You can update Sanity schemas to support more categories, promos, tags, etc.
- UI is built with NativeWind, so adding new screens is fast using Tailwind-style classes.
