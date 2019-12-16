import React from 'react';
import { BrowserRouter as Router, Link,  Route } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const UserList = (props) => {

  return (
    <>
      <h2>Users</h2>
      <ul>
      </ul>
      <Table striped hover size="sm">
        <tbody>
          <tr>
            <th>User</th>
            <th>BlogsCreated</th>
          </tr>
          {props.users.map((u) => <tr key={u.id}>
            <td>
              <Link key={u.id} to={`/users/${u.id}`}>
                {u.name? u.name : u.username}
              </Link>
            </td>
            <td>{u.blogs.length}</td>
          </tr>)}

        </tbody>
      </Table>

    </>
  );
};
export default UserList;