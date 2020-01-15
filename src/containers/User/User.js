import React, { Component } from 'react';
import axios from 'axios';
import PageHeader from 'react-bootstrap/es/PageHeader';
import DateTimeChart from '../../components/DateTimeChart/DateTimeChart'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class User extends Component {
    state = {
        user: null,
        userId: '',
        userIsLoaded: false,
        stats: null,
        statsIsLoaded: false,
        startDate: new Date(Date.now() - 7*24*60*60*1000),
        endDate: new Date()
    };

    componentDidMount() {
        let userId = this.props.match.params.id;
        this.setState({userId})

        if (!this.state.userIsLoaded) {
            this.loadUser(userId)
        }
        if (!this.state.statsIsLoaded) {
            this.loadStats(userId)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let withUpDate = false
        if (+prevState.startDate !== +this.state.startDate) {
            withUpDate = true
        }
        if (+prevState.endDate !== +this.state.endDate) {
            withUpDate = true
        }

        if (withUpDate) {
            this.setState({statsIsLoaded: false})
            this.loadStats(this.state.userId)
        }

    }

    loadUser(userId) {
        axios.get(`/users/${userId}/`)
          .then(response => {
            this.setState({user: response.data, userIsLoaded: true})
          })
    }

    loadStats(userId) {
        axios.get(`/stats/${userId}/?since=${this.formatDate(this.state.startDate)}&until=${this.formatDate(this.state.endDate)}`)
          .then(response => {
            this.setState({stats: response.data.stats, statsIsLoaded: true})
          })
    }

    formatDate(date) {
        let m = date.getMonth() + 1 + ''
        m = m.length === 1 ? `0${m}` : m
        let d = date.getDate() + ''
        d = d.length === 1 ? `0${d}` : d

        return `${date.getFullYear()}-${m}-${d}`
    }

    handleChange(isEndDate) {
        return (date) => {
            if (isEndDate) {
                this.setState({endDate: date})
            } else {
                this.setState({startDate: date})
            }
        }
    }

    render() {
        if (!this.state.userIsLoaded) {
            return (<div>Loading...</div>)
        }

        let stats = '';
        if (this.state.statsIsLoaded) {
            const clicks = { showInLegend: false, data: this.state.stats.map((s) => ([+new Date(s.date), s.clicks])) };
            const views = { showInLegend: false, color: '#dd0011', data: this.state.stats.map((s) => ([+new Date(s.date), s.page_views])) };

            stats = (
                <div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange(false)}
                    />
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleChange(true)}
                    />
                    <DateTimeChart title={'Clicks'} data={clicks} />
                    <DateTimeChart title={'Views'} data={views} />
                </div>
            )
        }

        return (
            <div className="container">
                <PageHeader>
                    <div align='center'>{this.state.user.first_name} {this.state.user.last_name}</div>
                </PageHeader>
                {stats}
            </div>
        )
    }
}

export default User