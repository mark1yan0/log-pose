import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [tailwindcss(), svelte()],
    resolve: {
        alias: {
            $services: path.resolve("./src/services"),
            $types: path.resolve("./src/types"),
            $lib: path.resolve("./src/lib"),
        },
    },
});
