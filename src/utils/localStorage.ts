
type LocalStorgaeProps = { 
email: string
id: string
password: string
}

export const localStorageSetup = (values:LocalStorgaeProps) => {
  localStorage.setItem("user",JSON.stringify(values))
};

export const localStorageGetUser = ()=>{
    return localStorage.getItem("user")
}
