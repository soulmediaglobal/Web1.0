/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchPublishedContent } from './api'
import type { ContentSnapshot, ContentStatus, SiteContentKey } from './types'
type ContentContextValue = ContentSnapshot & { status: ContentStatus; error: string | null }
const emptySnapshot: ContentSnapshot = { caseStudies: [], solutions: [], leadership: [], pages: [], siteContent: {} }
const ContentContext = createContext<ContentContextValue>({ ...emptySnapshot, status: 'loading', error: null })
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
export function useContent() { return useContext(ContentContext) }
export function useSiteCopy(key: SiteContentKey, structuralFallback: string) { return useContent().siteContent[key] ?? structuralFallback }
