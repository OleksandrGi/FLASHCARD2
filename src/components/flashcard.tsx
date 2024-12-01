import { Button,  TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { CardsType, Keytype } from "../App";
import '../app.css'

export type FlashCardsTypeProps = {
  toggleTranslateVisibility: (id: number) => void;
  cards: CardsType[];
  setCards: (cards: CardsType[]) => void;
  showTranslate: Keytype;
};

const FlashCards: React.FC<FlashCardsTypeProps> = (props) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [visible, setVisible] = useState<string>('');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const handleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {props.cards.map((tl) => (
        <div  className="card-container" key={tl.id}>
          <div className="card-container" onClick={() => handleFlip(tl.id)}>
            <div className={`card ${flippedCards[tl.id] ? 'is-flipped' : ''}`}>
              <div className="card-front">
              {editId === tl.id ? (
              <TextField
                variant="standard"
                label="Edit word"
                type="text"
                value={visible}
                onChange={(e) => setVisible(e.target.value)}
                onBlur={() => setEditId(null)}
              />
            ) : (
              <h3 onDoubleClick={() => setEditId(tl.id)} >{tl.word}</h3>
            )}
                
              </div>
              <div className="card-back">
                <h3>{tl.translate}</h3>
              </div>
              <Button
            onClick={() =>
              props.setCards(props.cards.filter((card) => card.id !== tl.id))
            }
            variant="text"
            className="deleteIcon"
          >
            <DeleteIcon />
          </Button>
            </div>
          </div>
    
        </div>
      ))}
    </>
  );
};

export default FlashCards;
