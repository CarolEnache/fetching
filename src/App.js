import React, { Component } from 'react';
import './App.css';

const API = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID='
const KEY = '3de18c1ff4b1ba20a7a46d1a4b524e00';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      data: {},
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    // this.setState({ isLoading: true });

    fetch(API + KEY)
      .then(response => {
        if(response.ok) {
          return response.json()
        } else {
        throw new Error('something went wrong...')
        }
      })
      // .then(data => console.log(data.city.name))
      // .then(data => console.log(data))
      .then(data => this.setState({ data: data}))
      .catch(error => this.setState({error, isLoading: false}))
  }

  

  render() {

    const { data, isLoading, error } = this.state;
    const city = data.city
    // var something = ''
    console.log(data.city)

    for (const prop in city) {
      console.log(`city.${prop}`, 1)
      console.log(`${city[prop]}`, 2)
      var something = city[prop];
    }
    console.log(something)
    

    if (error) {
      return <h1>{error.message}</h1>
    }

    if (isLoading) {
      return <h1>Loading...</h1>
    }
    
    // console.log(this.state)
    return (
      <h1>numeber</h1>
    );
  }
}

export default App;
