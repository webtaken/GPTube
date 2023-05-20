import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/config/firebase";

type UserProps = {
  uid: string;
  email: string | null;
  displayName: string | null;
} | null;

type AuthContextProps = {
  user: UserProps;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext({} as AuthContextProps);

export const localStoreAuthVar = "GPTubeAuthenticated";

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [user, setUser] = useState<UserProps>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };
  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, resetPassword, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
