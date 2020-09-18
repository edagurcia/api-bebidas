import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const CategoriaContext = createContext()

const CategoriaProvider = (props) => {

    const [categorias, guardarCategorias] = useState([])

    useEffect(() => {
        const obtenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            const categorias = await axios.get(url)
            guardarCategorias(categorias.data.drinks)
        }
        obtenerCategorias()
    }, [])
    return ( 
        <CategoriaContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriaContext.Provider>
     );
}
 
export default CategoriaProvider;