import { Link,NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav id='myCarrusel' className="navbar bg-dark navbar-expand-md bg-body-tertiary " data-bs-theme="dark">
      <div className="container-fluid">
        <Link to='/'>
          <img src='./logo-intecap.png' alt='logo' width='100px' height='50px' />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto fs-2">
            <li className="nav-item active">
            <NavLink className="nav-link navbar-dark" activeClassName="active" aria-current="page" exact to='/'>Inicio</NavLink>
            </li>
            <li className="nav-item active">
            <NavLink className="nav-link navbar-dark" activeClassName="active" to='/api-rick-morty'>ApiMorty</NavLink>
            </li>
            <li className="nav-item active">
            <NavLink className="nav-link navbar-dark" activeClassName="active" to='/formulario'>Formulario</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar
