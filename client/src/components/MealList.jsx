import Axios from "axios";
import React, { useState, useEffect, Fragment, } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


export default function MealList (props) {

  const date = new Date();
  const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  const prevDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`;

  const [queryDate, setQueryDate] = useState(currDate)
  const [dataChange, setDataChange] = useState(false)
  const [mealData, setMealData] = useState([])

  const [mealArray, setMealArray] = useState([])
  const [lineFoodArray, setLineFoodArray] = useState([])
  
  // const [foodData, setFoodData] = useState({}) 
  const [foodArray, setFoodArray] = useState([]) 
  const [amountChange, setAmountChange] = useState(0)
  const [displayEdit, setDisplayEdit] = useState(false)


  useEffect(()=>{
    Axios.post('/api/meals/get_with_date', {"user_id": props.state.user.id, "date": queryDate})
    .then((res)=>{
      console.log("initial meals: ", res.data)
      setMealData(res.data)
      return res.data
    }).then((res)=>{
      
      if (res.length>0){
        res.forEach(item=>{
          Axios.get(`/api/meals/${item.id}`)
          .then((res)=>{
            console.log("individual meal info:", res.data)
            setMealArray((prev)=>[...prev,res.data])
          })
          .catch((e)=>{
            console.log(e)
          })
        }
        )
      }
    })
    .catch((e)=>{
      console.log(e)
    })
  },[props.state.user.id, queryDate,dataChange])

  // useEffect(()=>{
  //   if (mealData.length>0){
  //     mealData.forEach(item=>{
  //       Axios.get(`/api/meals/${item.id}`)
  //       .then((res)=>{
  //         console.log("individual meal info:", res.data)
  //         setMealArray((prev)=>[...prev,res.data])
  //       })
  //       .catch((e)=>{
  //         console.log(e)
  //       })
  //     }
  //     )
  //   }
  // }, [mealData])


  useEffect(()=>{
    if(mealArray.length>0){
      let temp = []
      mealArray.map(item=>
        temp = [...temp,item.line_food].flat().sort((a,b)=>{
          let fa = a.meal_type
          let fb = b.meal_type
    
          if (fa < fb) {
          return -1;
          }
          if (fa > fb) {
              return 1;
          }
          return 0;})
      )
      setLineFoodArray(temp)
    } else{
      setLineFoodArray([])
    }
  },[mealArray])

  useEffect(()=>{
    if(lineFoodArray.length>0){
      // let temp = []
      lineFoodArray.forEach(item=>{
        Axios.get(`/api/foods/${item.food_id}`)
          .then(res=>{
            console.log("fetchFood: ",res.data)
            setFoodArray(prev=>[...prev,res.data])
            })        
      })
    }
  },[lineFoodArray])

  console.log("lineFoodArray: ",lineFoodArray)
  
  console.log("mealArray info: ",mealArray)

  const totalCaloriesIntake = () => {

    return mealData.reduce((accumulator,item)=>{
      return accumulator + item.total_meal_calories
    },0)
  }

  const totalMealWeight = () => {
    return mealData.reduce((accumulator,item)=>{
      return accumulator + item.total_meal_amount
    },0)
  }

  // console.log("FoodArray", foodArray)

  const editFoodMeal = (id) => {

    setDisplayEdit(false);

    Axios.patch(`/api/line_foods/${id}`,{"food_amount": amountChange})
    .then(()=>{
      setMealArray([])
      setDataChange(!dataChange)
    })
  }

  const deleteFoodMeal = (id)=>{
    console.log("delete?")
    Axios.delete(`/api/line_foods/${id}`)
    .then(() => {
      setMealArray([])
      setDataChange(!dataChange)
    })
  }

  const cancelEdit = () => {
    setDisplayEdit(false);
  }

  const activateEditFoodMeal = () => {
    setDisplayEdit(true);
  }
  


  const getContent = (line_id,food_id, amount) =>{
    let foodData = foodArray.find(item=>item.id === food_id)
    // console.log("foodData",foodData)
    let info = () =>{
      return (
         <Row>

          {!displayEdit?
          <>
          <h3>{foodData.name}</h3>
          <Col className="data-info">
          
          <div>Calories: {Math.round(foodData.calories * amount / 100)}</div>
          </Col>

          <Col xs={5} className="post-section">
            
          <div className="item-display">
            <span>Protein: {(foodData.protein * amount / 100).toFixed(2)}</span>
            <span>Carbs: {(foodData.carbs * amount / 100).toFixed(2)}</span>
            <span>Fat: {(foodData.fat * amount / 100).toFixed(2)}</span>
          </div>

         </Col>
         </>
           :
           <>
          <Col>
          </Col>
           <Col xs={5} className="item-display">
           <div>{foodData.name} for &emsp;
           <input 
           size = "3"
           placeholder={amount}
            onChange={(e)=>{setAmountChange(parseInt(e.target.value))}
            }></input> grams</div>
           </Col>
          </>
          }
         {!displayEdit?
          <Col>
          <Button variant="outline-dark" onClick={()=>activateEditFoodMeal()}> Edit </Button> &emsp; 
          <Button variant="outline-dark" onClick={()=>deleteFoodMeal(line_id)}>Delete</Button>
          </Col>
          :
          <Col>
          <Button variant="outline-dark" onClick={()=>editFoodMeal(line_id)}>Submit</Button> &emsp; 
          <Button variant="outline-dark" onClick={()=>cancelEdit()}> Cancel </Button>
          </Col>
         }
          </Row>
      )
    } 

    return (
      <>
      <p>
      {foodData && info()}
      </p>
      </>
    )    
  }
  
  const showContent = (type) =>{
    //type should be string of: 1breakfast, 2lunch, 3dinner, 4snack
    // if (lineFoodArray.length>0){
      return lineFoodArray.map((item)=>{     
        return (
          <Fragment key={item.id+100}>
          {item.meal_type === type ? getContent(item.id, item.food_id, item.food_amount) : ""}
          </Fragment>)
      })
    // }
  }

  return (
    <Container className="mt-5">

      <Row className="mb-5 text-center">
        <Col xs={2}>
      <div className="circle-heading-2">Daily Total</div>

        <div  className="circle-heading-workout">
          <div className="headshot headshot-3 card mt-2">
            <div className="circle-heading-text">
            <div><div className="item-display-title">Intake </div><div>{totalCaloriesIntake()}</div> Kcal</div>
            </div>
          </div>
        </div>

        <div  className="circle-heading-workout">
          <div className="headshot headshot-3 card mt-2">
            <div className="circle-heading-text">
            <div><div className="item-display-title">Meal </div><div>{totalMealWeight()}</div> Grams</div>
            </div>
          </div>
        </div>
        </Col>

      <Col>
      <Card className="mb-3">
      <div className="app-header-bar">Breakfast</div>
      <Card.Body>{showContent("1breakfast")}</Card.Body>
      </Card>

      <Card className="mb-3">
      <div className="app-header-bar">Lunch</div>
      <Card.Body>{showContent("2lunch")}</Card.Body>
      </Card>


      <Card className="mb-3">
      <div className="app-header-bar">Dinner</div>
      <Card.Body>{showContent("3dinner")}</Card.Body>
      </Card>


      <Card className="mb-3">
      <div className="app-header-bar">Snacks</div>
      <Card.Body>{showContent("4snack")}</Card.Body>
      </Card>


      </Col>

      </Row>

    </Container>
  );

}