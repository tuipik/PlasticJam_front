import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu/Menu';
import Users from './containers/Users/Users';
import User from './containers/User/User'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom/es';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className='App'>
                    <Menu/>
                    <Switch>
                        <Redirect exact from="/" to="users" />
                        <Route path='/users' exact component={Users}/>
                        <Route path='/users/:id' component={User}/>
                        <Route render={() => <h1 style={{textAlign: 'center'}}>Not found</h1>}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
