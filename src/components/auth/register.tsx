import { auth } from '@/firebase';
import { registerSchema } from '@/lib/validation';
import { useAuthState } from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import FillLoading from '../shared/fill-loading';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Button } from '../ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState('');

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '' },
	});
	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const { email, password } = values;
		setIsLoading(true);
		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (error) {
			const result = error as Error;
			setError(result.message);
		} finally {
			setIsLoading(false);
		}
	};

	const { setAuth } = useAuthState();
	return (
		<div className='flex flex-col'>
			{isLoading && <FillLoading />}

			<h2 className='text-xl font-bold'>Register</h2>
			<p className='to-muted-foreground'>
				Already have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => {
						setAuth('login');
					}}
				>
					Sign In
				</span>
			</p>
			<Separator className='my-3' />
			{error && (
				<Alert variant='destructive'>
					<AlertCircle className='h-4 w-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email address</FormLabel>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										disabled={isLoading}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-2 gap-2'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											placeholder='*****'
											type='password'
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>ConfirmPassword</FormLabel>
									<FormControl>
										<Input placeholder='*****' type='password' {...field} />
									</FormControl>
									<FormDescription>
										This is your public display name.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<Button
							type='submit'
							disabled={isLoading}
							className='h-12 w-full mt-2'
						>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}

export default Register;
