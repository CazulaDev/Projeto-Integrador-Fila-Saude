import { Link, useNavigate } from 'react-router-dom'
import { encerrarSessao, obterSessao } from '../services/authService.js'

function Menu() {
  const navigate = useNavigate()
  const sessao = obterSessao()

  function sair() {
    encerrarSessao()
    navigate('/login')
  }

  return (
    <nav className="menu">
      <h2>Fila-Saúde</h2>

      <div>
        <Link to="/">Home</Link>
        {!sessao && <Link to="/login">Login</Link>}
        {!sessao && <Link to="/cadastro">Cadastro</Link>}
        {sessao && <Link to="/postos">Postos</Link>}
        {sessao && <Link to="/buscar-remedios">Buscar remédios</Link>}
        {sessao && <Link to="/fila">Fila</Link>}
        {sessao?.tipoConta === 'admin' && <Link to="/relatorios">Relatórios</Link>}
        {sessao && <span className="sessao-atual">{sessao.nome} ({sessao.tipoConta})</span>}
        {sessao && <button className="botao-sair" onClick={sair}>Sair</button>}
      </div>
    </nav>
  )
}

export default Menu
