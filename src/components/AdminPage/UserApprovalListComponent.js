import React, { useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { updateIsApprovedStatus } from "../../services/userService";

export const UserApprovalListComponent = ({
  pendingApprovalArray,
  toggleRender,
  setToggleRender,
}) => {
  const handleAprrovalOrReject = (isApproved, userId) => {
    updateIsApprovedStatus(isApproved, userId).then((response) => {
      setToggleRender(!toggleRender);
    });
  };
  useEffect(() => {}, [toggleRender]);
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email Id</th>
          <th>Phone No</th>
          <th>Location</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {!pendingApprovalArray ? (
          <Spinner animation="border" variant="info" />
        ) : (
          pendingApprovalArray.map((user, i) => (
            <tr key={user.id}>
              <td>{i + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{`${user.location.locality}, ${user.location.city}, ${user.location.state}`}</td>
              <td>
                <Button
                  variant="outline-success"
                  onClick={() => {
                    handleAprrovalOrReject(1, user.id);
                  }}
                >
                  {" "}
                  Approve
                </Button>
                {` `}
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    handleAprrovalOrReject(1, user.id);
                  }}
                >
                  {" "}
                  Reject
                </Button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};
