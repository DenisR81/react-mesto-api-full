import React from "react";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";

const Login = (props) => {
  const [formParams, setFormParams] = React.useState({
    email: "",
    password: "",
  });
  const [signupSuccess, setSignupSuccess] = React.useState(true);
  const [isToolTipOpen, setIsToolTipOpen] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formParams;
    props.handleLogin({ email, password }).catch((err) => {
      setSignupSuccess(false);
      setIsToolTipOpen(true);
    });
  };

  const handleCloseToolTip = () => {
    setIsToolTipOpen(false);
  };

  return (
    <div className="page">
      <Header
        loggedIn={props.loggedIn}
        navText="Регистрация"
        navLink="signup"
      />
      <div className="login">
        <h2 className="login__text">Вход</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            id="email"
            name="email"
            type="email"
            value={formParams.email}
            onChange={handleChange}
            className="login__input login__input-field"
            placeholder="Email"
            required
          />
          <input
            id="password"
            name="password"
            type="password"
            value={formParams.password}
            onChange={handleChange}
            className="login__input login__input-field"
            placeholder="Пароль"
            required
          />
          <div className="login__but">
            <button
              type="submit"
              className="login__but-submit login__but-submit_mod"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
      <InfoTooltip
        isOpen={isToolTipOpen}
        onClose={handleCloseToolTip}
        success={signupSuccess}
        message=""
      />
    </div>
  );
};

export default Login;
