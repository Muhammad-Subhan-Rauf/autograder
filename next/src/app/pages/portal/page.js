import Button from '@/components/gui/Button'
import Link from 'next/link'

export default function Portal() {
    return (

        <div className="flex bg-gray-200 items-start justify-center min-h-screen w-full pb-20">
            <div className="p-8 bg-white rounded-lg shadow-lg max-w-[50%] w-full border border-blue-500 mt-10 md:mt-20">
                <h1 className="text-2xl md:text-2xl font-bold text-center text-blue-500 mb-4">
                    Student Portal
                </h1>
                
                {/* Labs Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                        Labs:
                    </h2>
                    <div className="flex flex-col space-y-4">
                        {/* Lab1 Link as an Active Button */}
                        <Button href="/pages/labs/lab1">
                            Lab 1
                        </Button>
                        
                        {/* Lab2 Link as a Disabled Button */}
                        <Button disabled>
                            Lab 2
                        </Button>
                    
                    </div>
                </div>

            </div>
        </div>  
    )
}