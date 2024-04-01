"use client"

import {useEffect, useState} from "react"

export default function Page() {
    const [data, setData] = useState()
    useEffect(() => {
        ;(async () => {
            const res = await fetch("/api/protected")
            const json = await res.json()
            setData(json)
        })()
    }, [])
    return (
        <div>
            <h1>Route Handler Usage</h1>
            <p>
                This page fetches data from an API. The API is protected using the universal method.
            </p>
            <div>
                <div>
                    Data from API Route
                </div>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    )
}
