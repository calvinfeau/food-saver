import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordConf: ""
    };
  }

  handleChange = e => {
    // this.props.updateMessage("");
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      this.props.handleSignupOrLogin();
      this.props.history.push("/myfood");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      // this.props.updateMessage(err.message);
      console.log("catch err signup");
    }
  };

  isFormInvalid() {
    return !(
      this.state.name &&
      this.state.email &&
      this.state.password === this.state.passwordConf
    );
  }

  render() {
    return (
      <div className="row row-lg align-items-center justify-content-center margin-top">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Name"
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
              />
          </div>
          <div className="form-group">
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
          </div>
          <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Password"
                value={this.state.password}
                name="password"
                onChange={this.handleChange}
              />
          </div>
          <div className="form-group">
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="Confirm Password"
                value={this.state.passwordConf}
                name="passwordConf"
                onChange={this.handleChange}
              />
          </div>
            <div className="d-flex bd-highlight justify-content-center">
              <div className='p-2 bd-highlight'>
                <button
                  className="btn btn-success"
                  disabled={this.isFormInvalid()}
                >
                  Sign Up
                </button>
              </div>
              <div className='p-2 bd-highlight'>
                <Link className="btn btn-outline-dark" to="/">Cancel</Link>
              </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SignUpForm;