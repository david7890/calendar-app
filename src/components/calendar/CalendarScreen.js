import React, {useState} from 'react'
import { Navbar } from '../ui/Navbar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
//import estilos
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

moment.locale('es')
// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer
//arreglo de objetos events
const events = [{
    title: 'Cumpleaños del jefe',
    start: new Date('2021-02-20 10:00:00'),
    end: new Date('2021-02-20 12:00:00'),
    bgcolor: '#fafafa',
    notes: 'Comprar pastel',
    user:{
        id: '123',
        name: 'David'
    }
}]

export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    //evento doble click
    const onDoubleClick = (e) =>{
        
    }

    const onSelectEvent = (e) =>{

    }
    //cambia la vista del calendario
    //para saber si esta en mes dia semana
    const onViewChange = (e) =>{
        setLastView(e)
        //si la vista esta en semana al recargar se queda en semana
        localStorage.setItem('lastView', e)
    }

    const eventStyleGetter = (event, start, end, isSeleced ) =>{

        const style = {
            backgroundColor: '#367CF7',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return{
            style
        }
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent = {onSelectEvent}
                onView={onViewChange}
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />

            <CalendarModal />
        </div>
    )
}
