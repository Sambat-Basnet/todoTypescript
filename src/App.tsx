import React, { useEffect, useState } from 'react';
import './App.css';
import {nanoid} from 'nanoid';
import {Itasks,typeOfArr,daysArr, monthArr} from './types'
import {AiOutlineCheck,AiFillCheckCircle} from 'react-icons/ai'
import {BsTrash,BsArrowCounterclockwise} from 'react-icons/bs'
import {BiCheck} from 'react-icons/bi'
const App:React.FC = () => {
  // const[count, setCount] = useState<number>(0)
  // const[word,setWord] = useState<string>("")
  const[task, setTask] = useState<Itasks>({id:'', value: '',isComplete:false})
  const[arr,setArr] = useState<typeOfArr>([])
  const[selected, setSelected] = useState<boolean>(false)

  // useEffect(()=>{
  //   console.log('Hello')
  // },[task])
  const handleInputChange= (e:React.ChangeEvent<HTMLInputElement>) => {
    setTask({...task,id:nanoid(),value:e.target.value})
  }
  const handleFormSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(task.value===""){
      alert('Field cannot be empty')
    }
    else{
    setArr([...arr, task])
    setTask({id:'', value: '',isComplete:false})
    setSelected(false)
    }
  }
  let days:daysArr=['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday', 'Friday','Saturday'] 
  let month:monthArr=['January','February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const indexOfDay = new Date().getDay()
  const date = new Date().getDate()
  const indexOfMonth = new Date().getMonth()
  return (
  <div className="main">
    <div className="container-1">
    <div className="dateSection">
      <p className="styleDay">{days[indexOfDay]}</p>
      <p className="styleDate">{date} {month[indexOfMonth]}</p>
      </div>
    <div className="container-2">
      <button className="addBtn" onClick={()=>{
        setSelected(true)
      }}>+</button>
      {selected && (<form onSubmit={handleFormSubmit}>
        <div className="addingTask">
      <input type="text" value={task.value} placeholder="Enter your daily task" 
      onChange={handleInputChange}/>
      <button className="taskBtn1" type="submit">+</button>
      <button onClick={()=>{
        setSelected(false)
      }}className="taskBtn2" type="submit">&#215;</button>
      </div>
      </form>)}
      <div className="taskItems">
      <ul>
        {arr.map(({id,value,isComplete})=>(
          <div className="indi" key={id}>
          <li>{value}</li>
          <button className="check"  onClick={()=>{
            //delete garyo feri tei append garyo with reversing the value of isComplete
            setArr([...arr.filter(x=>x.id!=id),{id,value,isComplete:!isComplete}])
          }
            }>{isComplete?
            <BsArrowCounterclockwise/>:<BiCheck/>}</button>
            <button className="trashCan" onClick={
              ()=>{
                //iterates each member of an array and filters out the chosen member
                setArr(arr.filter(x=>x.id!=id))
              }
            }><BsTrash/></button>
          </div>
        ))}
      </ul>
      </div>
      </div>
    </div>
    </div>
  )
}

export default App
