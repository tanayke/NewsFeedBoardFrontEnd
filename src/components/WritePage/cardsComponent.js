/* eslint-disable no-restricted-syntax */
import React from 'react'
import {  Card } from "react-bootstrap";

export const CardsComponent =({cards})=>(
   <div>{
      cards.forEach((card) => {
        for (const value of card.values()) {
            <h3>{value}</h3>
         // console.log(value);
        }
      })
      }
  </div>
)
