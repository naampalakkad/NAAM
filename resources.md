# resources File for Naam Website

## Documentations: 
Next JS : https://nextjs.org/docs/pages/building-your-application
Chakra UI : https://chakra-ui.com/docs/components
Figma UI demo: https://www.figma.com/file/TTzi3AGI3qvdlUVNCzwZ99/Untitled?type=design&node-id=1%3A2&mode=design&t=Iqp97KG97Gz1Bcpt-1
## Getting Started

clone the repo from github url : https://github.com/SreejithKSGupta/naam-website

install the dependencies:

```bash
npm install
``` 


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## using GIT:
periodicaly pull to incorporate changes made from others, and provide proper commits.
commit format: [ShortName change] eg: SJ updated readme.

## Adding Images:

you can use the default method of using HTML's Image tag, or use optimized next JS image tag.

Next.js can serve static files, like images, under a folder called public in the root
directory. Files inside public can then be referenced by your code starting from the
base URL ( / ).

For example, the file public/avatars/me.png can be viewed by visiting the
/avatars/me. png path. The code to display that image might look like:

```bash
import Image from 'next/image'
 
export function Avatar({ id, alt }) {
  return <Image src="{`/avatars/${id}.png`}" alt={alt} width="64" height="64" />
}
``` 
## to create new urls: 
 for eg: website.com/about me,
 create a new folder, and add a page.js file, and an optional layout.js