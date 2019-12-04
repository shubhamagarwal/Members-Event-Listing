import React, { useState, useEffect } from 'react';
import AddNewEvent from './AddEvent';
import RenderMembersTable from './MemberList';
import RenderEventsList from './EventList';
import ViewEventList from './ViewEventList';
import axios from 'axios';
import './MemberEventList.css';

function Events() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [showPopUp, addEvent] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [memberName, setMemberName] = useState('');
  const [addedEventList, setAddedEventList] = useState({});
  const [viewEvent, showEventPopUp] = useState(false);
  const [eventLabel, setSelectedEvent] = useState('');

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
    showEventPopUp(false)
  }

  const getSelectedEvents = (event, memberId) => {
    const eventList = { ...addedEventList };
    let events = eventList[memberId]
    if(events === undefined) {
      events= []
    }
    var eventObj = {
      ...eventList,
      [memberId]: [...events, event.label]
    }
    setSelectedEvent(event.label);
    setAddedEventList(eventObj);
  }

  const viewAddedEvent = (e, mId, fName, lName) => {
    const memberName = `${fName} ${lName}`;
    setMemberName(memberName);
    setMemberId(mId);
    showEventPopUp(!viewEvent);
  }

  return (
    <div className="app">
      {showPopUp ? <AddNewEvent
        events={events}
        memberId={memberId}
        memberName={memberName}
        getSelectedEvents={getSelectedEvents}
        closePopUp={closePopUp}
        eventLabel={eventLabel}
      /> : ''}
      {viewEvent ? <ViewEventList
        addedEventList={addedEventList}
        memberId={memberId}
        memberName={memberName}
        closePopUp={closePopUp}
      /> : ''}
      <div className='container'>                          
          <RenderMembersTable
            members={members}
            deleteMemberById={deleteMemberById}
            addEventByMember={addEventByMember}
            viewAddedEvent={viewAddedEvent}
            sortByMembersAge={sortByMembersAge}
            sortByMembersName={sortByMembersName}
          />
      </div>
      <div className='container'>
          <RenderEventsList
            events={events}
          />
      </div>
    </div>
  );
}

export default Events;
