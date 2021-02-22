import React, { useState } from 'react'

import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Modal from 'react-modal'
//Style modal se pasa como atributo al componente
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
//root element
Modal.setAppElement('#root');
//momentoactual
const now = moment().minutes(0).seconds(0).add(1, 'hours') //3:00:00 hora inicio
const nowPlus1 = now.clone().add(1, 'hours')


export const CalendarModal = () => {
    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
    const [formValues, setFormValues] = useState({
         title: 'Evento',
         notes: '',
         start: now.toDate(),
         end: nowPlus1.toDate()
    })

    const {notes, title } = formValues

    const handleInputChange = ({target}) =>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () =>{
        //al hacer click afuera del modal se cierra
        //cambia is Open a false
        //ssetIsOpen(false)
    }
    //recive evento fecha
    const handleStartDateChange = (e) =>{
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    } 

    const handleEndDateChange = (e) =>{
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end:  e
        })
    }
    
    const handleSubmitForm = (e) =>{
        //evitar propagacion del formulario
        e.preventDefault();
        console.log(formValues)
    }

    return (
        <Modal
          isOpen={true}
          //onRequestClose={closeModal}
          style={ customStyles }
          contentLabel="Example modal"
          className="modal"
          overlayClassName="modal-fondo"
          closeTimeoutMS={200}
        >
            <h2>Editar evento</h2>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas </label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar </span>
                </button>

            </form>

        </Modal>
    )
}
