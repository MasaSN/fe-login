import React from 'react'

export default function Header() {
  return (
    <div className=' w-full bg-blue-950 '>
        <header class="bg-gray-800 text-white p-4">
            <div class="flex items-center justify-between">
    
                <div class="text-2xl font-bold">
                {/* <img src="your-logo.png" alt="Logo" class="h-8 w-auto"/> */}
                </div>
    
                <nav class="space-x-6">
                <a href="/" class="hover:text-blue-400"></a>
                <a href="/about" class="hover:text-blue-400"></a>
                <a href="/contact" class="hover:text-blue-400"></a>
                </nav>
            </div>
        </header>

        
      
    </div>
  )
}
