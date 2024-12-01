import { Link} from "react-router-dom"

function Navigation(){
return <>
    <nav>
    <Link to="/">Главная</Link>< br/>
    <Link to="/progress">Прогресс</Link><br/>
    <Link to="/QuizPage">QuizPage</Link><br/>
    <Link to="/FlashCardsPage">FlashCardsPage</Link><br/>
    <Link to="/AddFlashCardsPage">AddFlashCardsPage</Link><br/>
    <Link to="/Account">Account</Link><br/>
    <Link to="/settings">settings</Link><br/>

  </nav>
</>
}
 export default Navigation