import React, { Fragment } from 'react'
const RenderEventsList = (props) => {
    const {
        events
    } = props
    return(
        <Fragment>
            <h3>Events List</h3>
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
                {events.map(item => {
                    return (
                        <tr key={item._id}>
                        <td>{`${item.organizer.first} ${item.organizer.last}`}</td>
                        <td>{item.company}</td>
                        <td>{item.about.substring(0, 50)}</td>
                        <td>{item.scheduled_at}</td>
                        <td>{item.duration}</td>
                        <td>{item.capacity}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </Fragment>
    )
}

 export default RenderEventsList;