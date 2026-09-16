let postos = [
  {
    id: 1,
    nome: 'PostoLar',
    cnpj: '00.000.000/0000-00',
    endereco: 'Rua Principal, 123',
    bairro: 'Centro',
    telefone: '(11) 99999-988'
  },
  {
    id: 2,
    nome: 'UBS Vila Esperança',
    cnpj: '11.111.111/0001-11',
    endereco: 'Avenida das Flores, 450',
    bairro: 'Vila Esperança',
    telefone: '(11) 3333-1212'
  },
  {
    id: 3,
    nome: 'Centro de Saúde Nova Vida',
    cnpj: '22.222.222/0001-22',
    endereco: 'Rua do Sol, 89',
    bairro: 'Jardim América',
    telefone: '(11) 3333-3434'
  },
  {
    id: 4,
    nome: 'UBS Parque das Águas',
    cnpj: '33.333.333/0001-33',
    endereco: 'Rua das Nascentes, 210',
    bairro: 'Parque das Águas',
    telefone: '(11) 3333-5656'
  }
]

let proximoId = 5

export function listarPostos() {
  return postos
}

export function buscarPostoPorId(id) {
  return postos.find(posto => posto.id === Number(id))
}

export function cadastrarPosto(posto) {
  const novoPosto = {
    id: proximoId,
    nome: posto.nome,
    cnpj: posto.cnpj,
    endereco: posto.endereco,
    bairro: posto.bairro,
    telefone: posto.telefone
  }

  postos.push(novoPosto)
  proximoId++
}

export function atualizarPosto(id, postoAtualizado) {
  postos = postos.map(posto => {
    if (posto.id === Number(id)) {
      return {
        ...posto,
        nome: postoAtualizado.nome,
        cnpj: postoAtualizado.cnpj,
        endereco: postoAtualizado.endereco,
        bairro: postoAtualizado.bairro,
        telefone: postoAtualizado.telefone
      }
    }

    return posto
  })
}

export function removerPosto(id) {
  postos = postos.filter(posto => posto.id !== Number(id))
}
