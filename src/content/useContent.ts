import { createContext, useContext } from 'react'
import type { ContentSnapshot, ContentStatus, SiteContentKey } from './types'

export type ContentContextValue = ContentSnapshot & { status: ContentStatus; error: string | null }
export const emptySnapshot: ContentSnapshot = { caseStudies: [], solutions: [], leadership: [], pages: [], siteContent: {} }
export const ContentContext = createContext<ContentContextValue>({ ...emptySnapshot, status: 'loading', error: null })

export function useContent() { return useContext(ContentContext) }
export function useSiteCopy(key: SiteContentKey, structuralFallback: string) { return useContent().siteContent[key] ?? structuralFallback }
