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
    closePopUp
  } = props
  const eventsList = [];
  events.map(event => {
    return eventsList.push({
      label: `${event.company} (${event.scheduled_at})`,
      value: event._id
    })
  })

  return (
    <Popup open>
      {close => (
        <div className="modal">
          <a className="close" onClick={(e) => closePopUp(e, memberId)}>
            &times;
            </a>
          <div className="header"> Add Event </div>
          <div className="content">
            Welcome <span className="member">{memberName}</span>, Please book your event from the below list.
              <div className="select-container">Select an event to add:
                <Select
                  className="selectbox"
                  value="hkjkl"
                  options={eventsList}
                  onChange={(e) => getSelectedEvents(e, memberId)}
              /></div>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default AddNewEvent;