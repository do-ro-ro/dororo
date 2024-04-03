import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            includeAssets: [
                "favicon.ico",
                "maskable_icon_x192.png",
                "maskable_icon_x512.png",
            ],
            registerType: "autoUpdate",
            devOptions: { enabled: true },
            manifest: {
                name: "도로로",
                short_name: "도로로",
                description: "지금 바로 도로로!",
                theme_color: "#6386BE",
                display: "fullscreen",
                background_color: "#6386BE",
                icons: [
                    {
                        src: "maskable_icon_x192.png",
                        type: "image/png",
                        sizes: "192x192",
                    },
                    {
                        src: "maskable_icon_x512.png",
                        type: "image/png",
                        sizes: "512x512",
                        purpose: "maskable",
                    },
                    {
                        src: "maskable_icon_x512.png",
                        type: "image/png",
                        sizes: "512x512",
                        purpose: "any",
                    },
                ],
            },
            workbox: {
                navigateFallbackDenylist: [
                    /^\/api/,
                    /^\/oauth2/,
                    /^\/api-docs/,
                ],
            },
        }),
    ],
    // resolve: {
    //     alias: { "@": Path2D.resolve(__dirname, "./src") },
    // },
});
