const token = `Token ${localStorage.getItem("lu_token")}`

const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
}

const getSingleEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
}

const getEventsByGameId = (id) => {
    return fetch(`http://localhost:8000/events?game=${id}`, {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
};

const createEvent = (game) => {
    return fetch("http://localhost:8000/events", {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(game),
    })
        .then(response => response.json())
}

const updateEvent = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        }, body: JSON.stringify(event)
    })
}

const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: 'DELETE',
        headers:{
            "Authorization": token
        }
    })
}

export { getEvents, getSingleEvent, getEventsByGameId, createEvent, updateEvent, deleteEvent }
