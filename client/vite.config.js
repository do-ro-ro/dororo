import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: "autoUpdate",
            devOptions: { enabled: true },
            manifest: {
                name: "도로로",
                short_name: "도로로",
                theme_color: "#6386BE",
                icons: [
                    {
                        src: "./public/favicon-196x196.png",
                        type: "image/png",
                        sizes: "196x196",
                    },
                    {
                        src: "./public/mstile-310x310.png",
                        type: "image/png",
                        sizes: "310x310",
                    },
                ],
            },
        }),
    ],
    // resolve: {
    //     alias: { "@": Path2D.resolve(__dirname, "./src") },
    // },
});
