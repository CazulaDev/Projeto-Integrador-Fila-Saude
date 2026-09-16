let remedios = [
  {
    id: 1,
    postoId: 1,
    nome: 'Dipirona',
    dosagem: '500mg',
    quantidade: '100',
    descricao: 'Remédio para dor e febre'
  },
  {
    id: 2,
    postoId: 1,
    nome: 'Paracetamol',
    dosagem: '750mg',
    quantidade: '60',
    descricao: 'Remédio para dor e febre'
  },
  {
    id: 3,
    postoId: 2,
    nome: 'Amoxicilina',
    dosagem: '500mg',
    quantidade: '24',
    descricao: 'Antibiótico de uso controlado'
  },
  {
    id: 4,
    postoId: 2,
    nome: 'Losartana',
    dosagem: '50mg',
    quantidade: '8',
    descricao: 'Controle da pressão arterial'
  },
  {
    id: 5,
    postoId: 2,
    nome: 'Soro fisiológico',
    dosagem: '500ml',
    quantidade: '42',
    descricao: 'Higienização e hidratação'
  },
  {
    id: 6,
    postoId: 3,
    nome: 'Ibuprofeno',
    dosagem: '600mg',
    quantidade: '15',
    descricao: 'Anti-inflamatório e analgésico'
  },
  {
    id: 7,
    postoId: 3,
    nome: 'Metformina',
    dosagem: '850mg',
    quantidade: '35',
    descricao: 'Controle da glicemia'
  },
  {
    id: 8,
    postoId: 3,
    nome: 'Omeprazol',
    dosagem: '20mg',
    quantidade: '5',
    descricao: 'Proteção gástrica'
  },
  {
    id: 9,
    postoId: 4,
    nome: 'AAS',
    dosagem: '100mg',
    quantidade: '70',
    descricao: 'Uso conforme orientação médica'
  },
  {
    id: 10,
    postoId: 4,
    nome: 'Loratadina',
    dosagem: '10mg',
    quantidade: '18',
    descricao: 'Alívio de sintomas alérgicos'
  }
]

let proximoId = 11

export function listarTodosRemedios() {
  return remedios
}

export function listarRemediosPorPosto(postoId) {
  return remedios.filter(remedio => remedio.postoId === Number(postoId))
}

export function buscarRemedioPorId(id) {
  return remedios.find(remedio => remedio.id === Number(id))
}

export function cadastrarRemedio(remedio) {
  const novoRemedio = {
    id: proximoId,
    postoId: Number(remedio.postoId),
    nome: remedio.nome,
    dosagem: remedio.dosagem,
    quantidade: remedio.quantidade,
    descricao: remedio.descricao
  }

  remedios.push(novoRemedio)
  proximoId++
}

export function atualizarRemedio(id, remedioAtualizado) {
  remedios = remedios.map(remedio => {
    if (remedio.id === Number(id)) {
      return {
        ...remedio,
        nome: remedioAtualizado.nome,
        dosagem: remedioAtualizado.dosagem,
        quantidade: remedioAtualizado.quantidade,
        descricao: remedioAtualizado.descricao
      }
    }

    return remedio
  })
}

export function removerRemedio(id) {
  remedios = remedios.filter(remedio => remedio.id !== Number(id))
}
