"use client"

import React from "react"
import { useRouter } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
}

const Pagination = ({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) => {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between px-5 py-4 border-t border-border-dark">
      <button
        type="button"
        className="px-4 py-2 rounded-md bg-dark-100 text-sm hover:bg-dark-200 transition"
        disabled={currentPage === 1}
        onClick={() => {
          router.push(`${basePath}?page=${currentPage - 1}`)
        }}
      >
        Previous
      </button>

      <span className="text-sm text-light-200">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        className="px-4 py-2 rounded-md bg-dark-100 text-sm hover:bg-dark-200 transition"
        disabled={currentPage === totalPages}
        onClick={() => {
          router.push(`${basePath}?page=${currentPage + 1}`)
        }}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination