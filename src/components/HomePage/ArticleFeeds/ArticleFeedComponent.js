import React, { useContext, useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { ArticleFilterContext } from "../../context/ArticleFilterContext/ArticleFilterContext";
import NewsCardsComponent from "../Utilities/NewsCardsComponent";
import { getAllArticles } from "../../../services";
import PaginationComponent from "../Utilities/PaginationComponent";

const setOfContext = new Set();
// eslint-disable-next-line arrow-body-style
export const ArticleFeedComponent = () => {
  const [noArticlesMesg, setNoArticlesMesg] = useState("");
  const [articleFeed, setArticleFeed] = useState([]);
  const { articleFilters } = useContext(ArticleFilterContext);
  const { categoryId, locationId, search, isTrending } = articleFilters;
  const [pageLimit, setPageLimit] = useState(1);
  const [currPage, setCurrPage] = useState(0);
  // const fetchAndSetDataForPageChange = async (page) => {
  //   try {
  //     const data = await getAllArticles({ ...articleFilters, page });
  //     setArticleFeed(data.items);
  //     setPageLimit(data.totalPages);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  setOfContext.add(articleFilters);
  console.log(setOfContext);
  useEffect(() => {
    try {
      console.log("currPage", currPage);
      getAllArticles({ ...articleFilters, page: currPage }).then((data) => {
        if (!data.items.length) setNoArticlesMesg("no Articles found");
        console.log(data);
        setArticleFeed(data.items);
        setPageLimit(data.totalPages);
        console.log(noArticlesMesg);
      });
    } catch (error) {
      console.log(error);
    }
  }, [categoryId, locationId, search, isTrending, currPage, noArticlesMesg]);

  useEffect(() => {
    setCurrPage(0);

    console.log("on articleFilter change", articleFeed);
  }, [categoryId, locationId, search, isTrending]);

  const afterPageClicked = async (page) => {
    setCurrPage(page - 1);
    console.log(currPage);

    // eslint-disable-next-line no-param-reassign
    page -= 1;
    try {
      const data = await getAllArticles({ ...articleFilters, page });
      console.log(data);
      if (!data.items) setNoArticlesMesg("no Articles found");
      setArticleFeed(data.items);
      setPageLimit(data.totalPages);
      console.log(noArticlesMesg);
    } catch (error) {
      console.log(error);
    }
  };
  // eslint-disable-next-line no-nested-ternary
  return !articleFeed.length ? (
    noArticlesMesg ? (
      <h1 className="mt-5">{noArticlesMesg}</h1>
    ) : (
      <Spinner className="spinner" animation="border" variant="info" />
    )
  ) : (
    <div className="p-3">
      <NewsCardsComponent articleFeed={articleFeed} />
      <PaginationComponent
        totPages={pageLimit}
        currentPage={currPage + 1}
        pageClicked={(ele) => {
          afterPageClicked(ele);
        }}
      />
    </div>
  );
};
