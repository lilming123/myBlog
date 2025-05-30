import { createContext, useContext } from 'react'
import {isBrowser} from "@/lib/utils";


export const useRootPortal = () => {
  const ctx = useContext(RootPortalContext)
  if (!isBrowser()) {
    return null
  }
  return ctx.to || document.body
}

const RootPortalContext = createContext<{
  to?: HTMLElement | undefined
}>({
  to: undefined,
})

export const RootPortalProvider = RootPortalContext.Provider
