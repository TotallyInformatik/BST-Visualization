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
      console.log("rooting")
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

function App() {

  const inputRef = useRef(null);
  const visualisationRef = useRef(null);
  const [allNodes, setNodes] = useState([]);

  const renderSubtree = (currentNode, currentLevel, currentXPos) => {

    if (currentNode == null) return;

    //let newNodes = [...allNodes]
    nodes.push(<NodeVisualization 
      key={nodes.length + 1} 
      value={currentNode.value} 
      left={`${currentXPos * 100}%`}
      top={`${currentLevel * 200}px`} />)

    setNodes([]);
    console.log(nodes)


    // calculate x position:
    let xPosChange = 0.5 ** (currentLevel + 2);

    renderSubtree(currentNode.right, currentLevel+1, currentXPos+xPosChange)

    renderSubtree(currentNode.left, currentLevel+1, currentXPos-xPosChange)
    return;

  }

  const renderBST = (bst) => {

    nodes = []
    setNodes([])
    const currentNode = bst.root;
    if (currentNode == null) return;
    renderSubtree(currentNode, 0, 0.5)

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
