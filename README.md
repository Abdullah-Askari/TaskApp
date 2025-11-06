# TaskApp

Simple Expo (React Native) task manager using Firebase.

Install

```bash
npm install
```

Run

```bash
npm run start
```

# TaskApp

A simple task manager mobile app built with Expo (React Native) and Firebase (Authentication + Firestore). The app demonstrates a file-based routing structure with authentication flows and task CRUD operations.

## Key features

- Email/password authentication (Firebase Auth)
- Persistent user session (React Native AsyncStorage)
- Tasks stored in Firestore
- Simple, component-driven UI with reusable TaskCard and AddTask components
- Configured for Android, iOS, and Web via Expo

## Tech stack

- React Native (Expo)
- Expo Router (file-based routing)
- Firebase (Auth & Firestore)
- NativeWind / Tailwind CSS for styling

Dependencies (from `package.json`): expo, react, firebase, nativewind, react-native-reanimated, @expo/vector-icons, and navigation packages.

## Requirements

- Node.js (>= 16 recommended)
- Yarn or npm
- Expo CLI (optional but useful): `npm install -g expo-cli` or use `npx expo` commands
- Android Studio / Xcode if you want to run on emulators/simulators

## Quick start

1. Clone the repo

   ```bash
   git clone <repo-url>
   cd TaskApp
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn
   ```

3. Configure Firebase

   - This project includes `firbaseConfig.js` which currently contains the Firebase configuration object and initializes Firebase services (Auth + Firestore).
   - For security, replace the hard-coded values with environment variables or a safer secret management approach before publishing this repo.
   - Minimal option: create a `.env` and load it into your config, or replace the values directly in `firbaseConfig.js` while developing locally.

4. Start the Metro bundler / Expo

   ```bash
   npm run start
   # or
   npm run android
   npm run ios
   npm run web
   ```

Available npm scripts (from `package.json`):

- `start` — `expo start` (open Metro + dev tools)
- `android` — `expo run:android` (build & run on Android device/emulator)
- `ios` — `expo run:ios` (build & run on iOS simulator)
- `web` — `expo start --web`
- `lint` — `expo lint`

## Project structure

Top-level files:

- `package.json` — scripts & dependencies
- `firbaseConfig.js` — Firebase initialization (Auth + Firestore)
- `fireStore.js` — (present in repo; used for Firestore helpers)
- `global.css`, `tailwind.config.js` — styling setup

Key folders:

- `app/` — Expo Router pages & layout
  - `_layout.jsx` — root layout (wraps the app with `AuthProvider` and `SafeAreaView`)
  - `index.jsx` — entry route / landing
  - `(Auth)/` — auth-related screens: `LogIn.jsx`, `SignUp.jsx`, `ForgetPassword.jsx`
  - `(root)/` — authenticated app screens: `HomeScreen.jsx`, `add.jsx`, `Profile.jsx`
- `components/` — reusable UI pieces: `AddTask.jsx`, `SignOut.jsx`, `TaskCard.jsx`
- `Hooks/` — custom hooks; `useAuth.jsx` provides Auth provider and hooks used across the app
- `assets/` — images and static assets

## Authentication & Firebase notes

- `firbaseConfig.js` initializes Firebase app, Firestore, and Auth. It uses `AsyncStorage` persistence and falls back if initialization fails (see try/catch in the file).
- Firestore is exported as `db` (initialized with `experimentalForceLongPolling: true`). This is common to avoid networking issues on some environments.

Security note: The repo currently includes a Firebase config file containing API keys and identifiers. These keys are not secret in the same way as server credentials, but you should still avoid publishing them in public repositories. Move them to environment variables or use Expo secrets for production.

## How to use (app flow)

1. Register with email & password (Sign Up)
2. Log in (session persists across app restarts)
3. Add tasks using the AddTask component / Add screen
4. Tasks are saved to Firestore and displayed in Home
5. Sign out using the SignOut component

## Troubleshooting

- If Firebase authentication fails, ensure the Firebase project allows Email/Password sign-in and that the config values are correct.
- On Android, if Firestore networking errors occur, `experimentalForceLongPolling: true` in `firbaseConfig.js` helps.
- If native modules (e.g., reanimated) crash on start, follow the post-install / setup instructions for those libraries and rebuild the native app (Expo dev clients or run native builds).

## Contributing

Contributions are welcome. If you plan to submit PRs:

1. Open an issue describing the change.
2. Create a feature branch and submit a PR against `master`.

## License

This project does not include a license. Add a `LICENSE` file if you want to open-source it.

---

If you want, I can also:

- Move Firebase values to environment variables and update `firbaseConfig.js` to read from them.
- Add a short developer checklist (emulator setup, common debug steps).
- Create a small troubleshooting script or sample `.env.example` file.

Tell me which of the above you'd like me to do next.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
