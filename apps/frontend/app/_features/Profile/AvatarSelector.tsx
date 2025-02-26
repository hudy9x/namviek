import { useState } from 'react';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface AvatarSelectorProps {
  onSelect: (avatarPath: string) => void;
  currentAvatar?: string;
}

export default function AvatarSelector({ onSelect, currentAvatar }: AvatarSelectorProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  
  // Define fixed avatar paths
  const avatars = [
    '/avatars/men-1.png',
    '/avatars/men-2.png',
    '/avatars/men-3.png',
    '/avatars/men-4.png',
    '/avatars/men-5.png',
    '/avatars/men-6.png',
    '/avatars/men-7.png',
    '/avatars/men-8.png',
    '/avatars/men-9.png',
    '/avatars/men-10.png',
    '/avatars/men-11.png',
    '/avatars/men-12.png',
    '/avatars/female-1.png',
    '/avatars/female-2.png',
    '/avatars/female-3.png',
    '/avatars/female-4.png',
    '/avatars/female-5.png',
    '/avatars/female-6.png',
    '/avatars/female-7.png',
    '/avatars/female-8.png',
    '/avatars/female-9.png',
    '/avatars/female-10.png',
    '/avatars/female-11.png',
    '/avatars/female-12.png',
    

  ];

  const handleSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
  };

  return (
    <div className="">
      <h3 className="text-lg font-medium mb-3 dark:text-white">Select an avatar</h3>
      <div className="flex flex-wrap gap-4">
        {avatars.map((avatar, index) => (
          <div 
            key={index}
            className={`relative cursor-pointer rounded-full border-2 ${
              selectedAvatar === avatar || (!selectedAvatar && currentAvatar === avatar) 
                ? 'border-blue-500' 
                : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => handleSelect(avatar)}
          >
            <img 
              src={avatar} 
              alt={`Avatar option ${index + 1}`} 
              className="w-12 h-12 object-cover rounded-full"
            />
            {(selectedAvatar === avatar || (!selectedAvatar && currentAvatar === avatar)) && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5">
                <IoCheckmarkCircle className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 