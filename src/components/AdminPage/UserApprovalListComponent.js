import React, { useEffect, useState } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import {
  updateIsApprovedStatus,
  getAllUsers,
} from "../../services/userService";

export const UserApprovalListComponent = () => {
  const [pendingApprovalArray, setPendingApprovalArray] = useState();
  const [toggleRender, setToggleRender] = useState();

  const handleAprrovalOrReject = (isApproved, userId) => {
    updateIsApprovedStatus(isApproved, userId).then((response) => {
      setToggleRender(!toggleRender);
    });
  };
  useEffect(() => {
    getAllUsers(0, "REPORTER").then((response) => {
      setPendingApprovalArray(response.data);
    });
  }, [toggleRender]);

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
          <Spinner className="spinner" animation="border" variant="info" />
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
