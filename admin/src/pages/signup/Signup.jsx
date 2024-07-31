import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import './Signup.css';

const Signup = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const handleSignUp = () => {
    const data = {
      fullname: fullname,
      email: email,
      password: password,
      phone: phone,
    };
    //fetch('https://haule2.onrender.com/admin/signup'
    const postSignup = () => {
      fetch('http://localhost:5000/admin/signup', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigate('/signin');
    };

    postSignup();
  };

  return (
    <div className='signup-container'>
      <Header />
      <div className='signup-form'>
        <form className='signup-form__center'>
          <h1>Sign Up</h1>
          <div className='signup-form__form-control'>
            <label htmlFor='fullname'>Fullname</label>
            <input
              type='fullname'
              name='fullname'
              placeholder='Fullname'
              onChange={e => setFullname(e.target.value)}
            />
          </div>
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
          <div className='signup-form__form-control'>
            <label htmlFor='phone'>Phone</label>
            <input
              type='phone'
              name='phone'
              placeholder='Phone'
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div className='singup-form__buttons'>
            <button className='btn' onClick={() => handleSignUp()}>
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
