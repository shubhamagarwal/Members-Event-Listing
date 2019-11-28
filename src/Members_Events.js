import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Events() {
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);

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

  const renderMembersTable = () => {
    return members.map(item => {
        return (
           <tr key={item._id}>
              <td>{item.name.first + ' ' + item.name.last}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.company}</td>
           </tr>
        )
     })
  }

  const sortByAge = (e, flag) => {
    //alert('hello');
    const membersList = [...members];
    let sortedMembers
    if (flag === 1) {
        sortedMembers = membersList.sort((a, b) => (a.age < b.age) ? 1 : -1);
    } else {
        sortedMembers = membersList.sort((a, b) => (a.age > b.age) ? 1 : -1);
    }
    
    setMembers(sortedMembers);
  }

  const renderEventsTable = () => {
    return events.map(item => {
        return (
           <tr key={item._id}>
              <td>{item.organizer.first + ' ' + item.organizer.last}</td>
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
        <table id='members'>
            <tbody>
                <tr key="1">
                <th onClick={sortByAge}>Name
                    <div><span className="iconify" data-icon="mdi:sort-alphabetical-ascending" data-inline="false"></span></div>
                    <div><span className="iconify" data-icon="mdi:sort-alphabetical-descending" data-inline="false"></span></div>
                </th>
                <th>Age
                    <div onClick={event => sortByAge(event,1)}><span className="iconify" data-icon="mdi-sort-ascending"></span></div>
                    <div onClick={event => sortByAge(event,2)}><span className="iconify" data-icon="mdi-sort-descending"></span></div>
                </th>
                <th>Phone</th>
                <th>Email</th>
                <th>Company</th>
                </tr>
                {renderMembersTable()}
               </tbody>
            </table>

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
