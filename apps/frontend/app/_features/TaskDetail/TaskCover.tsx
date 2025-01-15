export default function TaskCover({ url }: { url: string }) {
  return (
    <div className="-mx-6 -mt-6 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 rounded-t-md overflow-hidden max-h-60">
      <img alt="Image cover" className="max-w-full mx-auto" src={url} />
    </div>
  )
}
