'use client'

import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" aria-hidden="true" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops! Something went wrong</h2>
          <p className="mt-2 text-sm text-gray-600">
            {"We couldn't fetch the data you were looking for. Don't worry, it's not your fault!"}
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
              Error: {error.message}
            </p>
            <Button
              onClick={reset}
              className="group  w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className=" inset-y-0 flex items-center pl-3">
                <RefreshCcw className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Try again
            </Button>
          </div>
          <div className="text-center">
            <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
              Go back to homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}