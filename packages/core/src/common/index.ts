import diff from "fast-diff";
export function sharedLibs(): string {
  return 'shared-libs';
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function diffText(oldText: string, newText: string) {
  const diffArr = diff(oldText, newText) as [number, string][]

  // const leadingText = diffArr[0]
  // const tailText = diffArr[diffArr.length - 1]
  // const isLongText = (txt: [number, string]) => txt[0] === 0 && txt[1].length > 20

  const max = 40
  const shortenText = (txt: string) => txt.length > max ? '...' + txt.slice(txt.length - max) : txt

  // // shorten leading text if it not changed
  // if (isLongText(leadingText)) {
  //   leadingText[1] = '...' + leadingText[1].slice(leadingText[1].length - 20)
  // }
  //
  // // shorten tailing text if it not changed
  // if (isLongText(tailText)) {
  //   tailText[1] = '...' + tailText[1].slice(tailText[1].length - 20)
  // }

  const highlight = diffArr.map(dItem => {
    const [type, text] = dItem

    if (type === 0) return shortenText(text);
    if (type === 1) return `<span class="t-add">${text}</span>`
    return `<span class="t-remove">${text}</span>`
  })

  return highlight.join('')
}



