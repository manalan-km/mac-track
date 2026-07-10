import { buildApplication, buildRouteMap } from "@stricli/core";
import {
  buildInstallCommand,
  buildUninstallCommand,
} from "@stricli/auto-complete";
import { name, version, description } from "../package.json";
import { pingCommand } from "./commands/ping/command";
import { macrosCommand } from "./commands/macros/command";
import { weightCommand } from "./commands/weight/command";
import { reportCommand } from "./commands/report/command";

const routes = buildRouteMap({
  routes: {
    ping: pingCommand,
    macros: macrosCommand,
    weight: weightCommand,
    report: reportCommand,
    install: buildInstallCommand("mactrack-cli", {
      bash: "__mactrack-cli_bash_complete",
    }),
    uninstall: buildUninstallCommand("mactrack-cli", { bash: true }),
  },
  docs: {
    brief: description,
    hideRoute: {
      install: true,
      uninstall: true,
    },
  },
  aliases: {
    m: "macros",
    w: "weight",
    r: "report",
  },
  defaultCommand: "macros",
});

export const app = buildApplication(routes, {
  name,
  versionInfo: {
    currentVersion: version,
  },
  //TODO: work on ts
  scanner: {
    caseStyle: "allow-kebab-for-camel",
  },
});
