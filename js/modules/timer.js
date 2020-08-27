
function timer(id, deadline) {

    function getTime(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            second = Math.floor((t / 1000) % 60),
            minute = Math.floor((t / 1000 /60) % 60),
            hour = Math.floor((t / 1000 / 60 /60) % 24 - 3),
            day = Math.floor(t / 1000 / 60 /60 /24);

        return {
            "total" : t,
            "second" : second,
            "minute" : minute,
            "hour" : hour,
            "day" : day
        };
    }

    function setClock(timerSelector, endTime) {
        let timer = document.querySelector(timerSelector), 
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); 

        function updateClock() {
            let t = getTime(endTime);

            function addZero(num){
                if (num <= 9) {
                    return "0" + num; 
                } else {
                    return num;
                    }
                }
            seconds.textContent = addZero(t.second);
            minutes.textContent = addZero(t.minute);
            hours.textContent = addZero(t.hour);
            days.textContent = t.day;

            if (t.total <= 0) {
                seconds.textContent = '00',
                minutes.textContent = '00',
                hours.textContent = '00',
                days.textContent = '00';
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);

}
export default timer; 