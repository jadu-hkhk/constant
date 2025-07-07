export function Heading({ title, description }: { title: string; description: string }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
