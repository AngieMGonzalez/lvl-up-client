import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])
// fix this in server later... w/o pulling depth=2
    return (
        <article className="events">
            <h1>List of events:</h1>
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    navigate({ pathname: "/events/new" });
                }}
            >Register New Event</button>
            <div className="d-flex flex-wrap justify-content-center"></div>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <ul>
                            <div className="event__description">What: {event.description}</div>
                            <div className="event__description">Host: {event.host.user.username}</div>
                            <div className="event__date">When: {event.date}</div>
                            <div className="event__time">At: {event.time}</div>
                            <div className="event__game">We're playing: {event.game.title}</div>
                            <div className="event__attendees">Attendees: {event.attendees}</div>
                        <br/>
                        </ul>
                    </section>
                })
            }
        </article>
    )
}
