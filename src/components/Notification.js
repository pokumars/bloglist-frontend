import React from 'react';

const Notification = (props) => {
  const { message } = props;
  if (message === null){
    return null;
  }

  const notificationStyle = {
    color: message.positive? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  };



  return (
    <div style={notificationStyle}>
      <p>{message.message}</p>
    </div>
  );
};

export default Notification;