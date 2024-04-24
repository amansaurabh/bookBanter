'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from 'use-debounce'

import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = ({ search }: { search?: string }) => {
    const router = useRouter()
    const initialRender = useRef(true)

    const [text, setText] = useState(search)
    const [query] = useDebounce(text, 750)

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false
            return
        }

        if (!query) {
            router.push(`/dashboard`)
        } else {
            router.push(`/dashboard?search=${query}`)
        }
    }, [query])

    return (
        <div className='relative rounded-full shadow-sm bg-white border-black'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <SearchIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                />
            </div>
            <input
                value={text}
                placeholder='Search your file...'
                onChange={e => setText(e.target.value)}
                className='block lg:w-[700px] w-[200px] md:w-[400px] rounded-full border-[2px] py-2 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm border-black focus:border-transparent'
            />
        </div>
    )
}

export default Search
