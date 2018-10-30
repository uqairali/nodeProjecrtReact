import React,{Component} from "react";
import { connect } from 'react-redux';
import './Documents.css';
import * as actionIndex from '../../../store/actions/index';
import SideBar from '../../UI/sideBar/sideBar';
import DocCard from '../../UI/documentsCard/documentsCard';
import * as Icons from 'react-icons/lib/fa';
import Spinner from '../../UI/Spiner/Spiner';
class Document extends Component{
state={
    liked:false,
}
    componentWillMount(){
        this.props.accessDocuments();
    }

    test=()=>{
       console.log(this.props.allDoc);
    }

    onLikeButton=(id,likes)=>{
    
    let data={
     id:id,
     likes:likes
    }

    this.props.onUpdateLikes(data,this.props.allDoc);
    this.setState({id:id})
    this.props.accessDocuments()
    }
    render(){
        return(

        <div>
 <SideBar>
  <h1 onClick={this.test} className='icons'><Icons.FaHome/></h1>
  <h1 className='icons'><Icons.FaVideoCamera/></h1>
  <h1 className='icons'><Icons.FaGamepad/></h1>
  <h1 className='icons'><Icons.FaRecycle/></h1>
     </SideBar>
     <div className="container">
{
    this.props.spinner?<Spinner/>:null
}
<button onClick={this.test} >test</button>
     {
         
 this.props.allDoc.map(data=>(
   
<DocCard
key={data._id}
title={data.title}
body={data.content}
id={data._id}
onLicked={this.onLikeButton}
likes={data.likes}
/>
         ))
     }
     
         </div>
    </div>
        )
    }
}

const mapStateToProp=state=>{
    return{
        allDoc:state.allDocuments,
        spinner:state.spinner,
    }
}

const mapDispatchToprop=dispatch=>{
    return{
        accessDocuments:()=>dispatch(actionIndex.getDocumnets()),
        onUpdateLikes:(data,array)=>dispatch(actionIndex.updateLikes(data,array))
    }
}

export default connect(mapStateToProp,mapDispatchToprop)(Document);