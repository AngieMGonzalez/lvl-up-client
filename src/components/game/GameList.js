import React, { useEffect, useState } from "react"
import { getGames } from "../../managers/GameManager.js"
import { useNavigate } from 'react-router-dom'
import GameCard from "./GameCard.js"
import { Button } from "react-bootstrap"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])
    const navigate = useNavigate()

    const getAllTheGames = () => {
        getGames().then(data => setGames(data))
        // data = {
        //    key: value pairs
        //    gameTypeId: data.game_type
        //     
        //  }
    }

    useEffect(() => {
        getAllTheGames();
    }, [])

    const clickEvent = () => {
        navigate({ pathname: "/games/new" });
    }

    return (
        <>
            <article className="games">
                <h1>List of Games 🎲:</h1>
                <Button className="btn btn-2 btn-sep icon-create" onClick={clickEvent}>
                    Register New Game 🎲
                </Button>
                {games.map((game) => (
                    <GameCard key={game.id} game={game} onUpdate={getAllTheGames} />
                ))}
            </article>
        </>
    )
}
