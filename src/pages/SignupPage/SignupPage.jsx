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
        <div className="SignUpPage">
          <h1>Sign Up Page</h1>
          <SignUpForm {...this.props} />
        </div>
      );
    }
  }

export default SignUpPage;