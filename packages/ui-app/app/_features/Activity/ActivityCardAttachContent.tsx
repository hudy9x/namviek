interface ActivityCardCommentContentProps {
  url?: string | null
}

const ActivityCardAttachContent = ({
  url
}: ActivityCardCommentContentProps) => {
  return (
    <div>
      {url && (
        <img className="max-w-full max-h-[500px]" src={url} alt="undefined" />
      )}
      {/* {JSON.stringify(url)} */}
    </div>
  )
}
export default ActivityCardAttachContent
