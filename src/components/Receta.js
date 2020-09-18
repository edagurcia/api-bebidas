import React, { useContext, useState } from 'react';

import { ModalContext } from '../context/ModalContext'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    // configuracion del modal
    const [ modalStyle ] = useState(getModalStyle)
    const [open, setOpen] = useState(false)
    const classes = useStyles()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const { idDrink, strDrink, strDrinkThumb } = receta

    const { info, guardarIdReceta, guardarReceta } = useContext(ModalContext)

    // obtener ingredientes formateados
    const mostrarIngredientes = (info) => {
        let ingredientes = []
        for(let i = 1; i < 16; i++){
            if( info[`strIngredient${i}`]){
                ingredientes.push(
                    <li>{info[`strIngredient${i}`] }  { info[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h5 className="card-header text-center">{strDrink}</h5>
                <img src={strDrinkThumb} alt={strDrink} className="card-img-top"/>
                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-lg btn-block btn-primary"
                        onClick={ () => {
                            guardarIdReceta(idDrink)
                            handleOpen()
                        }}
                    >Ver Receta</button>

                    <Modal
                        open={open}
                        onClose={ () => {
                            guardarIdReceta(null)
                            guardarReceta({})
                            handleClose()
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{info.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {info.strInstructions}
                            </p>
                            <img src={info.strDrinkThumb} alt={info.strDrink} className="img-fluid my-4" />
                            <h3 className="mt-4">Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(info)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;