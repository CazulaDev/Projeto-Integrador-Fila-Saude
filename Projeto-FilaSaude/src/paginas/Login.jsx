import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { autenticar } from '../services/authService.js'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [erro, setErro] = useState('')

  const [form, setForm] = useState({
    email: '',
    senha: ''
  })

  function alterarCampo(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  function entrar(event) {
    event.preventDefault()
    const usuario = autenticar(form.email, form.senha)

    if (!usuario) {
      setErro('E-mail ou senha inválidos.')
      return
    }

    navigate(location.state?.de || '/postos')
  }

  return (
    <section className="card formulario-card">
      <h1>Login</h1>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <form onSubmit={entrar}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={alterarCampo}
          placeholder="Digite seu e-mail"
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          name="senha"
          value={form.senha}
          onChange={alterarCampo}
          placeholder="Digite sua senha"
          required
        />

        <button type="submit">Entrar</button>
      </form>

      <div className="dados">
        <strong>Contas para demonstração</strong>
        <p>Usuário: usuario@teste.com / 123456</p>
        <p>Admin: admin@teste.com / admin123</p>
      </div>

      <p>
        Não tem conta? <Link className="link-texto" to="/cadastro">Cadastre-se</Link>
      </p>
    </section>
  )
}

export default Login
