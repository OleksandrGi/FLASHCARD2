
import { CardsType, Keytype } from "../App"
import FlashCards from "../components/flashcard"


type  FlashCardsPageTYPE = {
  toggleTranslateVisibility:(id:number)=> void
  showTranslate:Keytype
  cards: CardsType[]
  setCards:(cards:CardsType[])=>void

}

function FlashCardsPage(props:FlashCardsPageTYPE){
    return <>
  <FlashCards
                toggleTranslateVisibility={props.toggleTranslateVisibility}
                showTranslate={props.showTranslate}
                cards={props.cards}
                setCards={props.setCards}
              />
    
              </>
    }
    export default FlashCardsPage