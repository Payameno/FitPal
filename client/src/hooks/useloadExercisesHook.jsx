import { useState } from "react";
import Axios from "axios";

export function loadExercises() {

  const [exercises, setExercises] = useState([]);

  const loadExercises = async() => {
    // async function to get the exercise data from rails 
    const response = await Axios.get('/api/exercises');
    // response.data is an array with objects of exercises
    console.log('response.data', response);
    setExercises(response.data)
  }

  return { exercises, setExercises, loadExercises }
}

    
