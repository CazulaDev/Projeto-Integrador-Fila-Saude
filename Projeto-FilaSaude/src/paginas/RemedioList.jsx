import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { buscarPostoPorId } from '../services/postoService.js'
import { listarRemediosPorPosto, removerRemedio } from '../services/remedioService.js'
import { obterSessao } from '../services/authService.js'

function RemedioList() {
  const { postoId } = useParams()
  const posto = buscarPostoPorId(postoId)
  const eAdministrador = obterSessao()?.tipoConta === 'admin'
  const [remedios, setRemedios] = useState(listarRemediosPorPosto(postoId))

  function excluirRemedio(id) {
    const confirmou = window.confirm('Deseja remover este remédio?')

    if (confirmou) {
      removerRemedio(id)
      setRemedios(listarRemediosPorPosto(postoId))
    }
  }

  if (!posto) {
    return (
      <section className="card">
        <h1>Posto não encontrado</h1>
        <Link className="botao" to="/postos">Voltar</Link>
      </section>
    )
  }

  return (
    <section className="card">
      <div className="cabecalho">
        <div>
          <h1>Remédios</h1>
          <p>{posto.nome}</p>
        </div>

        {eAdministrador && <Link className="botao" to={`/postos/${postoId}/remedios/novo`}>Novo Remédio</Link>}
      </div>

      {remedios.length === 0 ? (
        <p>Nenhum remédio cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Dosagem</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {remedios.map(remedio => (
              <tr key={remedio.id}>
                <td>{remedio.nome}</td>
                <td>{remedio.dosagem}</td>
                <td>{remedio.quantidade}</td>
                <td className="acoes">
                  {eAdministrador && <>
                    <Link className="link-editar" to={`/postos/${postoId}/remedios/editar/${remedio.id}`}>Editar</Link>
                    <button onClick={() => excluirRemedio(remedio.id)}>Remover</button>
                  </>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p>
        <Link className="link-texto" to={`/postos/${postoId}`}>Voltar para o posto</Link>
      </p>
    </section>
  )
}

export default RemedioList
