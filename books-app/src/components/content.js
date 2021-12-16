import React, { Component } from 'react';

// excuse all the <br/>'s just trying to pretty it up
class Content extends Component {
    render() {
        return (
            <div>
                <h1>Have you been reading too long?</h1>
                <h2>It's already {new Date().toLocaleTimeString()}!</h2><br /><br /><br /><br /><br /><br /><br /><br />
                <h3>This app has been designed to keep track of books. Whether you'd like to post your collection online for others to see
                    or you're putting them up for auction. Edit, Delete, Create, chop and change anything you want with just a couple of easy clicks!
                </h3><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <p>Developed by: <br/><br/> Natan Trosman - G00347770</p>
            </div>
        );
    }
}
export default Content;