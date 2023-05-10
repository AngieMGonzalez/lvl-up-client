const token = `Token ${localStorage.getItem("lu_token")}`

const getAllGamers = () => {
    return fetch("http://localhost:8000/gamers", {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
}

export default getAllGamers
