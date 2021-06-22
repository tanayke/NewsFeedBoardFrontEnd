import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Card,Container,Row,Col} from 'react-bootstrap';
import { getAllArticles } from '../../services';

const YourFeedComponent = props => {
    const[articles,setArticles]=useState([])
    useEffect(()=>{
        getAllArticles().then(data=>setArticles(data));
    },[]);
    return (
        <>
        <div className="p-3">
       

            {articles.map(article =>(
              <Card key={article.id} style={{ width: '100%', margin:'1rem' }}>
               
                <Card.Body>
      
                    <Container>
                        <Row>
                            <Col md={7}>
                            <Card.Text>Header</Card.Text>
                            <Card.Title>{article.title}</Card.Title>
                    <Card.Text>
                  {article.description}
                    </Card.Text>
                    <Card.Text className="text-muted">{article.uploadDateTime}</Card.Text>
                            </Col>
                            <Col md={5}>
                            <Card.Img variant="top" src={`http://localhost:5500${ article.thumbnailImage }`} />

                            </Col>
                        </Row>
                    </Container>
                  
                </Card.Body>
               
              </Card>))}
           

        </div>
        </>
    )
}

YourFeedComponent.propTypes = {

}

export default YourFeedComponent
