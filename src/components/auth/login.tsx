import { auth } from '@/firebase';
import { loginSchema } from '@/lib/validation';
import { useAuthState } from '@/stores/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
function Login() {
	const { setAuth } = useAuthState();
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		const { email, password } = values;

		setIsLoading(true);
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (error) {
			const result = error as Error;
			setError(result.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='flex flex-col'>
			{isLoading && <FillLoading />}

			<h2 className='text-xl font-bold'>Login</h2>
			<p className='to-muted-foreground'>
				Don't have an account?{' '}
				<span
					className='text-blue-500 cursor-pointer hover:underline'
					onClick={() => {
						setAuth('register');
					}}
				>
					Sign Up
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
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder='*****'
										disabled={isLoading}
										type='password'
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

export default Login;
