import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listarPostos, removerPosto } from '../services/postoService.js'
import { obterSessao } from '../services/authService.js'

function PostoList() {
  const [postos, setPostos] = useState(listarPostos())
  const eAdministrador = obterSessao()?.tipoConta === 'admin'

  function excluirPosto(id) {
    const confirmou = window.confirm('Deseja remover este posto?')

    if (confirmou) {
      removerPosto(id)
      setPostos(listarPostos())
    }
  }

  return (
    <section className="card">
      <div className="cabecalho">
        <h1>Postos de Saúde</h1>

        {eAdministrador && <Link className="botao" to="/postos/novo">Novo Posto</Link>}
      </div>

      {postos.length === 0 ? (
        <p>Nenhum posto cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Bairro</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {postos.map(posto => (
              <tr key={posto.id}>
                <td>{posto.nome}</td>
                <td>{posto.bairro}</td>
                <td>{posto.telefone}</td>
                <td className="acoes">
                  <Link className="link-detalhe" to={`/postos/${posto.id}`}>
                    Ver
                  </Link>

                  {eAdministrador && <>
                    <Link className="link-editar" to={`/postos/editar/${posto.id}`}>Editar</Link>
                    <button onClick={() => excluirPosto(posto.id)}>Remover</button>
                  </>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default PostoList
