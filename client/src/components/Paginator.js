import {useState, useEffect} from 'react';
import '../styles/Paginator.scss';


export function Paginator(props) {
  const counter = [];
  const page = props.page;

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
      if (page.page < props.plants) page.setPage(page.page + 1)
    }
    //for left arrow, decrease page number as long as page is greater than 1
    //for right arrow, increase page number as long as page is less than total pages
  }
  loop(props.page.page, props.plants);
  return (
    <ul className="paginator">
      <li className="pill" onClick={() => arrow('left')}>{"<"}</li>
      {
       counter.map((item, index) => {
         if (index < props.pagination.top){
         return <li className={(index+1 === page.page) ? "pill-active" : "pill"} onClick={() => page.setPage(index+1)}>{item}</li>
         }
       })
      }
      <li className="pill" onClick={() => arrow('right')}>{">"}</li>
    </ul>
  )
}