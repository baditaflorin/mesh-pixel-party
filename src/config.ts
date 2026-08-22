import { createMeshConfig } from "@baditaflorin/mesh-common";

export const config = createMeshConfig({
  appName: "mesh-pixel-party",
  description: "A compact shared pixel-art canvas for small rooms.",
  accentHex: "#0891b2",
  version: __APP_VERSION__,
  commit: __GIT_COMMIT__,
});
