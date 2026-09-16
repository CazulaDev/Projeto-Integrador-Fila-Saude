import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listarPostos } from '../services/postoService.js'
import { listarTodosRemedios } from '../services/remedioService.js'

function BuscaRemedios() {
  const postos = listarPostos()
  const remedios = listarTodosRemedios()
  const [termo, setTermo] = useState('')
  const [bairro, setBairro] = useState('todos')

  const bairros = [...new Set(postos.map(posto => posto.bairro))]
  const resultados = remedios
    .map(remedio => ({
      ...remedio,
      posto: postos.find(posto => posto.id === remedio.postoId)
    }))
    .filter(({ nome, dosagem, posto }) => {
      const busca = termo.toLowerCase().trim()
      const correspondeAoTexto = !busca || nome.toLowerCase().includes(busca) || dosagem.toLowerCase().includes(busca)
      const correspondeAoBairro = bairro === 'todos' || posto.bairro === bairro
      return correspondeAoTexto && correspondeAoBairro
    })

  return (
    <section className="card">
      <div className="cabecalho">
        <div>
          <h1>Buscar remédios</h1>
          <p>Consulte em quais postos há medicamentos disponíveis.</p>
        </div>
        <strong>{resultados.length} resultado(s)</strong>
      </div>

      <div className="filtros">
        <label>
          Nome ou dosagem
          <input
            value={termo}
            onChange={evento => setTermo(evento.target.value)}
            placeholder="Ex.: dipirona ou 500mg"
          />
        </label>
        <label>
          Bairro
          <select value={bairro} onChange={evento => setBairro(evento.target.value)}>
            <option value="todos">Todos os bairros</option>
            {bairros.map(nome => <option key={nome} value={nome}>{nome}</option>)}
          </select>
        </label>
      </div>

      {resultados.length === 0 ? (
        <p className="mensagem-vazia">Nenhum remédio encontrado para os filtros informados.</p>
      ) : (
        <table>
          <thead>
            <tr><th>Remédio</th><th>Dosagem</th><th>Posto</th><th>Bairro</th><th>Quantidade</th></tr>
          </thead>
          <tbody>
            {resultados.map(remedio => (
              <tr className="remedio-resultado" key={remedio.id}>
                <td>
                  <Link
                    className="nome-remedio"
                    to={`/fila?postoId=${remedio.postoId}&remedioId=${remedio.id}`}
                    title={`Selecionar ${remedio.nome}`}
                  >
                    {remedio.nome}
                  </Link>
                </td>
                <td>{remedio.dosagem}</td>
                <td>{remedio.posto.nome}</td>
                <td>{remedio.posto.bairro}</td>
                <td>{remedio.quantidade} unidades</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default BuscaRemedios
