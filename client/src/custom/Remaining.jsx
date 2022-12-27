function Remaining({time}){

    const updateTime = () => {
        var now = new Date() / 60000
        var endTime = new Date(time) / 60000
        var total_minutes = endTime - now > 0 ? endTime - now:0

        var days = Math.floor(total_minutes / 1440)
        total_minutes -= days * 1440
        var hours = Math.floor(total_minutes / 60)
        total_minutes -= hours * 60
        var minutes = Math.floor(total_minutes)

        if(document.getElementById(time)){
            document.getElementById(time).querySelector('.days-left').innerHTML = days
            document.getElementById(time).querySelector('.hours-left').innerHTML = hours
            document.getElementById(time).querySelector('.minutes-left').innerHTML = minutes
        }
    }

    const initTime = () => {
        updateTime()

        window.setInterval(() => {
            updateTime()
        }, 10)
    }

    return(
        <div className="timer" id={time}>
            {initTime()}
            <span>Time remaining: </span>
            <span className="days-left">0</span>
            <span> day(s) </span>
            <span className="hours-left">0</span>
            <span> hour(s) </span>
            <span className="minutes-left">0</span>
            <span> minute(s)</span>
        </div>
    );
}

export default Remaining