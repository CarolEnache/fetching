import React, { Component } from 'react';
import './App.css';

const API = 'http://api.openweathermap.org/data/2.5/forecast?q='
const location = 'Miami';
const unit = '&units=metric';
const KEY = '?id=524901&APPID=3de18c1ff4b1ba20a7a46d1a4b524e00';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: {},
      city: {},
      location: '',
      lists: [],
      isLoading: false,
      error: null,
    };
  }
 
  // TODO: find a way to have ony one fetch() function 
  componentDidMount() {
    // this.setState({ isLoading: true });
    fetch(API + location + unit + KEY)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('something went wrong...')
        }
      })
      .then(data => this.setState({ data: data, city: data.city, lists: data.list }))
      .catch(error => this.setState({ error, isLoading: false }))
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(API + this.state.location + unit + KEY)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('something went wrong...')
        }
      })
      .then(data => this.setState({ data: data, city: data.city, lists: data.list }))
      .catch(error => this.setState({ error, isLoading: false }))
  }

  handleChange = (event) => {
    this.setState({ location: event.target.value })
  }

  render() {
    const { data, city, lists, isLoading, error } = this.state;
    console.log(this.state)
    if (error) {
      return <h1>{error.message}</h1>
    }

    if (isLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <h1>{city.name} {city.country} population: {city.population}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange}/>
          <input type='submit' value='submit'/>
        </form>
        <ul>{
          lists.map(list => {
            let celsius = list.main.temp - 273;
            let tempreture = Math.round(celsius)
            return <li key={list.main.temp}>{tempreture}</li>
          })
        }
        </ul>
      </div>

    );
  }
}

export default App;