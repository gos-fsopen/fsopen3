import { useState, useEffect } from 'react'
import Display from './components/Display'
import Add from './components/Add'
import Search from './components/Search'
import phoneService from './services/phoneService'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [warning, setWarning] = useState(null)
  const hook = () => {
    console.log('Effect')
    phoneService
      .getPeople()
      .then(initialLoad => {
        console.log('recieved persons')
        setPersons(initialLoad)
      })
  }

  useEffect(hook, [])

  return (
    <div>

      <h2>Phonebook</h2>
      <Notification class={warning} />
      <Search persons={persons} />
      <Add persons={persons} setPersons={setPersons} setWarning={setWarning} />
      <Display persons={persons} setPersons={setPersons} setWarning={setWarning} />
    </div>
  )
}

export default App