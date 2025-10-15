import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { FooterSection } from "@/components/sections/Footer"
export default function Catalogue() {
    return(
        <div className=" px-4 py-8">
            <Header/>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Catalogue</h1>
            <p className="text-center text-gray-600 mb-8">Explore our wide range of high-quality sportswear collections designed for performance and style.</p>
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8 text-center justify-center items-center">
                  
                    

                  
                    <Link
                        href="/product catlogue .pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-8 py-4  text-white font-semibold rounded-lg text-lg"
                    >
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <Image src="/logo/JERSEYMISE_LOGO_WHITE_BG.svg" alt="Catalogue 1" width={300} height={300} 
                        
                        />
                    
                    </Link>

                    
                </div>
                <div className="text-bold text-center mx-auto px-2">
                  <h1 className="text-2xl font-bold mb-4 text-gray-700 px-4">View Catalogue</h1>

                </div>
            </div>
            <FooterSection/>
        </div>
    )
}