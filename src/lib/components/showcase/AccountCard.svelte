<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import * as Card from '@/lib/components/ui/card/index';
	import { Input } from '@/lib/components/ui/input/index';
	import { Label } from '@/lib/components/ui/label/index';
	import { GitGraph, Linkedin, User } from '@lucide/svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Create an account</Card.Title>
		<Card.Description>Enter your email below to create your account</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid grid-cols-2 gap-6">
			<Button variant="outline">
				<GitGraph class="mr-2 h-4 w-4" />
				Git
			</Button>
			<Button variant="outline">
				<Linkedin class="mr-2 h-4 w-4" />
				Linkedin
			</Button>
		</div>
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<span class="w-full border-t"></span>
			</div>
			<div class="relative my-4 flex justify-center text-xs uppercase">
				<span class="bg-background text-muted-foreground px-2"> Or continue with </span>
			</div>
		</div>
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="m@example.com" />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">
			<User class="mr-2 h-4 w-4" /> Create Account
		</Button>
	</Card.Footer>
</Card.Root>
