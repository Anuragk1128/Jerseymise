import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
export default function Return(){
    return(
        <div className="mx-auto max-w-7xl">
            <Header/>
            <div>
                <h1 className="text-2xl font-bold">Return</h1>
                <p className="text-lg">
                    Return Policy
                </p>
                <p className="text-sm">
                
                We provide 7 days return policy for all our products.</p>
                <p>The tags and products should be in the same condition as they were received.</p>
            </div>
            <FooterSection/>
        </div>
    )
}