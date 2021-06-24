import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArticlesTab } from "./ArticleFeeds/ArticlesTab";
import { ArticleFilterComponent } from "./Filters/ArticleFilterComponent";
import { getAllArticles, getAllArticlesForSearchInput } from "../../services";
import { ArticleSearchComponent } from "./Filters/ArticleSearchComponent";
import { ArticleSearchResultsComponent } from "./ArticleFeeds/ArticleSearchResultsComponent";

export const HomePage = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [articles, setArticles] = useState([]);
  const [articlesViaSearch, setArticlesViaSearch] = useState([]);
  useEffect(() => {
    getAllArticles().then((data) => {
      setArticles(data);
    });
  }, []);
  const filterArticles = (categoryId, locationId) => {
    getAllArticles(categoryId, locationId).then((data) => {
      setArticles(data);
    });
  };
  const searchAirtilesByTitleText = (searchInput) => {
    console.log(searchInput);
    getAllArticlesForSearchInput(searchInput).then((data) => {
      setArticlesViaSearch(data);
    });
  };
  return (
    <div className="pt-5">
      <Container>
        <Row>
          <Col md={8}>
            {isSearch ? (
              <ArticleSearchResultsComponent articles={articlesViaSearch} />
            ) : (
              <ArticlesTab articles={articles} />
            )}
          </Col>
          <Col md={4}>
            <ArticleFilterComponent filterArticles={filterArticles} />
            <ArticleSearchComponent
              isSearch={isSearch}
              setIsSearch={setIsSearch}
              searchAirtilesByTitleText={searchAirtilesByTitleText}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
