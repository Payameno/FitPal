import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Login from './components/Login';
import Singup from './components/Singup';
import Workout from './components/Workout';
import Error from './components/Error';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { fetchLoginStatus } from './actions/fetchLoginStatus';
import './App.scss';

class App extends Component {

  componentDidMount() {
    this.props.fetchLoginStatus();
  }
error = () => {
    return this.props.errors.length > 0
  }

  render() {
    return (
      <main>

        <Router>

        <nav>
          <Navbar />
          {this.error() && <Error />}
        </nav>

          <Routes>
            <Route exact path="/" component={Main} />
            <Route exact path="/signup" render={(props) => <Singup {...props} />} />
          </Routes>

          <div>
          <Workout />
          <Login />
          </div>

          <div className="index-footer">
          <Footer />
          </div>

        </Router>

      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => {
    return {
        fetchLoginStatus: () => { dispatch(fetchLoginStatus()) }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);