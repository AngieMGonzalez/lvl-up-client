import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getGames } from "../../managers/GameManager";
import { createEvent, getSingleEvent, updateEvent } from "../../managers/EventManager";
import { Button } from "react-bootstrap";
// import getAllGamers from "../../managers/GamersManager";

export default function EventForm () {
  /* Since the input fields are bound to the values of the properties of this state variable, you need to provide some default values. */
    const initialState = {
        description: "",
        date: "",
        time: "",
        gameId: 1
        // ,hostId: 1
    };

    const [formInput, setFormInput] = useState(initialState)
    const [games, setGames] = useState([])
    // const [host, setHost] = useState([])
    const navigate = useNavigate()

    //used retrieve the dynamic route parameters from the URL in the rendered component
    const { eventId } = useParams();
    // returns an object containing key-value pair
    // like like router.query in nextjs

    useEffect(() => {
        // TODO: Get all games, then set the state
        getGames().then(setGames);
        // getAllGamers().then(setHost);
        if (eventId) {
          getSingleEvent(eventId).then((eventObj) => {
            const game = eventObj.game.id;
            setFormInput((prevState) => ({
              ...prevState,
              description: eventObj.description,
              date: eventObj.date,
              time: eventObj.time,
              gameId: game
            }));
          })
        }
    }, [eventId])

    const changeEventState = (domEvent) => {
        // the onChange function
        const { name, value } = domEvent.target;
        setFormInput((prevState) => ({
          ...prevState,
          [name]: value,
        }))
    }

    // let futureDate = () => {
    //   const today = new Date();
    //   const numberOfDaysToAdd = 3;
    //   const date = today.setDate(today.getDate() + numberOfDaysToAdd); 
    //   const defaultValue = new Date(date).toISOString().split('T')[0];
    //   return defaultValue;
    // }

    const handleSubmit = (evt) => {
      evt.preventDefault();

      let formObj = {
          description: formInput.description,
          date: formInput.date,
          time: formInput.time,
          game: parseInt(formInput.gameId)
          // ,host: parseInt(formInput.hostId)
      }

      if (eventId) {
        const payload = {
          ...formObj,
          id: eventId
        };
        updateEvent(payload).then(() => navigate("/events"));
        } else {
          const event = formObj
      // Send POST request to your API
      createEvent(event)
          .then(() => navigate("/events"))
      }
    }

    return (
        <form className="gameForm" onSubmit={handleSubmit}>
            <h2 className="gameForm__title">{eventId ? 'Edit' : 'Register New'} Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={formInput.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={formInput.date}
                        onChange={changeEventState}
                        // defaultValue={futureDate()}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={formInput.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">What Game: </label>
                    <select name="gameId" onChange={changeEventState} value={formInput.gameId}>
                      <option value="">Select Game</option>
                      {games.map((game) => (
                        <option 
                          key={game.id} 
                          value={game.id}
                        >
                          {game.title}
                        </option>
                      ))}
                    </select>
                </div>
            </fieldset>

            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Who is Hosting: </label>
                    <select name="gameId" onChange={changeEventState}>
                      <option value="0">Select Host</option>
                      {host.map((host) => (
                        <option 
                          key={host.id} 
                          value={host.id}
                        >
                          {host.full_name}
                        </option>
                      ))}
                    </select>
                </div>
            </fieldset> */}

            <Button type="submit" className="btn btn-primary">{eventId ? 'Edit' : 'Create'} Event</Button>
        </form>
    )
}
