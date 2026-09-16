const usuariosIniciais = [
  {
    id: 1,
    nome: 'Usuário de teste',
    email: 'usuario@teste.com',
    senha: '123456',
    tipoConta: 'usuario'
  },
  {
    id: 2,
    nome: 'Administrador de teste',
    email: 'admin@teste.com',
    senha: 'admin123',
    tipoConta: 'admin',
    cnpj: '00.000.000/0000-00'
  }
]

const CHAVE_USUARIOS = 'filasaude-usuarios'
const CHAVE_SESSAO = 'filasaude-sessao'

function lerUsuarios() {
  const dados = localStorage.getItem(CHAVE_USUARIOS)

  if (!dados) {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuariosIniciais))
    return usuariosIniciais
  }

  return JSON.parse(dados)
}

export function autenticar(email, senha) {
  const usuario = lerUsuarios().find(item => item.email === email && item.senha === senha)

  if (!usuario) {
    return null
  }

  const sessao = { id: usuario.id, nome: usuario.nome, email: usuario.email, tipoConta: usuario.tipoConta }
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
  return sessao
}

export function cadastrarUsuario(dados) {
  const usuarios = lerUsuarios()

  if (usuarios.some(usuario => usuario.email === dados.email)) {
    return { erro: 'Este e-mail já está cadastrado.' }
  }

  const novoUsuario = { ...dados, id: Date.now() }
  localStorage.setItem(CHAVE_USUARIOS, JSON.stringify([...usuarios, novoUsuario]))
  return { usuario: autenticar(novoUsuario.email, novoUsuario.senha) }
}

export function obterSessao() {
  const dados = localStorage.getItem(CHAVE_SESSAO)
  return dados ? JSON.parse(dados) : null
}

export function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO)
}
