import * as React from 'react';
import "../styles/scss/tab.scss"
import {TabsContainer} from "../styles/styled-components/container"

export default function Tabs({onTabChange}) {

 const tabChange =(e, tab)=>{
    let currentActiveTab = document.querySelector(".activeTab")
    onTabChange(tab); 
    if(currentActiveTab){
        currentActiveTab?.classList?.remove("activeTab")
    }
    e?.target?.classList?.add("activeTab")

 }
  return (
   <TabsContainer className='tabs'>
    <div className='tab activeTab' onClick={(e)=>tabChange(e, "All Tasks")}>All Tasks</div>
    <div className='tab' onClick={(e)=>tabChange(e, "In Progress")}>In Progress</div>
    <div className='tab' onClick={(e)=>tabChange(e, "New Assigned")}>New Assigned</div>
    <div className='tab' onClick={(e)=>tabChange(e, "Completed")}>Completed</div>
    <div className='tab' onClick={(e)=>tabChange(e, "On Hold")}>On Hold</div>
   </TabsContainer>
  );
}
