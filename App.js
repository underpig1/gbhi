import React from "react";
import { useWindowDimensions } from "react-native";
import WebView from "react-native-webview";
const landing = require("./app/landing.html");
const index = require("./app/index.html");

export default function App() {
  const { width } = useWindowDimensions();
  return (
    <WebView
      contentWidth = {width}
      source = {landing}
    />
  );
}