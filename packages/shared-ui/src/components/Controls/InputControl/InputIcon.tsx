export default function InputIcon({ source }: { source: JSX.Element }) {
  return <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{source}</div>
}
