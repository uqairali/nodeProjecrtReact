export const updateObject=(oldObject, updatedProperties)=>{
    return{
        ...oldObject,
        ...updatedProperties
    };
};
 export let error={
    Title:"Title is required",
    Content:"Content is required"
}
export const checkValidity=(value,rules,label)=>{
    let isValid =true;
    if(!rules){
        return true;
    }
    
    if(rules.required){
        isValid=value.trim()!=='' && isValid;
    }
    if(!isValid){
    error[label]=label+" is required";
    }else{
        error[label]=null;
    }
    return isValid;
    }

    