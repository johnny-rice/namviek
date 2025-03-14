export enum LCK {
    RECENT_VISIT = 'RECENT_VISIT_',
    PROJECT_BADGE = 'PROJECT_BADGE',
    PROJECT_FILTER = 'PROJECT_FILTER_'
  }
  
  export const setLocalCache = (name: LCK | string, value: string) => {
    try {
      localStorage.setItem(name, value)
    } catch (error) {
      console.log(error)
    }
  }
  
  export const setLocalJSONCache = (name: LCK | string, value: string) => {
    try {
      localStorage.setItem(name, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getLocalCache = (name: LCK | string) => {
    try {
      return localStorage.getItem(name)
    } catch (error) {
      console.log('localStorage is not defined on server')
      return null
    }
  }
  
  export const getLocalJSONCache = (name: LCK | string) => {
    try {
      const data = localStorage.getItem(name)
      if (!data) return null
  
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }
  
  // cache recent visit
  
  export const setRecentVist = (uid: string, value: string) => {
    try {
      localStorage.setItem(LCK.RECENT_VISIT + uid, value)
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getRecentVisit = (uid: string) => {
    try {
      return localStorage.getItem(LCK.RECENT_VISIT + uid)
    } catch (error) {
      return null
    }
  }
  
  // Project filter cache methods
  export const setProjectFilter = (projectId: string, filter: any) => {
    try {
      localStorage.setItem(`${LCK.PROJECT_FILTER}${projectId}`, JSON.stringify(filter))
    } catch (error) {
      console.log(error)
    }
  }
  
  export const getProjectFilter = (projectId: string) => {
    try {
      const data = localStorage.getItem(`${LCK.PROJECT_FILTER}${projectId}`)
      if (!data) return null
      return JSON.parse(data)
    } catch (error) {
      return null
    }
  }
  