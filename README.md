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

Open in Expo Go, Android emulator, iOS simulator, or web via the Expo CLI output.

## Testing

This project includes basic unit tests using Jest with the `jest-expo` preset and `@testing-library/react-native`.

Install dev dependencies (already listed in `package.json`), then run:

```bash
npm test
```

The tests cover:

- Adding a task
- Toggling completion
- Deleting a task (Alert is mocked in tests)

## Project structure

- app/ - Expo router screens (main screen: `app/index.tsx`)
- components/ - UI primitives (Button, Checkbox). Small re-exports are used to point to feature components.
- features/tasks/ - Task-specific presentational components (`TaskList`, `TaskModal`). State is kept in `app/index.tsx` and passed as props.
- lib/ - small helpers (e.g. `lib/id.ts`)
- types/ - shared TypeScript types
- \_\_tests\_\_/ - basic UI tests

## Third-party libraries

- Expo
- @expo/vector-icons
- nativewind (Tailwind-like styling)
- react-native-safe-area-context
- @testing-library/react-native (tests)
- jest + jest-expo
