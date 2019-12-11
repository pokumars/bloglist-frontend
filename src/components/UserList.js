import React from 'react';
import { BrowserRouter as Router, Link,  Route } from 'react-router-dom';


const UserList = (props) => {

  return (
    <>
      <h2>Users</h2>
      <ul>
      </ul>
      <table>
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
      </table>

    </>
  );
};

/**<li>
        {
          props.users.map((u) => {
            return <Link key={u.id} to={``}>
              
            </Link>;
          })
        }
      </li> */



      /**{props.users.map((u) => <tr key={u.id}>
            <td>{u.name? u.name : u.username}</td>
            <td>{u.blogs.length}</td>
          </tr>)} */

export default UserList;