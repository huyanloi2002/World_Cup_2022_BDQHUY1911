import React from 'react'

const Countdown = ({ days, hours, mins, seconds }) => {
    return (
        <React.Fragment>
            <div className="countdown">
                <div className="title-countdown">Countdown to Qatar 2022</div>
                <div className="timer">
                    <div className="days">{days}<span>Days</span></div>:
                    <div className="hours">{hours}<span>Hours</span></div>:
                    <div className="mins">{mins}<span>Mins</span></div>:
                    <div className="seconds">{seconds}<span>Seconds</span></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Countdown