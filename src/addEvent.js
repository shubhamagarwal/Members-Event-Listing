/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Popup from "reactjs-popup";
import Select from 'react-select';
import './AddEvent.css';
const AddNewEvent = (props) => {
  const {
    events,
    memberId,
    memberName,
    getSelectedEvents,
    closePopUp,
    eventLabel
  } = props
  const eventsList = [];
  events.map(event => {
    return eventsList.push({
      label: `${event.company} (${event.scheduled_at})`,
      value: event._id
    })
  })
  const label = eventLabel !== '' ? `${eventLabel} event added successfully` : '';
  return (
    <Popup open>
        <div className="modal">
          <a href={null} className="close" onClick={(e) => closePopUp(e, memberId)}>
            &times;
            </a>
          <div className="header"> Add Event </div>
          <div className="content">
            Welcome <span className="member">{memberName}</span>, Please book your event from the below list.
              <div className="select-container">Select an event to add:
                <Select
                  className="selectbox"
                  value="event"
                  options={eventsList}
                  onChange={(e) => getSelectedEvents(e, memberId)}
              /></div>
          </div>
          <div className="content member">{label}</div>
        </div>
    </Popup>
  )
}

export default AddNewEvent;