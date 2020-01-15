import React, { Component } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class DateTimeChart extends Component {
    state = {
        chart: null,
    };

    componentDidMount() {
        this.createConfig(this.props)
    }

    createConfig({title, data}) {
        this.setState({
            chart: {
                chart: {
                    type: 'line',
                    zoomType: 'xy',
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: title
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        day: '%e %b %y',
                    },
                },
                yAxis: {
                    title: {
                        text: title
                    }
                },
                series: [data]
            }
        })
    }

    render() {
        if (!this.state.chart) {
            return ''
        }
        return (<HighchartsReact
            highcharts={Highcharts}
            options={this.state.chart}
        />)
    }
}

export default DateTimeChart