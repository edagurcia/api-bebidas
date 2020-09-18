import React, { useContext, useState } from 'react';

import { CategoriaContext } from '../context/CategoriaContext'
import { RecetasContext } from '../context/RecetasContext'

const Formulario = () => {

    // state local del formulario
    const [busqueda, guardarBusqueda] = useState({
        nombre: '',
        categoria: ''
    })

    const [error, guardarError] = useState(false)

    const { nombre, categoria} = busqueda

    // context
    const { categorias } = useContext(CategoriaContext)

    const { buscarRecetas, guardarConsultar } = useContext(RecetasContext)

    const handleChange = e => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        if(categoria.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)
        buscarRecetas(busqueda)
        guardarConsultar(true)
    }
    return ( 
        <form
            onSubmit={handleSubmit}
            className="col-12"
        >
            {error ? <p className="alert alert-danger text-center">La categoría es obligatoria...</p> : null}
            <fieldset className="text-center">
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>

            <div className="row mt-4">
                <div className="col-md-4">
                    <input 
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Buscar por ingrediente (opcional)..."
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-control"
                        name="categoria"
                        value={categoria}
                        onChange={handleChange}
                    >
                        <option value="">-- Selecciona --</option>
                        {categorias.map(categoria => (
                            <option key={categoria.strCategory} value={categoria.strCategory}>{categoria.strCategory}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <button
                        type="submit"
                        className="btn btn-lg btn-block btn-primary"
                    >Buscar Bebidas</button>
                </div>
            </div>
        </form>
     );
}
 
export default Formulario;