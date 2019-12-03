import React, { Fragment } from 'react'
const RenderMembersTable = (props) => {
    const {
        members,
        deleteMemberById,
        addEventByMember,
        viewAddedEvent,
        sortByMembersName,
        sortByMembersAge
    } = props
    return (
    <Fragment>
      <h3>Members List</h3>
        <table id='members'>
          <tbody>
            <tr key="1">
              <th>Name
                  <div onClick={e => sortByMembersName(e, 1)}><span className="iconify" data-icon="mdi:sort-alphabetical-ascending"></span></div>
                  <div onClick={e => sortByMembersName(e, 2)}><span className="iconify" data-icon="mdi:sort-alphabetical-descending" data-inline="false"></span></div>
              </th>
              <th>Age
                  <div onClick={e => sortByMembersAge(e, 1)}><span className="iconify" data-icon="mdi-sort-ascending"></span></div>
                <div onClick={e => sortByMembersAge(e, 2)}><span className="iconify" data-icon="mdi-sort-descending"></span></div>
              </th>
              <th>Phone</th>
              <th>Email</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
            {members.map(item => {
              return (
                <tr key={item._id}>
                  <td>{`${item.name.first} ${item.name.last}`}</td>
                  <td>{item.age}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  <td>{item.company}</td>
                  <td>
                    <div onClick={e => deleteMemberById(e, item._id)}>
                      <span className="iconify" data-icon="mdi:delete" title="Delete"></span>
                    </div>
                    <div onClick={e => addEventByMember(e, item._id, item.name.first, item.name.last)}>
                      <span className="iconify" data-icon="mdi:bookmark-plus" title="Add Event"></span>
                    </div>
                    <div onClick={e => viewAddedEvent(e, item._id, item.name.first, item.name.last)}>
                      <span className="iconify" data-icon="mdi:view-grid-outline" title="View Events"></span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
    </Fragment>)
  }

  export default RenderMembersTable;