import type { Database } from "../../utils/database.types"

type WeightInsert = Database['public']['Tables']['weight']['Insert']

export default async function (flags: object, weight: number): Promise<void> {
    console.log("Logging the macros to the database....")

    const body : WeightInsert = {
        weight: weight
    }
    
    console.info('Beep Boop inserting into database....')

    const response = await fetch("http://127.0.0.1:3000/weight", {
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
        console.info('Logged the weight for the day dawg!')
    }
}