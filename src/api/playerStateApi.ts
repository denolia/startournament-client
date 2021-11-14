import axios from "axios";

export async function getCurrentHand(): Promise<any> {
  try {
    return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/state`);
  } catch (error) {
    console.log(error);
  }
}
