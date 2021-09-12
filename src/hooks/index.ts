import { useState } from "react"

type TodoListObjectProps = {
  text: string
  isChecked?: boolean
}

const useTask = () => {
  const [list, setList] = useState<TodoListObjectProps[]>([])
  const [currentTextFieldValue, setCurrentTextFieldValue] = useState('')
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || currentTextFieldValue === '') return
    list
      ? setList([...list, { text: currentTextFieldValue, isChecked: false }])
      : setList([{ text: currentTextFieldValue, isChecked: false }])
    setCurrentTextFieldValue('')
  }
  return {
    list,
    setList,
    currentTextFieldValue,
    setCurrentTextFieldValue,
    enterHandler,
  }
}

export default useTask