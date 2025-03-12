import { selector } from "recoil";
import signupStates from "../atom/user_atoms";

const fullNameSelector = selector({
  key: 'fullName',
  get: ({get}) => {
    const firstName = get(signupStates.firstNameAtom);
    const lastName =get(signupStates.lastNameAtom);
    return `${firstName} ${lastName}`
  }
})

export default fullNameSelector;