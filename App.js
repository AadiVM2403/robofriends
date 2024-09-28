import React, { Component } from 'react';
import CardList from './CardList';
import './App.css';
import Scroll from './Scroll';
import SearchBox from './SearchBox';

class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: users}));
    }

    OnSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        });
        if (this.state.robots.length === 0) {
            return <h3>Loading</h3>
        } else {
            return (
                <div className='tc'>
                    <h3>RoboFriends</h3>
                    <SearchBox searchChange={this.OnSearchChange} />
                    <Scroll> 
                        <CardList robots={filteredRobots} />
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;
