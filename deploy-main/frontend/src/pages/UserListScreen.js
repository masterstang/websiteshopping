import React, { useEffect } from "react";

/* REACT ROUTER BOOTSTRAP */
import { LinkContainer } from "react-router-bootstrap";

/* REACT BOOTSTRAP */
import { Table, Button, Card } from "react-bootstrap";

/* COMPONENTS */
import Message from "../components/Message";
import Loader from "../components/Loader";
import "../pages-css/list.css"


/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import { listUsers, deleteUser } from "../actions/userActions";
import { Divider } from "@mui/material";

import { useTranslation } from 'react-i18next';

function UserListScreen({ history }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  /* PULLING OUT STATE */
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // WE NEED THE SUCCESS VALUE SO WHEN WE SUCCESSFULLY DELETE THE USER WE WANT THE NEW DATA
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    // WE DON'T WANT NON ADMINS TO ACCESS THIS PAGE SO REDIRECT IF SOMEBODY TRIES TO

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, successDelete, userInfo]);

  /* HANDLER */
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user ?"))
      dispatch(deleteUser(id));
  };

  return (
    <Card className="cardorderlist" sx={{margin: '2%'}}>
    <div  className="boxuserlist">

    <div>
      <h1>{t('Users')}</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="boxuserlist">
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>{t('ID')}</th>
              <th>{t('NAME')}</th>
              <th>{t('EMAIL')}</th>
              <th>{t('ADMIN')}</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </div>

      )}
    </div>
    </div>
    </Card>

  );
}

export default UserListScreen;
