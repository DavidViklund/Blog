// vite.config.js
// Konfigurationsfil som används av Vite för att ställa in utvecklingsmiljön för React-applikationen.
// Den importerar nödvändiga plugins och exporterar ett konfigurationsobjekt som inkluderar dessa plugins.
// Konfigurationen kan utökas för att inkludera andra alternativ som serverinställningar, proxykonfigurationer och mer.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
