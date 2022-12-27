function Clock(){

    const updateClock = () => {
        const now = new Date()
        var   day = now.getDay(),
              date = now.getDate(),
              month = now.getMonth(),
              year = now.getFullYear(),
              hour = now.getHours(),
              minute = now.getMinutes().toString().padStart(2, '0'),
              second = now.getSeconds().toString().padStart(2, '0'),
              period = 'AM'

        if(hour == 0){
            hour = 12
        }
        if(hour > 12){
            hour = hour - 12
            period = 'PM'
        }

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', "Jul", 'Aug', 'Sep', 'Oct', 'Nov', "Dec"]
        const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const ids = ['day', 'month', 'date', 'year', 'hour', 'minute', 'second', 'period']

        const values = [week[day], months[month], date, year, hour, minute, second, period]

        for(var i = 0; i < ids.length; i++){
            const id = document.getElementById(ids[i])

            if(id){
                id.innerHTML = values[i]
            }
        }
    }
    
    const initClock = () => {

        updateClock()

        window.setInterval(() => {
            updateClock()
        }, 1000)
    }
    
    return (
        <div className="Clock">
            {initClock()}
            <div className="datetime">
                <div className="date">
                    <span id="day"></span>,
                    <span id="month"></span>
                    <span id="date"></span>,
                    <span id="year"></span>
                </div>
                <div className="time">
                    <span id="hour"></span>:
                    <span id="minute"></span>:
                    <span id="second"></span>
                    <span id="period"></span>
                </div>
            </div>
        </div>
    );
}

export default Clock;