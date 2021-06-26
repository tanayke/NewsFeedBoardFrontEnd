import React, { useState } from "react";
import { Popover, Button, OverlayTrigger, Form } from "react-bootstrap";

export const ArticleReport = () => {
  const [otherType, setOtherType] = useState("");
  const [type, setType] = useState("");
  const handleOnChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
  };
  return (
    <>
      <div style={{ display: "block", width: 700, padding: 30 }}>
        <OverlayTrigger
          placement="top"
          trigger="click"
          overlay={
            <Popover>
              <Popover.Title as="h3">Report</Popover.Title>
              <Popover.Content>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  {type !== "OTHER" ? (
                    <Form.Group>
                      <Form.Control
                        as="select"
                        name="reportType"
                        onChange={(e) => handleOnChange(e)}
                      >
                        <option value="">--Select type--</option>
                        <option value="ABUSIVE">Abusive</option>
                        <option value="FAKE">Fake</option>
                        <option value="HARRASMENT">Harrasmanent</option>
                        <option value="SCAM">Scam</option>
                        <option value="OTHER">Other</option>
                      </Form.Control>
                    </Form.Group>
                  ) : null}
                  <Form.Group>
                    {type === "OTHER" ? (
                      <Form.Control
                        type="text"
                        name="other"
                        placeholder="Enter Report type"
                        onChange={(e) => setOtherType(e.target.value)}
                      />
                    ) : null}
                  </Form.Group>
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                  {type === "OTHER" ? (
                    <Button
                      className="ml-2"
                      variant="primary"
                      onClick={() => setType("")}
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
            variant="danger"
            onClick={() => {
              setOtherType("");
            }}
          >
            <h6>Report Article</h6>
          </Button>
        </OverlayTrigger>
      </div>
    </>
  );
};
