import { taskSchema } from '@/lib/validation';
import { useUserState } from '@/stores/user-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

interface Props {
	title?: string;
	isEdit?: boolean;
	onClose?: () => void;
	handler: (values: z.infer<typeof taskSchema>) => Promise<void>;
}

const TaskForm = ({ title = '', handler, isEdit, onClose }: Props) => {
	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: { title: '' },
	});

	const [isLoading, setisLoading] = useState(false);

	const { user } = useUserState();

	const onSubmit = async (values: z.infer<typeof taskSchema>) => {
		if (!user) return null;
		setisLoading(true);
		const { title } = values;
		const promise = handler(values).finally(() => setisLoading(false));

		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Success!',
			error: 'Something went wrong',
		});
	};

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder='Enter a task'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-end gap-4'>
						{isEdit && (
							<Button
								type='button'
								disabled={isLoading}
								variant={'destructive'}
								onClick={onClose}
							>
								cancel
							</Button>
						)}
						<Button type='submit' disabled={isLoading}>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default TaskForm;
