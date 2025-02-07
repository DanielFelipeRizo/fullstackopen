import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const AnecdotesFilter = () => {
  const dispatch = useDispatch()

  const updateFilter = (event) => {
    const filter = event.target.value
    dispatch(filterChange(filter))
  }
  
  return (
    <div>
      filter <input onChange={(event) => updateFilter(event)} />
    </div>
  )
}

export default AnecdotesFilter