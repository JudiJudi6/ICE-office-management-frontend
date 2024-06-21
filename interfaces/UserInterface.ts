type userType = {
  authentication: { password: string; salt: string; sessionToken: string };
  _id: string;
  name: string;
  surname: string;
  mail: string;
};

interface UserInterface {
  status: "failed" | "success";
  data: { user: userType };
}

export default UserInterface;
