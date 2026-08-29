import { useEffect, useState, type ReactNode } from 'react'
import { fetchPublishedContent } from './api'
import { ContentContext, emptySnapshot, type ContentContextValue } from './useContent'
export function ContentProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ContentContextValue>({ ...emptySnapshot, status: 'loading', error: null })
  useEffect(() => {
    let active = true
    fetchPublishedContent().then((snapshot) => {
      if (active) setValue({ ...snapshot, status: !snapshot.caseStudies.length && !snapshot.solutions.length && !snapshot.leadership.length ? 'empty' : 'ready', error: null })
    }).catch((error: unknown) => {
      if (active) setValue({ ...emptySnapshot, status: 'error', error: error instanceof Error ? error.message : 'Content could not be loaded.' })
    })
    return () => { active = false }
  }, [])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
