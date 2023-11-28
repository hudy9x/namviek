import { linkNameReg, linkRefReg } from './regex'
interface IActivityCardCommentLink {
  linkObject: string
}

export default function ActivityCardCommentLink({
  linkObject
}: IActivityCardCommentLink) {
  const linkName = linkObject.match(linkNameReg)?.[0]?.slice(1, -1)
  const linkRef = linkObject.match(linkRefReg)?.[0]?.slice(1, -1)

  return (
    <a
      className="text-blue-600 whitespace-nowrap hover:underline"
      target="_blank"
      href={linkRef || '#'}>
      {linkName || 'undefined'}
    </a>
  )
}
