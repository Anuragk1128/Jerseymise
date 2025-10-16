import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header/>
      <div className="container mx-auto px-4 max-w-4xl mt-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size guide. All measurements are in inches.
          </p>
        </div>

        {/* T-Shirt Size Guide */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              T-Shirt Size Guide
              <Badge variant="secondary">Most Popular</Badge>
            </CardTitle>
            <CardDescription>
              Our t-shirts are designed for a comfortable, regular fit. Size up for a more relaxed look.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Size</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Chest (inches)</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Length (inches)</th>
                    <th className="border border-gray-300 px-4 py-3 text-center font-semibold">Shoulder (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">XS</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">34-36</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">26</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">16</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">S</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">36-38</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">27</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">17</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">M</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">38-40</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">28</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">18</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">L</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">40-42</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">29</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">19</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">XL</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">42-44</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">30</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">20</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">XXL</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">44-46</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">31</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">21</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">XXXL</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">46-48</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">32</td>
                    <td className="border border-gray-300 px-4 py-3 text-center">22</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Sizing Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Sizing Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>How to measure:</strong> For chest measurement, measure around the fullest part of your chest, keeping the tape level under your arms.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Fit preference:</strong> If you prefer a tighter fit, go with the smaller size. For a more relaxed fit, size up.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">
                  <strong>Still unsure?</strong> Check the product pages for specific garment measurements and compare them with your own measurements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <FooterSection/>
    </div>
  )
}
