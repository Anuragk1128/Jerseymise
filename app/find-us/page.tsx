import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import ContactForm from "@/components/contatform"
import InteractiveMap from "@/components/map"
import LocationCard from "@/components/location"
import { Location } from "@/types"

export default function FindUs() {
    const locations: Location[] = [
        {
            id: 1,
            name: "Main Office",
            address: "123 Business St, City, State 12345",
            phone: "(555) 123-4567",
            hours: "Mon-Fri: 9AM-6PM"
        },
        {
            id: 2,
            name: "Branch Office",
            address: "456 Commerce Ave, City, State 12345",
            phone: "(555) 987-6543",
            hours: "Mon-Fri: 10AM-5PM"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
                    Find Us
                </h1>
                
                {/* Interactive Map Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Our Locations</h2>
                    <InteractiveMap locations={locations} />
                </section>

                {/* Location Cards */}
                <section className="mb-12">
                    <div className="grid md:grid-cols-2 gap-6">
                        {locations.map(location => (
                            <LocationCard key={location.id} location={location} />
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
                    <ContactForm />
                </section>
            </main>
            
            <FooterSection />
        </div>
    )
}
