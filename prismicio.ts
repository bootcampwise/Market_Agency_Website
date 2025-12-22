import * as prismic from '@prismicio/client'
import {
  createClient as createPrismicClient,
  getRepositoryEndpoint,
} from '@prismicio/client'
import { enableAutoPreviews, CreateClientConfig } from '@prismicio/next'
import config from './slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'homepage',
    path: '/',
  },
  {
    type: 'blog_post',
    path: '/blogs/:uid',
  },
  {
    type: 'social_media_marketing',
    path: '/services/social-media-marketing',
  },
  {
    type: 'use_cases',
    path: '/use-cases',
  },
  {
    type: 'services_page',
    path: '/services',
  },
  {
    type: 'about',
    path: '/about',
  },
  {
    type: 'pricing',
    path: '/pricing',
  },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: CreateClientConfig = {}) => {
  const client = createPrismicClient(getRepositoryEndpoint(repositoryName), {
    routes,
    ...config,
  })

  enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}
