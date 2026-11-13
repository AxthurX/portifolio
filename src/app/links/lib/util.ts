import { Check, Link2 } from 'lucide-react';
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX, BsWhatsapp } from 'react-icons/bs';

export const Socials = (
	copied: boolean,
	handleCopy: () => void,
	shareUrl: (platform: string) => void,
	handleNativeShare: () => void,
) => {
	return [
		{
			name: 'Copiar link',
			icon: copied ? Check : Link2,
			color: 'bg-[#e8e9e1] text-neutral-800',
			action: handleCopy,
		},
		{
			name: 'X',
			icon: BsTwitterX,
			color: 'bg-black text-white',
			action: () => shareUrl('x'),
		},
		{
			name: 'Facebook',
			icon: BsFacebook,
			color: 'bg-[#1877f2] text-white',
			action: () => shareUrl('facebook'),
		},
		{
			name: 'WhatsApp',
			icon: BsWhatsapp,
			color: 'bg-[#00d66f] text-white',
			action: () => shareUrl('whatsapp'),
		},
		{
			name: 'LinkedIn',
			icon: BsLinkedin,
			color: 'bg-[#0a66c2] text-white',
			action: () => shareUrl('linkedin'),
		},
		{
			name: 'Instagram',
			icon: BsInstagram,
			color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white',
			action: handleNativeShare,
		},
	];
};
