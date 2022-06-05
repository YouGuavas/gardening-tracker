import {useState, useEffect} from 'react';
import '../styles/Paginator.scss';


export function Paginator(props) {
  const counter = [];
  const page = props.page;
  const ceiling = Math.ceil(props.plants/props.pagination.resultsPerPage);
  const halfOfPills = Math.floor(props.pagination.top/2);
  //-----//
  const loop = (count, ceiling) => {
    if(count <= ceiling) {
      counter.push(count);
      loop(count+1, ceiling);
    } 
  }
  //----//
  const arrow = (direction) => {
    if (direction === 'left') {
      if (page.page > 1) page.setPage(page.page - 1)
    } else {
      if (page.page < ceiling) {
        page.setPage(page.page+1)
        console.log(props.pagination.resultsPerPage - (ceiling-page.page));
      }
    }
    //for left arrow, decrease page number as long as page is greater than 1
    //for right arrow, increase page number as long as page is less than total pages
  }
  //----//
  const renderArrows = (direction) => {
    if (direction === 'left') {
      if (page.page > 1) {
        return <li className="pill" onClick={() => arrow(direction)}>{"<"}</li>
      }
    }
    if (direction === 'right') {
      if (page.page < ceiling) {
        return <li className="pill" onClick={() => arrow(direction)}>{">"}</li>
      }
    }
  }
  //------//
  const determineClassNames = (index) => {
    if (page.page <=5) {
      if (index+1 === page.page) return 'pill-active'
      else return 'pill'
    } else 
    if (page.page >= ceiling - halfOfPills) {
      if (index+1  === props.pagination.top - (ceiling - page.page)) return 'pill-active'
      else return 'pill'
    } else 
    if (index === 4) {
      return 'pill-active'
    } else return 'pill';
  }
  //------//
  const renderPlants = (item, index) => {
    if (index < props.pagination.top){
     return (
     <li key={index} className={determineClassNames(index)} onClick={() => page.setPage(item)}>
       {item}
     </li>)
    }
  }
  //-----//
  if (page.page <= halfOfPills+1) loop(1, ceiling)
  if(page.page >= ceiling-halfOfPills) loop(ceiling-props.pagination.top+1, ceiling)
  else loop(page.page-halfOfPills, ceiling)
  
  return (
    <ul className="paginator">
      {renderArrows('left')}
      {counter.map((item, index) => renderPlants(item, index))}
      {renderArrows('right')}
    </ul>
  )
}