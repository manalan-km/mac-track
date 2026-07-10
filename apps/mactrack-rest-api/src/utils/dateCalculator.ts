export enum Mode {
    today = 'today',
    week = 'week',
    month = 'month',
}

export const datePeriodCalculator = (mode: Mode) => {
    const timezone = '+11:00'
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    let startDate = ''
    let endDate = ''
    switch (mode) {
        case Mode.today:
            startDate = `${year}-${month}-${day}T00:00:00${timezone}`
            endDate = `${year}-${month}-${day}T23:59:59${timezone}`
            break
        case Mode.week:
            const dayOfWeek = now.getDay() || 7
            const monday = new Date(now)
            monday.setDate(now.getDate() - dayOfWeek + 1)
            const sunday = new Date(monday)
            sunday.setDate(monday.getDate() + 6)
            startDate = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}T00:00:00${timezone}`
            endDate = `${sunday.getFullYear()}-${String(sunday.getMonth() + 1).padStart(2, '0')}-${String(sunday.getDate()).padStart(2, '0')}T23:59:59${timezone}`
            break

        case Mode.month:
            const lastDay = new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0
            ).getDate()
            startDate = `${year}-${month}-01T00:00:00${timezone}`
            endDate = `${year}-${month}-${lastDay}T23:59:59${timezone}`
    }
    return { startDate, endDate }
}
