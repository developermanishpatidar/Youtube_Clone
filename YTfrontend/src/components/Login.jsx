import { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [avatar, setAvatar] = useState("");

  function handleRegister() {
    if(avatar && username && email && password) {
        const response = fetch("http://localhost:8050/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar,
          username,
          email,
          password
        })
      })
      const result = response.then( (data)=> data.json() )
      result.then((data)=>{
          setAvatar("");
          setUsername("")
          setPassword("")
          setEmail("")
          alert(data.message)
          props.onClose();
      })
    }else {
      alert("All field's are required")
    }
    
    
  }

  function handleLogin() {
    if(email && password) {
        const response = fetch("http://localhost:8050/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password
        })
    })
      const result = response.then( (data)=> data.json() )
      result.then((data)=>{
        if(data.message) {
          setUsername("")
          setPassword("")
          setEmail("")
          props.onClose();
          alert(data.message)
        }else {
          setUsername("")
          setPassword("")
          setEmail("")
          props.onClose();
          alert("User login successfully");
          localStorage.setItem("useravatar", data.user.avatar)
          localStorage.setItem("token" , data.AccessToken)
        }
      })
    }else {
      alert("Email or password are required")
    }
  }

  return (
    <div
      
      className={`fixed flex top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full ${
        props.isVisible ? "" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-md max-h-full h-screen items-center justify-center mx-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            data-testid="login-modal"
            
            onClick={props.onClose}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div className="space-y-6">
              {!isSignUp && (
                <div>
                  <div className="mt-4">
                    <label
                      htmlFor="image_url"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Paste Avatar Url
                  </label>
                    <input
                      type="text"
                      placeholder="Paste image URL"
                      value={avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter your name"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={
                  !isSignUp ? (e) => handleRegister(e) : (e) => handleLogin(e)
                }
              >
                {!isSignUp ? "Register" : "Login to your account"}
              </button>
              {isSignUp ?
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Not registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={() => setIsSignUp(false)}
                >
                  Create account
                </a>
              </div>
              :
              <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Have registered?{" "}
                <a
                  href="#"
                  className="text-blue-700 hover:underline dark:text-blue-500"
                  onClick={() => setIsSignUp(true)}
                >
                  Login account
                </a>
              </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;