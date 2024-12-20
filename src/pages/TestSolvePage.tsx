import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { testType } from "../types";
import '../app.css'
type TestSolvePageProps = {
  test: testType[]; 
  foundTest: testType; 
  handleStartLearn: (id: number) => void; 
};
type QuizWordsType ={
  word:string
}
function TestSolvePage({ foundTest }: TestSolvePageProps) {
  let [QuestionON, setQuestionON] = useState<number>(0)
  let [index, setIndex] = useState<number>(0)
  let [InputQuiz, setInputQuiz] = useState<string>('')
  let [QuizWords,] = useState<QuizWordsType[]>([
    {word:''},
    {word:'hello'},
    {word:'world'},
    {word:'sheep'},
    {word:'turkey'},
    {word:'beaver'},
    
  ])
  if (!foundTest) {
    return <h2>No test selected</h2>;
  }
function Quiz(){
  if(InputQuiz === QuizWords[index].word){
    alert('that is write go had to the next question')
  }else{
    alert('your answer is wrong')
  
  }
  setInputQuiz('')
}
function nextButton(){
  setIndex(index++)
  setQuestionON(QuestionON++)
}
function previousButton(){
  setIndex(index--)
  setQuestionON(QuestionON--)
}

  return (
    <>
   
      <div>
        
        <p className="testSolveWordMean">What is word will be in Russian</p>
        <div className="testSolveWord">{QuizWords[index].word}</div>
        <div className="inputAnswer">
        <TextField onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setInputQuiz(event.currentTarget.value)} type="text" variant="outlined" placeholder="Your answer"   value={InputQuiz}/>
        </div>
        <br />
     <div className="ButtonsTest">
     <Button className="ButtonsTestB" variant='contained' onClick={nextButton}> next Question</Button>
        <Button className="ButtonsTestB" variant='contained' onClick={previousButton}> previous Question</Button>
        <Button className="ButtonsTestB" variant='contained' onClick={Quiz }>Submit the answer</Button>
     </div>
      </div>
      <div className="questions">
      questions: <span >{QuestionON }</span>/{foundTest.Questions}
      </div>
    </>
  );
}

export default TestSolvePage;
