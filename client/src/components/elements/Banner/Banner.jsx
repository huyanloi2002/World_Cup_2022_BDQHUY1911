import React, { useState, useEffect } from 'react';
import './Banner.scss';
import Countdown from '../../childs/Countdown';

const Banner = () => {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [seconds, setSeconds] = useState(0);

    let interval;

    const toQatar = new Date("2022-11-20 23:00:00").getTime()

    const startTimer = () => {
        interval = setInterval(() => {
            const now = new Date().getTime()

            const distance = toQatar - now

            const day = Math.floor(distance / (24 * 60 * 60 * 1000))

            const hour = Math.floor(distance % (24 * 60 * 60 * 1000) / (60 * 60 * 1000))

            const min = Math.floor(distance % (60 * 60 * 1000) / (60 * 1000))

            const second = Math.floor(distance % (60 * 1000) / 1000)

            if (distance < 0) {
                clearInterval(interval.current)
            }
            else {
                setDays(day)
                setHours(hour)
                setMins(min)
                setSeconds(second)
            }
        })
    }


    useEffect(() => {
        startTimer()
    })

    return (
        <React.Fragment>
            <div className="intro_module">
                <div className="intro-module_bg">
                    <video className="intro-module__video" autoPlay muted loop>
                        <source src="https://www.qatar2022.qa/sites/default/files/2022-10/FIFA_LIGHT%20THE%20SKY_SAVE%20THE%20DATE_HD.mp4" type="video/mp4" />
                    </video>
                    <div className="content-text">
                        <div className="title">WORLD CUP 2022</div>
                        <Countdown
                            days={days}
                            hours={hours}
                            mins={mins}
                            seconds={seconds}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Banner;