import { Checkbox } from "@chakra-ui/checkbox"
import { Box } from "@chakra-ui/layout"
import { Input } from "@chakra-ui/react"
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
import useTask from '../hooks';

const SubTask = (item: any, index: number) => {
  const { list, setList, currentTextFieldValue, setCurrentTextFieldValue, enterHandler } = useTask()
  const [create, setCreate] = useState(false)
  const inputEl = useRef<any>(null)

  useEffect(() => {
    inputEl.current?.focus()
  }, [create])

  const blurHandler = () => {
    setCreate(false)
    if(currentTextFieldValue === '') return
    list ? setList([...list, { text: currentTextFieldValue, isChecked: false }]) : setList([{ text: currentTextFieldValue, isChecked: false }])
    setCurrentTextFieldValue('')
  }

  const updateCheckboxListState = (e: ChangeEvent<HTMLInputElement>, text: string) => {
    const newList = list.map(item => {
    if(item.text === text) {
        return {
          ...item,
          isChecked: e.target.checked
        }
      }
      return item
    })
    setList(newList)
  }
  const [parentChecked, setParentChecked] = useState(false)
  const isAllChecked = !!list.length ? list.every(i => Boolean(i.isChecked)) : parentChecked
  const isIndeterminateSubTask = list.some(Boolean) && !isAllChecked


  const updateAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
    if(!list.length) {
      setParentChecked(!parentChecked)
    }
    const updateList = list.map(i => {
      return {
        ...i,
        isChecked: e.target.checked
      }
    })
    setList(updateList)
  }

  const taskTextColor = () => {
    if(!list.length) return '#333'
    else return isAllChecked ? '#333' : 'gray.400'
  }

  return (
    <Box pl={8} pt={4}>
      <Box display="flex">
        <Checkbox size="lg" mr={4} isChecked={isAllChecked} isIndeterminate={isIndeterminateSubTask} onChange={(e) => updateAllChecked(e)} />
        <Box color={taskTextColor()} key={index} onClick={() => setCreate(true)}>{item.text}</Box>
      </Box>
      {list.map((item, index) => {
        return (
          <Box display="flex" mt={4} ml={8} textAlign="left">
            <Checkbox size="lg" mr={4} isChecked={item.isChecked} onChange={(e) => updateCheckboxListState(e, item.text)} />
            <Box>
              {item.text}
              {index}
            </Box>
          </Box>
        )
      })}
      {create && (
        <Box mx={8}>
          <Input ref={inputEl} value={currentTextFieldValue} onChange={(e) => setCurrentTextFieldValue(e.target.value)} onKeyPress={(e) => enterHandler(e)} onBlur={() => blurHandler()} mt={4} display="inline-block" />
        </Box>
        )}
    </Box>
  )
}

export default SubTask