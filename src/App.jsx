import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/navegacion/NavBar'
import Inicio from './components/paginas/Inicio'
import ApiRickMorty from './components/paginas/ApiRickMorty'
import Formulario from './components/paginas/Formulario'


const App = () => {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/api-rick-morty" element={<ApiRickMorty />} />
          <Route path="/formulario" element={<Formulario />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
