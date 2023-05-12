// the Authorization header will be in every fetch call to the database to let the server know which user is logged in

const token = `Token ${localStorage.getItem("lu_token")}`

const getGames = () => {
    return fetch("http://localhost:8000/games", {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
};

const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(game),
    })
        .then(response => response.json())
}

const getGameTypes = (id) => {
    return fetch(`http://localhost:8000/games?game_type=${id}`, {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
}

const getSingleGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
}

const updateGame = (game) => {
    return fetch(`http://localhost:8000/games/${game.id}`, {
        method: 'PUT',
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        }, body: JSON.stringify(game)
    })
}

const deleteGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        method: 'DELETE',
        headers:{
            "Authorization": token
        }
    })
}

export { getGames, createGame, getGameTypes, getSingleGame, updateGame, deleteGame }
