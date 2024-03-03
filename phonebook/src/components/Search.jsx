import { useState } from "react"
const Search = (props) => {
    const persons = props.persons
    const [search, setSearch] = useState('')
    const [found, setFound] = useState({})
    const [showFound, setShowFound] = useState(false)

    const handleSearch = (e) => {
        setSearch(e.target.value)
        setShowFound(false)
        setFound({})
    }
    const performSearch = () => {
        persons.forEach(element => {
            if (search.toLowerCase() === element.name.toLowerCase()) {
                setShowFound(true)
                let tempObj = {
                    name: element.name,
                    number: element.number
                }
                setFound(tempObj)
            }
        })
    }
    return (
        <div>
            <div>
                filter show with
                <input value={search} onChange={handleSearch} />
                <button onClick={performSearch}>search</button>
            </div>
            <div>
                {showFound ? `found person: ${found.name} with number ${found.number}` : ''}
            </div>
        </div>
    )

}

export default Search