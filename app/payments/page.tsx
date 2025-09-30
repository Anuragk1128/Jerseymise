import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import Image from "next/image"
import { CreditCard, Smartphone, SmartphoneNfc, SmartphoneCharging, ShieldCheck } from 'lucide-react';

export default function Payments() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Secure Payment Options
                    </h1>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We accept various payment methods to make your shopping experience convenient and secure.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                    <div className="flex items-center justify-center mb-6">
                        <img 
                            src="https://razorpay.com/build/browser/static/razorpay-logo.7c32f8e4.svg" 
                            alt="Razorpay" 
                            className="h-12"
                        />
                    </div>
                    
                    <p className="text-center text-gray-700 mb-8">
                        We use Razorpay, a trusted payment gateway, to process all transactions securely.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <CreditCard className="h-6 w-6 text-primary mr-2" />
                                <h3 className="text-lg font-semibold">Credit & Debit Cards</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                We accept all major credit and debit cards including Visa, Mastercard, American Express, and Rupay.
                            </p>
                            <div className="flex flex-wrap gap-3 mt-4">
                                <img src="https://razorpay.com/build/browser/static/visa.111c38ec.svg" alt="Visa" className="h-8" />
                                <img src="https://razorpay.com/build/browser/static/mastercard.73b5534c.svg" alt="Mastercard" className="h-8" />
                                <img src="https://razorpay.com/build/browser/static/amex.0cd523b6.svg" alt="American Express" className="h-8" />
                                <img src="https://razorpay.com/build/browser/static/rupay.4e47944b.svg" alt="RuPay" className="h-8" />
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <SmartphoneNfc className="h-6 w-6 text-primary mr-2" />
                                <h3 className="text-lg font-semibold">UPI & Wallets</h3>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">
                                Fast and secure payments using UPI, Google Pay, PhonePe, Paytm, and other popular wallets.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <img src="https://razorpay.com/build/browser/static/upi.3a1d5e7b.svg" alt="UPI" className="h-8" />
                                <img src="https://razorpay.com/build/browser/static/google-pay.9f69d5c8.svg" alt="Google Pay" className="h-8" />
                                <img src="https://razorpay.com/build/browser/static/phonepe.4c0bdba8.svg" alt="PhonePe" className="h-8" />
                                <img src="https://razorpay.com/build/browser/static/paytm.9f8b3d5e.svg" alt="Paytm" className="h-8" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 flex items-center">
                            <SmartphoneCharging className="h-5 w-5 text-blue-600 mr-2" />
                            EMI Options Available
                        </h3>
                        <p className="text-gray-700 text-sm mb-3">
                            Convert your high-value purchases into easy EMIs with our partner banks.
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• No Cost EMI available on select banks</li>
                            <li>• 3/6/9/12 months EMI options</li>
                            <li>• Instant approval on most cards</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-400 p-4 flex items-start">
                    <ShieldCheck className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-medium text-green-800">100% Secure Payments</h3>
                        <p className="text-sm text-green-700">
                            Your payment information is encrypted and processed securely. We do not store your card details on our servers.
                        </p>
                    </div>
                </div>
            </main>
            <FooterSection />
        </div>
    )
}