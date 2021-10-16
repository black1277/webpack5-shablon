import '../styles/main.scss'
import '../styles/style.css'
import im from '../assets/img/sprite.png'
import sv from '../assets/svg/big-cheese.svg'

window.document.addEventListener('DOMContentLoaded', Init)
class Game {
  name = 'James Bond'
}
const myGame = new Game()

function Init() {

  const frm = document.getElementById('main')
  const p = `I like ${myGame.name}.`
  frm.innerHTML = `
<h2>Hello, baby from JavaScript!</h2>
<hr />
<p>${p}</p>
<img src="${im}" alt="img" />
<img src="${sv}" alt="svg" width="50px" />`

}