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

  const highlight = diffArr.map(dItem => {
    const [type, text] = dItem

    if (type === 0) return text;
    if (type === 1) return `<span class="t-add">${text}</span>`
    return `<span class="t-remove">${text}</span>`
  })

  return highlight.join('')
}



