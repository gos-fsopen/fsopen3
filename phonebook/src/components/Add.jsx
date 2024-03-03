import { useState } from "react"
import phoneService from "../services/phoneService"
const Add = (props) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const handleAddClick = (e) => {
        e.preventDefault()
        let contains = false
        let tempId;
        props.persons.forEach(element => {
            if (element.name === newName) {
                contains = true
                tempId = element.id
            }
        });
        const tempObj = {
            id: tempId,
            name: newName,
            number: newNumber
        }
        if (contains) {
            if (window.confirm(`${newName} already in the list. do you want to update the number?`)) {
                phoneService.updateNumber(tempId, tempObj).then(update => {
                    props.setPersons(props.persons.map(x => x.id !== tempId ? x : tempObj))
                })
                .catch(err => {
                    console.log(err.response.data.error)
                    props.setWarning('warning-error')
                })
                props.setWarning('warning-success-update')
                setTimeout(() => {
                    props.setWarning(null)
                }, 3000)
            }
        }
        else {

            phoneService.addPerson(tempObj).then(addList => {
                props.setPersons(props.persons.concat(addList))
                props.setWarning('warning-success')
            setTimeout(() => {
                props.setWarning(null)
            }, 3000)
            }).catch(err => {
                console.log(err.response.data.error)
                props.setWarning('warning-error')
            })
            
            props.setWarning('warning-success')
            setTimeout(() => {
                props.setWarning(null)
            }, 3000)
        }

        setNewName('')
        setNewNumber('')
    }
    const handleNumberInput = (e) => {
        setNewNumber(e.target.value)
    }
    const handleInput = (e) => {
        setNewName(e.target.value)
    }
    return (
        <><h2>add a new</h2>
            <form>
                <div>
                    name: <input value={newName}
                        onChange={handleInput}
                    />
                </div>
                <div>
                    number <input value={newNumber}
                        onChange={handleNumberInput}
                    />
                </div>
                <div>
                    <button type="submit" onClick={handleAddClick}>add</button>
                </div>
            </form></>
    )
}

export default Add
