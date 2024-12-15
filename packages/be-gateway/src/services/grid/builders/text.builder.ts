export function buildTextQuery(path: string, operator: string, value: string) {
  switch (operator) {
    case 'is':
      return { [path]: value }

    case 'is not':
      return { [path]: { $ne: value } }

    case 'contains':
      return { [path]: { $regex: value, $options: 'i' } }

    case 'doesn\'t contain':
      return { [path]: { $not: { $regex: value, $options: 'i' } } }

    case 'contains word':
      return {
        $or: value.split(' ').map(word => ({
          [path]: { $regex: word.trim(), $options: 'i' }
        }))
      }

    case 'doesn\'t contain word':
      return {
        $and: value.split(' ').map(word => ({
          [path]: { $not: { $regex: word.trim(), $options: 'i' } }
        }))
      }

    case 'length is lower than':
      const length = parseInt(value, 10)
      if (isNaN(length)) return { [path]: { $exists: true } }
      return {
        $and: [
          { [path]: { $exists: true } },
          { [path]: { $expr: { $lt: [{ $strLenCP: `$${path}` }, length] } } }
        ]
      }

    case 'is empty':
      return {
        $or: [
          { [path]: { $exists: false } },
          { [path]: '' },
          { [path]: null }
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
      return { [path]: { $regex: value, $options: 'i' } }
  }
} 