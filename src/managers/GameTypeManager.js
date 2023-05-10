const token = `Token ${localStorage.getItem("lu_token")}`

const getAllGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        method: 'GET',
        headers:{
            "Authorization": token
        }
    })
        .then(response => response.json())
};

export default getAllGameTypes 
