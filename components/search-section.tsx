'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from './ui/input';

export default function SearchSection({initQuery, prefix = '/'}: {initQuery: string, prefix?: string }) {
    const [query, setQuery] = useState(initQuery);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            window.location.href = query == '' ? prefix : `${prefix}?q=${query}`;
        }
    };

    return (
        <div className="mb-4 relative">
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Nhập và nhấn enter để tìm kiếm'
                className={cn({
                    'pr-8': initQuery
                })}
            />
            {initQuery && <span className="absolute top-2 right-2 text-gray-400 hover:cursor-pointer" onClick={() => window.location.href = prefix}>
                <X size={24}/>
            </span>}
        </div>
    );
}
