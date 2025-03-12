import React, {useState} from 'react'
import { Link } from "react-router-dom";
import '../../assets/styles/SignUp.scss'
import Img from '../../assets/pictures/30 1.png'
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!email) validationErrors.email = "Email can't be blank";
    if (!password) validationErrors.password = "Password can't be blank";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // API call or other logic goes here

      // Show success toast
      toast.success('Login successfull')
    } else {
      // Show error toast
      toast.error('Invalid Credentials')
    }
  };

  return (
    <div className="signUp__body">
      <div className="signUp__logo">
        <Link to="/">
          <img src={Img} alt="Logo" />
        </Link>
      </div>
      <div className="signUp__form">
        <form
          onSubmit={handleSubmit}
          className="form-horizontal mt-3"
          id="signup-form"
        >
          <div className="signUp__form-section active">
            <div className="signUp__flex">
              <h2>Login Details</h2>
              <div className="signUp__input-container">
                <label
                  htmlFor="emailID"
                  className="signUp__input-label"
                  dangerouslySetInnerHTML={{
                    __html: 'Email <span style="color: red;">*</span>',
                  }}
                />
                <input
                  type="email"
                  id="emailID"
                  placeholder="Enter e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="signUp__input"
                />
                {errors.email && (
                  <div
                    id="email_error"
                    className="error-message-text"
                    style={{ color: "red" }}
                  >
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="signUp__input-container">
                <label
                  htmlFor="password-input"
                  className="signUp__input-label"
                  dangerouslySetInnerHTML={{
                    __html: 'Password <span style="color: red;">*</span>',
                  }}
                />
                <input
                  type="password"
                  id="password-input"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="signUp__input"
                />
                {errors.password && (
                  <div
                    id="password_error"
                    className="error-message-text"
                    style={{ color: "red" }}
                  >
                    {errors.password}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-sm-4 text-center">
              <button
                type="submit"
                className="signUp__button"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 text-center text-muted">
          <p className="mb-0">
            <Link to="/auth/signup">Sign up</Link> | <Link to="/auth/password/reset">Forgot your password?</Link>
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
