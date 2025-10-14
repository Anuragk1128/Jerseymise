"use client"

import type React from "react"
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleLoginButton from "./google"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"
import { User, Loader2, ArrowLeft } from "lucide-react"
import { OTPInput } from "@/components/otp-input"
import { sendOTP, sendForgotPasswordOTP, resetPasswordWithOTP } from "@/lib/api"

export function AuthDialog() {
  const { login, register } = useAuth()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Registration step state
  const [registrationStep, setRegistrationStep] = useState<1 | 2>(1)
  const [otp, setOtp] = useState("")
  const [otpTimer, setOtpTimer] = useState(0)
  const [canResendOTP, setCanResendOTP] = useState(false)

  // Forgot Password state
  const [showForgot, setShowForgot] = useState(false)
  const [forgotStep, setForgotStep] = useState<1 | 2>(1)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotOTP, setForgotOTP] = useState("")
  const [forgotPassword, setForgotPassword] = useState("")
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState("")
  const [forgotOtpTimer, setForgotOtpTimer] = useState(0)
  const [forgotCanResend, setForgotCanResend] = useState(false)

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Timer for OTP expiration (10 minutes = 600 seconds)
  useEffect(() => {
    if (otpTimer > 0) {
      const interval = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setCanResendOTP(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [otpTimer])

  // Timer for Forgot Password OTP expiration (10 minutes = 600 seconds)
  useEffect(() => {
    if (forgotOtpTimer > 0) {
      const interval = setInterval(() => {
        setForgotOtpTimer((prev) => {
          if (prev <= 1) {
            setForgotCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [forgotOtpTimer])

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Reset registration form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setRegistrationStep(1)
      setOtp("")
      setOtpTimer(0)
      setCanResendOTP(false)
      setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" })
      // Reset forgot password state
      setShowForgot(false)
      setForgotStep(1)
      setForgotEmail("")
      setForgotOTP("")
      setForgotPassword("")
      setForgotConfirmPassword("")
      setForgotOtpTimer(0)
      setForgotCanResend(false)
    }
  }, [isOpen])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!registerForm.email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await sendOTP(registerForm.email)
      if (result.success) {
        toast({
          title: "OTP Sent!",
          description: result.message || "Please check your email for the OTP.",
        })
        setRegistrationStep(2)
        setOtpTimer(600) // 10 minutes
        setCanResendOTP(false)
      } else {
        toast({
          title: "Failed to send OTP",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!forgotEmail) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const result = await sendForgotPasswordOTP(forgotEmail)
      if (result.success) {
        toast({
          title: "OTP Sent!",
          description: result.message || "Please check your email for the OTP.",
        })
        setForgotStep(2)
        setForgotOtpTimer(600)
        setForgotCanResend(false)
      } else {
        toast({
          title: "Failed to send OTP",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotResendOTP = async () => {
    setIsLoading(true)
    try {
      const result = await sendForgotPasswordOTP(forgotEmail)
      if (result.success) {
        toast({
          title: "OTP Resent!",
          description: "A new OTP has been sent to your email.",
        })
        setForgotOtpTimer(600)
        setForgotCanResend(false)
        setForgotOTP("")
      } else {
        toast({
          title: "Failed to resend OTP",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (forgotOTP.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP sent to your email.",
        variant: "destructive",
      })
      return
    }
    if (forgotPassword.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }
    if (forgotPassword !== forgotConfirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await resetPasswordWithOTP({ email: forgotEmail, otp: forgotOTP, newPassword: forgotPassword })
      if (result.success) {
        toast({
          title: "Password reset successful",
          description: "You can now sign in with your new password.",
        })
        // Prefill login email and go back to login form
        setLoginForm({ email: forgotEmail, password: "" })
        setShowForgot(false)
        setForgotStep(1)
        setForgotOTP("")
        setForgotPassword("")
        setForgotConfirmPassword("")
        setForgotOtpTimer(0)
        setForgotCanResend(false)
      } else {
        toast({
          title: "Password reset failed",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)

    try {
      const result = await sendOTP(registerForm.email)
      if (result.success) {
        toast({
          title: "OTP Resent!",
          description: "A new OTP has been sent to your email.",
        })
        setOtpTimer(600) // Reset to 10 minutes
        setCanResendOTP(false)
        setOtp("") // Clear existing OTP input
      } else {
        toast({
          title: "Failed to resend OTP",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(loginForm.email, loginForm.password)
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You have been successfully logged in.",
        })
        setIsOpen(false)
        setLoginForm({ email: "", password: "" })
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Please check your credentials and try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (registerForm.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP sent to your email.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await register(registerForm.email, registerForm.password, registerForm.name, otp)
      if (result.success) {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        })
        setIsOpen(false)
        setRegistrationStep(1)
        setOtp("")
        setOtpTimer(0)
        setRegisterForm({ name: "", email: "", password: "", confirmPassword: "" })
      } else {
        toast({
          title: "Registration failed",
          description: result.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Jerseymise</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            {!showForgot ? (
              <>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        className="p-0 h-auto"
                        onClick={() => {
                          setShowForgot(true)
                          setForgotEmail(loginForm.email)
                          setForgotStep(1)
                          setForgotOTP("")
                          setForgotPassword("")
                          setForgotConfirmPassword("")
                          setForgotOtpTimer(0)
                          setForgotCanResend(false)
                        }}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                      <GoogleLoginButton />
                    </GoogleOAuthProvider>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowForgot(false)
                    setForgotStep(1)
                    setForgotOTP("")
                    setForgotPassword("")
                    setForgotConfirmPassword("")
                    setForgotOtpTimer(0)
                    setForgotCanResend(false)
                  }}
                  className="mb-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Sign In
                </Button>

                {forgotStep === 1 ? (
                  <form onSubmit={handleForgotSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="Enter your email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        "Send OTP"
                      )}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email-readonly">Email</Label>
                      <Input
                        id="forgot-email-readonly"
                        type="email"
                        value={forgotEmail}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Enter OTP</Label>
                      <OTPInput
                        length={6}
                        value={forgotOTP}
                        onChange={setForgotOTP}
                        disabled={isLoading}
                      />
                      <div className="flex items-center justify-between text-sm mt-2">
                        {forgotOtpTimer > 0 ? (
                          <p className="text-muted-foreground">
                            OTP expires in: <span className="font-semibold">{formatTime(forgotOtpTimer)}</span>
                          </p>
                        ) : (
                          <p className="text-destructive">OTP expired</p>
                        )}
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={handleForgotResendOTP}
                          disabled={!forgotCanResend || isLoading}
                          className="p-0 h-auto"
                        >
                          Resend OTP
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="forgot-password">New Password</Label>
                      <Input
                        id="forgot-password"
                        type="password"
                        placeholder="Create a new password"
                        value={forgotPassword}
                        onChange={(e) => setForgotPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="forgot-confirm-password">Confirm New Password</Label>
                      <Input
                        id="forgot-confirm-password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading || forgotOTP.length !== 6}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resetting...
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            {registrationStep === 1 ? (
              // Step 1: Enter Email and Send OTP
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="Enter your email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </form>
            ) : (
              // Step 2: Complete Registration with OTP
              <div className="space-y-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setRegistrationStep(1)
                    setOtp("")
                    setOtpTimer(0)
                  }}
                  className="mb-2"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Change Email
                </Button>
                
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email-readonly">Email</Label>
                    <Input
                      id="register-email-readonly"
                      type="email"
                      value={registerForm.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Enter OTP</Label>
                    <OTPInput
                      length={6}
                      value={otp}
                      onChange={setOtp}
                      disabled={isLoading}
                    />
                    <div className="flex items-center justify-between text-sm mt-2">
                      {otpTimer > 0 ? (
                        <p className="text-muted-foreground">
                          OTP expires in: <span className="font-semibold">{formatTime(otpTimer)}</span>
                        </p>
                      ) : (
                        <p className="text-destructive">OTP expired</p>
                      )}
                      <Button
                        type="button"
                        variant="link"
                        size="sm"
                        onClick={handleResendOTP}
                        disabled={!canResendOTP || isLoading}
                        className="p-0 h-auto"
                      >
                        Resend OTP
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">Confirm Password</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
      </DialogContent>
    </Dialog>
  )
}
