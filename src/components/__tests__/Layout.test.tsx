// import { act, render, waitFor } from '@testing-library/react';
// import { SocketProvider, useSocket as mockUseSocket } from 'contexts/SocketIOProvider';

// jest.mock('contexts/SocketIOProvider');

// import Layout from 'components/Layout/Layout';
// import { BrowserRouter } from 'react-router-dom';

// describe('Layout Component', () => {
//   test('renders without crashing', async () => {
//     // Mocking the return value of useSocket hook
//     const mockSocket = { on: jest.fn(), off: jest.fn() };
//     (mockUseSocket as jest.Mock).mockReturnValue({ socket: mockSocket });

//     // Add your assertions here
//     const { getByTestId, queryByText } = render(
//         <SocketProvider>
//             <BrowserRouter>
//           <Layout />
//           </BrowserRouter>
//         </SocketProvider>
//       );

//       const mockMessage = 'New video shared';
//       mockSocket.on('shareVideo', (data: any) => {
//         act(() => {
//           data.callback({ message: mockMessage });
//         });
//       });

//       await waitFor(() => expect(queryByText(mockMessage)).toBeInTheDocument());

//       const closeButton = getByTestId('notification-close-button');
//       act(() => {
//         closeButton.click();
//       });

//       await waitFor(() => expect(queryByText(mockMessage)).not.toBeInTheDocument());
//   });
// });
