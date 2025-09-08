import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import ContactForm from "@/components/contatform"
import { ReactElement } from "react"

export default function Help(): ReactElement {
    return(
        <div>
            <Header/>
            <h1>Help</h1>
            <ContactForm/>
            <FooterSection/>
        </div>
    )
}