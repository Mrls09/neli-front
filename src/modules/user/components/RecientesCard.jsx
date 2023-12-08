import React, { useState, useContext } from 'react';
import '../../../utils/styles/RecientesCard.css';
import { BsDownload } from 'react-icons/bs';
import { MdEditDocument } from 'react-icons/md';
import { Link } from "react-router-dom";
import { AuthContext } from '../../auth/authContext';

const RecientesCard = ({ objeto, estilo }) => {
    const { dispatch } = useContext(AuthContext);
    const [showButton, setShowButton] = useState(false);
    console.log(objeto);
    const handleHoverEnter = () => {
        setShowButton(!showButton);
    };

    const handleHoverLeave = () => {
        setShowButton(!showButton);
    };

    const handleInnerDivHover = (event) => {
        event.stopPropagation();
    };

    const setLocalProyecto = () => {
        const newData = {};

        for (const key in objeto) {
            if (typeof objeto[key] === "number" && key !== 'teeM' && key !== '') {
                newData[key] = objeto[key].toFixed(2);
            } else {
                newData[key] = objeto[key];
            }
        }

        const action = { type: "SET_FORMIK", payload: { proyecto: newData, areaPeso: {}, cumplen: { cumpleArea: true, cumpleTee: true, cumpleRefuerzo: true } } };
        dispatch(action);
    }



    return (
        showButton ? (
            <div onMouseLeave={handleHoverLeave} className='RecientesCard RecientesButton' style={estilo}>
                <Link to={'/nuevo/modificar'} onMouseEnter={handleInnerDivHover} className="RecientesEdit">
                    <MdEditDocument onClick={() => setLocalProyecto()} style={{ width: "100%", height: "100%", marginTop: "1rem", marginBottom: "1rem" }} />
                </Link>
                <Link to={'/pdf-view'} onMouseEnter={handleInnerDivHover} className="RecientesDownload" >
                    <BsDownload style={{ width: "100%", height: "100%", marginTop: "1rem", marginBottom: "1rem" }} />
                </Link>
            </div>
        ) : (
            <div onMouseLeave={handleHoverLeave} onMouseEnter={handleHoverEnter} className='RecientesCard' style={estilo}>
                <div className="RecientesTitulo">{objeto.name}</div>
                <div className="RecientesFecha">Creación: {objeto.fechaCreacion}</div>
                <div className="RecientesFecha">Ultima Modificación: {objeto.ultimaMod}</div>
            </div>
        )
    );
}

export default RecientesCard;
