import {atom} from 'recoil'

const latitude = atom({
    key: 'latitude',
    default: ''
  });

const longitude = atom({
  key: 'longitude',
  default: ''
});

const locationStates = {
   latitude,
   longitude,
}

export default locationStates