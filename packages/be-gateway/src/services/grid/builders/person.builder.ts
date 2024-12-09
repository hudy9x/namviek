export function buildPersonQuery(path: string, operator: string, value: string) {
  console.log('build person', value)
  const persons = value.split(',')
  switch (operator) {
    case 'contains':
      return { [path]: { $in: persons } }

    case 'doesn\'t contain':
      return { [path]: { $nin: persons } }

    case 'is empty':
      return {
        $or: [
          { [path]: null },
          { [path]: '' },
          { [path]: { $size: 0 } }
        ]
      }

    case 'is not empty':
      return {
        [path]: {
          $exists: true,
          $nin: ['', null, []]
        }
      }

    default:
      return { [path]: { $in: persons } }
  }
} 
