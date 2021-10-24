import axios from 'axios';

export const AxiosInstanceClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
