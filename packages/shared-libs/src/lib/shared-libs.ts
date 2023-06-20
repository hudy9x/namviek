export function sharedLibs(): string {
  return 'shared-libs';
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

