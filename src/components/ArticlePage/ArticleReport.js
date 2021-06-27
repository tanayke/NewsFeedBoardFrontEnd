import React, { useState, useEffect } from "react";
import { Popover, Button, OverlayTrigger, Form, Alert } from "react-bootstrap";
import { addReport, getAllReports } from "../../services/articleReportsService";

export const ArticleReport = ({ articleId, userId }) => {
  const [otherType, setOtherType] = useState("");
  const [type, setType] = useState("");
  const [isAbleToReport, setIsAbleToReport] = useState(false);
  const [report, setReport] = useState({});
  const [newReport, setNewReport] = useState({
    reason: "SPAM",
    otherReason: "",
    articleId,
    userId,
  });
  const handleOnChange = ({ target }) => {
    setNewReport({
      ...newReport,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addReport(newReport).then((response) => {
      console.log(response.data);
      if (response.status === 201) {
        setReport(response.data);
        setIsAbleToReport(false);
      } else if (response.status === 400) {
        alert("failed to report news");
      }
    });
  };
  useEffect(() => {
    getAllReports(articleId, userId).then((response) => {
      console.log(articleId, userId);
      console.log(response.status);
      if (response.status === 200) {
        setIsAbleToReport(false);
        console.log(response.data);
        setReport(response.data[0]);
      } else if (response.status === 204) {
        setIsAbleToReport(true);
      }
    });
  }, [articleId, userId]);
  return isAbleToReport ? (
    <>
      <OverlayTrigger
        placement="top"
        trigger="click"
        overlay={
          <Popover>
            <Popover.Title as="h3">Report</Popover.Title>
            <Popover.Content>
              <Form onSubmit={(e) => handleSubmit(e)}>
                {newReport.reason !== "OTHER" ? (
                  <Form.Group>
                    <Form.Control
                      as="select"
                      name="reason"
                      value={newReport.reason}
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option value="">--Select type--</option>
                      <option value="SPAM">SPAM</option>
                      <option value="FAKE NEWS">FAKE NEWS</option>
                      <option value="HARRASMENT">HARRASMENT</option>
                      <option value="PROMOTES TERRORISM">
                        PROMOTES TERRORISM
                      </option>
                      <option value="DEFAMATION">DEFAMATION</option>
                      <option value="OTHER">Other</option>
                    </Form.Control>
                  </Form.Group>
                ) : null}
                <Form.Group>
                  {newReport.reason === "OTHER" ? (
                    <Form.Control
                      type="text"
                      name="otherReason"
                      placeholder="Enter Report type"
                      value={newReport.otherReason}
                      onChange={handleOnChange}
                      required
                    />
                  ) : null}
                </Form.Group>
                <Button variant="success" type="submit">
                  Submit
                </Button>
                {newReport.reason === "OTHER" ? (
                  <Button
                    className="ml-2"
                    variant="primary"
                    onClick={() =>
                      setNewReport({ ...newReport, reason: "SPAM" })
                    }
                  >
                    Select
                  </Button>
                ) : null}
              </Form>
            </Popover.Content>
          </Popover>
        }
      >
        <Button
          variant="outline-danger"
          onClick={() => {
            setOtherType("");
          }}
        >
          <h6>Report Article</h6>
        </Button>
      </OverlayTrigger>
    </>
  ) : (
    <Alert variant="warning">
      {`This News was reported by you for ${
        report.reason === "OTHER" ? report.otherReason : report.reason
      }`}
    </Alert>
  );
};
