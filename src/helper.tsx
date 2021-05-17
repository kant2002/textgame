import React from 'react';

let world: BaseWorld;

function setWorld(newWorld: BaseWorld) {
    world = newWorld;
}

export class BaseWorld {
    sceneSelector?: SceneSelector;
    constructor() {
        setWorld(this);
    }
    setScene(scene: any) {
        this.sceneSelector!.setScene(scene);
    }
    setSceneSelector(sceneSelector: SceneSelector) {
        this.sceneSelector = sceneSelector;
    }
}

export class WorldSceneBase<TWorld extends BaseWorld> extends React.Component {
    updateWorld<K extends keyof TWorld>(newProperties: Pick<TWorld, K>) {
      for (const key in newProperties) {
        (world as TWorld)[key] = newProperties[key];
      }
  
      this.forceUpdate();
    }
}
  
interface SceneSelectorProps {
    initialScene: any;
}

interface SceneSelectorState {
    scene: any;
}
  
export class SceneSelector extends React.Component<SceneSelectorProps, SceneSelectorState> {
    constructor(props: SceneSelectorProps) {
        super(props);
        this.state = {scene: props.initialScene };
        world.setSceneSelector(this);
    }

    setScene(scene: any) {
        this.setState(state => ({
            scene
        }));
    }

    render() {
        return (
            <React.Fragment>
                {this.state.scene
                    ? React.createElement(this.state.scene)
                    : "Nothing is defined here."}
            </React.Fragment>
        );
    }
}

export function SceneLink(props: { onClick?: () => void, nextScene?: any, children?: any}) {
    function handler(e: React.MouseEvent) {
        e.preventDefault();
        if (props.onClick) {
            props.onClick();
        }

        if (props.nextScene) {
            world.setScene(props.nextScene)
        }
    }

    return (
        <a href="#" className="App-link" onClick={handler}>{props.children}</a>
    );
}

