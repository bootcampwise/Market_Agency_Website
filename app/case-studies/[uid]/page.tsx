export default function CaseStudyPage({ params }: { params: { uid: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold capitalize lg:text-5xl">
            {params.uid.replace(/-/g, ' ')} Case Study
          </h1>
          <p className="text-base leading-relaxed text-gray-600 lg:text-lg">
            Detailed exploration of how we helped this client achieve their
            digital marketing goals.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="mb-6 leading-relaxed text-gray-700">
              This is a placeholder for the case study content. It follows the
              same design system and alignment as the Services page, ensuring a
              consistent user experience across the website.
            </p>
            <div className="my-12 rounded-[45px] border border-dark bg-gray-50 p-12 lg:p-16">
              <h2 className="mb-6 text-2xl font-bold lg:text-3xl">
                Key Results
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <span>Result 1: Significant improvement in metrics</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <span>Result 2: Increased user engagement</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <span>Result 3: Better conversion rates</span>
                </li>
              </ul>
            </div>
            <p className="leading-relaxed text-gray-700">
              More detailed content about the challenges, solutions, and impact
              would go here.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
