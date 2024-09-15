# Creating a Next.js app:

```bash
npx create-next-app@latest
```

# Enable Static Export:

To enable static export, add the following in your `next.config.js`:

```js
const nextConfig = {
    output: 'export',
}
```

Then run:

```bash
npx run build
```

This will generate a static website in the `.out/` folder