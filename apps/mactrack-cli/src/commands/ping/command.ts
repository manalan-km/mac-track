import { buildCommand } from "@stricli/core";

export const pingCommand = buildCommand({
    loader: async () => import("./impl"),
    parameters: {
    },
    docs: {
        brief: "Ping pong command",
    },
});
