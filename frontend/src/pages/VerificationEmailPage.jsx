import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


export default function VerificationEmailPage() {
  const [value, setValue] = useState("");
  const { verifyEmail, isLoading, error } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (value.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a 6-digit verification code.",
        variant: "destructive",
      });
      return;
    }

    try {
      await verifyEmail(value);
      toast({
        title: "Email Verified!",
        description: "Your email has been successfully verified.",
      });
      navigate("/login");
    } catch (err) {
      toast({
        title: "Verification Failed",
        description: err.message || "Invalid verification code.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Logo and Title */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center pb-6">
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
      <div className="bg-white p-10 rounded-lg w-full max-w-md text-center border border-gray-300 min-h-[450px] flex flex-col justify-center">
        <h1 className="text-2xl font-semibold text-[#CA3D31] mb-6">Verify your account</h1>
        <p className="text-gray-600 text-sm mb-4">An email with the verification code has been sent!</p>
        <p className="text-gray-600 text-sm mb-8">If you don't see it, check your spam folder.</p>

        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          inputMode="text"
          className="flex justify-center w-full"
        >
          <InputOTPGroup className="flex justify-center w-full gap-3 mb-5">
            {[...Array(6)].map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="w-14 h-16 text-lg border border-gray-300 text-center"
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                inputMode="text"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <p className="text-sm text-gray-500 mb-6">Enter your verification code</p>

        {error && <p className="text-red-500 text-sm mb-6">{error}</p>}

        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full text-black font-bold bg-[#F1BD19] py-3"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </Button>

        <p className="text-sm text-gray-600 mt-6">
          Didn't get the code? <span className="text-[#11375C] font-bold cursor-pointer hover:underline">Resend Email</span>
        </p>
      </div>
    </div>
  );
}
