# GitHub CMS
A simple experimental blog web service that uses its own GitHub repo as its CMS system for blog posts. This assumes the page is automatically re-built after every commit by a (most likely free) build service such as [Vercel](https://vercel.com/). This repo also uses serverless [API functions](https://nextjs.org/docs/api-routes/introduction) provided by [Next.js](https://nextjs.org/) to upload new posts through GitHub's [octokit API](https://github.com/octokit) into the repo. You can get all of this for free through Vercel's [Hobby](https://vercel.com/pricing) plan. You're basically limited by Vercel's [limits](https://vercel.com/docs/concepts/limits/overview) on serverless function bandwidth, execution time etc. but a small blog site can be run completely free without a hosted database this way.

[This](https://github.com/rgarlik/github-cms/commit/abc165b129c9eb18f2384259e4e84f0393d72802) is an example of a commit made from someone posting something on the website. Ideally, you'd have a second "bot" account to make these kinds of posts, I just used my own. 

## 🔨 Getting it to run
After cloning the repo and downloading all the packages using `npm install`, you need to set a few enviromental variables in your shell before starting the next dev server. If you're deploying the site to Vercel, you'll have to set the env variables in your dashboard, you can read about it [here](https://vercel.com/docs/concepts/projects/environment-variables).

| Variable | What does it do?                                                                                                                                                       |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `GITHUB_TOKEN`      | A GitHub access token generated [here](https://github.com/settings/tokens) for the user which should be responsible for uploading the blog posts into the project repo |
| `GITHUB_REPO_OWNER`      | Name of the owner of the repo to which posts should be uploaded |
| `GITHUB_REPO_NAME`      | Name of the repo to which posts should be uploaded |
| `DEMO_MODE`      | If this is set to `yes`, the website won't upload things to GitHub, I have this enabled on the demo site so I don't get spammed with commits. |

After setting these variables, you can then launch the dev server by running: 
```shell
npm run dev
```

Deploying this website on Vercel of course also works.

## 📜 How it works

The idea behind this project came from wanting to host a simple blog without spending any money at all. It works really well given that we stay within Vercel's limits on deployments and serverless functions.

The website is deployed from a GitHub repo and all the blog posts are built statically into it:

![Diagram 1](/pictures/git_cms_1.png)

A user writes up a new blog post and triggers a serverless function that commits it to the GitHub repo using GitHub's octo API.

![Diagram 2](/pictures/git_cms_2.png)

This new commit triggers a re-build of the website with the new blog post in it.

![Diagram 3](/pictures/git_cms_3.png)

Changes are now live.

![Diagram 4](/pictures/git_cms_4.png)

## ⚠ Is this safe to use for production?
No, this is not secure at all and you're probably gonna hit your Hobby tier limits pretty soon, not to mention people can spam your GitHub repo with commits. However if you know what you're doing and you have the time to implement some securiy, feel free to use this if it fits your niche needs.
