import axios from 'axios';
import md5 from 'md5';

const baseUrl = 'https://gateway.marvel.com/v1/public/';

const publicKey = 'e8be9bc0692515825bcdf5ad29d041e6';
const privateKey = 'd45e547b01378261b7eb650791f767a2b8cda72f';

const time = new Date().getTime()

const hash = md5(time + privateKey + publicKey)

const api = axios.create({
  baseURL: baseUrl
})

export{
  api,
  time,
  publicKey,
  hash
}