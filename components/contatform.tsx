"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { ContactFormData } from '@/types'

export default function ContactForm() {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setSubmitted(true)
        setIsSubmitting(false)
        setFormData({ name: '', email: '', message: '' })
        
        setTimeout(() => setSubmitted(false), 3000)
    }

    if (submitted) {
        return (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                Thank you! Your message has been sent successfully.
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>
            
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    )
}
