# Gemini Project Helper

This document provides guidance for the Gemini AI assistant on how to interact with the `outfoxweb-astro` project.

## Project Overview

This is a modern website built using the Astro framework. It appears to be a portfolio or agency website, with a focus on web development, design, and SEO services. The project uses Svelte for interactive UI components and TypeScript for type safety.

## Technologies

- **Framework**: [Astro](https://astro.build/)
- **UI Components**: [Svelte](https://svelte.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Package Manager**: [Yarn](https://yarnpkg.com/)
- **Content**: Astro Content Collections (for the blog)

## Key Directories

- `src/pages`: Contains the site's pages and API routes. Each file corresponds to a URL endpoint.
- `src/components`: Houses reusable UI components, primarily written in Svelte (`.svelte`).
- `src/layouts`: Defines the overall page structure, like the main `Layout.astro`.
- `src/content`: Manages content collections, such as blog posts in `src/content/blog/`.
- `src/styles`: Contains global CSS and Tailwind CSS configuration.
- `public/`: Stores static assets like images, fonts, and favicons that are copied directly to the build output.

## Common Commands

The project uses `yarn` as its package manager. The following commands are likely configured in `package.json`:

- **Start development server**: `yarn dev`
- **Create a production build**: `yarn build`
- **Preview the production build**: `yarn preview`
- **Run Astro's type-checker**: `yarn astro check`
- **Linting**: Check `package.json` for a `lint` script.

When making changes, please adhere to the existing coding style, including TypeScript best practices and the conventions used in the Astro and Svelte components.

## Framework and Technology Guidelines

For specific guidelines on the technologies used in this project, please refer to the following documents in the `instructions/` directory. These files contain detailed rules, conventions, and examples that are critical for maintaining code quality and consistency.

- **Svelte 5:** Refer to `instructions/svelte_rules.md` for comprehensive rules on Svelte 5 development, including the mandatory use of the Runes system, state management patterns, and component best practices.
- **Convex:** Refer to `instructions/convex_rules.md` for guidelines on schema design, queries, mutations, actions, and other Convex-specific features.
- **Svelte + Convex Integration:** Refer to `instructions/svelte_and_convex.md` for information on how to use Svelte with Convex, including a link to the `convex-svelte` client-side package documentation.

# General Coding Style Rules

Keep your explanations brief and to the point.

- Use descriptive variable and function names
- Use functional and declarative programming patterns; avoid unnecessary classes except for state machines
- Prefer iteration and modularization over code duplication
- Use TypeScript for all code; prefer types over interfaces
- Implement proper lazy loading for images and other assets
- Wherever appropriate, opt for early returns as opposed to multiple or nested if/else conditions or switch statements
- Prefer to abstract complicated logic into small pure functions with descriptive names and few parameters as necessary

### Accessibility

- Ensure proper semantic HTML structure
- Implement ARIA attributes where necessary
- Ensure keyboard navigation support for interactive elements

## Prefer to "early out" in functions rather than nesting statements

Instead of this:

```ts
let theResult = "";
if (someVariable == 42) {
  theResult = "the answer";
}
else if (someVariable == 69) {
  theResult = "nice";
}
else {
  theResult = "nope";
}
return theResult
```

You should write this:

```ts
if (someVariable == 42) 
  return "the answer";
if (someVariable == 69) 
  return "nice";
return "nope";
```

Another example. Instead of this:

```ts
const showAdminPanel = () => {
	if (wifi) {
		if (login) {
			if (admin) {
				seeAdminPanel();
			} else {
				console.log('must be an admin')
			}
		} else {
			console.log('must be logged in')
		}
	} else {
		console.log('must be connected to wifi')
	}
}
```

Do this:

```ts
const showAdminPanel = () => {
	if (!wifi) return handleNoWifi()
	
	if (!login) return handleNotLoggedIn()
	
	if (!admin) return handleNotAdmin()
	
	seeAdminPanel();
}
```

## Prefer to use the "object in object out" pattern when writing typescript functions

So instead of writing this:

```ts
function myFunction(firstArg: string, second: number, isSomething?: boolean) {
  // ...
}
```

You should write:

```ts
function myFunction({ firstArg, second, isSomething }: { firstArg: string, second: number, isSomething?: boolean }) {
  // ...
}
```

If the function needs to return multiple values then return an object:

```ts
function calculateSomething() {
  return {
    theAnswer: 42,
    reason: "the computer said so"
  }
}
```

## Prefer if-statements with early returns over switch statements

Instead of this:

```ts
function doSomething(kind: MyKind) {
  switch (kind) {
    case "a":
      return "it was A";
    case "b":
      return "it was B";
    case "c":
      return "it was C";
  }
}
```

Prefer this:

```ts
function doSomething(kind: MyKind) {
  if (kind === "a") return "it was A";
  if (kind === "b") return "it was B";
  if (kind === "c") return "it was C";
}
```

## You should generally never use the non-null assertion operator to trick the typescript compiler

You should never do this:

```ts
function doSomething(myObj: { value: string } | null) {
  console.log(myObj!.value);
}
```

Instead do this:

```ts
function doSomething(myObj: { value: string } | null) {
  if (!myObj) throw new Error("myObj is null");
  console.log(myObj.value);
}
```

## Error Handling

- Prefer try/catch blocks for error handling, even multiple within the same function if it keeps the code clean
- Use explicit error checking rather than ignoring potential failures

Example:

```ts
async function processData({ input, backup }: { input: string, backup?: string }) {
  try {
    return await primaryProcessor(input);
  } catch (primaryError) {
    if (!backup) throw new Error("Primary processing failed and no backup provided");
    
    try {
      return await backupProcessor(backup);
    } catch (backupError) {
      throw new Error(`Both primary and backup processing failed: ${primaryError.message}, ${backupError.message}`);
    }
  }
}
```

## Type Definitions

- Prefer type unions over enums
- Use utility types like `Pick`, `Omit`, `Partial` when they improve code clarity

Instead of this:

```ts
enum Status {
  PENDING = "pending",
  COMPLETED = "completed", 
  FAILED = "failed"
}
```

Prefer this:

```ts
type Status = "pending" | "completed" | "failed";
```

Example using utility types:

```ts
type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

type CreateUser = Omit<User, "id" | "createdAt">;
type UpdateUser = Partial<Pick<User, "name" | "email">>;
```

## Import/Export Patterns

- Prefer named exports over default exports
- Use barrel exports (index.ts files) for grouping related exports like images or components
- Follow generally accepted import ordering conventions

Example barrel export:

```ts
import home from "@/assets/icons/home.png";
import search from "@/assets/icons/search.png";
import person from "@/assets/icons/person.png";
import logo from "@/assets/icons/logo.png";
import save from "@/assets/icons/save.png";
import star from "@/assets/icons/star.png";
import play from "@/assets/icons/play.png";
import arrow from "@/assets/icons/arrow.png";

export const icons = {
  home,
  search,
  person,
  logo,
  save,
  star,
  play,
  arrow,
};
```

Example import usage:

```ts
import { icons } from '@/constants/icons'
//
<img src={icons.home} />
```