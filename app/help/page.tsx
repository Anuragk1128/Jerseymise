import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import ContactForm from "@/components/contatform"
import { ReactElement } from "react"

export default function Help(): ReactElement {
    return(
        <div>
            <Header/>
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Contact Support</h1>
            <ContactForm/>
            <FooterSection/>
        </div>
    )
}