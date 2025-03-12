

export default function SignUpFooter({setIsSubmitClicked, isSubmitClicked}) {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
    <button 
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      onClick={()=>setIsSubmitClicked(!isSubmitClicked)}
      >
      REGISTER
    </button>
    <div className="flex items-center gap-2">
      <span className="text-gray-600">Already have an account?</span>
      <button className="text-blue-500 hover:underline">Login</button>
    </div>
  </div>  
  )
}
