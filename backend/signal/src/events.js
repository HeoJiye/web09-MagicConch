import { v4 } from 'uuid';

const socketRooms = {};
const users = {};
const MAXIMUM = 2;

export function createRoom(socket, password) {
  // const roomID = v4();
  // 테스트용으로 roomID를 1로 고정, 완료되면 위의 코드로 변경
  const roomID = '1';
  const userID = socket.id;

  socketRooms[roomID] = { users: [userID], password: password };

  users[userID] = { roomID, role: 'host' };
  socket.join(roomID);
  socket.emit('roomCreated', roomID);

  console.log('room created: ', roomID, password, socketRooms);
}

export function joinRoom(socket, roomID, password) {
  const existRoom = socketRooms[roomID];
  const wrongPassword = socketRooms[roomID].password !== password;
  if (!existRoom || wrongPassword) {
    socket.emit('joinRoomFailed');
    console.log('joinRoomFailed', roomID, password);
    return;
  }

  const fullRoom = socketRooms[roomID].users.length === MAXIMUM;
  if (fullRoom) {
    socket.emit('roomFull');
    console.log('rommFull', socketRooms, roomID);
    return;
  }

  const userID = socket.id;

  socketRooms[roomID].users.push(userID);
  users[userID] = { roomID, role: 'guest' };
  socket.join(roomID);

  const ohterUsers = socketRooms[roomID].users.filter(_userID => _userID !== userID);
  socket.to(roomID).emit('welcome', ohterUsers);

  socket.emit('joinRoomSuccess', roomID);
}

export function disconnectSocket(socket) {
  const userID = socket.id;
  const { roomID, role } = users[userID];

  if (socketRooms[roomID]) {
    socketRooms[roomID].users = socketRooms[roomID].users.filter(userID => userID !== socket.id);

    if (socketRooms[roomID].users.length === 0) {
      delete socketRooms[roomID];
      return;
    }
  }
  //
  delete users[roomID];

  socket.to(roomID).emit('userExit', { id: socket.id });
  console.log('exit user: ', socketRooms, roomID);
}
