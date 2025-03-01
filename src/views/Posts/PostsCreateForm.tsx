'use client';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { parsePosts } from '@/utils/posts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
	content: z.string().min(1, 'Please enter some posts'),
});

export function PostsCreateForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		try {
			const posts = parsePosts(values.content);
			console.log('Parsed posts:', posts);

			const response = await fetch('/api/posts', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ posts }),
			});

			if (!response.ok) {
				const errorData = await response.text();
				console.error('Server error:', errorData);
				throw new Error(`Failed to create posts: ${errorData}`);
			}

			const result = await response.json();
			console.log('Created posts:', result);
			form.reset();
			setIsSuccess(true);
		} catch (error) {
			console.error('Error creating posts:', error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									placeholder="Enter your posts..."
									className="min-h-[300px] font-mono"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isLoading}>
					{isLoading
						? 'Creating posts...'
						: isSuccess
							? 'Posts created successfully'
							: 'Parse and Schedule Posts'}
				</Button>
			</form>
		</Form>
	);
}
