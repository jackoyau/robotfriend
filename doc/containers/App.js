import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';


function App(){
  // class App extends Component {
  //   constructor() {
  //     super()
  //     this.state = {
  //       robots: [],
  //       searchfield: ''
  //     }
  //   }

  // array destructuring
  const [robots, setRobots] = useState([])  // robots is state, serRobots is a function to change the robots state
  const [searchfield, setSearchfield] = useState('')
 
  // componentDidMount() {
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then(response=> response.json())
  //     .then(users => {this.setState({ robots: users})});
  // }
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => {setRobots(users)});
  },[])  // useEffect activates only if the values inside the array change
          // [] = run useEffect initially when the component mounted (app rendered)
          //    = componentDidMount
          // To avoid infinite loop : useEffect->change robots state->Re-render->useEffect->...

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  // const { robots, searchfield } = this.state;
  const filteredRobots = robots.filter(robot =>{
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  return !robots.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>RoboFriends!</h1>
        <SearchBox searchChange={onSearchChange}/>
        <Scroll>
          <CardList robots={filteredRobots} />
        </Scroll>
      </div>
    );
  }


export default App;