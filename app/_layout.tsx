import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import "../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.error,
  strict: false,
});
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
