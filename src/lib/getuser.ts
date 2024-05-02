import { User } from "@/src/types/user.type";

export async function getUser(uid: string): Promise<User> {
  const path = "http://127.0.0.1:8000/api/carecenter/" + uid;
  const res = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data.data);
  return data.data;
}
