import {
  Children,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../FirbaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { router, SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

interface AuthContextType {
  user: any;
  isAuthenticated: any;
  login: (
    email: any,
    password: any
  ) => Promise<{
    success: boolean;
    msg?: string;
  }>;
  logout: () => Promise<{
    success: boolean;
    msg?: string;
  }>;
  register: (
    email: any,
    password: any,
    username: any,
    profileimg: any
  ) => Promise<{
    success: boolean;
    msg?: string;
  }>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
interface Props {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setuser] = useState<any | null>(null);
  const [isAuthenticated, setisAthenticated] = useState<any>(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setisAthenticated(true);
        setuser(user);
        updateUserData(user.uid);
      } else {
        setisAthenticated(false);
        setuser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId: any) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data: any = docSnap.data();
      setuser((prev: any) => ({
        ...prev,
        username: data.username,
        profileUrl: data.profileimg,
        userId: data.userId,
      }));
    }
  };

  const login = async (email: any, password: any) => {
    try {
      const respons = await signInWithEmailAndPassword(auth, email, password);
      setisAthenticated(true);
      router.replace("/(app)/home");
      return { respons: true, success: true };
    } catch (e: any) {
      let msg: any = e.message;
      if (msg.includes("(auth/network-request-failed)"))
        msg = "Wrong With Network";
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid Email";
      if (msg.includes("(auth/invalid-credential)")) msg = "Wrong data";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)"
        )
      )
        msg = "Password should be at least 6 characters";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Thi Email already in use";
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setisAthenticated(false);
      return { success: true };
    } catch (e: any) {
      return { success: false, msg: e.message };
    }
  };

  const register = async (
    email: any,
    password: any,
    username: any,
    profileimg: any
  ) => {
    try {
      const response: any = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profileimg,
        userId: response?.user?.uid,
      });
      setisAthenticated(true);
      router.replace("/(app)/home");

      return { success: true, data: response?.user };
    } catch (e: any) {
      let msg: any = e.message;
      if (msg.includes("(auth/invalid-email)")) msg = "Invalid Email";
      if (
        msg.includes(
          "Firebase: Password should be at least 6 characters (auth/weak-password)"
        )
      )
        msg = "Password should be at least 6 characters";
      if (msg.includes("(auth/email-already-in-use)"))
        msg = "Thi Email already in use";
      return { success: false, msg };
    }
  };

  useEffect(() => {
    if (typeof isAuthenticated !== 'undefined') {
      SplashScreen.hideAsync();
    }
  }, [isAuthenticated]);
  

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside AuthContextProvider");
  }

  return value;
};
