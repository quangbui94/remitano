// import { render, act } from '@testing-library/react';
// import AuthProvider, { AuthContext, IAuthContext } from 'contexts/AuthProvider';
// import { AuthRequest } from 'api/AuthRequest';
// import { SocketProvider } from 'contexts/SocketIOProvider';
// import { BrowserRouter } from 'react-router-dom';
// import NavigationBar from 'components/NavigationBar/NavigationBar';

// // Mock localStorage
// const localStorageMock = (() => {
//   let store: { [key: string]: string } = {};
//   return {
//     getItem: (key: string) => store[key],
//     setItem: (key: string, value: string) => (store[key] = value),
//     removeItem: (key: string) => delete store[key],
//     clear: () => (store = {}),
//   };
// })();
// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock,
// });

// // Mock AuthRequest class
// jest.mock('api/AuthRequest', () => ({
//   AuthRequest: jest.fn().mockImplementation(() => ({
//     login: jest.fn().mockResolvedValueOnce({ data: { token: 'mockToken', email: 'test@example.com' } }),
//   })),
// }));

// describe('AuthProvider Component', () => {
//   beforeEach(() => {
//     localStorage.clear(); // Clear localStorage before each test
//   });

//   test.only('initial state setup based on localStorage', async () => {
//     localStorage.setItem('token', 'mockToken');
//     localStorage.setItem('email', 'test@example.com');
//     const mockContextValue = {
//         email: "test@example.com",
//         auth: true,
//         login: jest.fn(),
//         logout: jest.fn(),
//       };
//     let authValue: IAuthContext | React.ReactNode;
//     const { getByLabelText, getByText } = render(
//         <SocketProvider>
//         <BrowserRouter
//         >
//       <AuthContext.Provider value={mockContextValue}>
//         <NavigationBar/>
//       </AuthContext.Provider>
//       </BrowserRouter>
//       </SocketProvider>
//     );

//     expect(getByText('test@example.com')).toBeInTheDocument();
//     // expect(authValue.email).toBe('test@example.com');
//   });

//   test('login function sets auth and email on successful login', async () => {
//     let authValue: any;
//     const mockContextValue = {
//         email: "test@example.com",
//         auth: true,
//         login: jest.fn(),
//         logout: jest.fn(),
//       };
//     render(
//       <AuthContext.Provider value={mockContextValue}>
//         <AuthProvider>
//           <AuthContext.Consumer>{(value) => (authValue = value as IAuthContext)}</AuthContext.Consumer>
//         </AuthProvider>
//       </AuthContext.Provider>
//     );

//     await act(async () => {
//       await authValue.login({ email: 'test@example.com', password: 'password' });
//     });

//     expect(authValue.auth).toBe(true);
//     expect(authValue.email).toBe('test@example.com');
//     expect(localStorage.getItem('token')).toBe('mockToken');
//     expect(localStorage.getItem('email')).toBe('test@example.com');
//   });

//   test('login function sets auth to false on failed login', async () => {
//     (AuthRequest as jest.Mock).mockImplementationOnce(() => ({
//       login: jest.fn().mockRejectedValueOnce(new Error('Login failed')),
//     }));
//     const mockContextValue = {
//         email: "test@example.com",
//         auth: true,
//         login: jest.fn(),
//         logout: jest.fn(),
//       };
//     let authValue: any;
//     render(
//       <AuthContext.Provider value={mockContextValue}>
//         <AuthProvider>
//           <AuthContext.Consumer>{(value) => (authValue = value as IAuthContext)}</AuthContext.Consumer>
//         </AuthProvider>
//       </AuthContext.Provider>
//     );

//     await act(async () => {
//       await authValue.login({ email: 'test@example.com', password: 'invalidPassword' });
//     });

//     expect(authValue.auth).toBe(false);
//     expect(authValue.email).toBe('');
//     expect(localStorage.getItem('token')).toBe(null);
//     expect(localStorage.getItem('email')).toBe(null);
//   });

//   test('logout function clears localStorage and sets auth to false', () => {
//     localStorage.setItem('token', 'mockToken');
//     localStorage.setItem('email', 'test@example.com');
//     const mockContextValue = {
//         email: "test@example.com",
//         auth: true,
//         login: jest.fn(),
//         logout: jest.fn(),
//       };
//     let authValue: any;
//     render(
//       <AuthContext.Provider value={mockContextValue}>
//         <AuthProvider>
//           <AuthContext.Consumer>{(value) => (authValue = value as IAuthContext)}</AuthContext.Consumer>
//         </AuthProvider>
//       </AuthContext.Provider>
//     );

//     act(() => {
//       authValue.logout();
//     });

//     expect(authValue.auth).toBe(false);
//     expect(authValue.email).toBe('');
//     expect(localStorage.getItem('token')).toBe(null);
//     expect(localStorage.getItem('email')).toBe(null);
//   });
// });
