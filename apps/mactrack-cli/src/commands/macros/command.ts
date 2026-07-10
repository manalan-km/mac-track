import { buildCommand, numberParser } from "@stricli/core";

export const macrosCommand = buildCommand( {
    loader: async () => import("./impl"),
    parameters: {
        flags: {
            calories: {
                kind: "parsed",
                parse: numberParser,
                brief: "Calories consumed in this meal"
            },
            protein: {
                kind: "parsed",
                parse: numberParser,
                brief: "protein consumed in this meal"
            },
            fibre: {
                kind: "parsed",
                parse: numberParser,
                brief: "Fibre consumed in this meal",
                default: '0'
            },
            meal_name: {
                kind: "parsed",
                parse: String,
                brief: "Meal name"
            }
        },
        aliases: {
            c: 'calories',
            C: 'calories',
            p: 'protein',
            P: 'protein',
            f: 'fibre',
            F: 'fibre',
            m: 'meal_name',
            M: 'meal_name'
        }
    },
    docs: {
        brief: 'Command to record calorie intake.'
    }
} )