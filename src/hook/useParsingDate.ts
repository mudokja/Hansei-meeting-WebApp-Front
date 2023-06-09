import React, { useEffect, useState } from 'react';

 function useParsingDate(dateString: string):[string,Function] {
    const [date, setDate]=useState(dateString)
    const [dateTypeState, setDateTypeState]=useState(true);
    const [typeDate, setTypeDate]=useState(false)
    const postDate = Date.parse(dateString);
    let formattedDate;
    const dateTypeChange=():void=>{
        if(!isNaN(postDate)){
            if(dateTypeState){
                setTypeDate(!typeDate)
            }else {
                const fullStringDate=new Date(dateString).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
                formattedDate =fullStringDate
                setDate(formattedDate)
                setDateTypeState(true);
                
            }
            
        } 
    }
    useEffect(():any=>{
        const now = new Date();
        if (!isNaN(postDate)) {
            const isToday = new Date(postDate).toISOString().slice(0, 10) === now.toISOString().slice(0, 10);
            
            formattedDate = isToday
            ? new Date(postDate).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' ,timeZone: 'Asia/Seoul'})
            : new Date(postDate).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' ,timeZone: 'Asia/Seoul'});
            
        }else{
            formattedDate=dateString;
        }
        setDate(formattedDate)
        setDateTypeState(false)
        },[typeDate]
        )
         
        return [date,()=>dateTypeChange()];
}

export default useParsingDate