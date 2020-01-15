import React from 'react'

const userListItem = (props) => (
    <tbody>
    <tr onClick={props.clicked}>
        <td>{props.id}</td>
        <td>{props.first_name}</td>
        <td>{props.last_name}</td>
        <td>{props.email}</td>
        <td>{props.gender}</td>
        <td>{props.ip_address}</td>
        <td>{props.total_clicks}</td>
        <td>{props.total_page_views}</td>
    </tr>
    </tbody>
);

export default userListItem
