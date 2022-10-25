import './RickAndMorty.css';
import {useState, useEffect} from 'react';

function RickAndMorty() {

    const [personajes, setPersonajes] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [personaje, setPersonaje] = useState({});
    const [busqueda, setBusqueda] = useState('');   
    const [personajeId, setPersonajeId] = useState(1);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
        .then(response => response.json())
        .then(data => {
            setPersonajes(data.results);
        })
    }, []);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${personajeId}`)
        .then(response => response.json())
        .then(data => {
            setPersonaje(data);
        })
    }, [personajeId]);

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`)
        .then(response => response.json())
        .then(data => {
            setPersonajes(data.results);
        })
    }, [busqueda]);

    const siguientePagina = () => {
        setPagina(pagina + 1);
        fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        .then(response => response.json())
        .then(data => {
            setPersonajes(data.results);
        })
    }

    const anteriorPagina = () => {
        setPagina(pagina - 1);
        fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        .then(response => response.json())
        .then(data => {
            setPersonajes(data.results);
        })
    }

    const buscarPersonaje = () => {
        fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`)
        .then(response => response.json())
        .then(data => {
            setPersonajes(data.results);
        })
    }

    const handleChange = (e) => {
        setBusqueda(e.target.value);
    }

    const handleClick = (e) => {
        setPersonajeId(e.target.value);
    }

    const handlePersonajeId = (e) => {
        setPersonajeId(e.target.value);
    }

  return (
    <div className='pages-div'>

        <header>
            <h1 className='title-h1'>Rick And Morty</h1>
            <img id='RickAndMorty-img' src="/src/assets/Rick-And-Morty-PNG-Images-HD.png" alt="Rick And Morty" />
            <p>
                <input onChange={handleChange} type="search" name="buscar" id="buscar" placeholder='Buscar'/>
            </p>
        </header>

        <section className='pages-section'>

            <div className='api-result-div'>
                {personajes.map((personaje, index) => {
                    return (
                        <div className='card' key={index}>
                            <img src={personaje.image} alt={personaje.name} />
                            <p>
                                {personaje.name}
                                <br />
                                {personaje.status}
                                <br />
                                {personaje.species}
                            </p>
                        </div>
                    )
                })}
            </div>

            <div className='buttons-div'>
                <button id='prev-btn' onClick={anteriorPagina}>
                    PREV
                </button>
                <button id='next-btn' onClick={siguientePagina}>
                    NEXT
                </button>
            </div>

        </section>
    </div>
  )
}

export default RickAndMorty