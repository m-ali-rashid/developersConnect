import React, { Fragment, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FormControl } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { login } from "../../actions/auth";

const theme = createMuiTheme({
  overrides: {
    MuiFormControl: {
      root: {
        color: 'white',
        minWidth:'300px',
        marginBottom:'2rem'
      },
    },
    MuiFormLabel:{
      root:{
        color:'white',
        '&.Mui-focused': {
          color:'#ffbf5e'
        }
      }
    },

    MuiInputBase:{
      input:{
        '&:focus':{
        backgroundColor:'red'
        }
      }
    },
    MuiInput:{
      input:{
        color:'white',
      },
      underline:{
        '&::after': {
          content: `''`,
          borderBottom: '2px solid #ffbf5e',
        },
        '&::before': {
          content: `''`,
          borderBottom: '2px solid white',
        }
      }
    },
  },
});

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if Logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <div className="my-3"></div>
      <ThemeProvider theme={theme}>
        <form onSubmit={(e) => onSubmit(e)}>‏
            <FormControl>
                <TextField
                  id="myemail"
                  label="email"
                  type="email"
                  name="email"
                  onChange={(e) => onChange(e)}
                  required 
                />
                <TextField
                  id="mypassword"
                  label="password"
                  type="password"
                  name="password"
                  onChange={(e) => onChange(e)}
                  required 
                />
              <input type="submit" className="btn btn-primary" value="Login" />
            </FormControl>
        </form>
      </ThemeProvider>
      <p className="my-1">
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
