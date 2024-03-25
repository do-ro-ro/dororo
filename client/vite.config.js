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
                background_color: "#6386BE",
                icons: [
                    {
                        src: "./public/maskable_icon_x192.png",
                        type: "image/png",
                        sizes: "192x192",
                    },
                    {
                        src: "./public/maskable_icon_x512.png",
                        type: "image/png",
                        sizes: "512x512",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
    // resolve: {
    //     alias: { "@": Path2D.resolve(__dirname, "./src") },
    // },
});
