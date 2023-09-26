import * as React from 'react';
import "../styles/scss/tab.scss"
import {TabsContainer} from "../styles/styled-components/container"

export default function Tabs() {

 const tabChange =(e)=>{
    let currentActiveTab = document.querySelector(".active")
    if(currentActiveTab){
        currentActiveTab?.classList?.remove("active")
    }
    e?.target?.classList?.add("active")

 }
  return (
   <TabsContainer className='tabs'>
    <div className='tab active' onClick={(e)=>tabChange(e)}>In Progress</div>
    <div className='tab' onClick={(e)=>tabChange(e)}>New Assigned</div>
    <div className='tab' onClick={(e)=>tabChange(e)}>Completed</div>
    <div className='tab' onClick={(e)=>tabChange(e)}>On Hold</div>
   </TabsContainer>
  );
}
