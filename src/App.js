import React, { Component } from 'react';

import './App.css';

const API = 'http://api.openweathermap.org/data/2.5/forecast?q='
const location = 'london';
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
  // componentDidMount() {

  //   // this.handleSubmit()
  //   // this.setState({ isLoading: true });
  //   fetch(API + location  + unit + KEY)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json()
  //       } else {
  //         throw new Error('something went wrong...')
  //       }
  //     })
  //     .then(data => this.setState({ data: data, city: data.city, lists: data.list }))
  //     .catch(error => this.setState({ error, isLoading: false }))
  // }

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

  handleClick = () => {
    window.location.reload(true)
  }

  render() {
    const { city, lists, isLoading, error } = this.state;
    if (error) {
      return (
        <div>
          <h1>{error.message}</h1>
          <button onClick={this.handleClick}>refresh</button>
        </div>
      )
    }

    if (isLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        {this.state.location ? 
          <h1>Try a new search</h1> 
          : <h1>Please enter the name of the city</h1>}
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange}/>
          <input type='submit' value='submit'/>
        </form>
        {this.state.location &&(
          <div>
            <h1>{city.name} {city.country} population: {city.population}</h1>
            <ul>{
              lists.map(list => {
                let celsius = list.main.temp - 273;
                let tempreture = Math.round(celsius)
                return <li key={list.main.temp}>{tempreture}</li>
              })
            }
            </ul>
          </div>

        )
        }

      </div>

    );
  }
}

export default App;