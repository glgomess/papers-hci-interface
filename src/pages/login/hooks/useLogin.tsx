import { AxiosRequestConfig } from 'axios'
import React from 'react'
import { Backend } from '../../../service/backend'
import axios from 'axios'
export function useLogin() {
  async function login(username: string, password: string) {
    try {
      const data: AxiosRequestConfig = {
        data: { username, password },
      }
      // console.log('#####', Backend().)
      await axios.post('http://localhost:5000/login', data)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
  return { login }
}
