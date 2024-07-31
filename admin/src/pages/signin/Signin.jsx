import './Signin.css';
import Header from '../../components/Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = e => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    const postSignin = async () => {
      const response = await axios.post(
        'http://localhost:5000/admin/signin',
        data
      );

      if (response.status === 200) {
        console.log(response);
        localStorage.setItem('token', response.data.accessToken);
        navigate('/products');
      } else {
        alert(response.statusText);
      }
    };

    postSignin();
  };
  return (
    <div className='signup-container'>
      <Header />
      <div className='signup-form__center'>
        <h1>Sign In</h1>
        <div className='signup-form__form-control'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='signup-form__form-control'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className='signup-form__buttons'>
          <button className='btn' onClick={e => handleSignIn(e)}>
            Sign In
          </button>
          <button className='btn' onClick={e => handleSignUp(e)}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
