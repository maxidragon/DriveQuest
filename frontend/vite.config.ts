import * as path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        react(),
        checker({
            overlay: { initialIsOpen: false },
            typescript: true,
            eslint: {
                lintCommand: "eslint --ext .js,.jsx,.ts,.tsx src",
            },
        }),
        viteTsconfigPaths(),
        svgrPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
