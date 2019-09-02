import React, { Component } from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ email: '', password: '' })
  }

  handleChange = event => {
    const { name, value } = event.target;
    
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state;
    return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={this.handleSubmit}>
        <FormInput 
          name="email" 
          type="email" 
          value={email} 
          label='email'
          handleChange={this.handleChange}
          required />
        <FormInput 
          name="password" 
          type="password" 
          value={password} 
          label='password'
          handleChange={this.handleChange}
          required />

        <CustomButton type="submit">Sign In</CustomButton>
        <CustomButton onClick={signInWithGoogle}>Sign In With Google</CustomButton>
      </form>
    </div>
    )
  }
}

export default SignIn;