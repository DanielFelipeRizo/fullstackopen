import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetvalue = () => {
    if(type === 'number')
      setValue(0)
    else
      setValue('')
  }

  return {
    type,
    value,
    onChange,
    resetvalue
  }
}

export default useField
