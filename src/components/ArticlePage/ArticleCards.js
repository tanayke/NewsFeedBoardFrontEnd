/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {Col} from 'react-bootstrap';
import {BASE_URL} from '../../constants';


export const ArticleCards=({data})=>{
    const Defstyles={
        fontSize:'22px',
        fontFamily:'Times New Roman, Times,serif'
    }
    const { content,type } = data;
        if (type === "IMAGE") {
          return (
            <>
              <Col xs={2} />
              <Col>
                <img src={BASE_URL + content} alt="img" width={650} height={500} />
              </Col>
              <Col xs={2} />
            </>
          );
        }
        if (type === "TEXT") {
          return (
            <>
              <Col xs={2} />
              <Col className="mr-4">
                <p style={Defstyles}>{content}</p>
              </Col>
              <Col xs={2} />
            </>
          );
        }
        return (
          <>
            <Col xs={2} />
            <Col>
              <video width="500" height="280" controls>
                <source src={BASE_URL + content} type="video/mp4" />
              </video>
            </Col>
            <Col xs={2} />
          </>
        );
}