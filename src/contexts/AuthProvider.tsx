import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthRequest, IRequestBody } from "../api/AuthRequest";

interface IAuthContext {
  auth: boolean;
  login(item: IRequestBody): Promise<any>;
  logout(): void;
  email: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth(true);
    }
  }, []);

  const login = async (item: IRequestBody): Promise<any> => {
    const auth = new AuthRequest();
    try {
      const {
        data: { token, email },
      } = await auth.login(item);
      if (token) {
        localStorage.setItem("token", token);
        setAuth(true);
        setEmail(email);
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
    <AuthContext.Provider value={{ auth, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
