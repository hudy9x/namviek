import { Root, Image as AvatarImage, Fallback as AvatarFallback } from '@radix-ui/react-avatar';
import "./style.css"
export default function Avatar({ src, name }: { src: string; name: string }) {
	return (
		<Root className="avatar-root">
			<AvatarImage
				className="avatar-image"
				src={`${src ? src : 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80'}`}
				alt={name}
			/>
			<AvatarFallback className="avatar-fallback" delayMs={600}>
				{name.slice(0, 2).toUpperCase()}
			</AvatarFallback>
		</Root>
	);
}
