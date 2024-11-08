import { Button, MenuItem, Select, TextField } from "@mui/material"
import { CardsType, LanguageKey } from "../App"

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

type  AddFlashCardsPageType = {
  setSourceLanguage:(value:LanguageKey)=>void
  setTargetLanguage:(value:LanguageKey)=>void
  handleAddWord:()=> void
  setNewWord:(value:string)=>void
  newWord:string
  sourceLanguage:LanguageKey
  targetLanguage:LanguageKey

}

function AddFlashCardsPage(props:AddFlashCardsPageType){
    return <>
    
    <div>
              <Select onChange={(e) => props.setSourceLanguage(e.target.value as LanguageKey)} className='select' value={props.sourceLanguage} variant="standard">
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Russian">Russian</MenuItem>
                <MenuItem value="German">German</MenuItem>
              </Select>
              <Select onChange={(e) => props.setTargetLanguage(e.target.value as LanguageKey)} value={props.targetLanguage} variant="standard">
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="Russian">Russian</MenuItem>
                <MenuItem value="German">German</MenuItem>
              </Select>
              <br />
              <TextField
                variant='standard'
                type="text"
                placeholder="Word you like to learn"
                value={props.newWord}
                onChange={(e) => props.setNewWord(e.target.value)}
              />
              <Button onClick={props.handleAddWord} variant="contained"><AddOutlinedIcon/></Button>
              
            </div>  </>
    }
    export default AddFlashCardsPage