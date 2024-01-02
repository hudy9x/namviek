import loadable from "@loadable/component"
import { Suspense, memo } from "react";
import { IconBaseProps, IconType } from "react-icons/lib"

interface typesPropsIcon {
  name: string;
  propsIcon?: IconBaseProps
}

 function DynamicIcon({ name: nameIcon, propsIcon }: typesPropsIcon): JSX.Element {
  const lib = nameIcon.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(" ")[0].toLocaleLowerCase();

  const libName = lib === 'hi' ? 'hi2' : lib

  const ElementIcon: IconType = loadable(() => import(`react-icons/${libName}/index.js`), {
    fallback: <svg></svg>,
    resolveComponent: (el: JSX.Element) => el[nameIcon as keyof JSX.Element]
  }) as IconType;


  return <ElementIcon {...propsIcon} />

}

export default memo(DynamicIcon)
