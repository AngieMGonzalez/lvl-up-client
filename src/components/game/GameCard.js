import { Card } from "react-bootstrap";
import { deleteGame } from "../../managers/GameManager";

export default function GameCard({game, onUpdate}) {

  const handleDelete = () => {
    if (window.confirm(`🛑 You wanna delete game?`)) {
      deleteGame(game.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '30rem', margin: '20px' }}>
        <Card.Body>
            <Card.Title>Game: {game.title} </Card.Title>
            <Card.Title>Made By: {game.maker}</Card.Title>
            <Card.Title>Max Number of Players: {game.number_of_players}</Card.Title>
            <Card.Title>Skill level from 1 to 5: {game.skill_level}</Card.Title>
            <Card.Body>
              <Card.Link href={`/edit_game/${game.id}`}>Edit</Card.Link>
              <Card.Link href="#" onClick={handleDelete}>Delete</Card.Link>
            </Card.Body>
        </Card.Body>
      </Card>
    </>
  )
}
