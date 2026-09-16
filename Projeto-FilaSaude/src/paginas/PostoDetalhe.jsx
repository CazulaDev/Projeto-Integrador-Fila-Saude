import { Link, useParams } from 'react-router-dom'
import { buscarPostoPorId } from '../services/postoService.js'
import { listarRemediosPorPosto } from '../services/remedioService.js'
import { obterSessao } from '../services/authService.js'

function PostoDetalhe() {
  const { id } = useParams()
  const posto = buscarPostoPorId(id)
  const remedios = listarRemediosPorPosto(id)
  const eAdministrador = obterSessao()?.tipoConta === 'admin'

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
        <h1>{posto.nome}</h1>

        <Link className="botao" to={`/postos/${posto.id}/remedios`}>
          {eAdministrador ? 'Gerenciar Remédios' : 'Ver Remédios'}
        </Link>
      </div>

      <div className="dados">
        <p><strong>CNPJ:</strong> {posto.cnpj}</p>
        <p><strong>Endereço:</strong> {posto.endereco}</p>
        <p><strong>Bairro:</strong> {posto.bairro}</p>
        <p><strong>Telefone:</strong> {posto.telefone}</p>
      </div>

      <h2>Remédios disponíveis</h2>

      {remedios.length === 0 ? (
        <p>Nenhum remédio cadastrado neste posto.</p>
      ) : (
        <ul className="lista-simples">
          {remedios.map(remedio => (
            <li key={remedio.id}>
              {remedio.nome} - {remedio.dosagem} - {remedio.quantidade} unidades
            </li>
          ))}
        </ul>
      )}

      <Link className="link-texto" to="/postos">Voltar para postos</Link>
    </section>
  )
}

export default PostoDetalhe
