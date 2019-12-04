import React from 'react';
import { PropTypes } from 'prop-types';

export function Modal (props) {

  return (
    <div className={`modal ${props.isAberto && 'modal--active'}`} onClick={props.fechaModal}>
      <div className="modal__wrap">
        {props.children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isAberto: PropTypes.bool,
  fechaModal: PropTypes.func.isRequired
}
