import phoneService from "../services/phoneService"

const Display = (props) => {
    const handleRemove = (x) => {
        if (window.confirm(`are you sure you want to delete ${x.name}?`)) {
            phoneService.remove(x.id)
                .then(
                    props.setPersons(props.persons.filter(_ => _.id !== x.id))
                ).catch(err => {
                    props.setWarning('warning-error')
                    setTimeout(() => {
                        props.setWarning(null)
                    }, 5000)
                })
        }
        else {
            console.log(`permission denied`)
        }
    }
    return (<div>
        <h2>Numbers</h2>
        <ul>
            {
                props.persons.map((x) =>
                    <li key={x.name}>{x.name} : {x.number}
                        <button onClick={() => handleRemove(x)}>delete</button>
                    </li>

                )
            }
        </ul>

    </div>)
}
export default Display