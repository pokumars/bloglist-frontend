import React from 'react';

const Footer = ()=> {
    const footerStyle= {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return(
        <>
            <div style={footerStyle}>
                <br/>
                <p>to test this out you can use ---> username: "mojo" & password: "chelsea2005"</p>
                
            </div>
        </>
    );
}

export default Footer;