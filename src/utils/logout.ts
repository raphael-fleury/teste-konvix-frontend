import api from "./request"

export function logout() {
    api.post('/api/usuario/logout')
        .then(() => {
            window.localStorage.removeItem('token')
            window.location.href = '/login'
        })
        .catch(error => {
            console.error(error)
            alert("Erro ao fazer logout")
        })
}