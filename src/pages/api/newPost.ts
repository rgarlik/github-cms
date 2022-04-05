import LoggerService from '@/lib/logger-service';
import type { NextApiRequest, NextApiResponse } from 'next';
import octoService from '@/lib/octo-service';
import { badRequest, internal } from '@/lib/response-helpers';

const log = LoggerService.GetInstance();

// API Route for submitting a new post
// eslint-disable-next-line consistent-return
export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  // eslint-disable-next-line consistent-return
): Promise<void> => {
  // eslint-disable-next-line consistent-return

  if(process.env.DEMO_MODE) {
    return badRequest(res, `Demo mode is enabled. Not accepting any new posts. Try hosting the website yourself to see it in action`);
  }
  
  if (req.body === `` || !req.body) {
    return badRequest(res, `Blog post contents are empty`);
  }

  if (req.body.title === `` || req.body.title.length > 100) {
    return badRequest(res, `Blog post title is too long`);
  }

  if (req.body.content === `` || req.body.title.length > 10000) {
    return badRequest(res, `Blog post content is too long`);
  }

  if (req.body.signature === `` || req.body.signature.length > 50) {
    return badRequest(res, `Author name is too long`);
  }

  const generatedPost = `---
title: '${req.body.title}'
excerpt: '${req.body.content.replace(/\n/g, ` `).substring(0, 250)}'
coverImage: 'gPm8h3DS1s4'
date: '${new Date().toISOString()}'
author: '${req.body.signature}'
---

${req.body.content}
  `;

  log.info(`Generated markdown:`, generatedPost);

  const slug = req.body.title
    .replace(/\s+/g, `-`)
    .replace(`/`, ``)
    .replace(`\\`, ``)
    .replace(`)`, ``)
    .replace(`(`, `-`)
    .replace(`:`, ``)
    .toLowerCase();

  const octo = octoService.GetInstance();

  const octoRes = await octo.request(
    `PUT /repos/{owner}/{repo}/contents/{path}`,
    {
      owner: `${process.env.GITHUB_REPO_OWNER}`,
      repo: `${process.env.GITHUB_REPO_NAME}`,
      path: `_posts/${slug}.md`,
      message: `uploading content: ${slug}`,
      content: Buffer.from(generatedPost).toString(`base64`),
    },
  );

  log.debug(`GitHub responded with ${octoRes.status}`);
  if (octoRes.status === 201) {
    res.status(201).end();
  } else {
    internal(res, `Commit attempt to GitHub was not successful`);
  }
};
