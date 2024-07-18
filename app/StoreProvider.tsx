// NOTE: Redux client to provide store using makeStore() from ../lib/store.ts per: https://redux.js.org/usage/nextjs#providing-the-store
'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
// import { initializeCounter } from '../lib/profileCreation/features/counterSlice'

export default function StoreProvider({
    // counter,
    children
}: {
    // counter: number
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()

        // storeRef.current.dispatch(initializeCounter(counter))
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}