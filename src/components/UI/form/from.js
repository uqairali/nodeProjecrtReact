import React from 'react';
import * as Icon from 'react-icons/lib/fa'


const form=(props)=>{

let data={
    id:props.id,
    title:props.title,
    content:props.content,
    tags:props.tags
}
  let Editicon=(
     <a onClick={props.onEditClick.bind(this,data)} style={{
         color:'#007BFF',
         padding:'4px',
         cursor:'pointer'
         }}>
      <Icon.FaPencil/>
        </a>
  )
  let Deleteicon=(
  <a onClick={props.onDeleteClick.bind(this,props.id)} style={{
      color:'red',
      padding:'4px',
      cursor:'pointer'
      }}>
   <Icon.FaTrash/>
 </a>   
)
    return(

         <tr>
            <td>{Editicon}{Deleteicon}</td>
              <td>{props.title}</td>
              <td>{props.content}</td>
              <td>{props.date}</td>
            </tr>
 

    )
}


export default form;