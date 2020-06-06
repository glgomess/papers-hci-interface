import React from 'react'

class ServiceWorker {
  /* Singleton */

  // Constructor with a private access modifier, so that it isn’t accessible outside of the class body
  private constructor() {}

  // Reference the single instance of the class
  private static instance: ServiceWorker

  // Get always the same instance of the class, except on first time when the instance is created
  static getInstance(): ServiceWorker {
    if (!ServiceWorker.instance) {
      ServiceWorker.instance = new ServiceWorker()
    }

    return ServiceWorker.instance
  }

  /* End Singleton */

  getPapers = async () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const init: RequestInit = {
      method: 'GET',
      headers: headers,
      credentials: 'same-origin',
    }
    const request = new Request('/papers', init)
    const response = await fetch(request)
    const data = await response.json()
    return data
  }

  getPaperReferences = async (id: number) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const init: RequestInit = {
      method: 'GET',
      headers: headers,
      credentials: 'same-origin',
    }
    const request = new Request(`/papers/${id}/references`, init)
    const response = await fetch(request)
    const data = await response.json()
    return data
  }

  fetchPaperInfo = async (id: number) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const init: RequestInit = {
      method: 'GET',
      headers: headers,
      credentials: 'same-origin',
    }
    const request = new Request(`/papers/${id}`, init)
    const response = await fetch(request)
    const data = await response.json()
    return data
  }
}

export default ServiceWorker
