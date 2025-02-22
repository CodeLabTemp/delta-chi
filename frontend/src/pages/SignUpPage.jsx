import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

// Helper function to format names in Title Case
const formatTitleCase = (name) => {
  return name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function SignUpPage() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      await signup(firstname, lastname, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg"
      >
        <div className="flex flex-col-2 justify-center items-center gap-4 pb-4">
          <img
            src="/deltachilogo.png"
            alt="Logo" 
            className="w-[44px] h-[60px]"
          />
          <div className="text-center">
            <h1 className="text-primary-red font-bold text-2xl font-merriweather leading-[25px] text-center">DELTA CHI</h1>
            <span className="font-merriweather leading-[15px] text-xs">CSU East Bay</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col p-4 tablet-sm:p-8 bg-white border-custom-gray border rounded-lg gap-16">
        <h2 className="text-primary-red font-bold text-[32px] font-lora leading-[41px] text-center">Create your account </h2>
          <div className="w-full flex flex-col gap-4">
            <div className="grid tablet-sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div className="space-y-2" >
                {/*<Label htmlFor="firstname">First Name</Label>*/}
                <motion.div whileFocus="focus" variants={inputVariants}>
                  <div className="relative">
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Frist Name"
                      value={firstname}
                      onChange={(e) =>
                        setFirstname(formatTitleCase(e.target.value))
                      }
                      className="w-full py-6 px-8 border bg-[#FFFDF9] border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </motion.div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                {/*<Label htmlFor="lastname">Last Name</Label>*/}
                <motion.div whileFocus="focus" variants={inputVariants}>
                  <div className="relative">
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLastname(formatTitleCase(e.target.value))}
                      className="w-full py-6 px-8 border bg-[#FFFDF9] border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Email */}
            <div className="space-y-2">
              {/*<Label htmlFor="email">Email</Label>*/}
              <motion.div whileFocus="focus" variants={inputVariants}>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    className="w-full py-6 px-8 border bg-[#FFFDF9] border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              {/*<Label htmlFor="password">Password</Label>*/}
              <motion.div whileFocus="focus" variants={inputVariants}>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setShowTooltip(true)}
                    onBlur={() => setShowTooltip(false)}
                    className="w-full py-6 px-8 border bg-[#FFFDF9] border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </motion.div>

              {/* Tooltip - Appears when focusing on the password field */}
              {showTooltip && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white text-gray-700 text-sm p-3 border border-gray-300 rounded shadow-lg z-10">
                  <p className="font-semibold flex items-center">
                    <Info className="w-4 h-4 mr-1" /> Password must contain:
                  </p>
                  <ul className="list-disc ml-4 mt-1 space-y-1">
                    <li>At least 8 characters</li>
                    <li>One lowercase letter</li>
                    <li>One uppercase letter</li>
                    <li>One number</li>
                    <li>One special symbol</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              {/*<Label htmlFor="confirmPassword">Confirm Password</Label>*/}
              <motion.div whileFocus="focus" variants={inputVariants}>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full py-6 px-8 border bg-[#FFFDF9] border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Error Messages */}
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          
          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" className="w-full bg-primary-yellow text-black font-extrabold py-2 px-4 font-montserrat rounded-none" disabled={isLoading}>
              {isLoading ? "Loading..." : "Create an account"}
            </Button>
          </motion.div>

          <p className="flex gap-4 items-center justify-center text-center">
            Already have an account?{" "}
            <a href="/login" className="text-[#11375C] font-extrabold">
            Sign in
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
