import { Navigate, useLocation } from 'react-router-dom'
import { obterSessao } from '../services/authService.js'

function RotaProtegida({ children, somenteAdmin = false }) {
  const location = useLocation()
  const sessao = obterSessao()

  if (!sessao) {
    return <Navigate to="/login" state={{ de: location.pathname }} replace />
  }

  if (somenteAdmin && sessao.tipoConta !== 'admin') {
    return <Navigate to="/postos" replace />
  }

  return children
}

export default RotaProtegida
