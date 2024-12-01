import { Link } from "react-router-dom";
import { testType } from "../App";

type testTypeProps = {
    test: testType[];
    setTest: (test: testType[]) => void;
    handleStartLearn:(id:number) => void
};

function QuizPage(props: testTypeProps) {
   
  
    return (
        <>
        <button>Add Test  +</button>
            {props.test.map((test) => (
                <div className="quiztest" key={test.id}>
                    <h1>{test.title}</h1>
                    <p>{test.training}</p>
                    <p>{test.Questions}</p>
                    <div>IsDone: nope</div>
                    <Link to="/testSolve" onClick={() => props.handleStartLearn(test.id)}>
                        Start Learn
                    </Link>
                </div>
            ))}
        </>
    );
}

export default QuizPage;
