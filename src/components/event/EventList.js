import React, { useEffect, useState } from "react"
import { getEvents } from "../../managers/EventManager"
import { useNavigate } from "react-router-dom"
import EventCard from "./EventCard"
import { Button } from "react-bootstrap"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    const clickEvent = () => {
        navigate({ pathname: "/events/new" });
    }

    return (
        <>
            <article className="events">
                <h1>List of events:</h1>
                <Button className="btn btn-2 btn-sep icon-create" onClick={clickEvent}>
                    Register New Event
                </Button>
                <div className="d-flex flex-wrap justify-content-center"></div>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </article>
        </>
    )
}
