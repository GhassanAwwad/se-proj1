import React from 'react';

function TeamInfoPage(props) {
  const { id, name, groupEmail } = props.teamInfo;

  return (
    <div>
      <h1>Team Info</h1>
      <ul>
        <li><strong>ID:</strong> {id}</li>
        <li><strong>Name:</strong> {name}</li>
        <li><strong>Group Email:</strong> {groupEmail}</li>
      </ul>
    </div>
  );
}

export default TeamInfoPage;