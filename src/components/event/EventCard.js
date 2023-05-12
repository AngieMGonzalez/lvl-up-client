import { Button, Card } from "react-bootstrap";
import { deleteEvent, joinEvent, leaveEvent } from "../../managers/EventManager";

export default function EventCard({event, onUpdate}) {

  const handleDelete = () => {
    if (window.confirm(`🛑 You wanna delete event?`)) {
      deleteEvent(event.id).then(() => onUpdate());
    }
  };

  const signup = () => {
    joinEvent(event.id).then(() => onUpdate());
  }

  const leave = () => {
    leaveEvent(event.id).then(() => onUpdate());
  }

// fix this in server later... w/o pulling depth=2
  return (
    <>
      <Card style={{ width: '30rem', margin: '20px' }}>
        <Card.Body>
            <Card.Title>What: {event.description}</Card.Title>
            <Card.Title>Host: {event.host.user.username}</Card.Title>
            <Card.Title>When: {event.date}</Card.Title>
            <Card.Title>At: {event.time}</Card.Title>
            <Card.Title>We're playing: {event.game.title}</Card.Title>
            <Card.Title>Attendees: {event.attendees}</Card.Title>
            <Card.Body>
              <Card.Link href={`/edit_event/${event.id}`}>Edit</Card.Link>
              <Card.Link href="#" onClick={handleDelete}>Delete</Card.Link>
              <Card.Body>
                {
                  event.joined ?
                    <Button className="btn-danger" onClick={leave}>Leave</Button>
                    : <Button className="btn-success" onClick={signup}>Sign Up</Button>
                }
              </Card.Body>
            </Card.Body>
        </Card.Body>
      </Card>
    </>
  )
}
