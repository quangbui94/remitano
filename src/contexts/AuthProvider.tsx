import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthRequest, IRequestBody } from "../api/AuthRequest";

interface IAuthContext {
  auth: boolean;
  login(item: IRequestBody): Promise<any>;
  logout(): void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth(true);
    }
  }, []);

  const login = async (item: IRequestBody): Promise<any> => {
    const auth = new AuthRequest();
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      const {
        data: { token },
      } = await auth.login(item);
      if (token) {
        localStorage.setItem("token", token);
        setAuth(true);
      }
    } catch (error) {
      console.log(error);
      setAuth(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
