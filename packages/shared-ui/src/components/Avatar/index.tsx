import { Root, Image as AvatarImage, Fallback as AvatarFallback } from '@radix-ui/react-avatar';
import './style.css';

interface IAvatar {
  size?: 'lg' | 'md' | 'base' | 'sm'
  src: string;
  name: string;
}

export default function Avatar({ src, name, size = 'base' }: IAvatar) {
  return (
    <Root className={`avatar-root size-${size} shrink-0`}>
      <AvatarImage className="avatar-image" src={src} alt={name} />
      <AvatarFallback className="avatar-fallback" delayMs={600}>
        {name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Root>
  );
}
