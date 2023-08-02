import { createContext, useContext, useState, useEffect } from "react";

type Props = {
    children: JSX.Element | JSX.Element[];
}

type accessType = {
    access: string;
}

type AuthContextType = {
    data:  accessType;
    signIn: ({ access }:accessType) => void;
    signOut: () => void;
    isLogged: () => boolean;
    generateAccess: () => { headers: { Authorization: string } };}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }:Props) => {
  const [data, setData] = useState(() => {

    const access = sessionStorage.getItem("@syncer:access");

    if (access)
      return { access };
    return {
      access: ""
    };
  });

  const signIn = async ( { access }:accessType) => {
    setData({ access });
    sessionStorage.setItem("@syncer:access", access);
  };

  const signOut = () => {
    sessionStorage.clear();
    setData({
      access: "",
    });
  };

  const isLogged = () => {
    if (data?.access === "") {
      return false;
    } else {
      return true;
    }
  };

  const generateAccess = () => {
    const config = {
      headers: { Authorization: `Bearer ${data.access}` },
    };
    return config;
  };

  return (
    <AuthContext.Provider
      value={{
        data,
        signIn,
        signOut,
        isLogged,
        generateAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {return useContext(AuthContext)};