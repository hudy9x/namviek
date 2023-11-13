export function sharedLibs(): string {
  return 'shared-libs';
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}


