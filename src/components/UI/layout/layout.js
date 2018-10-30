import React,{Component} from 'react';
import Navebar from '../navBar/navBar';
class layout extends Component {
    render(){
        return(

            <div>
     <Navebar/>
     {this.props.children}
            </div>
        )
    }
}

export default layout;