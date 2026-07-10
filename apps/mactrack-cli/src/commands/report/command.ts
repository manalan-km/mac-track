import { buildCommand, numberParser } from "@stricli/core";

export const reportCommand = buildCommand({
  loader: () => import("./impl"),
  parameters: {
    positional: {
      kind: "tuple",
      parameters: [
        {
          brief: "Report Mode: today,week,month",
          parse: String,
          default: 'today'
        },
      ],
    },
  },
  docs: {
    brief: "Example for live playground with positional parameters",
  },
});
