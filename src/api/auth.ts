import axios, { AxiosResponse } from "axios";

export async function postLogin(
  username: string,
  password: string
): Promise<AxiosResponse | null> {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/login`,
      JSON.stringify({ name: username, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
