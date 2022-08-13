import Axios from 'axios';
import React, { createContext, useState } from 'react';
import { randNumGen } from "../helpers/helpers"
// import { loadExercises } from "../hooks/useloadExercisesHook"

// Create a Context
export const exerciseQueryContext = createContext();



export default function ExerciseQueryProvider (props) {

// Shared State Object
const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [queryItems, setQueryItems] = useState({});
const [durations, setDurations] = useState("");

  //import custom hook variables and functions
  // const {
  //     exercises,
  //     setExercises,
  //     loadExercises,
  //   } = loadExercises();


  // Functions to change State Object

  const onChangeHandler = (query) => {
   
  
    let matches = [];
  
    if (query.length > 0) {
  
      matches = exercises.filter( exercise => {
        //gi modifier sets case insensitivity
        const regex = new RegExp(`${query}`, "gi");
        return exercise.name.match(regex)
      })
    }
    setSuggestions(matches)
    setQuery(query)
  };
  
  const onSuggestHandler = (query) => {
    setQuery(query.name);
    setQueryItems(query);
    setSuggestions([]);
  };

  ///////////Add Exercise ////////////
  const addExercise = () => {


    //  object with exercise information
        const exerciseData = {
          exercise_id: randNumGen,
          workout_id: queryItems.id,
          exercise_duration: durations,
        }
    
          // async function to post the exercise object to backend
          return Axios.post('/api/carts/add_exercise',   {"exercise_id": queryItems.id, "exercise_duration":durations})
          .then((response) => {
    
            //get cart(list of exercises added) data after an exercise is added,set the state of cart
            //in future rmove and add a state instead
    
            return Axios.get('/api/carts')
            .then((response) => {
    
            })
            .catch((error) => {
              console.log(error);
            })
          }).catch((error) => {
            console.log(error);
          });
      }

//Input durations change handler
const onDurationInputChangeHandler = (event) => {

  const regExp = /[a-zA-Z]/g;

  if (!regExp.test(event.target.value)) {

    setDurations(event.target.value)

  }

};

//On blur Function, workout
const onBlurFunction = () => {
    setTimeout(() => {
      setSuggestions([])
    }, 2000)
}

// This list 
const providerData = { query, suggestions, queryItems, durations, onChangeHandler, onSuggestHandler, addExercise, onDurationInputChangeHandler, onBlurFunction };


//Wrap
return (
  <exerciseQueryContext.Provider value={providerData}>
    {props.children}
  </exerciseQueryContext.Provider>
);

}
