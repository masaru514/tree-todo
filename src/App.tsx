import React, { useState } from 'react';
import './App.css';
import { Box, Checkbox, Input } from "@chakra-ui/react"
import { cond } from 'lodash';

type TodoListObjectProps = {
  text: string
}

function App() {
  const [list, setList] = useState<TodoListObjectProps[]>([])
  const [currentTextFieldValue, setCurrentTextFieldValue] = useState('')
  const enterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter' || currentTextFieldValue === '') return
    list ? setList([...list, { text: currentTextFieldValue }]) : setList([{ text: currentTextFieldValue }])
    setCurrentTextFieldValue('')
  }

  // サブタスクのテキストフィールドの存在を監視する
  const [watch, setWatch] = useState(false)

  const SubTask = (item: any, index: number) => {
    const [create, setCreate] = useState(false)
    const [subList, setSubList] = useState<TodoListObjectProps[]>([])
    const [currentSubTextFieldValue, setCurrentSubTextFieldValue] = useState('')
    const createSubtask = () => {
      setCreate(true)
    }

    const enterSubTaskHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter' || currentSubTextFieldValue === '') return
      list ? setSubList([...subList, { text: currentSubTextFieldValue }]) : setSubList([{ text: currentSubTextFieldValue }])
      setCurrentSubTextFieldValue('')
    }

    const blurHandler = () => {
      // if (currentSubTextFieldValue === '') return
      console.log('ee?')
      subList ? setSubList([...subList, { text: currentSubTextFieldValue }]) : setSubList([{text: currentSubTextFieldValue}])
      setCurrentSubTextFieldValue('')
      setCreate(false)
    }

    return (
      <Box pl={8} pt={4}>
        <Box display="flex" onClick={() => createSubtask()}>
          <Checkbox size="lg" mr={4} />
          <div key={index}>{item.text}</div>
        </Box>
        {subList.map(item => {
          return (
            <div>
              {item.text}
            </div>
          )
        })}
        {create && <Input value={currentSubTextFieldValue} onChange={(e) => setCurrentSubTextFieldValue(e.target.value)} onKeyPress={(e) => enterSubTaskHandler(e)} onBlur={() => blurHandler()}  ml={8} mt={4} display="inline-block" />}
      </Box>
    )
  }

  return (
    <div className="App">
      <main>
        <ul>
          {list.map((item, index) => {
              return (
                <SubTask {...item} {...index} />
              )
            }
          )}

        </ul>

        <Box display="flex" alignItems="center" mt={10} mx={8}>
          <Input value={currentTextFieldValue} display="inline-block" placeholder="baxic" onChange={(e) => setCurrentTextFieldValue(e.target.value)} onKeyPress={(e) => enterHandler(e)} />
        </Box>
      </main>
    </div>
  );
}

export default App;
