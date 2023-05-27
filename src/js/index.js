import {spin, getPrimes} from './app.js'
import '../styles/main.scss'
import '../styles/style.css'
import im from '../assets/img/sprite.png'
import sv from '../assets/svg/big-cheese.svg'

window.document.addEventListener('DOMContentLoaded', Init)
class Game {
  constructor(param) {
    this.param = param
  }
  oneMethod() {
    console.log('oneMethod', this.param)
  }
  name = 'James Bond'
}
const myGame = new Game('param')
myGame.oneMethod()
function Init() {
  getPrimes()
  const frm = document.getElementById('main')
  const p = `I like ${myGame.name}.` + spin
  frm.innerHTML = `
<h2>Hello, baby from JavaScript!!!</h2>
<hr />
<p>${p}</p>
<img src="${im}" alt="img" />
<img src="${sv}" alt="svg" width="50px" />
<hr />`
}
