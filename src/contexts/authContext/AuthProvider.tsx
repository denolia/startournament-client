import React, { useState } from "react";
import { postLogin } from "../../api/auth";
import LoginPage from "../../pages/LoginPage";
import { User } from "./types";

interface AuthContext {
  login: (username: string, password: string) => void;
  logout: () => void;
  user: User | null;
  token: string | null;
}

const authContext = React.createContext<AuthContext>({
  login: () => {},
  logout: () => {},
  user: null,
  token: null,
});

export function useAuthContext(): AuthContext {
  const context = React.useContext(authContext);

  if (!context) {
    throw new Error("useAuthContext must be called inside the AuthProvider");
  }

  return context;
}

function AuthProvider(props: React.PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  async function login(username: string, password: string) {
    console.log("login...");
    const res = await postLogin(username, password);
    console.log({ res });

    if (res) {
      setToken(res.data.jwt);
      // todo parse
    }
  }

  function logout() {
    console.warn("Not implemented");
  }

  return (
    <authContext.Provider value={{ login, logout, user, token }}>
      {token ? props.children : <LoginPage />}
    </authContext.Provider>
  );
}

export default AuthProvider;
