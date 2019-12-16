import React from 'react';
import { PropTypes } from 'prop-types';
import Widget from './../Widget';
import './modal.css';

export default function Modal (props) {

  const handleBlackAreaClick = (infosDoEvento) => {
    //verifica se clicou na modal mesmo
    const isModalTag = infosDoEvento.target.classList.contains('modal')
    //caso positivo
    if (isModalTag) props.fechaModal()
  }

  return (
    <div onClick={handleBlackAreaClick} 
        className={`modal ${props.isAberto ? 'modal--active' : ''}`}>
        <Widget>
          {props.children}
        </Widget>
    </div>
  )
}

Modal.propTypes = {
  isAberto: PropTypes.bool,
  fechaModal: PropTypes.func.isRequired
}
