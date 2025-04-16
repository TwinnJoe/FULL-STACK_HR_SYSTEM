// hashUsers.js
import bcrypt from 'bcryptjs';

const users = [
  { employeeID: 1001, name: 'Sibongilenkosi', password: 'Admin001' },
];

const hashPasswords = async () => {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
    console.log(
      `(${user.employeeID}, '${user.name}', '${hashedPassword}'),`
    );
  }
};

hashPasswords();
