const API_KEY = "http://localhost:3000";

interface userInterface {
  name: string;
  surname: string;
  mail: string;
  password: string;
  repeatPassword: string;
}

interface userLoginInterface {
  mail: string;
  password: string;
}

export async function signUp(userData: userInterface) {
  console.log(userData);
  const response = await fetch(API_KEY + "/api/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      surname: userData.surname,
      mail: userData.mail,
      password: userData.password,
      repeatPassword: userData.repeatPassword,
    }),
  });
  if (response.ok) {
    const user = await login({
      mail: userData.mail,
      password: userData.password,
    });
    return user;
  } else {
    const bodyText = await response.json();
    throw new Error(bodyText.message);
  }
}

export async function login(userData: userLoginInterface) {
  console.log(userData);
  const response = await fetch(API_KEY + "/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: userData.mail,
      password: userData.password,
    }),
  });
  if (response.ok) {
    const userData = response.json();
    return userData;
  } else {
    const bodyText = await response.json();
    throw new Error(bodyText.message);
  }
}
