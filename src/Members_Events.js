import React, { useState, useEffect } from 'react';
import Popup from "reactjs-popup";
import AddNewEvent from './addEvent';
import axios from 'axios';
import './App.css';

function Events() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPopUp, addEvent] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [addedEventList, setAddedEventList] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://next.json-generator.com/api/json/get/NyNrlJTX8',
      );
      setMembers(result.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://next.json-generator.com/api/json/get/Vk7OTypQ8',
      );
      setEvents(result.data);
    };
    fetchData();
  }, []);

  const sortByMembersAge = (e, flag) => {
    const membersList = [...members];
    let sortedMembersByAge
    if (flag === 1) {
      sortedMembersByAge = membersList.sort((a, b) => (a.age < b.age) ? 1 : -1);
    } else {
      sortedMembersByAge = membersList.sort((a, b) => (a.age > b.age) ? 1 : -1);
    }
    setMembers(sortedMembersByAge);
  }

  const sortByMembersName = (e, flag) => {
    const membersList = [...members];
    let sortedMembersByName
    if (flag === 1) {
      sortedMembersByName = membersList.sort((a, b) => (a.name.first < b.name.first) ? 1 : -1);
    } else {
      sortedMembersByName = membersList.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1);
    }
    setMembers(sortedMembersByName);
  }

  const deleteMemberById = (e, mId) => {
    const membersList = [...members];
    const newMembersList = membersList.filter((item) => item._id !== mId);
    setMembers(newMembersList);
  }

  const addEventByMember = (e, mId, fName, lName) => {
    const triggerPopup = !showPopUp;
    const memberName = `${fName} ${lName}`
    setMemberId(mId);
    setMemberName(memberName);
    addEvent(triggerPopup);
  }

  const closePopUp = () => {
    addEvent(false)
  }

  const getSelectedEvents = (placeholderButtonLabel, value, memberId) => {
    console.log('shubham')
    if(value !== undefined) {
      console.log(placeholderButtonLabel, value, memberId)
      const eventList = {...addedEventList};
      var obj = {
        ...eventList,
        [memberId]: value
      }
      console.log(obj);
      //addEvent(false)
      setAddedEventList(obj);
    }
  }

  const renderMembersTable = () => {
    return members.map(item => {
        return (
           <tr key={item._id}>
              <td>{`${item.name.first} ${item.name.last}`}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.company}</td>
              <td>
                <div onClick={e => deleteMemberById(e,item._id)}>
                  <span className="iconify" data-icon="mdi:delete" title="Delete"></span>
                </div>
                <div onClick={e => addEventByMember(e, item._id, item.name.first, item.name.last)}>
                <span className="iconify" data-icon="mdi:bookmark-plus" title="Add Event"></span>
                </div>
              </td>
           </tr>
        )
     })
  }

  const renderEventsTable = () => {
    return events.map(item => {
        return (
           <tr key={item._id}>
              <td>{`${item.organizer.first} ${item.organizer.last}`}</td>
              <td>{item.company}</td>
              <td>{item.about.substring(0,50)}</td>
              <td>{item.scheduled_at}</td>
              <td>{item.duration}</td>
              <td>{item.capacity}</td>
           </tr>
        )
     })
  }

  return (
    <div className="App">
      {/* <h1>Members List</h1> */}
      { showPopUp ? <AddNewEvent
          events={events} 
          memberId={memberId} 
          memberName={memberName} 
          getSelectedEvents={getSelectedEvents}
          closePopUp={closePopUp}
        /> : '' }
      <table id='members'>
        <tbody>
            <tr key="1">
            <th>Name
                <div onClick={e => sortByMembersName(e,1)}><span className="iconify" data-icon="mdi:sort-alphabetical-ascending"></span></div>
                <div onClick={e => sortByMembersName(e,2)}><span className="iconify" data-icon="mdi:sort-alphabetical-descending" data-inline="false"></span></div>
            </th>
            <th>Age
                <div onClick={e => sortByMembersAge(e,1)}><span className="iconify" data-icon="mdi-sort-ascending"></span></div>
                <div onClick={e => sortByMembersAge(e,2)}><span className="iconify" data-icon="mdi-sort-descending"></span></div>
            </th>
            <th>Phone</th>
            <th>Email</th>
            <th>Company</th>
            <th>Actions</th>
            </tr>
            {renderMembersTable()}
          </tbody>
      </table>

      {/* <h1>Events List</h1> */}
      <table id='events'>
        <tbody>
            <tr key="1">
            <th>Organizer</th>
            <th>Company</th>
            <th>About</th>
            <th>Scheduled</th>
            <th>Duration</th>
            <th>Capacity</th>
            </tr>
            {renderEventsTable()}
        </tbody>
      </table>
    </div>
  );
}

export default Events;
