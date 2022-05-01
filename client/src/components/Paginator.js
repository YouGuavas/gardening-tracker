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
  }
  loop(props.page.page, props.plants);
  return (
    <ul className="paginator">
      <li className="pill" onClick={() => arrow('left')}>{"<"}</li>
      {
       counter.map((item, index) => {
         if (index < props.pagination.top){
         return <li className={(index === page.active) ? "pill-active" : "pill"}>{item}</li>
         }
       })
      }
      <li className="pill" onClick={() => arrow('right')}>{">"}</li>
    </ul>
  )
}