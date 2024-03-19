import {Switch, Route} from 'react-router-dom'

import Home from './Home'

import EmojiGameRules from './EmojiGameComponents/EmojiGameRules'
import EmojiGame from './EmojiGameComponents/EmojiGame'

import RPSRules from './RockPaperScissorComponents/RPSGameRules'
import RockPaperScissors from './RockPaperScissorComponents/RPSGame'

import MMGameRules from './MemoryMatrixComponents/MMGameRules'
import MMGame from './MemoryMatrixComponents/MMGame'

import CFRules from './CardFlipMemoryGame/CFRules'
import CFGame from './CardFlipMemoryGame/CFGame'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/emoji-game" component={EmojiGameRules} />
    <Route exact path="/emoji-game-play" component={EmojiGame} />
    <Route exact path="/rock-paper-scissor" component={RPSRules} />
    <Route
      exact
      path="/rock-paper-scissor-game-play"
      component={RockPaperScissors}
    />
    <Route exact path="/memory-matrix" component={MMGameRules} />
    <Route exact path="/memory-matrix-game-play" component={MMGame} />
    <Route exact path="/card-flip-memory-game" component={CFRules} />
    <Route exact path="/card-flip-memory-game-play" component={CFGame} />
  </Switch>
)

export default App
