import React from 'react';

// componentes
import Header from './components/Header'
import Formulario from './components/Formulario'
import ListaRecetas from './components/ListaRecetas'

// importar el provider del context
import CategoriaProvider from './context/CategoriaContext'
import RecetasProvider from './context/RecetasContext'
import ModalProvider from './context/ModalContext'
function App() {


  return (
    <>
      <CategoriaProvider>
        <RecetasProvider>
          <ModalProvider>
            <Header titulo='Busca Recetas de Bebidas' />
            <div className="container mt-5">
              <div className="row">
                  <Formulario />
              </div>
              <ListaRecetas />
            </div>
          </ModalProvider>
        </RecetasProvider>
      </CategoriaProvider>
    </>
  );
}

export default App;
