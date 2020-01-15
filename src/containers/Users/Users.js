import React, { Component } from 'react';
import axios from 'axios';
import UserItem from '../../components/UserItem/UserItem';
import Table from 'react-bootstrap/lib/Table';
import './Users.css';

class Users extends Component {
    state = {
        users: null,
        usersLoaded: false,
        pagination: {
            total: 0,
            pageOffset: 50,
            currentPage: 1
        }
    };

    componentDidMount() {
        this.loadUsers(1)
    }

    loadUsers(pageNumber) {
        (async () => {
          let response = await axios.get(`/users/?page=${pageNumber}`);
          this.setState({users: response.data.results, usersLoaded: true, pagination: {
             currentPage: pageNumber,
             pageOffset: 50,
             total: response.data.count
          }});
        })()
    }

    redirectTo(usersId) {
        this.props.history.push(`/users/${usersId}`)
    }

    render() {
        if (!this.state.usersLoaded) {
            return ('Load data...')
        }
        const users = this.state.users.map(user => (
            <UserItem
                key={user.id}
                id={user.id}
                first_name={user.first_name}
                last_name={user.last_name}
                email={user.email}
                gender={user.gender}
                ip_address={user.ip_address}
                total_clicks={user.total_clicks}
                total_page_views={user.total_page_views}
                clicked={() => this.redirectTo(user.id)}
            ></UserItem>
        ));

        const {currentPage, pageOffset, total} = this.state.pagination;
        let prev = '';
        let next = '';

        if (currentPage > 1) {
            prev = (<div className='arrow' onClick={() => this.loadUsers(currentPage - 1)}>&lt;</div>)
        }
        if (currentPage * pageOffset < total) {
            next = (<div className='arrow' onClick={() => this.loadUsers(currentPage + 1)}>&gt;</div>)
        }
        return (
            <div className='Users'>
                <div>
                    <Table striped bordered condensed hover style={{margin: 'auto', width: '80%'}}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>IP address</th>
                            <th>Total clicks</th>
                            <th>Total page views</th>
                        </tr>
                        </thead>
                        {users}
                    </Table>

                    <div className='pagination'>
                        {prev}
                        <div className='currentPage'>{this.state.pagination.currentPage}</div>
                        {next}
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;
