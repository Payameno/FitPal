import Axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";

import { Container, Row, Col, Form, Button, FloatingLabel, Card } from 'react-bootstrap';
import '../App.scss'

export default function WorkoutEdit2 (props) {
const [userWorkoutDetails, setUserWorkoutDetails] = useState({});
const [exerciseEdit, setExerciseEdit] = useState(-1);
const [durations, setDurations] = useState("");
const [exercises, setexercises] = useState([]);

const lineExercise = userWorkoutDetails.line_exercises;

useEffect(() => {

  setexercises(userWorkoutDetails.exercises);

}, [userWorkoutDetails])


/////////// Get Exercise Info//////

  useEffect(() => {

    Axios.get(`/api/workouts/${props.workoutId}`).then (res => {

      setUserWorkoutDetails(res.data)

    });

  }, [props.workoutId])


////// Delete Exercise ///////
  const deleteExercise = (exerciseId, index) => {

    Axios.delete(`/api/line_exercises/${exerciseId}`).then (res => {
      let newExercises = [...userWorkoutDetails.exercises]
      newExercises.splice(index, 1)

      let newLineExercises = [...userWorkoutDetails.line_exercises]
      newLineExercises.splice(index, 1)

      const newuserWorkoutDetails = {
        ...userWorkoutDetails,

        exercises: newExercises,
        line_exercises: newLineExercises,
      }

      setUserWorkoutDetails(newuserWorkoutDetails);

    }).catch((error) => console.log(error))

      }

//////// Edit Exercise /////////
const editExercise = (index) => {

  setExerciseEdit(index)

    }

/////////Submit Button ////////////
const submitExercise = (exerciseId, index) => {

  return Axios.put(`/api/line_exercises/${exerciseId}`, {"workout_id": props.workoutId, "exercise_id": index, "exercise_duration":durations})
  .then (() => {

    //Later change this part to update exercise to reflect changes to the exercise
    Axios.get(`/api/workouts/${props.workoutId}`).then (res => {

      setUserWorkoutDetails(res.data)
    //////
      setExerciseEdit(-1);

    });


  }).catch(error => console.log(error));
  //Ideally this part should rendere an error message on the page below the post

    }    

//Input durations change handler
const onDurationInputChangeHandler = (event) => {

  const regExp = /[a-zA-Z]/g;

  if (!regExp.test(event.target.value)) {

    setDurations(event.target.value)

  }

};




  return (
    <Container>

      <Row>

          {exercises && exercises.map((item, index) => {
            return (

              <div className="post-section" key={index}>

                <div className="exercise-items-list mt-2"><span>{item.exercise.name}!</span>{exerciseEdit !== index && <span>Duration: {item.exercise_duration} Minutes.</span>}
                <span>Total: {item.total_exercise_calories} Calories</span>
                </div>

                {exerciseEdit === index &&
                <Col>
                  <Form.Group className="mt-2">
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Enter Duration (Minutes)"
                    onChange={event => onDurationInputChangeHandler(event)}
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text"
                      name= "duration"
                      placeholder="Enter Duration"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                }

                <div>

                      <Row className="mb-2">

                      <Col className="post-tools">
                      {exerciseEdit !== index &&
                      
                      <Button 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && deleteExercise(lineExercise[index].id, index)}}
                      >
                        Delete
                      </Button>
                      
                       }
                       {exerciseEdit === index &&
                      <Button 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && submitExercise(lineExercise[index].id, index)}}
                      >
                        Submit
                      </Button>
                      
                       }
                      
                      {exerciseEdit !== index &&
                      
                      <Button 
                      className="post-button" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && editExercise(index)}}
                      >
                        Edit
                      </Button>
                     }
                    {exerciseEdit === index &&
                     
                     <Button 
                     className="post-button" 
                     variant="info" 
                     type="submit"
                     onClick={() => {lineExercise && setExerciseEdit(-1)}}
                     >
                       Cancel
                     </Button>
                     
                    }
                      </Col>

                      </Row>



                     

                    </div>
              </div>
            )
      })}

      
      </Row>
      
      </Container>
  );

}