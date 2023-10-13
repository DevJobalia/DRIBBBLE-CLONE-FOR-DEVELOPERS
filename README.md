# Project Name

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tech Stack

1. next.js
   - usePathname
   - useRouter
   - useSearchParams
2. typescript
   - as keyword
3. react
4. tailwind css
5. graphbase Db using graphql to query API
   - in graphql using client.request is used to send query request to api
   - based on query it performs operation and provides response. hence no need to specify http methods like get or post
6. NextAuth.js: useCLient component => not rendered in server
   4.1 `getProvider, signIn`
   4.2 For each signin one provider
   4.3 GOOGLE OAUTH

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Project Setup

1. Create a new Next.js project using `create-next-app`:

   ```bash
   npx create-next-app@latest ./
   ```

   This command bootstraps a new Next.js project in the current directory. With the option to use `tailwind css` selected

### Package Installation

Install the following packages and dependencies:

```bash
npm install @headlessui/react cloudinary jsonwebtoken @types/jsonwebtoken graphql-request next-auth
```

```bash
npm i @grafbase/sdk --save-dev
```

```bash
npx grafbase init --config-format typescript
```

These packages provide essential functionality for your project.

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/your-project.git
   ```

2. Navigate to the project folder:

   ```bash
   cd your-project
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

### Running the Project

To start the development server, run the following command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To start grafbase dev. enviornment on WINDOWS(0.24)

```bash
npx grafbase dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Font Optimization

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Contributing

Contributions are what make the open-source community such an amazing place to be, learn, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add some YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@YourTwitter](https://twitter.com/YourTwitter) - your.email@example.com

Project Link: [https://github.com/your-username/your-project](https://github.com/your-username/your-project)

# DIFF. GRAFBASE HEADERS (DIFF REQUEST TO GRAFBASE SERVER)

- [x-api-key](https://grafbase.com/docs/projects/api-keys)
  If you're making a request on the backend, and don't need to filter data based on the owner, then you can use an API Key with requests.
- [Auth, bearer](https://grafbase.com/docs/auth)
  If you're making a request to the Grafbase GraphQL API from your frontend (React, Vue, Svelte, etc.) then you will need to configure an auth provider (Clerk, Auth0, NextAuth.js, etc.).

# how login functionality works

## GETTING TOKEN OF LOGGED IN USER

Grafbase is not a user management platform, so you will need to bring your own users with platforms like Clerk, _NextAuth.js_, and Auth0.

- create a jwt token for some time period (lib>sessions.ts) by Provider which is NextAuth.js
- GET method is created at route `NXT_PRJ2\app\api\auth\token`.
- Since it is next js the ROUTING DEFINES THE URL STRUCTURE. Therefore, we can access GET method specified at route `localhost:\\3000\api\auth\token` using `fetchToken()` in >lib>action.ts

## CHECKING IF AUTHORIZED USER CREATING (confirm if user is logged in)

- THIS IS DONE AT by providing token to `PRojectForm>HandleSubmit>CreateProject` function
- `client.setHeader("Authorization", `Bearer ${token}`);` authorises the user from the provider token
  EXTRA:
  The "Authorization: Bearer TOKEN" mechanism in an HTTP header doesn't directly specify which user to authorize. It's just a standardized way to include a token with an HTTP request, and the server receiving the request needs to interpret the token to determine which user or entity it belongs to.

Here's how it typically works:

1. **Token Generation**: When a user logs in or authenticates with your application, they receive an authentication token. This token is often generated and provided by an authentication system or service, such as NextAuth.js, Auth0, Firebase, or any custom authentication service.

2. **Token Content**: The token contains information about the authenticated user or the entity it represents. This information is usually in the form of claims, which can include user identifiers, roles, permissions, and any other relevant data.

3. **Token Encoding**: The token is typically encoded, often as a JSON Web Token (JWT). JWTs are self-contained and include the necessary claims and a digital signature.

4. **Authorization Header**: The client includes the token in the "Authorization" header of an HTTP request, following the "Bearer" scheme, like this: "Authorization: Bearer TOKEN."

5. **Server Verification**: The server that receives the request must validate the token's authenticity and verify its content. This involves decoding the token, verifying its digital signature, and checking its claims, especially the user identifier.

6. **User Identification**: After verifying the token, the server can identify which user is making the request based on the user identifier in the token's claims.

7. **Authorization Logic**: The server then checks whether the identified user has the necessary permissions to perform the requested action. It may use the information in the token's claims, consult a database, or rely on other authorization mechanisms.

In summary, the "Bearer TOKEN" in the "Authorization" header is simply a means of including the token with the request. The server decodes and verifies the token to identify the user and determine whether they have the appropriate permissions to perform the action. The actual logic for associating the token with a user and authorizing the request is implemented on the server, typically in the authentication and authorization middleware or within the GraphQL resolver functions.

# Server Side hence more fast loading

# Pagination in graphql

using startCursor
