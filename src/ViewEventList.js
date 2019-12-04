/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Popup from "reactjs-popup";
import './ViewEventList.css'
const ViewEventList = (props) => {
  const {
    addedEventList,
    memberId,
    memberName,
    closePopUp
} = props
  let eventList = addedEventList[memberId];
  if(eventList === undefined) {
    eventList = []
  }
    return (
        <Popup open>
        {close => (
          <div className="modal">
            <a className="close" onClick={closePopUp}>
              &times;
            </a>
            <div className="header"> Added Event List </div>
            <div className="content">
              Hello <span className="member">{memberName}</span>, below is your added event list.
            </div>
            <div className="actions">
              {
                eventList.length ? 
              <ul>
                {
                  eventList.map((event,i) => {
                    return <li className="listing" key={i}>{event}</li>
                  })
                }
              </ul> : <div className="empty">Oops, no event to show. Please add new event.</div>
              }
            </div>
          </div>
        )}
      </Popup>
    )
}

export default ViewEventList