import './App.css';
import { useRef, useState } from 'react';

class BSTNode {

  constructor(value) {
    this.left = null;
    this.right = null;
    this.value = value
  }

}

class BST {

  constructor() {
    this.root = null;
  }

  insert(value) {
    // value should be of type bst node

    const newNode = new BSTNode(value);

    if (this.root == null) {
      this.root = newNode;
    } else {
      
      let currentNode;
      let nextNode = this.root;

      do {

        currentNode = nextNode;

        if (value > currentNode.value) {
          nextNode = currentNode.right
        } else {
          nextNode = currentNode.left
        }

      } while (nextNode != null)


      if (value > currentNode.value) {
        currentNode.right = newNode
      } else {
        currentNode.left = newNode
      }

    } 

  }

}

function NodeVisualization(props) {

  return <div className="Node" style={{
    left: props.left,
    top: props.top
  }}>{props.value}</div>

}

let nodes = [];
let connections = [];

function App() {

  const inputRef = useRef(null);
  const visualisationRef = useRef(null);
  const [allNodes, setNodes] = useState([]);

  const renderSubtree = (currentNode, currentLevel, currentXPos, prevX, prevLevel) => {

    if (currentNode == null) return;

    //let newNodes = [...allNodes]
    nodes.push(<NodeVisualization 
      key={`nodes-${nodes.length + 1}`} 
      value={currentNode.value} 
      left={`${currentXPos * 100}%`}
      top={`${currentLevel * 200}px`} />)
    setNodes([]);

    if (prevX != undefined && prevLevel != undefined) {

      const deltaX = (currentXPos - prevX) * document.body.clientWidth
      const deltaY = (currentLevel - prevLevel) * 200
      const length = Math.sqrt(deltaX ** 2 + deltaY ** 2)

      const theta = Math.atan(deltaY / deltaX)  * (180/ Math.PI);
      
      const rotation = deltaX > 0 ? `rotateZ(${-90 - (90 - theta)}deg)` : `rotateZ(${theta}deg)`

      connections.push(<div
        key={`connections-${currentXPos}-${currentLevel}`}
        style={{
          left: `calc(${currentXPos * 100}% + 40px)`,
          top: `calc(${currentLevel * 200}px + 40px)`,
          width: `${length}px`,
          transform: rotation
        }}
        className="connection"
      >
      </div>)

    }


    // calculate x position:
    let xPosChange = 0.5 ** (currentLevel + 2);

    renderSubtree(currentNode.right, currentLevel+1, currentXPos+xPosChange, currentXPos, currentLevel)

    renderSubtree(currentNode.left, currentLevel+1, currentXPos-xPosChange, currentXPos, currentLevel)
    return;

  }

  const renderBST = (bst) => {

    nodes = []
    connections = []
    setNodes([])
    const currentNode = bst.root;
    if (currentNode == null) return;
    renderSubtree(currentNode, 0, 0.5, undefined, undefined)

  }

  const createBST = (e) => {
    e.preventDefault()
    const value = inputRef.current.value
    inputRef.current.value = ""

    const valueList = value.split(" ").map((v) => parseInt(v))
    console.log(valueList)

    const bst = new BST()
    for (let v of valueList) {
      bst.insert(v)
    }

    renderBST(bst)

  }

  return (
    <div className="App">
      <div className="visualisation-connections">
        <div className="connection-wrapper">
          {connections}
        </div>
      </div>
      <div className="visualisation" ref={visualisationRef}>
        {nodes}
      </div>
      <form className="input" onSubmit={(e) => createBST(e)}>
        <input type="text" placeholder="input values you want" ref={inputRef} />
        <input type="submit" value="YES." />
      </form>
    </div>
  );
}

export default App;
