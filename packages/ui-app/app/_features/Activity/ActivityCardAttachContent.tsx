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
    </div>
  )
}
export default ActivityCardAttachContent
