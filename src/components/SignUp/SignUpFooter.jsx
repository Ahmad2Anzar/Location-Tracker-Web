

export default function SignUpFooter({setIsSubmitClicked, isSubmitClicked}) {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
    <button 
      className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
      onClick={()=>setIsSubmitClicked(!isSubmitClicked)}
      >
      REGISTER
    </button>
    <div className="flex items-center gap-2 mb-4">
    <p className="mt-4 text-center text-gray-700">
      Already have an account?{" "}
      <a href="/auth/login" className="text-purple-600 hover:underline font-semibold">
        Log In
      </a>
    </p>
    </div>
  </div>  
  )
}
