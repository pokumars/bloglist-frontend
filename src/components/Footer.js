import React from 'react';

const Footer = (props) => {
  const footerStyle= {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 16
  };

  return(
        <>
            <div style={footerStyle}>
              <br/>
              {!props.user && <p >to test this out you can use  username: &quot;mojo&quot; and password: &quot;chelsea2005&quot;</p>}

            </div>
        </>
  );
};

export default Footer;