import { atom } from "recoil";

// Atoms for managing signup states
const username = atom({
  key: 'username',
  default: ''
});

const name = atom({
  key: 'name',
  default: ''
});

const managerId = atom({
  key: 'managerId',
  default: ''
});

const mobile = atom({
  key: 'mobile',
  default:''
});

const password = atom({
  key: 'password',
  default: ''
});

const confirmPassword = atom({
  key: 'confirmPassword',
  default: ''
});

const signupStates = {
 username,
 name,
 managerId,
 mobile,
 password,
 confirmPassword
};

export default signupStates;