import React from 'react';

function UserInfoPage(props) {
  const { id, email, password, role, teamId } = props.userInfo;

  return (
    <div>
      <h1>User Info</h1>
      <ul>
        <li><strong>ID:</strong> {id}</li>
        <li><strong>Email:</strong> {email}</li>
        <li><strong>Password:</strong> {password}</li>
        <li><strong>Role:</strong> {role}</li>
        <li><strong>Team ID:</strong> {teamId}</li>
      </ul>
    </div>
  );
}

export default UserInfoPage;