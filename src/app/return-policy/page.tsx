import React from 'react';
import { Navbar } from '@/components/Landing/Navbar';
import { Footer } from '@/components/Landing/Footer';

export default function ReturnPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans">
      <Navbar />

      <main className="pt-40 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-semibold text-center tracking-tighter mb-12 bg-gradient-to-t from-black via-white/20 to-white bg-clip-text text-transparent pb-4">
          Return Policy.
        </h1>

        <div className="space-y-12 text-gray-300 leading-relaxed text-lg">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Digital Products</h2>
            <p>Because HG Healing offers non-tangible, irrevocable goods in the form of digital courses and content, we do not issue refunds once the order is accomplished and the product is accessible. As a customer, you are responsible for understanding this upon purchasing any item at our site.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Exceptions</h2>
            <p>However, we realize that exceptional circumstances can take place with regard to the character of the product we supply. Therefore, we DO honor requests for the refund on the following reasons:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Non-delivery of the product:</strong> Due to some mailing issues of your e-mail provider or your own mail server you might not receive a delivery e-mail from us.</li>
              <li><strong>Major defects:</strong> Although all the products are thoroughly tested before release, unexpected errors may occur. You should contact us for such issues.</li>
              <li><strong>Product not-as-described:</strong> Such issues should be reported to our Technical Support Department within 14 days from the date of the purchase. Clear evidence must be provided proving that the purchased product is not as it is described on the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Contacting Us for a Refund</h2>
            <p>Please note that we do not bear any responsibility and therefore we do not satisfy any refund/return/exchange requests based on incompatibility of our products with some third-party software (plug-ins, add-ons, modules, search engines, scripts, extensions, etc.) other than those which are specified as compatible in a description available on the preview page of each product.</p>
            <p className="mt-4">If you feel you qualify for a refund based on the above exceptions, please reach out to us at support@hghealing.com within 14 days of your purchase.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
