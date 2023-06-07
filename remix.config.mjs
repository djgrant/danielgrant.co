/**
 * @type {import('@remix-run/dev').AppConfig}
 */
export default {
  cacheDirectory: "./node_modules/.cache/remix",
  future: {
    v2_meta: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_normalizeFormMethod: true,
    v2_headers: true,
  },
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  postcss: true,
  serverModuleFormat: "cjs",
  serverDependenciesToBundle: [/.*/],
  tailwind: true,
};
