// // src/utils/socketUtils.ts
// import { Balance } from '../models/balanceModel';
// import { Server } from 'socket.io';

// export const configureSocket = (io: Server): void => {
//   io.on('connection', (socket) => {
//     console.log('A user connected');

//     socket.on('fetchBalances', async () => {
//       // Fetch balances on connection
//       const balances = await Balance.find();
//       socket.emit('balances', balances);
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
// };
