import axios from 'axios'
import { Release } from './model'

const config = {
  baseURL: 'https://api.discogs.com'
};

export async function fetchRelease(id: number): Promise<Release> {
  const { data } = await axios.get(`/releases/${ id }`, config)
  return data
}
