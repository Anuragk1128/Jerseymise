import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Instagram } from "lucide-react"
export default function Careers() {
    return(
        <div>
            <Header/>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Careers</h1>
            <p className="text-center text-gray-600 mb-8">We are always looking for talented individuals to join our team.</p>
            
            <p className="text-center text-gray-600 mt-8">Join Our Social Media Handles</p>
            <div className="flex justify-center mt-6">
                <a href="https://www.instagram.com/jerseymise" target="_blank" rel="noopener noreferrer" className="mx-2 mb-4">
                    <Instagram/>
                </a>
                
                
            </div>
            <div className="flex flex-col items-center justify-center mt-6">
            <h2>Currently there are no opening positions for jesreymise.</h2>
                <p>Stay tuned for updates on our social media handles.</p>
            </div>
            <FooterSection/>
        </div>
    )
}