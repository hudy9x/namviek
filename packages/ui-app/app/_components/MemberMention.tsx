interface IMemberMention {
  userRepresent: string
}
export default function MemberMention({ userRepresent }: IMemberMention) {
  return <>{userRepresent}</>
}
