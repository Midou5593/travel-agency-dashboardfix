import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "amidou-7w",
  project: "travel-agency",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};



export default defineConfig(config => {
  return {
  plugins: [tailwindcss(),tsconfigPaths(),reactRouter(),sentryReactRouter(sentryConfig, config)],
  ssr: {
    noExternal:[/@syncfusion/]
  }
  };
});
