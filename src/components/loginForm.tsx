import { Label } from "@mui/icons-material"
import { TextField } from "@mui/material"
import { Button } from "react-bootstrap"


export const LoginForm = () => {
    return (
        <div >
            <form >
                <h1>Login</h1>
                <label>Name:</label><br/>
                <TextField variant="outlined" type="text" /><br/>
                <label>Email:</label><br/>
                <TextField variant="outlined" type="email" /><br/>
                <label>Password:</label><br/>
                <TextField variant="outlined" type="password" /><br/>
                <Button variant="text">Submit</Button>
            </form>
        </div>
    )
}