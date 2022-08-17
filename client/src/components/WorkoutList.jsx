import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exercise from "./Exercise";
import '../App.scss'


export default function WorkoutList (props) {

  const [userWorkoutData, setUserWorkoutData] = useState([]);
//this state contains selected day
const [startDate, setStartDate] = useState(null);

//Today - Date
let dateObj = new Date();
let month = dateObj.getMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getDate();
let year = dateObj.getFullYear();
const todayDate = year + "-" + month + "-" + day;

////Fetch Today workout data on mount
useEffect(() => {



Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {
  

  res.data.map((item) => {
    console.log('item', item);
    if (item.date === todayDate) {

      setUserWorkoutData(item);
    }
  })

})

}, [props.state]);




  //Get work out data for a specific user and date//
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      res.data.map((item) => {

        if (startDate && item.date === startDate.toISOString().substring(0, 10)) {

          setUserWorkoutData(item);
        }
      })

    })
  }

  }, [startDate]);
  //////////////////////////////////////////////

  return (

    <Container className="container-margins">

    <Row>

    <Col className="calendar-header " xs={3}>


        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={new Date()}
          showDisabledMonthNavigation
          className="mb-3"
          inline
        />
        <div className="mb-1">Please select a date</div>

      <Card className="background-img card mt-2">
        <Card.Body>
          <h3 className="text-center">Overview</h3>
        <div>
          <h5><span>Overall DUuration: {userWorkoutData.workout_duration} Min</span></h5>
          <h5 className="heading">Workout Calories: {userWorkoutData.total_workout_calories} Kcal</h5>
        </div>
        </Card.Body>
      </Card> 


      {/* <Col className="mt-3">
        <Button 
        className="mr-5" 
        variant="info" 
        type="submit"
        onClick={() => {navigateToAddMeal()}}
        >
          Add a meal
        </Button>
      </Col>  */}
    </Col>


    <Col>
    {userWorkoutData.id &&
      <>

      {userWorkoutData.id && 
      <Col className="app-section-top" xs={10}>

      <div className="app-header-bar">
        Exercise List for {todayDate}
      </div>               
      <br/>
    <Exercise workoutId={userWorkoutData.id} />

    </Col>
      }
      </>
    }
    </Col>

    </Row>

    </Container>
  );

}

