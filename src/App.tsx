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
    <div className="scene scene-background-death">
      <h1>
        Death bed
      </h1>
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

    return <div className="scene scene-background-dark-room">
      <h1>
        Magic hall
      </h1>
      <p>Dear {player.name}! Your journey starts here.</p>
      {!world.lightsOn
        ? <span>You find yourself in the dark room, and do not know how to go from there. You see opened chest, with glowing light bursting form it. 
            Maybe it's time <SceneLink onClick={this.turnOnLights}>to looks what's inside the chest</SceneLink>?</span>
        : <span>
            You can choose two paths from here: <SceneLink onClick={pathToGlory}>path to glory</SceneLink>, or <SceneLink nextScene={Scene3}>path of shame</SceneLink>
          </span>}.
    </div>
  }
}

function App() {
  return (
    <div className="App">
      <article className="App-body">
        <SceneSelector initialScene={StartScene} />
      </article>
    </div>
  );
}

export default App;
