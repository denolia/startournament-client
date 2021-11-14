import axios from "axios";

export async function getCurrentHand(): Promise<any> {
  try {
    return await axios.get("http://192.168.2.104:8080/state");
  } catch (error) {
    console.log(error);
  }
}
