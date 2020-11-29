import React, { useState, useEffect } from 'react';
import './App.css';
function Card2(props){
    let sqB=[]
    
    let sqI=[]
    
    let sqN=[]
    
    let sqG=[]
    
    let sqO=[]
    
    let balls = props.balls
    let pickedBalls = props.pickedBalls
    let lastChosen = props.lastChosen
    // console.log(pickedBalls)
    for(let i=1;i<balls.length+1;i++){
        if(i>0&&i<=15){
            sqB.push(balls[i-1])
            
          }else if(i>15&&i<=30){
            sqI.push(balls[i-1])
            
          }else if(i>30&&i<=45){
            sqN.push(balls[i-1])
            
          }else if(i>45&&i<=60){
            sqG.push(balls[i-1])
            
          }else if(i>60&&i<=75){
            sqO.push(balls[i-1])
            
          }
    }
   
    function* shuffle(array) {

        var i = array.length;
    
        while (i--) {
            yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0];
        }
    
    }
    var ranB  = shuffle(sqB);
    var ranI  = shuffle(sqI);
    var ranN  = shuffle(sqN);
    var ranG  = shuffle(sqG);
    var ranO  = shuffle(sqO);
    const [cardNums,setCardNums]=React.useState()
    const [cardCreated,setCardCreated]=React.useState(false)  
    const [allCardNums,setAllCardNums]=React.useState()
    const [allTrueOrFalse,setAllTrueOrFalse]=React.useState()
    const generate =()=>{
        let allB =[] 
        let allI=[]
        let allN=[]
        let allG=[]
        let allO=[]
        let allSquars =[]
        let trueOr =[]
        for(let i=1;i<25;i++){
           trueOr.push(false)
            if(i<6){
                
                allB.push(ranB.next().value)
                // allSquars.push(ranB.next().value)
                allI.push(ranI.next().value)
                // allSquars.push(ranI.next().value)
                allG.push(ranG.next().value)
                // allSquars.push(ranG.next().value)
                allO.push(ranO.next().value)
                // allSquars.push(ranO.next().value)
            }if(i<5){
                allN.push(ranN.next().value)
                // allSquars.push(ranN.next().value)
            }
            
        }

        allN.splice(2,0,"FREE SPACE")
        setCardNums({...cardNums,numB:allB,numI:allI,numN:allN,numG:allG,numO:allO})
       setCardCreated(true)
       trueOr.push(false)
       setAllTrueOrFalse(trueOr)
       allB.forEach((e)=>{
           allSquars.push(e)
       })
       allI.forEach((e)=>{
        allSquars.push(e)
    })
    allN.forEach((e)=>{
        allSquars.push(e)
    })
    allG.forEach((e)=>{
        allSquars.push(e)
    })
    allO.forEach((e)=>{
        allSquars.push(e)
    })
       setAllCardNums({...allCardNums,allSquars})
    }  
    const [chosen,setChosen]=React.useState(false) 
    

    const colorz =(color)=>{
       for(let i=0;i<pickedBalls.length;i++){
           if(pickedBalls[i]===color){
               
               return "square"
           }
       }
       if(color==="FREE SPACE")
       {return "square"}
    }
    const isAllTrue =(item)=>item===true
    const test = [0,1,2,3,4]
    
    const [lastIndex,setLastIndex]=React.useState()
   useEffect(()=>{
      
       if(cardCreated===true){
           
        for(let i=0;i<allCardNums.allSquars.length;i++){
            if(lastChosen==allCardNums.allSquars[i]){
                let newArr =[...allTrueOrFalse]
                newArr[i]=true
                newArr[12]=true
                setAllTrueOrFalse(newArr)
                setLastIndex(i)
                
            }
        }

        
       }
    
   },[lastChosen])

   const [winConditions,setWinConditions] = React.useState([
    // across
   
    [0,5,10,15,20],[1,6,11,16,21],[2,7,true,17,22],
    [3,8,13,18,23],[4,9,14,19,24],
    //down
    [0,1,2,3,4],[5,6,7,8,9],[10,11,true,13,14],[15,16,17,18,19],
    [20,21,22,23,24],
    //diagnal
    [0,6,true,18,24],[4,8,true,16,20]
])
   useEffect(()=>{
    for(let i=0;i<winConditions.length;i++){
        for(let j=0;j<winConditions[i].length;j++){
            if(lastIndex===winConditions[i][j]){
                let newArr = [...winConditions]
                newArr[i].splice(j,1,true)
                setWinConditions(newArr)
                
            }
        }
    }

   },[allTrueOrFalse])
useEffect(()=>{
    const allTrue = (currentValue) => currentValue ==true ;
for(let i=0;i<winConditions.length;i++){
    if(winConditions[i].every(allTrue)===true){
        alert("Card 2 wins!")
    }
}
},[winConditions])
console.log(winConditions)
//    if(allTrueOrFalse[j][k]==false){
//     console.log("first")
//    break
   
// }else if(allTrueOrFalse[j][k]==true&&k==5){
//     console.log("you win")
// }else{
//     console.log('third')
//     continue
// }




return(
    <React.Fragment>
    <div>
    <button onClick={generate}>Genrate</button>
   
        <table>
            <tr>
                <th>B</th>
                <th>I</th>
                <th>N</th>
                <th>G</th>
                <th>O</th>
            </tr>
            <td>
            {cardCreated?(  
        cardNums.numB.map((number) =>
        <tr><li class={colorz(number)} >{number}</li></tr>
            )
    ):null}
    </td>
    <td>
      {cardCreated?(  
        cardNums.numI.map((number) =>
        <tr><li class={colorz(number)}>{number}</li></tr>
            )
    ):null}
    </td>
    <td>
      {cardCreated?(  
        cardNums.numN.map((number) =>
        <tr><li class={colorz(number)}>{number}</li></tr>
            )
    ):null}
    </td>
    <td>
      {cardCreated?(  
        cardNums.numG.map((number) =>
        <tr><li class={colorz(number)}>{number}</li></tr>
            )
    ):null}
    </td>
    <td>
      {cardCreated?(  
        cardNums.numO.map((number) =>
        <tr><li class={colorz(number)}>{number}</li></tr>
            )
    ):null}
    </td>
        </table>
    <h1>Card</h1>
    </div>
    
    </React.Fragment>
)
}
export default Card2