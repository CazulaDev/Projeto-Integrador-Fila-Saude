import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { listarPostos } from '../services/postoService.js'
import { listarRemediosPorPosto } from '../services/remedioService.js'
import RetiradaRemedio from './RetiradaRemedio.jsx'

const filasIniciais = {
  1: { espera: 1, tempo: 10, atendendo: 'Senha A042' },
  2: { espera: 1, tempo: 10, atendendo: 'Senha B018' },
  3: { espera: 1, tempo: 10, atendendo: 'Senha C077' },
  4: { espera: 1, tempo: 10, atendendo: 'Senha D031' }
}

function Fila() {
  const [parametros] = useSearchParams()
  const postos = listarPostos()
  const [postoId, setPostoId] = useState(parametros.get('postoId') || '1')
  const [filas, setFilas] = useState(filasIniciais)
  const [minhaSenha, setMinhaSenha] = useState(null)
  const [remedioId, setRemedioId] = useState(parametros.get('remedioId') || '')
  const [quantidade, setQuantidade] = useState('1')
  const [status, setStatus] = useState('selecao')
  const [tempoRestante, setTempoRestante] = useState(30)
  const fila = filas[postoId]
  const posto = postos.find(item => item.id === Number(postoId))
  const remedios = listarRemediosPorPosto(postoId)
  const remedioSelecionado = remedios.find(remedio => remedio.id === Number(remedioId))
  const remedioParaRetirada = remedioSelecionado ? { ...remedioSelecionado, quantidadeSolicitada: quantidade } : null

  useEffect(() => {
    if (status !== 'aguardando') {
      return undefined
    }

    const intervalo = setInterval(() => {
      setTempoRestante(valor => {
        if (valor <= 1) {
          setStatus('liberado')
          return 0
        }

        return valor - 1
      })
    }, 1000)

    return () => clearInterval(intervalo)
  }, [status])

  function entrarNaFila() {
    const quantidadeSolicitada = Number(quantidade)

    if (!remedioSelecionado || quantidadeSolicitada < 1 || quantidadeSolicitada > Number(remedioSelecionado.quantidade)) {
      return
    }

    const novaSenha = fila.espera + 1
    setFilas({ ...filas, [postoId]: { ...fila, espera: fila.espera + 1 } })
    setMinhaSenha(`${postoId === '1' ? 'A' : postoId === '2' ? 'B' : postoId === '3' ? 'C' : 'D'}${String(novaSenha).padStart(3, '0')}`)
    setTempoRestante(30)
    setStatus('aguardando')
  }

  function sairDaFila() {
    setMinhaSenha(null)
    setFilas({ ...filas, [postoId]: { ...fila, espera: Math.max(0, fila.espera - 1) } })
    setRemedioId('')
    setQuantidade('1')
    setStatus('selecao')
    setTempoRestante(30)
  }

  function finalizarAtendimento() {
    setMinhaSenha(null)
    setRemedioId('')
    setQuantidade('1')
    setStatus('selecao')
    setTempoRestante(30)
  }

  if (status === 'liberado') {
    return <RetiradaRemedio posto={posto} remedio={remedioParaRetirada} senha={minhaSenha} onFinalizar={finalizarAtendimento} />
  }

  return (
    <section className="card">
      <div className="cabecalho">
        <div>
          <h1>Acompanhar fila</h1>
            <p>Selecione um medicamento e simule a espera até a retirada.</p>
        </div>
        <span className="status status-ok">Serviço online</span>
      </div>

      {status === 'selecao' && <>
        <label>
          Escolha o posto
          <select value={postoId} onChange={evento => { setPostoId(evento.target.value); setRemedioId('') }}>
            {postos.map(item => <option key={item.id} value={item.id}>{item.nome}</option>)}
          </select>
        </label>

        <label>
          Escolha o medicamento
          <select value={remedioId} onChange={evento => setRemedioId(evento.target.value)}>
            <option value="">Selecione um medicamento</option>
            {remedios.map(remedio => <option key={remedio.id} value={remedio.id}>{remedio.nome} - {remedio.dosagem}</option>)}
          </select>
        </label>

        <label>
          Quantidade desejada
          <input
            type="number"
            min="1"
            max={remedioSelecionado?.quantidade || 1}
            value={quantidade}
            onChange={evento => setQuantidade(evento.target.value)}
            disabled={!remedioSelecionado}
          />
        </label>
      </>}

      <div className="indicadores-fila">
        <div className="indicador"><strong>{fila.espera}</strong><span>pessoas aguardando</span></div>
        <div className="indicador"><strong>{fila.tempo} min</strong><span>tempo estimado</span></div>
        <div className="indicador"><strong>{fila.atendendo}</strong><span>senha em atendimento</span></div>
      </div>

      <div className="dados">
        <strong>{posto.nome}</strong>
        <p>{posto.endereco} | {posto.telefone}</p>
        {status === 'aguardando' ? <p className="aviso-espera">Sua senha é <strong>{minhaSenha}</strong>. Aguarde o atendimento para retirar <strong>{quantidade} unidade(s) de {remedioSelecionado.nome}</strong>.</p> : <p>Retire uma senha para acompanhar sua posição.</p>}
      </div>

      {status === 'aguardando' ? <div className="contador-fila"><span>Você está na fila. Aguarde sua senha ser chamada.</span><button className="botao-secundario" onClick={sairDaFila}>Sair da fila</button></div> : <button disabled={!remedioSelecionado || Number(quantidade) < 1 || Number(quantidade) > Number(remedioSelecionado?.quantidade)} onClick={entrarNaFila}>Entrar na fila</button>}
    </section>
  )
}

export default Fila
