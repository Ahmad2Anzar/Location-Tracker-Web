import {useState} from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [errors, setErrors] = useState({ username: "", password: "" , confirmPassword:""});

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    if (!username) validationErrors.username = "username can't be blank";
    if (!password) validationErrors.password = "Password can't be blank";
    if (!confirmPassword) validationErrors.confirmPassword = "Confirm Password can't be blank";
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        let data = {
          username,
          password,
        };
    
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
    
        const result = await response.json();
    
        if (!response.ok) {
          throw new Error(result.message || "Login failed");
        }
    
        console.log("User logged in successfully:", result);
        // Handle successful login (e.g., store token, redirect user)
      } catch (error) {
        console.error("Error logging in:", error.message);
        // Handle error (e.g., show error message to the user)
      }
    }else {
      toast.error('Invalid Credentials')
    }
  };
  return (
    <div className="flex flex-column justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forget Password</h2>
      <div className="bg-white m-8 p-8 rounded-2xl shadow-xl w-96 md:w-[450px] h-2/4">

        <form id="signup-form" onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="relative mb-6">
            <FaUser className="absolute left-4 top-4 text-gray-500" size={20} />
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              className="pl-12 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="text-red-500 text-sm mt-1">{errors.username}</div>
            )}
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="relative mb-6">
            <FaLock className="absolute left-4 top-5 text-gray-500" size={20} />
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              className="pl-12 pr-12 py-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-5 text-gray-500"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FaEye/> : <FaEyeSlash />}
            </button>
            {errors.password && (
              <div className="text-red-500 text-sm mt-1">{errors.password}</div>
            )}
          </div> 

          <div className="relative mb-6">
            <FaLock className="absolute left-4 top-5 text-gray-500" size={20} />
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              placeholder="Enter Confirm Password"
              className="pl-12 pr-12 py-3 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-5 text-gray-500"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? <FaEye/> : <FaEyeSlash />}
            </button>
            {errors.confirmPasswordpassword && (
              <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <p className="mt-4 text-center text-gray-700">
        <a href="/auth/login" className="text-purple-600 hover:underline font-semibold">
            Back to Login
        </a>
      </p>  
    </div>
  );
}

