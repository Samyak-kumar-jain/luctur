import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUloginUserMutation, useRegisterUserMutation } from "@/Features/Apis/authApi";
import { toast } from "react-toastify"; // Importing toast notification
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [signup, setSignup] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // Added role property
  });
  const [registerUser, { isError: regError, isLoading: regLoading, isSuccess: regIsSuccess }] = useRegisterUserMutation();
  const [loginUser, { isError: logError, isLoading: logLoading, isSuccess: logIsSuccess }] = useUloginUserMutation();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleChangeInput = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignup((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setLogin((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signup : login;
    const action = type === "signup" ? registerUser : loginUser;

    // Reset errors before validating
    setErrors({});

    // Validation for signup
    if (type === "signup") {
      if (!signup.email || !signup.password || !signup.confirmPassword || !signup.role) {
        setErrors((prev) => ({
          ...prev,
          fields: "Please fill out all fields.",
        }));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signup.email)) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format.",
        }));
        return;
      }

      if (signup.password !== signup.confirmPassword) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match.",
        }));
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[\W_]).{7,}$/;
      if (!passwordRegex.test(signup.password)) {
        setErrors((prev) => ({
          ...prev,
          password: "Password must be at least 7 characters, contain one lowercase letter, and one special character.",
        }));
        return;
      }
    }

    // Proceed to register or login user
    try {
      const response = await action(inputData).unwrap();

      if (type === "signup" && response) {
        toast.success("Account created successfully! 🎉", {
          className: "custom-toast",});
        setErrors({});
        setSignup({ email: "", password: "", confirmPassword: "", role: "student" }); // Reset role after signup
        toast.success("Now Login through account! 🎉", {
          className: "custom-toast",});
      } else if (type === "login" && response) {
        toast.success("Login successful! 🎉",
           {
            className: "custom-toast",}
        );
        setErrors({});
        setLogin({ email: "", password: "" });
         navigate("/");
      }
    } catch (error) {
      console.error("Error during registration/login:", error);
      setErrors((prev) => ({
        ...prev,
        error: error?.data?.message || "An error occurred. Please try again later.",
      }));
      setSignup({ email: "", password: "", confirmPassword: "", role: "student" });
      setLogin({ email: "", password: "" });
      toast.error(error?.data?.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center select-none  ">
      <Tabs defaultValue="register" className="md:w-[450px] z-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        {/* Login Tab */}
        <TabsContent value="login">
          <Card className="bg-slate-800/20">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Access your account by logging in below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={login.email}
                  onChange={(e) => handleChangeInput(e, "login")}
                  placeholder="eg: samyak@gmail.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={(e) => handleChangeInput(e, "login")}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("login")} className="bg-blue-950 text-white border border-gray-600 rounded-lg px-6 py-2 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 tracking-widest transition duration-300 ease-in-out hover:border-blue-500">
                Login
              </Button>
              {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
              {errors.success && <p className="text-green-500 text-sm">{errors.success}</p>}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value="register">
          <Card className="bg-slate-800/20">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>
                Create a new account by filling out the fields below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="eg: samyak@gmail.com"
                  value={signup.email}
                  onChange={(e) => handleChangeInput(e, "signup")}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={signup.password}
                  onChange={(e) => handleChangeInput(e, "signup")}
                  placeholder="Create a password"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  value={signup.confirmPassword}
                  onChange={(e) => handleChangeInput(e, "signup")}
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
              {/* Role Selection (Radio Buttons) */}
              <div className="space-y-2">
                <Label>Role</Label>
                <div className="flex items-center space-x-4">
                  <div>
                    <input
                      type="radio"
                      id="student"
                      name="role"
                      value="student"
                      checked={signup.role === "student"}
                      onChange={(e) => handleChangeInput(e, "signup")}
                    />
                    <Label htmlFor="student" className="ml-2">Student</Label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="instructor"
                      name="role"
                      value="instructor"
                      checked={signup.role === "instructor"}
                      onChange={(e) => handleChangeInput(e, "signup")}
                    />
                    <Label htmlFor="instructor" className="ml-2">Instructor</Label>
                  </div>
                </div>
                {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleRegistration("signup")} className="bg-blue-950 text-white border border-gray-600 rounded-lg px-6 py-2 hover:bg-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 tracking-widest transition duration-300 ease-in-out hover:border-blue-500">
                Register
              </Button>
              {errors.error && <p className="text-red-500 text-sm">{errors.error}</p>}
              {errors.success && <p className="text-green-500 text-sm">{errors.success}</p>}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
