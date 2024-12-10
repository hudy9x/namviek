export function buildBooleanQuery(path: string, operator: string, value: string) {
  switch (operator) {
    case 'is':
      return { [path]: value.toLowerCase() }

    case 'is empty':
      return {
        $or: [
          { [path]: null },
          { [path]: '' }
        ]
      }

    case 'is not empty':
      return {
        [path]: {
          $exists: true,
          $nin: ['', null]
        }
      }

    default:
      return { [path]: value.toLowerCase() }
  }
} 
