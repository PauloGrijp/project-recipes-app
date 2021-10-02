import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/Login.module.scss';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);

  const loginValidation = () => {
    const emailValidation = (/[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{3,}/i);
    const passwordValidation = 6;
    if (emailValidation.test(email) && password.length > passwordValidation) {
      setIsDisable(false);
    } else setIsDisable(true);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    history.push('/comidas');
  };

  useEffect(() => {
    loginValidation();
  });

  return (
    <main>
      <form>
        <h1>Login</h1>
        <input
          name="email"
          type="email"
          data-testid="email-input"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Digite seu email"
        />
        <input
          name="password"
          type="password"
          data-testid="password-input"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Digite sua senha"
        />
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={isDisable}
          onClick={() => handleClick()}
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;
