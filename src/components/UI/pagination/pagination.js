import React, { Component } from "react";
import SingleNodes from './singleNod';
import { connect } from 'react-redux';

class Pagination extends Component {

 state={
   skipFirst:1,
   skipLast:-1,
   id:1
 }

 onNodeClick=(id)=>{
  this.props.updatePaginationNode(id);
  this.setState({id:id})
 }

  onIncrement=()=>{
    if(this.props.DocCount>10){
    if(this.state.skipFirst-1!==this.props.DocCount-10)
   this.setState({skipFirst:this.state.skipFirst+1});
    }
    if(this.props.DocCount>this.state.id){
      this.onNodeClick(this.state.id+1)
      }
  }
  onDecrement=()=>{
     if(this.state.id>1){
      this.onNodeClick(this.state.id-1)
    }
    if(this.state.skipFirst!==1){
    this.setState({skipFirst:this.state.skipFirst-1});
    }
  }

  render() {
  let docCount=()=>{
let nodeStore=0;
let count=this.props.DocCount+1;
if(count>10){
  nodeStore=count-10;
  count=count-nodeStore;
  count+=1;
}
return count+=this.state.skipFirst;
}    
let nodes = Array.apply(null, {length:docCount()})
    .map(Number.call, Number);
   
    
    return (
      <div>
      
  <div style={{marginLeft:"60px"}} className="alert alert-dismissible alert-light">
  <ul className="pagination">
    <li className="page-item">
      <a style={{cursor:this.state.id<=1?'no-drop':null}} onClick={this.onDecrement} className="page-link" >&laquo;</a>
    </li>
   
  {
    nodes.slice(this.state.skipFirst,this.state.skipLast).map(arr=>{
     return <SingleNodes
      key={arr}
      value={arr}
      id={arr}
      onNodeClick={this.onNodeClick}
      selectColor={this.props.selectPaginationNode}
    
      />
    })
  }
   
    <li className="page-item">
      <a style={{cursor:this.props.DocCount<=this.state.id?'no-drop':null}} onClick={this.onIncrement} className="page-link">&raquo;</a>
    </li>
  </ul>
</div>

      </div>
    );
  }
}

const mapStateToProp=state=>{
  return{
    DocCount:state.documentCount
  }
}
export default connect(mapStateToProp)(Pagination);