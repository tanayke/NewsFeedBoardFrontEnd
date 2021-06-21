import {React,useState,useEffect} from "react";
import {useHistory} from 'react-router-dom';
import { Tabs, Tab, Card, Button,Spinner,Row,Container,Col } from "react-bootstrap";
import { CARDS, API_PUBLIC_BASE } from "../../constants";
import { getAllArticles } from "../../services";

export const ArticlesTab = () => {
  const [articles, setArticles] = useState([]);
  const history=useHistory();
  useEffect(()=>{
      getAllArticles().then((data)=>{setArticles(data)});
  },[]);
  console.log(articles);
  const handleClick=(e,id)=>{
     console.log(`Handle Click called ${id}`);
     history.push(`/cards/${id}`);
  }
 return( <div>
    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
      <Tab eventKey="home" title="Your Feed">
        { articles ?
          articles.map((article) => (
            <Card onClick={(e)=>handleClick(e,article.id)} key={article.id}>
              <Card.Header>News</Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col xs={8}>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Text>{article.description}</Card.Text>
                    </Col>
                    <Col>
                    <img width={170} height={96} className="mr-3" src={API_PUBLIC_BASE + article.thumbnailImage} alt="Generic placeholder"/>
                    </Col>
                  </Row>
                 
                </Container>
                
              </Card.Body>
            </Card>
          )):  <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
          </Spinner>
        }
      </Tab>
      <Tab eventKey="profile" title="Trending">
        trending articles
      </Tab>
    </Tabs>
  </div>

);
};
