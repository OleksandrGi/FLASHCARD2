
import { Button, TextField } from "@mui/material"
import '../app.css'
import {  useNavigate } from "react-router-dom"
import { useState } from "react"

export const LoginForm = () => {
    let [Name, setName ] = useState<string>('')
    let [Email, setEmail ] = useState<string>('')
    let [Password, setPassword ] = useState<string>('')
    let navigate = useNavigate()
 function ClickVerefy(){
    if(Name === 'testFlashCards' && Email === 'testflash2781@gmail.com' && Password === '12345678'){
      
        navigate('/')
    }else{
        alert(' something is wrong or Please log in.')
    }
 }
    return (
        <div className="form">
            <form  >
                <h1>Login</h1>
                <label>Name:</label><br/>
                <TextField variant="filled" type="text" value={Name}  onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setName(event.currentTarget.value)}/><br/>
                <label>Email:</label><br/>
                <TextField variant="filled" type="email"  value={Email} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setEmail(event.currentTarget.value)}/><br/>
                <label>Password:</label><br/>
                <TextField variant="filled" type="password"  value={Password} onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setPassword(event.currentTarget.value)}/><br/>
              <Button onClick={ClickVerefy} variant="contained" >Submit</Button>
            </form>
        </div>
    )

}