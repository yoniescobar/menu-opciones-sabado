import{ useState, useEffect } from 'react'

const ApiRickMorty = () => {

    const [personajes, setPersonajes] = useState([])

    useEffect(() => {
        console.log('useEffect')
        getPersonaje()
    }, [])

    const getPersonaje = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character')
            const users = await response.json()
            setPersonajes(users.results)
            console.log(users.results)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className='container py-5'>
            <h1 className='text-center py-5'>ApiRickMorty</h1>
            <div className='row'>
              {
                    personajes.map(item => (
                        <div className='col-md-3' key={item.id}>
                            <div className="card mt-5">
                                <img 
                                    className='shadow bg-body rounded rounded-circle'
                                     src={item.image} 
                                     alt={item.name} 
                                />
                                <div className="card-body pie-cards">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.species}</p>
                                    <br />
                                    <p className="card-text">{item.status}</p>
                                </div>
                            </div>
                        </div>
                    ))
              }

            </div>
        </div>
    )
}

export default ApiRickMorty