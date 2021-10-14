import React, { useState } from 'react';
import InputCard from '../components/InputCard';
import { loginValidator } from '../redux/helper';
import ButtonCard from '../components/ButtonCard';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('mealsToken', 1);
  };
  return (
    <div className="log-container">
      <h1>Recipes App</h1>
      <div className="none" />
      <form className="form">
        <img src="https://a-static.besthdwallpaper.com/itens-de-cozinha-papel-de-parede-2560x1600-3471_7.jpg" alt="cook" />
        <div className="inputs-group">
          <InputCard
            id="email"
            name="email"
            type="text"
            testId="email-input"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
          <InputCard
            id="login"
            name="login"
            type="password"
            testId="password-input"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
          <ButtonCard
            page="/comidas"
            testId="login-submit-btn"
            buttonText="Entrar"
            onClick={ handleSubmit }
            disabled={ !loginValidator({ email, password }) }
            class="action-button"
          />
        </div>
      </form>
      <div className="none" />
    </div>
  );
}
export default Login;
