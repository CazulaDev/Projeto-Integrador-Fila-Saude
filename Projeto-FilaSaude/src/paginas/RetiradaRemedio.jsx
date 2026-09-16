function RetiradaRemedio({ posto, remedio, senha, onFinalizar }) {
  return (
    <section className="card retirada-card">
      <span className="status status-ok">Atendimento liberado</span>
      <h1>Retirada autorizada</h1>
      <p>O tempo de espera terminou. Apresente os dados abaixo no balcão do posto.</p>

      <div className="dados">
        <p><strong>Senha:</strong> {senha}</p>
        <p><strong>Posto:</strong> {posto.nome}</p>
        <p><strong>Medicamento:</strong> {remedio.nome} - {remedio.dosagem}</p>
        <p><strong>Quantidade solicitada:</strong> {remedio.quantidadeSolicitada} unidade(s)</p>
        <p><strong>Quantidade disponível:</strong> {remedio.quantidade} unidades</p>
      </div>

      <button onClick={onFinalizar}>Finalizar atendimento</button>
    </section>
  )
}

export default RetiradaRemedio
