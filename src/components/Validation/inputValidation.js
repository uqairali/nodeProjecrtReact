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

    export const registrationValidation=(value,validation)=>{
        let isValid =true;
        if(!validation){
     
            return true;
        }
        
        if(validation.required){
            isValid=value.trim()!=='' && isValid;
        }
       if(validation.minLingth){
           isValid=value.length>=validation.minLingth&&isValid
       }
       if(validation.maxLingth){
        isValid=value.length<=validation.maxLingth&&isValid
    }
    
    if (validation.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }
    if (validation.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }
        return isValid;
        }

    