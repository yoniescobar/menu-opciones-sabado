import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component'
//import '../../assets/css/styles.css'


const Formulario = () => {

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [edad, setEdad] = useState('')
  const [correo, setCorreo] = useState('')
  const [lista, setLista] = useState([])
  const [modoEdicion, setModoEdicion] = useState()
  const [fitrarPersona, setFiltrarPersona] = useState([])
  const [busqueda, setBusqueda] = useState('')

  /* ------------------------- Generar Codigo Automatico ------------------------- */
  const generarCodigo = () => {
    return Math.floor(Math.random() * 100000000)
  }

  /* ------------------------- Llenar Campos ----------------------------------------*/
  const llenarCampos = (dato) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `El campo ${dato} es obligatorio`
    })
  }

  /* ------------------------- Agregar Usuario ----------------------------------------*/
  const agregarUsuario = (e) => {
    e.preventDefault() //Evitar que se recargue la pagina
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (apellido.trim() === '') {
      llenarCampos('Apellido')
      return
    }
    if (edad.trim() === '') {
      llenarCampos('Edad')
      return
    }
    if (correo.trim() === '') {
      llenarCampos('Correo')
      return
    }

    //Crear el objeto de nuevoCliente
    const nuevoCliente = { codigo: generarCodigo(), nombre: nombre, apellido: apellido, edad: edad, correo: correo }
    console.log(" objeto de nuevo cliente: ---- ", nuevoCliente)
    //Agregar el objeto al array de lista
    setLista([...lista, nuevoCliente]) // ...lista es para que no se borre lo que ya esta en la lista

    //Limpiar los campos
    setCodigo('')
    setNombre('')
    setApellido('')
    setEdad('')
    setCorreo('')

    //Mensaje de confirmacion de registro
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cliente Registrado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  /* ------------------------- Eliminar Usuario ----------------------------------------*/

  const eliminar = (row) => {

    Swal.fire({
      title: `Estas seguro de eliminar a ${row.nombre} con codigo: ${row.codigo}?`,
      text: "No podras revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const nuevaLista = lista.filter(item => item.codigo !== row.codigo) //Filtrar la lista y que sea diferente al codigo que se esta pasando
        setLista(nuevaLista)
        Swal.fire(
          'Eliminado!',
          'Tu registro ha sido eliminado.',
          'success'
        )
      }
    })
  }

  /* ------------------------- Editar Usuario ----------------------------------------*/

  const editar = (row) => {
    // setear los valores de los campos en el formulario (cargar el registro de datos seleccionado)
    setCodigo(row.codigo)
    setNombre(row.nombre)
    setApellido(row.apellido)
    setEdad(row.edad)
    setCorreo(row.correo)
    setModoEdicion(true)

  }

  const guardarCambios = (e) => {
    e.preventDefault() //Evitar que se recargue la pagina
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (apellido.trim() === '') {
      llenarCampos('Apellido')
      return
    }
    if (edad.trim() === '') {
      llenarCampos('Edad')
      return
    }
    if (correo.trim() === '') {
      llenarCampos('Correo')
      return
    }

    //Crear el objeto de nuevoCliente con los datos editados
    const editado = lista.map(item => item.codigo === codigo ? { codigo, nombre, apellido, edad, correo } : item)
    setLista(editado)
    setModoEdicion(false)

    //Limpiar los campos
    setCodigo('')
    setNombre('')
    setApellido('')
    setEdad('')
    setCorreo('')

    //Mensaje de confirmacion de registro
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cliente Actualizado',
      showConfirmButton: false,
      timer: 1500
    })
  }

    /*------------ Buscar Usuario ------------*/

    useEffect(() => {
      
      const filtrar = () => {
        const resultado = lista.filter((item) => {
          return(
            item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.edad.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.correo.toLowerCase().includes(busqueda.toLowerCase())
          );
        });
        setFiltrarPersona(resultado);

      }
      filtrar();
    }, [busqueda, lista]) //10 registro  registro 1



  return (
    <div className='fondo-componente-forms'>
      <div className='container py-5'>
        <h1 className='text-center'>Formulario de Clientes</h1>
        {/* Aqui Inicia el Formulario */}

        <form className='form-group'>
          <input
            type='text'
            placeholder='Ingrese su Nombre'
            className='form-control mb-3'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type='text'
            placeholder='Ingrese su Apellido'
            className='form-control mb-3'
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <input
            type='number'
            placeholder='Ingrese su Edad'
            className='form-control mb-3'
            value={edad}
            max={200}
            min={0}
            onChange={(e) => setEdad(e.target.value)}
          />
          <input
            type='email'
            placeholder='Ingrese su Correo'
            className='form-control mb-3'
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
          {
            modoEdicion ?
              <button onClick={(e) => guardarCambios(e)} className='btn btn-warning btn-block' type='submit'><span><i className="fa-solid fa-user-pen"></i></span> Guardar Cambios</button>
              :
              <button onClick={(e) => agregarUsuario(e)} className='btn btn-dark btn-block' type='submit'><span><i className="fa-solid fa-circle-plus"></i></span> Registrar</button>
          }
        </form>

        {/* Crear nuestro DataTable*/}

        <div className='container py-5'>
          <h1>Listado de Clientes</h1>

          <DataTable
            columns={[
              {
                name: 'Codigo',
                selector: row => row.codigo,
                sortable: true,

              },
              {
                name: 'Nombre',
                selector: row => row.nombre,

              },
              {
                name: 'Apellido',
                selector: row => row.apellido,

              },
              {
                name: 'Edad',
                selector: row => row.edad,

              },
              {
                name: 'Correo',
                selector: row => row.correo,

              },
              {
                name: 'Acciones',
                cell: (row) => (
                  <>
                    <button onClick={() => { editar(row) }} className='btn btn-warning btn-sm '><span><i className="fa-solid fa-user-pen"></i></span></button>{''}
                    <button onClick={() => { eliminar(row) }} className='btn btn-danger btn-sm mx-2'><span><i className="fa-solid fa-trash"></i></span></button>{''}
                  </>
                ),
              }
            ]}


            data={fitrarPersona}
            noDataComponent={<h3>No hay datos para mostrar</h3>}
            pagination
            paginationComponentOptions={{
              rowsPerPageText: 'Filas por pagina',
              rangeSeparatorText: 'de',
              noRowsPerPage:false,
              selectAllRowsItem: false,
              selectAllRowsItemText: 'Todos'
            }}
            highlightOnHover
            pointerOnHover
            subHeader
            subHeaderComponent={(
              <input
                type='text'
                placeholder='Buscar'
                className=' w-25 form-control'
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            )}

          />
        </div>
      </div>
    </div>
  )
}

export default Formulario
