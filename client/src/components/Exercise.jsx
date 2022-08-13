import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { exerciseQueryContext } from '../Providers/ExerciseQueryProvider';
import { exercises, setExercises, loadExercises } from "../hooks/useloadExercisesHook"
import { Container, Row, Col, Form, Button, FloatingLabel, NavItem } from 'react-bootstrap';

export default function WorkoutEdit2 (props) {

const { query, suggestions, queryItems, durations, onChangeHandler, onSuggestHandler, addExercise, onDurationInputChangeHandler } = useContext(exerciseQueryContext);
const [exerciseCalories, setExerciseCalories] = useState("");
const [userWorkoutDetails, setUserWorkoutDetails] = useState({});
const [exerciseEdit, setExerciseEdit] = useState(true);
const exercisesData = userWorkoutDetails.exercises;
const lineExercise = userWorkoutDetails.line_exercises;



/////////// Get Exercise Info//////

  useEffect(() => {

    Axios.get(`/api/workouts/${props.workoutId}`).then (res => {

      setUserWorkoutDetails(res.data)

    });

  }, [])


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

//////// Edit Exercise ///////
const editExercise = (exerciseId) => {

    setExerciseEdit(true)

  Axios.get(`/api/line_exercises/${exerciseId}`).then (res => {


  })

    }

//////////////////Workout.jsx Functions

useEffect(() => {

  loadExercises();
  
}, [])

//calculation exercise calorie when user inputs duration

  //Fetch user's weight
  const userWeight = props.state.user.weight_kg;


useEffect(() => {

  const calculateWorkoutCalories = () => {

    const durationPerHour = (Number(durations)/60)
//if weight is less than 130 pounds
    if (weight(userWeight) <= 130) {
      const result = queryItems.calories_burned_s * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weight(userWeight) > 130 && weight(userWeight) <= 155) {
      const result = queryItems.calories_burned_m * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weight(userWeight) > 155 && weight(userWeight) <= 180) {
      const result = queryItems.calories_burned_l * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weight(userWeight) > 180) {
      const result = queryItems.calories_burned_xl * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }

  };
  calculateWorkoutCalories();

}, [durations])

//////////////////////

  return (
 
      <Row>
        <h1 className="mb-5">List of exercises: </h1>
          {exercisesData && exercisesData.map((item, index) => {
            return (

              <div key={index}>

                <h4 >Name: </h4>

                {!exerciseEdit &&
                <div>
                  {item.exercise.name}
                </div>
                }

                {exerciseEdit &&
                <div>
                  <Form.Group className="mt-2">
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Choose Your Activity"
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text"
                      name= "activitiesQuery"
                      onChange={event => onChangeHandler(event.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          setSuggestions([])
                        }, 2000)
                      }}
                      value={query}
                      placeholder="Choose Your Activity"
                      />
                          {suggestions && suggestions.map((suggestion, index) =>
                            <div 
                            key={index} 
                            className="query-suggestions"
                            onClick={() => onSuggestHandler(suggestion)}
                            >
                              {suggestion.name}
                            </div>
                          )}

                    </FloatingLabel>
                  </Form.Group>
                </div>
                }

                <div>
                <h4>Duration: </h4>
                {!exerciseEdit && item.exercise_duration}
                </div>
                {exerciseEdit &&
                <Col>
                  <Form.Group className="mt-2">
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Enter Duration (Minutes)"
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

                {!exerciseEdit &&
                <div>
                <h4>Total Exercise Calories: </h4>{item.total_exercise_calories}
                </div>
                }
                      <div>
                      <Button 
                      className="mt-2" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && deleteExercise(lineExercise[index].id, index)}}
                      >
                        Delete
                      </Button>
                      </div>


                      <div>
                      {!exerciseEdit &&
                      <Button 
                      className="mt-2" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && editExercise(lineExercise[index].id, index)}}
                      >
                        Edit
                      </Button>
                      }
                      </div>

                      <hr></hr>

              </div>
            )
      })}
      </Row>

  );

}