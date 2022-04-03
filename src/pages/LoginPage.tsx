import React from "react";
import { useAuthContext } from "../contexts/authContext/AuthProvider";

function LoginPage() {
  const { login } = useAuthContext();

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();

        const data = new FormData(e.target);
        const username = (data.get("username") ?? "") as string;
        const password = (data.get("password") ?? "") as string;

        login(username, password);
      }}
    >
      <label htmlFor="username">Name:</label>
      <input type="text" id="username" name="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />

      <input name="submitButton" type="submit" value="Login" />
    </form>
  );
}

export default LoginPage;
