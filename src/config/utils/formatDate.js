export function useFormatDate() {

    function byServer(date, hours='00', minutes='00') {
        const d = new Date(date)
        const year = d.getFullYear()
        const month = d.getMonth()+1
        const day = d.getDate()
        return `${year}-${month>=10?month:'0'+month}-${day>=10?day:'0'+day}T${hours}:${minutes}:00`
    }
    function byClient(date) {
        const newDate = new Date(date)
        const day = newDate.getDate().toString().padStart(2, '0')
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
        const year = newDate.getFullYear()
        return `${day}.${month}.${year}` // 11.11.2025
    }

    return {byServer,byClient}
}