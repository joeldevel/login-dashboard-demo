import React from 'react';
import UpdateUserDataForm from './UpdateUserDataForm';

const Dashboard = ({token, id}) => {
  return (
      <UpdateUserDataForm token={token} id={id}/>
  );
}

export default Dashboard;
