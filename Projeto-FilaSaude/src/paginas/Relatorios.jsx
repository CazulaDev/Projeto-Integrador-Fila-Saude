import { useState } from 'react'
import { listarPostos } from '../services/postoService.js'
import { listarTodosRemedios } from '../services/remedioService.js'

function Relatorios() {
  const postos = listarPostos()
  const remedios = listarTodosRemedios()
  const [filtro, setFiltro] = useState('todos')
  const dados = remedios.map(remedio => ({
    ...remedio,
    posto: postos.find(posto => posto.id === remedio.postoId),
    estoqueBaixo: Number(remedio.quantidade) < 10
  }))
  const resultados = dados.filter(remedio => filtro === 'todos' || (filtro === 'baixo' && remedio.estoqueBaixo) || (filtro === 'normal' && !remedio.estoqueBaixo))
  const estoqueBaixo = dados.filter(remedio => remedio.estoqueBaixo).length
  const unidades = dados.reduce((total, remedio) => total + Number(remedio.quantidade), 0)

  return (
    <section className="card">
      <div className="cabecalho">
        <div>
          <h1>Relatório de estoque</h1>
          <p>Visão geral dos medicamentos cadastrados nos postos.</p>
        </div>
        <select value={filtro} onChange={evento => setFiltro(evento.target.value)} aria-label="Filtrar estoque">
          <option value="todos">Todos</option>
          <option value="baixo">Estoque baixo</option>
          <option value="normal">Estoque normal</option>
        </select>
      </div>

      <div className="indicadores-fila">
        <div className="indicador"><strong>{postos.length}</strong><span>postos cadastrados</span></div>
        <div className="indicador"><strong>{dados.length}</strong><span>medicamentos</span></div>
        <div className="indicador indicador-alerta"><strong>{estoqueBaixo}</strong><span>estoques abaixo de 10</span></div>
        <div className="indicador"><strong>{unidades}</strong><span>unidades totais</span></div>
      </div>

      <table>
        <thead><tr><th>Medicamento</th><th>Posto</th><th>Dosagem</th><th>Quantidade</th><th>Status</th></tr></thead>
        <tbody>
          {resultados.map(remedio => (
            <tr key={remedio.id}>
              <td>{remedio.nome}</td><td>{remedio.posto.nome}</td><td>{remedio.dosagem}</td>
              <td>{remedio.quantidade}</td><td><span className={`status ${remedio.estoqueBaixo ? 'status-alerta' : 'status-ok'}`}>{remedio.estoqueBaixo ? 'Reposição necessária' : 'Normal'}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default Relatorios
