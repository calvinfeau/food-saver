import React, { Component } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { Link } from 'react-router-dom';

class SignUpPage extends Component {
    constructor(props) {
      super(props);
      this.state = { message: "" };
    }
  
    updateMessage = msg => {
      this.setState({ message: msg });
    };
  
    render() {
      return (
        <div className='container-fluid'>
          <div className='row row-sm align-items-end '>
            <div className='col-12 txt-lg main-color'>FOOD SAVER</div>
          </div>
          <SignUpForm {...this.props} />
        </div>
      );
    }
  }

export default SignUpPage;