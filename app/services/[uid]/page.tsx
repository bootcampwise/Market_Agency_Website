export default function ServiceDetailPage({
  params,
}: {
  params: { uid: string }
}) {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">Service: {params.uid}</h1>
      <p>Coming soon...</p>
    </div>
  )
}
