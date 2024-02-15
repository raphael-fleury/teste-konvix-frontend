import { FormEvent, useEffect } from "react"
import api from "@/utils/request"
import "./login.css"

export default function Login() {
    useEffect(() => {
        if (localStorage.getItem('token'))
            window.location.href = '/'
    })

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const {email, senha} = Object.fromEntries(new FormData(event.currentTarget)) as unknown as NovoUsuario

        api.post('/api/usuario/login', {email, senha})
            .then(({data}) => {
                localStorage.setItem('token', data.token)
                window.location.href = '/'
            })
            .catch(({response}) => alert(response?.data?.message || "Erro ao fazer login."))
    }

    return (
        <div className="login">
            <div className="login-container">
                <form className="login-form p-4 w-100" onSubmit={onSubmit}>
                    <div className="w-100 text-center mb-4">
                        <h1>Login</h1>
                    </div>
                    <label className="w-100 mb-2">E-mail:
                        <input id="email" className="form-control"
                             type="email" name="email" required autoFocus
                        />
                    </label>
                    <label className="w-100 mb-2">Senha:
                        <input id="senha" className="form-control"
                            type="password" name="senha" required
                            minLength={6} maxLength={24}
                        />
                    </label>
                    <label className="w-100 mb-2">
                        <button className="btn btn-primary w-100 mt-2">Entrar</button>
                    </label>
                    <label className="w-100 mb-2">
                        <a href="/registrar" className="btn btn-light w-100 mt-2">Registrar-se</a>
                    </label>
                </form>
            </div>
        </div>
    )
}