import { Link } from 'react-router-dom'
import { listarPostos } from '../services/postoService.js'
import { listarTodosRemedios } from '../services/remedioService.js'

function Home() {
  const postos = listarPostos()
  const remedios = listarTodosRemedios()
  const estoqueBaixo = remedios.filter(remedio => Number(remedio.quantidade) < 10)
  const totalUnidades = remedios.reduce((total, remedio) => total + Number(remedio.quantidade), 0)

  return (
    <div className="pagina-home">
      <section className="card destaque-home">
        <div className="conteudo-destaque">
          <p className="eyebrow">Cuidado que chega mais perto</p>
          <h1>Saúde pública sem perder tempo.</h1>

          <p>Consulte postos, encontre medicamentos e acompanhe sua fila em um só lugar.</p>

          <div className="acoes">
            <Link className="botao" to="/buscar-remedios">Encontrar remédio</Link>
            <Link className="botao botao-secundario" to="/fila">Acompanhar fila</Link>
          </div>
        </div>

        <div className="imagem-destaque">
          <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85" alt="Profissional de saúde em atendimento" />
          <span>Rede Fila-Saúde</span>
        </div>
      </section>

      <section className="grade-indicadores">
        <div className="indicador"><strong>{postos.length}</strong><span>postos ativos</span></div>
        <div className="indicador"><strong>{remedios.length}</strong><span>medicamentos cadastrados</span></div>
        <div className="indicador"><strong>{totalUnidades}</strong><span>unidades em estoque</span></div>
        <div className="indicador indicador-alerta"><strong>{estoqueBaixo.length}</strong><span>alertas de reposição</span></div>
      </section>

      <section className="card">
        <div className="cabecalho">
          <div>
            <h2>Alertas de estoque</h2>
            <p>Medicamentos com menos de 10 unidades disponíveis.</p>
          </div>
          <Link className="link-texto" to="/relatorios">Ver relatório completo</Link>
        </div>

        {estoqueBaixo.length === 0 ? <p>Nenhum alerta no momento.</p> : (
          <ul className="lista-simples">
            {estoqueBaixo.map(remedio => <li key={remedio.id}><strong>{remedio.nome}</strong> ({remedio.dosagem}): {remedio.quantidade} unidades</li>)}
          </ul>
        )}
      </section>
    </div>
  )
}

export default Home
