import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const supabaseUrl = env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
  const supabasePublishableKey = env.VITE_SUPABASE_PUBLISHABLE_KEY
    || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
    || env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    || env.SUPABASE_PUBLISHABLE_KEY
    || env.SUPABASE_ANON_KEY;

  return {
    define: {
      ...(supabaseUrl ? { "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(supabaseUrl) } : {}),
      ...(supabasePublishableKey ? { "import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY": JSON.stringify(supabasePublishableKey) } : {}),
    },
    server: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
      hmr: {
        overlay: false,
      },
    },
    assetsInclude: ["**/*.JPG"],
    plugins: [react()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"],
            supabase: ["@supabase/supabase-js"],
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
