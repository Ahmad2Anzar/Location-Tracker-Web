import { useEffect, useState } from 'react'
import { FaUser, FaMobileAlt, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useRecoilState } from 'recoil'
import signupStates from '../../recoil/atom/user_atoms'
import UserValidator from '../../validators/UserValidator'
const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SignUpBody({isSubmitClicked}) {
  const [username, setUsername] = useRecoilState (signupStates.username)
  const [name, setName] = useRecoilState(signupStates.name)
  const [mobile, setMobile] = useRecoilState(signupStates.mobile)
  const [managerId, setManagerId] = useRecoilState(signupStates.managerId)
  const [password, setPassword] = useRecoilState(signupStates.password)
  const [confirmPassword, setConfirmPassword] = useRecoilState(signupStates.confirmPassword)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [usernameError, setUsernameError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [managerIdError, setManagerIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => 
    { 
      if (isFirstRender) {
        setIsFirstRender(false); // Update state to mark that first render is done
        return; // Exit on first render
      }
      
      const validator = new UserValidator();

      const fieldsToValidate = [
        { id: 'username', value: username },
        { id: 'name', value: name },
        { id: 'mobile', value: mobile },
        { id: 'managerId', value: managerId },
        { id: 'password', value: password},
        { id: 'confirmPassword', value: confirmPassword}
      ];
  
      const errors = validator.validate(fieldsToValidate);
  
        setUsernameError(errors.username || false);
        setNameError(errors.name || false);
        setMobileError(errors.mobile || false);
        setManagerIdError(errors.managerId || false);
        setPasswordError(errors.password || false);
        setConfirmPasswordError(errors.confirmPassword || false);

        const hasErrors = Object.values(errors).some(Boolean);
        
        if (!hasErrors){
          signUpUser()
        }
  }
  ,[isSubmitClicked])

  const signUpUser = async () => {
    let data = {
      username,
      name,
      phoneNumber: mobile,
      password,
      managerId,
    };
  
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Signup failed");
      }
  
      console.log("User signed up successfully:", result);
      // Handle successful signup (e.g., redirect or show success message)
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle error (e.g., show error message to the user)
    }
  };
  

  return (
    <div className="w-full px-4 pt-12 pb-12 bg-red-100  flex justify-center items-center ">
    <form className="bg-white shadow-2xl w-100 rounded-2xl px-8 pt-16 pb-8 mb-4 transform transition-all duration-300 hover:scale-[1.01]"> 

     <div className="mb-4">
        <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
          <input
            value={username}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e)=>{setUsername(e.target.value)}}
            required
            className="pl-12 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
          />
        </div>
        {usernameError && <div className="text-red-500 text-sm">{usernameError}</div>}
      </div>

      <div className="mb-4">
        <div className="relative">
          
            <FaUser className="absolute left-4 top-3 text-gray-500" />
         
          <input
            value={name}
            type="text"
            name="name"
            id="name"
            placeholder="   Full Name"
            onChange={(e)=>{setName(e.target.value)}}
            required
           className="pl-8 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
          />
        </div>
        {nameError && <div className="text-red-500 text-sm">{nameError}</div>}
      </div>

      <div className="mb-4">
        <div className="relative">
          
            <FaMobileAlt className="absolute left-4 top-3 text-gray-500" />
        
          <input
            value={mobile}
            type="tel"
            name="mobile"
            id="mobile"
            placeholder="    Mobile Number"
            onChange={(e)=>{setMobile(e.target.value)}}
            required
           className="pl-8 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
          />
        </div>
        {mobileError && <div className="text-red-500 text-sm">{mobileError}</div>}
      </div>

      <div className='mb-4'>
        <div className="relative">
          
            <FaUser className="absolute left-4 top-3 text-gray-500" />
        
  
          <input
            value={managerId}
            type="Number"
            name="managerId"
            id="managerId"
            placeholder="    Manager ID"
            onChange={(e) => setManagerId(e.target.value)}
            required
           className="pl-8 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
          />
        </div>
        {managerIdError && <div className="text-red-500 text-sm">{managerIdError}</div>}
      </div>


      {/* Password Input */}
      <div className="mb-4">
        <div className="relative">
          
            <FaLock className="absolute left-4 top-3 text-gray-500" />
        
          <input
            value={password}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="    Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            required
           className="pl-8 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}
      </div>

      {/* Confirm Password Input */}
      <div className="mb-4">
        <div className="relative">
          
            <FaLock className="absolute left-4 top-3 text-gray-500" />
        
          <input
            value={confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="    Confirm Password"
            onChange={(e)=>{setConfirmPassword(e.target.value)}}
            required
           className="pl-8 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none bg-gray-100"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {confirmPasswordError && <div className="text-red-500 text-sm">{confirmPasswordError}</div>}
      </div>
    </form>
  </div>
  )
}
