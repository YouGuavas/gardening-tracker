import {useState, useEffect} from 'react';
import '../styles/Paginator.scss';


export function Paginator(props) {
  const counter = [];
  const page = props.page;
  const ceiling = Math.ceil(props.plants/props.pagination.resultsPerPage);
  const halfOfPills = Math.floor(props.pagination.top/2);
  const loop = (count, ceiling) => {
    if(count <= ceiling) {
      counter.push(count);
      loop(count+1, ceiling);
    } 
  }
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
  if (page.page <= halfOfPills+1) loop(1, ceiling)
  if(page.page >= ceiling-halfOfPills) loop(ceiling-props.pagination.top+1, ceiling)
  else loop(page.page-halfOfPills, ceiling)
  return (
    <ul className="paginator">
      {(page.page > 1) ? <li className="pill" onClick={() => arrow('left')}>{"<"}</li> : null}
      {
       counter.map((item, index) => {
         if (index < props.pagination.top){
          return (
          <li className={(page.page <= 5) ? 
            //when page below 5, if item == index, make item active
            (index+1 === page.page) ? "pill-active" : "pill" 
            //else
            : (page.page >= ceiling - halfOfPills) ? 
            //when page is nearer than half toward ceiling, maintain pill length
            (index+1 === props.pagination.top - (ceiling - page.page)) ? "pill-active" : "pill" 
            //else
            //all other cases, make middle pill active
            : (index === 4) ? "pill-active" : "pill"} onClick={() => page.setPage(item)}>
            {item}
          </li>)
         }
       })
      }
      {(page.page < ceiling) ? <li className="pill" onClick={() => arrow('right')}>{">"}</li> : null}
    </ul>
  )
}