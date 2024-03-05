import React, { useContext, useState, createContext, FC, useEffect } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import PageLoader from "common/Loaders/PageLoader/PageLoader";
import { auth } from "../firebase/firebase";

type AuthProviderProps = { children: React.ReactNode };
type AuthContext = {
  currentUser: User | null;
  logout: () => Promise<void> | void;
  setUser: () => void;
};

// Creating Context
const AuthContext = createContext<AuthContext>({
  currentUser: null,
  logout: () => {},
  setUser: () => {},
});

// Custom hook to get values from context
export function useAuth() {
  return useContext(AuthContext);
}

// Component returning context
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, [currentUser]);

  const value = {
    currentUser,
    setUser: () => setCurrentUser({ ...(currentUser as User) }),
    logout,
  };

  return <AuthContext.Provider value={value}>{loading ? <PageLoader /> : children}</AuthContext.Provider>;
};
