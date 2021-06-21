import React,{ useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; 
import { Media } from "react-bootstrap";
import { getCards } from "../../services"; 
import Flower from './image.jpg';

export const ArticlePage = () => {
  const [cards,setCards] = useState([]);
  const params=useParams();
  useEffect(()=>{
        getCards(params.id).then((data)=>{ setCards(data) })
  },[]);
  console.log(cards);
  return(
    <>
    <Media>
      <img
        width={64}
        height={64}
        className="align-self-start mr-3"
        src={Flower}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>Media Heading</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
          ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
          tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
          fringilla. Donec lacinia congue felis in faucibus.
        </p>
  
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
          leo. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </p>
      </Media.Body>
    </Media>
  
    <Media>
      <img
        width={64}
        height={64}
        className="align-self-center mr-3"
        src={Flower}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>Media Heading</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
          ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
          tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
          fringilla. Donec lacinia congue felis in faucibus.
        </p>
  
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
          leo. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </p>
      </Media.Body>
    </Media>
  
    <Media>
      <img
        width={64}
        height={64}
        className="align-self-end mr-3"
        src={Flower}
        alt="Generic placeholder"
      />
      <Media.Body>
        <h5>Media Heading</h5>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
          ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
          tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
          fringilla. Donec lacinia congue felis in faucibus.
        </p>
  
        <p className="mb-0">
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu
          leo. Cum sociis natoque penatibus et magnis dis parturient montes,
          nascetur ridiculus mus.
        </p>
      </Media.Body>
    </Media>
  </>
  );
};
