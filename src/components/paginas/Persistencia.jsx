import axios from "axios"
import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"

const Persistencia = () => {

    const url = 'http://localhost:3000/contacts'

    const [contacts, setContacts] = useState([]) //Lista de contactos
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [operacion, setOperacion] = useState('') //1: Nuevo, 2: Editar
    const [title, setTitle] = useState('') //Titulo del formulario


    // --------- renderizar la lista de contactos ------------//
    useEffect(() => {
        getContactos();
    }, [])

    // --------- obtener la lista de contactos ------------//
    const getContactos = async () => {
        try {
            const respose = await axios.get(url) // get: obtener datos
            setContacts(respose.data)
            console.log(respose.data)

        } catch (error) {
            console.log(error)
        }
    }

    //-----------------funcion para elegir la operacion a realizar----------------//
    const openModal = (op, contact) => {
        //setetera los valores de lo campos del formulario
        setId('')
        setName('')
        setPhone('')
        setEmail('')

        setOperacion(op) //1: Nuevo, 2: Editar

        if (op === 1) {
            setTitle('Nuevo Contacto')
        } else if (op === 2) {
            setTitle('Editar Contacto')
            setId(contact.id) // id del contacto a editar (1,2,3,4,5)
            setName(contact.name)
            setPhone(contact.phone)
            setEmail(contact.email)
        }
        document.getElementById('name').focus()
    }


    //-----------------funcion para editar un contacto----------------//



    const updateContact = async () => {
        try {
            const response = await axios.put(url + '/' + id, {
                name: name,
                phone: phone,
                email: email
            })
            console.log(response)
            await getContactos()
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Contacto actualizado',
                showConfirmButton: false,
                timer: 1500
            })

            document.getElementById('btnCerrar').click()
        } catch (error) {
            console.log(error)
        }
    }



    //---------------- funcion para validar los campos del formulario ----------------//


    const validar = () => {
        if (name === '') {
            
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Ingrese nombre',
                showConfirmButton: false,
                timer: 1500
            })


        } else if (phone === '') {

            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Ingrese telefono',
                showConfirmButton: false,
                timer: 1500
            })
        } else if (email === '') {
                
                Swal.fire({
                    position: 'top-center',
                    icon: 'error',
                    title: 'Ingrese email',
                    showConfirmButton: false,
                    timer: 1500
                })
        } else {
            if (operacion === 1) {
                addContact()
            } else if (operacion === 2) {
                updateContact()
            }
        }
    }




    //-----------------funcion para agregar un contacto----------------//

    const addContact = async () => {
        Swal.fire({
            title: '¿Está seguro de agregar este Registro?',
            text: name,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, agregar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(url, {
                        name: name,
                        phone: phone,
                        email: email
                    })
                    console.log(response)
                    await getContactos()

                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'El registro se agregó correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    document.getElementById('btnCerrar').click()
                } catch (error) {
                    console.log(error)
                }
            }


        })

    }


    //-----------------funcion para eliminar un contacto----------------//

    const deleteContact = async (contact) => {
        Swal.fire({
            title: '¿Está seguro de eliminar este Registro?',
            text: contact.name,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(url + '/' + contact.id) // http://localhost:3000/contacts/1
                    console.log(response)
                    await getContactos()
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `Se elimino el contacto: ${contact.name} con id: ${contact.id}`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        })
    }



    return (
        <div className="container">
            <h1 className="display-3 py-3 text-center">Persistencia de Datos</h1>
            <p className=" display-6 text-center pb-3"> Persitencia de datos con Backend Node.js Express + MySql + React Vite</p>

            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-md-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark btn-block' data-bs-toggle='modal' data-bs-target='#modalClientes'>
                                <i className='fa-solid fa-circle-plus'></i> Agregar Contacto
                            </button>
                        </div>
                    </div>
                </div>
                {/*  Tabla de Clientes */}
                <div className='col-md-8 offset-md-2 py-5'>
                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                contacts.map((contact) => (
                                    <tr key={contact.id}>
                                        <td>{contact.id}</td>
                                        <td>{contact.name}</td>
                                        <td>{contact.phone}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            <button onClick={() => openModal(2, contact)} className='btn btn-sm btn-outline-warning mx-1' data-bs-toggle='modal' data-bs-target='#modalClientes' >
                                                <i className='fa-solid fa-pencil'></i>
                                            </button>
                                            <button onClick={() => deleteContact(contact)} className='btn btn-sm btn-outline-danger'>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de contacto*/}

            <div id='modalClientes' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        {/* Cuerpo del Modal */}
                        <div className='modal-body'>
                            <input type='hidden' id='id' value={id}></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className="fa-solid fa-user"></i></span>
                                <input
                                    type='text'
                                    id='name'
                                    className='form-control'
                                    placeholder='Ingrese nombre'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className="fa-solid fa-phone"></i></span>
                                <input
                                    type='phone'
                                    id='phone'
                                    className='form-control'
                                    placeholder='Phone'
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className="fa-solid fa-envelope"></i></span>
                                <input
                                    type='email'
                                    id='email'
                                    className='form-control'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* Boton Guardar */}
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validar()} className='btn btn-success btn-block'>
                                    <i className='fa-solid fa-save'></i> Guardar
                                </button>
                            </div>
                        </div>
                        {/* Pie del Modal */}
                        <div className='modal-footer'>
                            <button id='btnCerrar' type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                                <i className='fa-solid fa-window-close'></i> Cerrar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Persistencia
