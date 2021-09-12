import './App.css';
import { Box, Input } from "@chakra-ui/react"
import SubTask from './components/SubTask';
import useTask from './hooks';

function App() {
  const { list, enterHandler, currentTextFieldValue, setCurrentTextFieldValue } = useTask()
  return (
    <div className="App">
      <main>
        <ul>
          {list.map((item, index) => {
              return (
                <SubTask {...item} {...index} {...list} />
              )
            }
          )}

        </ul>

        <Box display="flex" alignItems="center" mt={10} mx={8}>
          <Input value={currentTextFieldValue} display="inline-block" placeholder="新しいタスクを作成" onChange={(e) => setCurrentTextFieldValue(e.target.value)} onKeyPress={(e) => enterHandler(e)} />
        </Box>
      </main>
    </div>
  );
}

export default App;
