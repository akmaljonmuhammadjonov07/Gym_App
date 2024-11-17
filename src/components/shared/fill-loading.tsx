import { LucideLoader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

function FillLoading() {
	return (
		<Skeleton className='absolute inset-0 flex justify-center items-center w-full h-full opacity-20 z-50'>
			<LucideLoader2 className='animate-spin w-6 h-6' />
		</Skeleton>
	);
}

export default FillLoading;
