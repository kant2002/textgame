import logo from './logo.svg';
import './App.css';
import { BaseWorld, SceneSelector, SceneLink, WorldSceneBase } from "./helper"

class Player {
  name = "Lord Byron";
}

class World extends BaseWorld {
  lightsOn = false;

  constructor (public player: Player) {
    super();
  }
}

class WorldScene extends WorldSceneBase<World> {}

const player = new Player();
const world = new World(player);

let Scene2 = () => <p>
  You won.
</p>

function Scene3() {
  return (
    <div className="scene">
      Desperate struggle leave you in broken state. Maybe your fate would be better in next life.
    </div>
  )
}

class StartScene extends WorldScene {
  turnOnLights = () => {
    this.updateWorld({
      lightsOn: true
    })
  }
  render() {
    function pathToGlory() {
      world.setScene(Scene2);
    }

    return <div className="scene">
      Dear {player.name}! Your journey starts here. 
      {!world.lightsOn ? <span>You find yourself in the dark room, and do not know how to go from there. Maybe it's time <SceneLink onClick={this.turnOnLights}>turn on the lights</SceneLink>?</span>
      : <span>
          You can choose two paths from here: <SceneLink onClick={pathToGlory}>path to glory</SceneLink>, or <SceneLink nextScene={Scene3}>path of shame</SceneLink>
        </span>}.
    </div>
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SceneSelector initialScene={StartScene} />
      </header>
      <p>
      <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </p>
    </div>
  );
}

export default App;
