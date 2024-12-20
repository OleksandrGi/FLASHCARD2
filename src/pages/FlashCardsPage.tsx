

import FlashCards from "../components/flashcard"
import { CardsType, Keytype } from "../types"


type  FlashCardsPageTYPE = {
  toggleTranslateVisibility:(id:number)=> void

  cards: CardsType[]
  

}

function FlashCardsPage(props:FlashCardsPageTYPE){
    return <>
  <FlashCards
        toggleTranslateVisibility={props.toggleTranslateVisibility}
        cards={props.cards}
      />
              </>
    }
    export default FlashCardsPage