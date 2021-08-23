import React, { useEffect, useState } from 'react';
import './App.css';
import {nanoid} from 'nanoid';
import {Itasks,typeOfArr} from './types'


const App:React.FC = () => {
  // const[count, setCount] = useState<number>(0)
  // const[word,setWord] = useState<string>("")
  const[task, setTask] = useState<Itasks>({id:'', value: '',isComplete:false})
  const[arr,setArr] = useState<typeOfArr>([])

  useEffect(()=>{
    console.log('Hello')
  },[task])

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
    }
  }
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
      <input type="text" value={task.value} placeholder="Enter your daily task" 
      onChange={handleInputChange}/>
      <button type="submit">Click to Add</button>
      </form>
      <ul>
        {arr.map(({id,value,isComplete})=>(
          <div key={id}>
          <li>{value}</li>
          <button onClick={()=>{
            //delete garyo feri tei append garyo with reversing the value of isComplete
            setArr([...arr.filter(x=>x.id!=id),{id,value,isComplete:!isComplete}])
          }
            }>{isComplete?'Do It Again':'Done'}</button>
            <button onClick={
              ()=>{
                //iterates each member of an array and filters out the chosen member
                setArr(arr.filter(x=>x.id!=id))
              }
            }>Delete</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default App
