import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getGames } from "../../managers/GameManager";
import { createEvent } from "../../managers/EventManager";
// import getAllGamers from "../../managers/GamersManager";

export const EventForm = () => {
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

    useEffect(() => {
        // TODO: Get all games, then set the state
        getGames().then(setGames);
        // getAllGamers().then(setHost);
    }, [])

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
      evt.preventDefault()

      const event = {
          description: formInput.description,
          date: formInput.date,
          time: formInput.time,
          game: parseInt(formInput.gameId)
          // ,host: parseInt(formInput.hostId)
      }

      // Send POST request to your API
      createEvent(event)
          .then(() => navigate("/events"))
    }

    return (
        <form className="gameForm" onSubmit={handleSubmit}>
            <h2 className="gameForm__title">Register New Event</h2>
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
                    <select name="gameId" onChange={changeEventState}>
                      <option value="0">Select Game</option>
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

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}
