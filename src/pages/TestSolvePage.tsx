import { TextField } from "@mui/material";
import { testType } from "../App";

type TestSolvePageProps = {
  test: testType[]; 
  foundTest: testType; 
  handleStartLearn: (id: number) => void; 
};

function TestSolvePage({ test, foundTest, handleStartLearn }: TestSolvePageProps) {
  if (!foundTest) {
    return <h2>No test selected</h2>;
  }

  return (
    <>
      <h1>{foundTest.title || "No Title"}</h1>
      <div>
        <p>What is the word meaning? (Example: hello)</p>
        <TextField type="text" variant="outlined" placeholder="Your answer" />
        <br />
        <button onClick={() => handleStartLearn(foundTest.id)}>Submit the answer</button>
      </div>
      <div>
        {test.length > 5 && (
          <p>Additional Question: {foundTest.Questions || "No additional questions"}</p>
        )}
      </div>
    </>
  );
}

export default TestSolvePage;
