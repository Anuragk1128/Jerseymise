import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"

export default function Passion() {
    return (
        <div>
            <Header/>
            <h1 className="text-2xl font-bold text-center mt-5">Passion Points</h1>
            <p className="text-center text-gray-600 mb-8 mt-4">Passion Points is a loyalty program that rewards our customers for their loyalty and support. By shopping with us, you can earn points that can be redeemed for discounts and rewards.</p>
            <ul>
                <li>Earn 1 point for every rupee spent</li>
                <li>Points expire after 6 months</li>
                <li>Points can be redeemed for discounts on future purchases</li>
            </ul>
            <h2 className="text-center text-gray-600 mb-8 mt-10">This feature is currently under development and will be available soon.</h2>
            <FooterSection/>
        </div>
    )
}