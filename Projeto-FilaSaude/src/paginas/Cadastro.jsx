import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarUsuario } from '../services/authService.js'

function Cadastro() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    tipoConta: 'usuario',
    cnpj: '',
    senhaSegura: ''
  })
  const [erro, setErro] = useState('')

  function alterarCampo(event) {
    const { name, value } = event.target

    setForm({
      ...form,
      [name]: value
    })
  }

  function cadastrar(event) {
    event.preventDefault()
    const resultado = cadastrarUsuario(form)

    if (resultado.erro) {
      setErro(resultado.erro)
      return
    }

    navigate('/postos')
  }

  return (
    <section className="card formulario-card">
      <h1>Cadastro</h1>

      {erro && <p className="mensagem-erro">{erro}</p>}

      <form onSubmit={cadastrar}>
        <label htmlFor="nome">Nome completo</label>
        <input
          id="nome"
          type="text"
          name="nome"
          value={form.nome}
          onChange={alterarCampo}
          placeholder="Digite seu nome"
          required
        />

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

        <label htmlFor="tipoConta">Tipo de conta</label>
        <select
          id="tipoConta"
          name="tipoConta"
          value={form.tipoConta}
          onChange={alterarCampo}
        >
          <option value="usuario">Usuário</option>
          <option value="admin">Administrador Posto</option>
        </select>

        {form.tipoConta === 'admin' && (
          <>
            <label htmlFor="cnpj">CNPJ do posto</label>
            <input
              id="cnpj"
              type="text"
              name="cnpj"
              value={form.cnpj}
              onChange={alterarCampo}
              placeholder="00.000.000/0000-00"
              required
            />

            <label htmlFor="senhaSegura">2FA</label>
            <input
              id="senhaSegura"
              type="password"
              name="senhaSegura"
              value={form.senhaSegura}
              onChange={alterarCampo}
              placeholder="Digite uma senha segura"
              required
            />
          </>
        )}

        <button type="submit">Cadastrar</button>
      </form>

      <p>
        Já tem conta? <Link className="link-texto" to="/login">Entrar</Link>
      </p>
    </section>
  )
}

export default Cadastro
