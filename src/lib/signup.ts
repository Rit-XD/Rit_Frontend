export async function signUpUser(email: string, uid: string,  phone: string, address: string) {
    const params = { 
        email: email,
        name: "test",
        supaBaseId: uid,
        address: address,
        phone: phone,
        "password": "test",
        "passwordCheck": "test",
        cars: []
     };
  const res = await fetch("http://127.0.0.1:8000/api/carecenter/create", { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
}