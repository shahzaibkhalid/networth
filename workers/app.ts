import { createRequestHandler } from "react-router";

declare global {
  interface CloudflareEnvironment {}
}

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: CloudflareEnvironment;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  // @ts-expect-error - virtual module provided by React Router at build time
  () => import("../build/server/index.js")
);

export default {
  fetch(request, env, context) {
    return requestHandler(request, {
      cloudflare: {
        env,
        ctx: context,
      },
    });
  },
} satisfies ExportedHandler<CloudflareEnvironment>;
