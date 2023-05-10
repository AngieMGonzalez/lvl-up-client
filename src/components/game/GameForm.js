import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame } from '../../managers/GameManager.js'
import getAllGameTypes from "../../managers/GameTypeManager.js";



export const GameForm = () => {
  /* Since the input fields are bound to the values of the properties of this state variable, you need to provide some default values. */
    const initialState = {
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    };

    const [currentGame, setCurrentGame] = useState(initialState)
    const [gameTypes, setGameTypes] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getAllGameTypes().then(setGameTypes);
    }, [])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const { name, value } = domEvent.target;
        setCurrentGame((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" min="1" max="150" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level from 1 to 5: </label>
                    <input type="number" name="skillLevel" min="1" max="5" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Type of Game: </label>
                    <select name="gameTypeId" onChange={changeGameState}>
                        <option value="0">Select a Game Type</option>
                        {gameTypes.map((gameType) => (
                            <option 
                            key={gameType.id} 
                            value={gameType.id}
                            >
                            {gameType.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.numberOfPlayers),
                        skill_level: parseInt(currentGame.skillLevel),
                        game_type: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => navigate("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}