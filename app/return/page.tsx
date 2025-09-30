import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
export default function Return() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Return & Exchange Policy
                        </h1>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We want you to be completely satisfied with your purchase. Please review our return policy below.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <section className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3">1</span>
                                Our Return Policy
                            </h2>
                            <p className="text-gray-700 mb-4">
                                We offer a 7-day return policy from the date of delivery for all our products. 
                                The item must be in its original condition with all tags attached and in the original packaging.
                            </p>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3">2</span>
                                Return Conditions
                            </h2>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Return within 7 days of receiving your order</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Product must be in original condition with all tags attached</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Original packaging must be undamaged and unused</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    <span>Products showing signs of use or damage may be rejected</span>
                                </li>
                            </ul>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-lg">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mr-3">3</span>
                                How to Initiate a Return
                            </h2>
                            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                                <li>As you can purchase the products on HOE, you will need to login there from your account</li>
                                <li>Visit to orders page and click on return</li>
                                <li>Fill up the return form and submit</li>
                                <li>Our team will verify your request and provide return instructions</li>
                                <li>Package your item securely and include all original tags and packaging</li>
                                <li>Ship the item back to us using a trackable shipping service</li>
                            </ol>
                        </section>

                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-blue-700">
                                        For any questions about our return policy, please contact us at <a href="mailto:admin@houseofevolve.in" className="font-medium underline">admin@houseofevolve.in</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    );
}