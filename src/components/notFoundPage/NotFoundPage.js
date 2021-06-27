import React from 'react';
import { Link} from 'react-router-dom';
import {Image,Row} from 'react-bootstrap';
import {BASE_URL} from '../../constants'

export const NotFoundPage=()=><div>
             <Row>
             <Image className="text-center mt-5" src={`${BASE_URL}/404.png`} alt="not found" width={1200} height={500}  />
             </Row>
            
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>;
export default NotFoundPage;