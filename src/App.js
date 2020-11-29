import './App.css';
import React, { useState, useEffect } from 'react';
import Card from "./Card"
import Card2 from "./Card2"

function App() {
const letters  = [
  "B","I","N","G","O"
]
const balls=[]
for(let i=1 ;i<76;i++){
  if(i>0&&i<=15){
    balls.push(letters[0]+i)
  }else if(i>15&&i<=30){
    balls.push(letters[1]+i)
  }else if(i>30&&i<=45){
    balls.push(letters[2]+i)
  }else if(i>45&&i<=60){
    balls.push(letters[3]+i)
  }else if(i>60&&i<=75){
    balls.push(letters[4]+i)
  }
}

const [pickedBalls,setPickedBalls]=React.useState([])
const [unpickedBalls,setUnpickedBalls]=React.useState(balls)
const [lastChosen,setLastChosen]=React.useState()

const generator =()=>{
  
 const number= Math.floor((Math.random() * unpickedBalls.length) + 0);
//  console.log(number)
 setPickedBalls(prevArray => [...prevArray, unpickedBalls[number]])
 setUnpickedBalls(prevArray=>prevArray.filter(item=>item!==unpickedBalls[number]))
 setLastChosen(unpickedBalls[number])
}

let listItems = pickedBalls.map((number) =>
<li>{number}</li>
);



  
  return (
    <React.Fragment>
      <h1>Click generate to get cards before calling numbers</h1>
    <div className="App">
    Number called
     <ul>{listItems}</ul>
     </div>
      
     <button onClick={generator}>Get number</button>
     <div className="Card">
     <Card balls={balls} pickedBalls={pickedBalls} lastChosen={lastChosen}/>
     <Card2 balls={balls} pickedBalls={pickedBalls} lastChosen={lastChosen}/>
     </div>
  
    
    </React.Fragment>
  );
}

export default App;
