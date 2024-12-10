import { buildDateQuery } from "./date.builder"

const now = new Date();
const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

// Test cases for "is" operator
const testCases = [
  'today',
  'yesterday',
  'tomorrow',
  'one week ago',
  'this week',
  'next week',
  'one month ago',
  'this month',
  'next month',
  'one year ago',
  'this year',
  'next year',
  'exact date',
  'days ago',
  'days from now',
  'weeks ago',
  'weeks from now',
  'months ago',
  'months from now',
  'years ago',
  'years from now'
];


export const runTest = async () => {
  const path = '8792837498723'
  // Print results for "is" operator
  console.log('=== Test Cases for "is" Operator ===');
  testCases.forEach(testCase => {
    console.log(`\nIS: "${testCase.toUpperCase()}" >>>>>>>>>>>>>>>>>>>>>>`);
    console.log(JSON.stringify(buildDateQuery(path, 'is', testCase), null, 2));
  });

  // Print results for "is not" operator
  console.log('=== Test Cases for "is not" Operator ===');
  testCases.forEach(testCase => {
    console.log(`\nIS NOT: "${testCase.toUpperCase()}" >>>>>>>>>>>>>>>>>>>>>>`);
    console.log(JSON.stringify(buildDateQuery(path, 'is not', testCase), null, 2));
  });

}
