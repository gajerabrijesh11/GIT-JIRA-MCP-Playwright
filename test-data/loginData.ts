/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║                    Login Test Data                       ║
 * ║  All test data centrally managed here.                   ║
 * ║  Never hardcode data inside test files!                  ║
 * ╚══════════════════════════════════════════════════════════╝
 */
export const loginData = {
  validUser: {
    email   : 'testbg@gmail.com',
    password: 'testbg',
  },
  invalidUser: {
    email   : 'wrong@example.com',
    password: 'wrongpassword',
  },
  emptyUser: {
    email   : '',
    password: '',
  },
};