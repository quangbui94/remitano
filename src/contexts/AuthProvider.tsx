import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthRequest, IRequestBody } from "api/AuthRequest";

export interface IAuthContext {
  auth: boolean;
  login(item: IRequestBody): Promise<any>;
  logout(): void;
  email: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token) {
      setAuth(true);
    }
    if (email) {
      setEmail(email);
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
        localStorage.setItem("email", email);
        setAuth(true);
        setEmail(email);
      }
    } catch (error) {
      setAuth(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setAuth(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
