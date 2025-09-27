import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
export default function Story(){
    return(
        <div className="mx-auto max-w-7xl">
            <Header/>
            <div className="flex flex-col gap-4 p-4 mb-4">
                <h1>Our Story</h1>
                <p>
                    JerseyMise is a brand that specializes in creating high-quality jerseys for all sports.
                </p>
            </div>
            <div></div>
            <FooterSection/>
        </div>
    )
}