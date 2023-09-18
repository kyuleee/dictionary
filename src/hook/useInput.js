import { useState, useCallback } from 'react';

const UseInput = (initForm) => {
    const [data, setData]  = useState([]);
    const onChange = useCallback((e)=>{
        const {name, value} = e.target;
        setData((data)=>({
            ...data,
            [name] : value
        }))
    },[])
    const reset= useCallback(()=>setData(initForm),[initForm])
    
    return [data, onChange, reset];
}

export default UseInput;