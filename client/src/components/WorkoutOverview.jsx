import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import '../App.scss';

export default function WorkoutSummary (props) {

  //states
  const [userWorkouts, setUserWorkouts] = useState("");
  const [period, setperiod] = useState(7);
  const [periodWorkoutData, setPeriodWorkoutData] = useState([]);
  const [totalperiodData, setTotalperiodData] = useState({
    totalCalorie: "",
    totalhours: "",
  });

////Calculate date(Today)

let dateObj = new Date();

let month = dateObj.getMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getDate();
let year = dateObj.getFullYear();
const todayDate = year + "-" + month + "-" + day;

console.log('userWorkoutId', userWorkouts)
////Fetch Today workout data on mount
useEffect(() => {

    Axios.get(`/api/workouts/user/${props.state.user.id}`).then(res => {
      const workouts = res.data
      const todayWorkouts = workouts.filter(workout => workout.date === todayDate)
    
      setUserWorkouts(todayWorkouts);
    })
    

}, [props.state]);


  // // Get work out data for a specific user and date//
  // useEffect(() => {

  //   setUserWorkoutDetails([]);

  //   if (props.state.user.id && startDate) {
  //   Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

  //     const workouts = res.data
  //     const todayWorkouts = workouts.filter(workout => workout.date === startDate.toISOString().substring(0, 10))
  //     setUserWorkouts(todayWorkouts);
  //   })
  // }

  // }, [startDate]);




  /////get workout data for last n days

  useEffect(() => {
  const getWorkoutDataLastnDays = () => {

    const lastnDays = userWorkouts.slice(-period)
    setPeriodWorkoutData(lastnDays)

  }
  getWorkoutDataLastnDays()
}, [period]);

//Calculate total calorie burn for the period

useEffect(() => {
const calculateTotalCalorieBurn = () => {
  
  let totalCalorie = 0;
  let totalminutes = 0;


  for (let i = 0; i < periodWorkoutData.length; i++) {

    totalCalorie += periodWorkoutData[i].total_workout_calories
    totalminutes += periodWorkoutData[i].workout_duration

  }

  //Convert minutes into hours minutes
  const hours = totalminutes/60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const hoursminutes = rhours + " hour(s) and " + rminutes + " minute(s).";
  
  setTotalperiodData({
    totalCalorie: totalCalorie,
    totalhours: hoursminutes,
  });
}




calculateTotalCalorieBurn()
}, [periodWorkoutData]);

const pickPeriod = (data) => {
  setperiod(data);
}

console.log('period', period)

return (
  <Container className="container-margins app-section">
  <h1 className="mb-5">Past 7 Days Workouts: </h1>
    <>
      <Form.Select 
      className="mb-5" 
      size="sm"
      onChange={(event)=> pickPeriod(event.target.value)}
      >
        <option>Please Select a period</option>
        <option value="1">One Day</option>
        <option value="7">7 Days</option>
        <option value="14">Two weeks</option>
        <option value="30">One Month</option>
        <option value="180">6 months</option>
        <option value="365">Year</option>
      </Form.Select>
    </>

  {periodWorkoutData && period && periodWorkoutData.map((item, index) => {

            return (

              <div key={index}>

              <h4>Date: {item.date} </h4>
              <div>Total Calories:  {item.total_workout_calories} </div>
              <div>Total Minutes:  {item.workout_duration} </div>
              <hr></hr>

              </div>

            )
      })}

  <h1 className="mb-3">Total Calories burned: {totalperiodData.totalCalorie} Calories</h1>
  <h1 >Total Hour Working out: {totalperiodData.totalhours} </h1>
  </Container>
);

}