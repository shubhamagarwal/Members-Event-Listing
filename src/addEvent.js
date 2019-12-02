import React from 'react'
import Popup from "reactjs-popup";
import Select from 'react-select';
import './addEvent.css';
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

    console.log(eventsList, memberId);
    return(
        <Popup open>
        {close => (
          <div className="modal">
            <a className="close" onClick={closePopUp}>
              &times;
            </a>
            <div className="header"> Add Event </div>
            <div className="content">
              {`Welcome, ${memberName}. Please book your event from the below list.`}
              <div>Select an event: 
                <Select
                    value="one"
                    options={eventsList}
                    onChange={(e) => getSelectedEvents(e)}
                /></div>
            </div>
            <div className="actions">
              <button
                className="button"
                onClick={() => {
                  console.log("modal closed ");
                  close();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Popup>
    )
}

export default AddNewEvent;