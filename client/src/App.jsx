import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Users from './Users';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  // fetchData = () => {
  //   axios.get('/api/users/1') // You can simply make your requests to "/api/whatever you want"
  //   .then((response) => {
  //     // handle success
  //     console.log(response.data) // The entire response from the Rails API

  //     console.log(response.data.message) // Just the message
  //     this.setState({
  //       message: response.data.message
  //     });
  //   }) 
  // }

  render() {
    return (
      <main>
        <nav>
          <Navbar />
        </nav>
          <Users />
          <Footer />
      </main>
    );
  }
}

export default App;
      // <div className="App">
      //   <h1>{ this.state.message }</h1>
      //   <button onClick={this.fetchData} >
      //     Fetch Data
      //   </button>        
      // </div>