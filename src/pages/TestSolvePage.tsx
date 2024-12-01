import { TextField } from "@mui/material";
import { testType } from "../App";
import { useState } from "react";

type TestSolvePageProps = {
  test: testType[]; 
  foundTest: testType; 
  handleStartLearn: (id: number) => void; 
};
type QuizWordsType ={
  word:string
}
function TestSolvePage({ test, foundTest, handleStartLearn }: TestSolvePageProps) {
  let [QuestionON, setQuestionON] = useState<number>(0)
  let [index, setIndex] = useState<number>(0)
  let [InputQuiz, setInputQuiz] = useState<string>('')
  let [QuizWords, setQuizWords] = useState<QuizWordsType[]>([
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
      <h1>{foundTest.title || "No Title"}</h1>
      <div>
        
        <p>What is the word meaning? {QuizWords[index].word}</p>
        <TextField onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setInputQuiz(event.currentTarget.value)} type="text" variant="outlined" placeholder="Your answer"  value={InputQuiz}/>
        <br />
        <button onClick={nextButton}> next Question</button>
        <button onClick={previousButton}> previous Question</button>
        <button onClick={Quiz }>Submit the answer</button>
      </div>
      <div>
      questions: <span >{QuestionON }</span>/{foundTest.Questions}
      </div>
    </>
  );
}

export default TestSolvePage;
