"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { account, storage, ID, tableDb } from "@/lib/appwrite.config";
import { toast } from "sonner";
import { Query } from "appwrite";

export type SignupPayload = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role: string;
  image?: FileList;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type User = {
  $id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  image?: string;
};

export default function useAuth() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth state on mount
  useEffect(() => {
    const session = Cookies.get("session");
    const savedRole = Cookies.get("role");

    if (session === "active" && savedRole) {
      setIsAuthenticated(true);
      setRole(savedRole);
    }
  }, []);

  // ———————————————————————————————————
  // SIGNUP MUTATION
  // ———————————————————————————————————
  const signupMutation = useMutation({
    mutationFn: async (data: SignupPayload) => {
      const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE!;
      const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE!;
      const tableName = "profiles";

      if (!dbId || !bucketId) {
        throw new Error("Appwrite config missing");
      }

      let createdUser: any = null;
      let imageUrl = "";

      // 1. Create Appwrite account
      createdUser = await account.create(
        ID.unique(),
        data.email,
        data.password,
        data.name
      );

      // 2. Upload profile image (non-blocking)
      if (data.image && data.image[0]) {
        try {
          const file = await storage.createFile(
             process.env.NEXT_PUBLIC_APPWRITE_STORAGE as string,
            ID.unique(),
            data.image[0]
          );
          imageUrl = storage.getFileView(
            process.env.NEXT_PUBLIC_APPWRITE_STORAGE as string,
            file.$id
          );
        } catch (uploadError) {
          console.warn("Image upload failed:", uploadError);
        }
      }

      // 3. Create profile in database
      await tableDb.createRow({
        databaseId: dbId,
        tableId: tableName,
        rowId: ID.unique(),
        data: {
          
          name: data.name,
          email: data.email,
          mobile: data.mobile,
          password:data.password,
          role: data.role,
          image: imageUrl,
        },
      });

      // 4. Auto-login
      await account.createEmailPasswordSession(data.email, data.password);

      return {
        $id: createdUser.$id,
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        password:data.password,
        role: data.role,
        image: imageUrl,
      };
    },

    onSuccess: (userData: User) => {
      Cookies.set("session", "active", { expires: 7 });
      Cookies.set("role", userData.role, { expires: 7 });

      setUser(userData);
      setRole(userData.role);
      setIsAuthenticated(true);

      toast.success("Account created successfully!");
      router.push("/dashboard");
    },

    onError: (error: any) => {
      toast.error(error.message || "Signup failed");
    },
  });

  // ———————————————————————————————————
  // LOGIN MUTATION
  // ———————————————————————————————————
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      // Create session
      await account.createEmailPasswordSession(email, password);

      // Fetch user profile
    //   const res = await tableDb.listRows(
    //     process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
    //     "profiles",
    //     [Query.equal("email", email)]
    //   );

    //   if (!res.rows.length) {
    //     throw new Error("Profile not found");
    //   }

    //   return res.rows[0] as User;
    // },

    const res = await tableDb.listRows(
  process.env.NEXT_PUBLIC_APPWRITE_DATABASE!,
  "profiles",
  [Query.equal("email", email)]
);

if (!res.rows.length) {
  throw new Error("Profile not found");
}

return res.rows[0] as unknown as User; 
    },

    onSuccess: (profile: User) => {
      Cookies.set("session", "active", { expires: 7 });
      Cookies.set("role", profile.role, { expires: 7 });

      setUser(profile);
      setRole(profile.role);
      setIsAuthenticated(true);

      toast.success("Welcome back!");
      router.push("/dashboard");
    },

    onError: (error: any) => {
      toast.error(error.message || "Login failed");
    },
  });

  // ———————————————————————————————————
  // LOGOUT MUTATION
  // ———————————————————————————————————
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await account.deleteSession("current");
      Cookies.remove("session");
      Cookies.remove("role");
    },

    onSuccess: () => {
      setUser(null);
      setRole(null);
      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      router.push("/login");
    },
  });


  return {
    user,
    role,
    isAuthenticated,

    // Signup
    signup: (data: SignupPayload) => signupMutation.mutate(data),
    isSigningUp: signupMutation.isPending,

    // Login
    login: ({ email, password }: LoginPayload) => loginMutation.mutate({ email, password }),
    isLoggingIn: loginMutation.isPending,

    // Logout
    logout: () => logoutMutation.mutate(),
    isLoggingOut: logoutMutation.isPending,
  };
}


// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { account, databases, storage, ID,tableDb, BUCKET_ID } from "@/lib/appwrite.config";
// import { toast } from "sonner";
// import { Query } from "appwrite";

// export type SignupPayload = {
//   name: string;
//   email: string;
//   mobile: string;
//   password: string;
//   role: string;
//   image?: FileList;
// };

// export type LoginPayload = {
//   email: string;
//   password: string;
// };

// export type User = {
//   name: string;
//   email: string;
//   mobile: string;
//   role: string;
// };

// export default function useAuth() {
//   const router = useRouter();

//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<string | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);


//   useEffect(() => {
//     const session = Cookies.get("session");
//     const savedRole = Cookies.get("role");

//     if (session === "active" && savedRole) {
//       setIsAuthenticated(true);
//       setRole(savedRole);
//       setUser({
//         name: "",
//         email: "",
//         mobile: "",
//         role: savedRole,
//       });
//     }
//   }, []);

//   // ———————————————————————————————————
//   // SIGNUP
//   // ———————————————————————————————————
//   const signupMutation = useMutation({
//     mutationFn: async (data: SignupPayload) => {
//       const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE;
//       const tableName = "profiles"; // KEEPING YOUR TABLE NAME EXACTLY SAME

//       if (!dbId) throw new Error("Database not configured.");

//       let createdUser: any = null;

//       try {
//         // Create account
//         createdUser = await account.create(
//           ID.unique(),
//           data.email,
//           data.password,
//           data.name
//         );

//         // Upload image if present
//         let imageUrl = "";
//         if (data.image && data.image.length > 0) {
//           const file = await storage.createFile(
//             process.env.NEXT_PUBLIC_APPWRITE_STORAGE!,
//             ID.unique(),
//             data.image[0]
//           );

//           imageUrl = storage.getFileView(
//             process.env.NEXT_PUBLIC_APPWRITE_STORAGE!,
//             file.$id
//           );
//         }

//         // Create row in your table
//         await tableDb.createRow({
//           databaseId: dbId,
//           tableId: tableName,
//           rowId: ID.unique(),
//           data: {
//             name: data.name,
//             email: data.email,
//             mobile: data.mobile,
//             password: data.password,
//             role: data.role,
//             image: imageUrl || "",
//           },
//         });

        
//         await account.createEmailPasswordSession(data.email, data.password);

//       } catch (error: any) {
//         // Delete created user on failure
//         if (createdUser?.$id) {
//           try {
//             await account.delete(createdUser.$id);
//           } catch {}
//         }
//         throw error;
//       }

//       return { ...data, id: createdUser.$id };
//     },

//     onSuccess: (result: any) => {
//       Cookies.set("session", "active");
//       Cookies.set("role", result.role);

//       setUser(result);
//       setIsAuthenticated(true);

//       toast.success("Account created!");
//       router.push("/");
//     },

//     onError: (err: any) => {
//       toast.error(err?.message || "Signup failed");
//     },
//   });



//   const signup = (data: SignupPayload) => signupMutation.mutate(data);
//   const isSigningUp = signupMutation.isPending;


//   const loginMutation = useMutation({
//     mutationFn: async ({ email, password }: LoginPayload) => {
//       await account.createEmailPasswordSession(email, password);

//       // Get user from your table
//       const res = await tableDb.listRows(
//         process.env.NEXT_PUBLIC_APPWRITE_DATABASE as string,
//         "profiles",
//         [Query.equal("email", email)]
//       );

//       if (res.rows.length === 0) {
//         throw new Error("User not found in table.");
//       }

//       return res.rows[0];
//     },

//     onSuccess: (profile: any) => {
//       Cookies.set("session", "active");
//       Cookies.set("role", profile.role);

//       setUser(profile);
//       setRole(profile.role);
//       setIsAuthenticated(true);

//       router.push("/");
//     },

//     onError: (err: any) => {
//       toast.error(err?.message || "Login failed");
//     },
//   });


//   const logoutMutation = useMutation({
//     mutationFn: async () => {
//       await account.deleteSession("current").catch(() => {});
//       Cookies.remove("session");
//       Cookies.remove("role");
//     },

//     onSuccess: () => {
//       setUser(null);
//       setRole(null);
//       setIsAuthenticated(false);
//       router.push("/login");
//     },
//   });

//   const logout = () => logoutMutation.mutate();
  
//   return {
//     user,
//     role,
//     isAuthenticated,

//     signup,
//     isSigningUp,
//     signupMutation,

//     loginMutation,

//     logout,
//     logoutMutation,
//   };
// }
