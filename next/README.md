# Creating a Next.js app:

```bash
npx create-next-app@latest
```

# Standalone Docker container for testing:

First build:
```bash
docker build -t my-nextjs-app .
```

Then run:
```bash
docker run -d -p 3000:3000 --name nextjs-app my-nextjs-app
```