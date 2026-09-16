import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu.jsx'
import Home from './paginas/Home.jsx'
import Login from './paginas/Login.jsx'
import Cadastro from './paginas/Cadastro.jsx'
import PostoList from './paginas/PostoList.jsx'
import PostoForm from './paginas/PostoForm.jsx'
import PostoDetalhe from './paginas/PostoDetalhe.jsx'
import RemedioList from './paginas/RemedioList.jsx'
import RemedioForm from './paginas/RemedioForm.jsx'
import BuscaRemedios from './paginas/BuscaRemedios.jsx'
import Fila from './paginas/Fila.jsx'
import Relatorios from './paginas/Relatorios.jsx'
import RotaProtegida from './components/RotaProtegida.jsx'

function App() {
  return (
    <BrowserRouter>
      <Menu />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/postos" element={<RotaProtegida><PostoList /></RotaProtegida>} />
          <Route path="/postos/novo" element={<RotaProtegida somenteAdmin><PostoForm /></RotaProtegida>} />
          <Route path="/postos/editar/:id" element={<RotaProtegida somenteAdmin><PostoForm /></RotaProtegida>} />
          <Route path="/postos/:id" element={<RotaProtegida><PostoDetalhe /></RotaProtegida>} />
          <Route path="/postos/:postoId/remedios" element={<RotaProtegida><RemedioList /></RotaProtegida>} />
          <Route path="/postos/:postoId/remedios/novo" element={<RotaProtegida somenteAdmin><RemedioForm /></RotaProtegida>} />
          <Route path="/postos/:postoId/remedios/editar/:id" element={<RotaProtegida somenteAdmin><RemedioForm /></RotaProtegida>} />
          <Route path="/gerenciar-postos" element={<RotaProtegida somenteAdmin><PostoList /></RotaProtegida>} />
          <Route path="/novo-posto" element={<RotaProtegida somenteAdmin><PostoForm /></RotaProtegida>} />
          <Route path="/posto" element={<Navigate to="/postos/1" />} />
          <Route path="/gerenciar-remedios" element={<RotaProtegida somenteAdmin><Navigate to="/postos/1/remedios" /></RotaProtegida>} />
          <Route path="/novo-remedio" element={<RotaProtegida somenteAdmin><Navigate to="/postos/1/remedios/novo" /></RotaProtegida>} />
          <Route path="/buscar-remedios" element={<RotaProtegida><BuscaRemedios /></RotaProtegida>} />
          <Route path="/fila" element={<RotaProtegida><Fila /></RotaProtegida>} />
          <Route path="/relatorios" element={<RotaProtegida somenteAdmin><Relatorios /></RotaProtegida>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
