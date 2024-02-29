export async function signUpUser(email: string, uid: string) {
    const params = { 
        email: email,
        name: uid,
        "password": "test",
        "passwordCheck": "test",
        "address": "test 1",
        "phone": "0412345678",
        "cars": []
     };
  const res = await fetch("http://127.0.0.1:8000/api/carecenter/create", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
}