import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from "react-router-dom";

import { LoginButton } from "@/components/ui/loginbutton";
import { LoginInput } from "@/components/ui/logininput";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password, isRememberMe);
  
    // Ensure user state updates before navigating
    setTimeout(() => {
      const { user } = useAuthStore.getState();
        navigate("/dashboard");
    }, 100);
  };
  
  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">

      {/* Logo and Title */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center pb-4">
        <img
          src="/deltachilogo.png"
          alt="Logo"
          className="h-16 mr-4"
        />
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#CA3D31] font-merriweather">DELTA CHI</h1>
          <p className="text-sm text-gray-500 font-lora">CSU East Bay</p>
        </div>
      </motion.div>


      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg p-8 bg-white rounded-lg border border-gray-300"
      >
        <h1 className="text-3xl font-semibold text-center text-[#CA3D31] mb-10 mt-5 font-merriweather break-words pb-10">
          Sign in to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <motion.div whileFocus="focus" variants={inputVariants}>
              <LoginInput
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F1BD19]"
                required
              />
            </motion.div>
          </div>
          <div className="space-y-2">
            <motion.div whileFocus="focus" variants={inputVariants}>
              <LoginInput
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </motion.div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center space-x-3">
              <h1 className="text-sm text-gray-600 font-montserrat">Remember Me</h1>
              <input
                type="checkbox"
                id="rememberMe"
                checked={isRememberMe}
                onChange={(e) => setIsRememberMe(e.target.checked)}
                className="w-5 h-5 appearance-none bg-gray-300 checked:bg-[#F1BD19] checked:ring-2 checked:ring-[#F1BD19] focus:outline-none transition-colors rounded-none"
              />
            </div>
            <Link to="/forgot-password" className="text-sm text-blue-900 hover:underline mt-2 sm:mt-0 font-montserrat">
              Forgot Password?
            </Link>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Sign In"}
            </LoginButton>
          </motion.div>

          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </form>

        <div className="flex flex-wrap justify-between items-center mt-10 text-sm text-gray-600 font-montserrat ml-6">
          <p>Don’t have an account?</p>
          <Link to="/signup" className="text-blue-900 hover:underline mt-2 mr-9 sm:mt-0 font-montserrat">
            Create account
          </Link>
        </div>


      </motion.div>
    </div>
  );
}
