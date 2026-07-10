import { buildCommand, numberParser } from "@stricli/core";

export const weightCommand = buildCommand<object, [number]>({
  loader: async () => import("./impl"),
  parameters: {
    positional: {
      kind: "tuple",
      parameters: [
        {
          brief: "Weight in KGs",
          parse: numberParser,
        }
      ],
    },
  },
  docs: {
    brief: "Command to record weight."
  }
})