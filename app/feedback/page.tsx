"use client"

import { useState, ChangeEvent, FormEvent } from 'react'
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Facebook, Instagram, MessageSquare, Star } from "lucide-react"

interface FeedbackFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    rating: string;
}

export default function Feedback() {
    const [formData, setFormData] = useState<FeedbackFormData>({
        name: '',
        email: '',
        subject: '',
        message: '',
        rating: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission - in a real app, this would send to an API
        await new Promise(resolve => setTimeout(resolve, 1500))

        setSubmitted(true)
        setIsSubmitting(false)
        setFormData({ name: '', email: '', subject: '', message: '', rating: '' })

        setTimeout(() => setSubmitted(false), 5000)
    }

    if (submitted) {
        return (
            <div>
                <Header/>
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="container mx-auto px-4 max-w-2xl">
                        <Card className="bg-green-50 border-green-200">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h2>
                                    <p className="text-green-700 mb-4">Your feedback has been submitted successfully.</p>
                                    <p className="text-sm text-green-600">We appreciate you taking the time to share your thoughts with us.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <FooterSection/>
            </div>
        )
    }

    return (
        <div>
            <Header/>
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Send Us Feedback</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We value your opinion! Help us improve by sharing your thoughts, suggestions, or reporting any issues you've encountered.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        {/* Feedback Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5" />
                                        Share Your Feedback
                                    </CardTitle>
                                    <CardDescription>
                                        Your feedback helps us create better experiences for everyone.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name">Name *</Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="mt-1"
                                                    placeholder="Your full name"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email *</Label>
                                                <Input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="mt-1"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="rating">How would you rate your experience? *</Label>
                                            <select
                                                id="rating"
                                                name="rating"
                                                value={formData.rating}
                                                onChange={handleChange}
                                                required
                                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            >
                                                <option value="">Select a rating</option>
                                                <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                                                <option value="4">⭐⭐⭐⭐ Very Good</option>
                                                <option value="3">⭐⭐⭐ Good</option>
                                                <option value="2">⭐⭐ Fair</option>
                                                <option value="1">⭐ Poor</option>
                                            </select>
                                        </div>

                                        <div>
                                            <Label htmlFor="subject">Subject *</Label>
                                            <Input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                className="mt-1"
                                                placeholder="Brief description of your feedback"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="message">Your Feedback *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="mt-1"
                                                placeholder="Please share your detailed feedback, suggestions, or any issues you've encountered..."
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full"
                                            size="lg"
                                        >
                                            {isSubmitting ? 'Submitting Feedback...' : 'Submit Feedback'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        
                    </div>
                    {/* Information Panel */}
                    <div className="w-full max-w-2xl mx-auto mt-12">
                            <Card className="bg-gray-50 border-gray-200">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Star className="w-5 h-5" />
                                        Why Feedback Matters
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-gray-600">
                                        Your feedback helps us:
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-2">
                                        <li>• Improve product quality</li>
                                        <li>• Enhance user experience</li>
                                        <li>• Fix bugs and issues</li>
                                        <li>• Develop new features</li>
                                        <li>• Better understand your needs</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                </div>
            </div>
            <FooterSection/>
        </div>
    )
}
