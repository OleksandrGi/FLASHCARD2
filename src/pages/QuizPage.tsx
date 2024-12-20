import { Link } from "react-router-dom";
import { testType } from "../types";
import '../app.css'
import { Button} from "@mui/material";

type testTypeProps = {
    test: testType[];
    setTest: (test: testType[]) => void;
    handleStartLearn:(id:number) => void
};

function QuizPage(props: testTypeProps) {
   
  
    return (
        <>
      <div className="DIV_Quiz">
      <h1 className="h1_Quiz">Hi, here you will learn some new  words. This is quiz time!</h1>
        <p className="description">Pick the test whatever you want to do and let's start learning new words!</p>
      </div>
        <Button variant="contained">Add Test</Button>

<p className="Paragrath"> Tests</p>

            <div className="test">
            {props.test.map((test) => (
                <div className="quiztest" key={test.id}>
                    <p>{test.training}</p>
                    <p>Questions {test.Questions}</p>
                    <div>not done yet</div>
                    <Link to="/testSolve" onClick={() => props.handleStartLearn(test.id)} className="link">
                        Start Learn
                    </Link>
                </div>
            ))}
            </div>
           
        </>
    );
}

export default QuizPage;
