import MemberAvatar from '@/components/MemberAvatar'
export default function CustomFieldInpCreatedBy({ value }: { value: string }) {
  console.log('value', value)
  return <div key={value} className="cf-edit">
    {value ?
      <MemberAvatar size='sm' uid={value} />
      : null}
  </div>
}
