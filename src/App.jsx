import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [iceCream, setIceCream] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/api/ice')
      console.log(response.data)
      setIceCream(response.data)
    }
    fetchData()
  },[])

  const deleteIce = async (ice) => {
    try {
      await axios.delete(`http://localhost:3000/api/ice/{ice.id}`)
      const newICe = iceCream.filter((oneIce) => {
        return oneIce.id !== ice.id
      })
      setIceCream(newICe)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Ice-Cream-Shop-List</h1>
      {iceCream.map((ice) => {
        return (
          <div key={ice.id}>
            <h3>{ice.name} 
            <button onClick={() => {deleteIce(ice)}}>X</button></h3>
          </div>
        )
      })}
    </div>
  )
}

export default App
