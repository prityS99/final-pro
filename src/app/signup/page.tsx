"use client";

import React, { useState } from "react";
import { useForm, UseFormRegisterReturn, FieldError } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Loader2, User, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/react-query/useAuth";

const InputField = ({
  label,
  name,
  register,
  error,
  type = "text",
}: {
  label: string;
  name: string;
  register: UseFormRegisterReturn<string>;
  error?: FieldError;
  type?: string;
}) => (
  <div className="mb-5">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      {...register}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);

// --- Validation Schema ---
const schema = yup
  .object({
    name: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    mobile: yup
      .string()
      .matches(/^[0-9]+$/, "Mobile number must contain only digits")
      .min(10, "Mobile number must be at least 10 digits")
      .required("Mobile number is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

// --- Main Signup Component ---
export default function Signup() {
  const router = useRouter();
  const { signup, isSigningUp } = useAuth();

  // State for the optional profile image
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      setImagePreviewUrl(null);
    }
  };

  const onSubmit = (data: FormData) => {
    signup({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      role: "user",
    });
  };

  return (
    <div className="mt-10 flex min-h-screen bg-gray-50">
    
      <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-10 bg-indigo-600">
        <h1 className="text-4xl font-extrabold text-white mb-4 leading-snug">
          Join Our Community Today
        </h1>
        <p className="text-indigo-200 text-lg mb-8 text-center">
          Experience seamless access to all our services. Quick, secure, and
          easy registration.
        </p>
      </div>

      {/* 📝 Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
          <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer transition"
            >
              Sign in
            </span>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <InputField
              label="Full Name"
              name="name"
              register={register("name")}
              error={errors.name}
            />

            <InputField
              label="Email Address"
              name="email"
              register={register("email")} 
              error={errors.email}
            />

            <InputField
              label="Mobile Number"
              name="mobile"
              register={register("mobile")} 
              error={errors.mobile}
            />

            <InputField
              label="Password"
              name="password"
              register={register("password")} 
              error={errors.password}
              type="password"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useState } from "react";
// import { FieldError, useForm, UseFormRegisterReturn } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Loader2, User, Camera } from "lucide-react";
// import { useRouter } from "next/navigation";
// import useAuth from "@/hooks/react-query/useAuth";

// const InputField = ({
//   label,
//   name,
//   register,
//   error,
//   type = "text"
// }: {
//   label: string;
//   name: string;
//   register: UseFormRegisterReturn<string>;
//   error?: FieldError;
//   type?: string;
// }) => (
//   <div className="mb-5">
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
//       {label}
//     </label>
//     <input
//       id={name}
//       type={type}
//       {...register(name)}
//       className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
//     />
//     {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
//   </div>
// );

// // --- Validation Schema ---
// const schema = yup.object({
//   name: yup.string().required("Full Name is required"),
//   email: yup.string().email("Must be a valid email").required("Email is required"),
//   mobile: yup
//     .string()
//     .matches(/^[0-9]+$/, "Mobile number must contain only digits")
//     .min(10, "Mobile number must be at least 10 digits")
//     .required("Mobile number is required"),
//   password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
// }).required();

// type FormData = yup.InferType<typeof schema>;

// // --- Main Signup Component ---
// export default function Signup() {
//   const router = useRouter();
//   const { signup, isSigningUp } = useAuth();

//   // State for the optional profile image
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: yupResolver(schema),
//   });

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;

//     if (file) {
//       setProfileImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setProfileImage(null);
//       setImagePreviewUrl(null);
//     }
//   };

//   const onSubmit = (data: FormData) => {
//     // ✅ Simply call signup - hook handles everything (success, error, redirect, toasts)
//     signup({
//       name: data.name,
//       email: data.email,
//       mobile: data.mobile,
//       password: data.password,
//       role: "user",
//       // profileImage: profileImage, // Add later with storage integration
//     });
//   };

//   return (
//     <div className="mt-10 flex min-h-screen bg-gray-50">
//       {/* 🎨 Image/Graphic Section (Hidden on small screens) */}
//       <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-10 bg-indigo-600">
//         <h1 className="text-4xl font-extrabold text-white mb-4 leading-snug">
//           Join Our Community Today
//         </h1>
//         <p className="text-indigo-200 text-lg mb-8 text-center">
//           Experience seamless access to all our services. Quick, secure, and easy registration.
//         </p>
//       </div>

//       {/* 📝 Form Section */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
//         <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">

//           <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900">
//             Create Your Account
//           </h2>
//           <p className="text-center text-gray-500 mb-8">
//             Already have an account? <span onClick={() => router.push("/login")} className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer transition">Sign in</span>
//           </p>

//           <form onSubmit={handleSubmit(onSubmit)} noValidate>

//             <InputField
//               label="Full Name"
//               name="name"
//               register={register}
//               error={errors.name}
//             />

//             <InputField
//               label="Email Address"
//               name="email"
//               register={register}
//               error={errors.email}
//             />

//             <InputField
//               label="Mobile Number"
//               name="mobile"
//               register={register}
//               error={errors.mobile}
//             />

//             <InputField
//               label="Password"
//               name="password"
//               register={register}
//               error={errors.password}
//               type="password"
//             />

//             {/* 📸 Profile Image Section */}
//             <div className="mb-8 pt-4 border-t border-gray-100">
//                 <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Profile Picture (Optional)
//                 </label>
//                 <div className="flex items-center space-x-4">
//                     {/* Image Preview / Default Avatar */}
//                     <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-200 bg-gray-100 flex items-center justify-center shadow-inner">
//                         {imagePreviewUrl ? (
//                             <img src={imagePreviewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
//                         ) : (
//                             <User className="w-10 h-10 text-indigo-400" />
//                         )}

//                         {/* Camera Overlay Button */}
//                         <label htmlFor="profile-image-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition duration-300 cursor-pointer">
//                             <Camera className="w-6 h-6 text-white" />
//                             <span className="sr-only">Upload Profile Picture</span>
//                         </label>
//                     </div>

//                     {/* File Input */}
//                     <input
//                         id="profile-image-upload"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="hidden"
//                     />

//                     {/* Button/Text to guide users */}
//                     <label htmlFor="profile-image-upload" className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition cursor-pointer shadow-md">
//                         {profileImage ? "Change Image" : "Upload Image"}
//                     </label>

//                     {profileImage && (
//                         <button
//                             type="button"
//                             onClick={() => { setProfileImage(null); setImagePreviewUrl(null); }}
//                             className="text-sm text-red-500 hover:text-red-700 transition"
//                         >
//                             Remove
//                         </button>
//                     )}
//                 </div>
//                 {profileImage && <p className="mt-2 text-xs text-gray-500">File selected: {profileImage.name}</p>}
//             </div>

//             <button
//               type="submit"
//               disabled={isSigningUp}
//               className="mt-4 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 "Sign Up"
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
