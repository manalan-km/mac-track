import type { Database } from "../../utils/database.types"

type MacrosInsert = Database['public']['Tables']['Macros']['Insert']

//omitting created_ts and id since they are auto populated by supabase DB
type MacrosFlags = Omit<MacrosInsert, 'created_at' | 'id'>

export default async function (flags: MacrosFlags): Promise<void> {
    console.log("Logging the macros to the database....")

    const body : MacrosInsert = {
        calories : flags.calories,
        protein: flags.protein,
        fibre: flags.fibre,
        meal_name: flags.meal_name
    }
    console.log("Body to be sent:", body)


    const response = await fetch("http://127.0.0.1:3000/macros", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    
    if(!response.ok) {
        console.error('Something went wrong *sigh*: ', await response.json())
    }
    else {
        console.info('Logged for the meal dawg!')
    }
}