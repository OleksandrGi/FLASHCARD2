import { Button, Paper, TextField } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { CardsType, Keytype } from "../App";

 export type FlashCardsTypeProps = {
toggleTranslateVisibility:(id:number)=>void
cards: CardsType[]
setCards:(cards:CardsType[])=>void
showTranslate:Keytype


}

function FlashCards(props: FlashCardsTypeProps){
    const [editId, setEditId] = useState<number | null>(null);
    const [visible, setVisible] = useState<string>('');
    
return<>

{props.cards.map((tl) => (
          <Paper elevation={24} className="card" key={tl.id}>
            <ul>
              {editId === tl.id ? (
               
                <TextField
                variant='standard'
                id="standard-basic" label="Standard"
                  type="text"
                  value={visible}
                  onChange={(e) => setVisible(e.target.value)}
                  onBlur={() => setEditId(null)}
                />
               
              ) : (
                <li className='word' onDoubleClick={() => setEditId(tl.id)}>{tl.word}</li>
              )}
            
              {props.showTranslate[tl.id] && <li className='word'>перевод:{tl.translate}</li>}
            </ul>
            <Button onClick={() => props.setCards(props.cards.filter((card) => card.id !== tl.id))} variant="text"> <DeleteIcon /></Button>
            <Button onClick={() => props.toggleTranslateVisibility(tl.id) } variant="contained" >Show Translate</Button>
          </Paper>
        ))}
</>

}
export default FlashCards