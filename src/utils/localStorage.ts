
type LocalStorgaeProps = { 
email: string
id: string
password: string
}

export const localStorageSetup = (values:LocalStorgaeProps) => {
  localStorage.setItem("user",JSON.stringify(values))
};

export const localStorageGetUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};