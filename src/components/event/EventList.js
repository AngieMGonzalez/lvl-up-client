import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    useEffect(() => {
      getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">What: {event.description}</div>
                        <div className="event__description">Host: {event.host.user.username}</div>
                        <div className="event__date">When: {event.date}</div>
                        <div className="event__time">At: {event.time}</div>
                        <div className="event__game">We're playing {event.game.title}</div>
                        <div className="event__attendees">Attendees: {event.attendees}</div>
                        <br/>
                    </section>
                })
            }
        </article>
    )
}
