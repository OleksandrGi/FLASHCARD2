
import FlashCards from "../components/flashcard"




function FlashCardsPage(){
    return <>
  <FlashCards
                toggleTranslateVisibility={toggleTranslateVisibility}
                showTranslate={showTranslate}
                cards={cards}
                setCards={setCards}
              />
    
              </>
    }
    export default FlashCardsPage