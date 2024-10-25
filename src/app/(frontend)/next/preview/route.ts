import jwt from 'jsonwebtoken'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { CollectionSlug } from 'payload'

const payloadToken = 'payload-token'

export async function GET(
  req: Request & {
    cookies: {
      get: (name: string) => {
        value: string
      }
    }
  },
): Promise<Response> {
  const payload = await getPayloadHMR({ config: configPromise })
  const token = req.cookies.get(payloadToken)?.value
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const collection = searchParams.get('collection') as CollectionSlug
  const slug = searchParams.get('slug')
  const locale = searchParams.get('locale')

  // Early validation
  if (!token) {
    return new Response('You are not allowed to preview this page', { status: 403 })
  }

  if (!path || !collection || !slug || !locale) {
    payload.logger.error(`Missing required parameters for live preview path=${path} collection=${collection} slug=${slug} locale=${locale}`)
    return new Response('Missing required parameters', { status: 400 })
  }

  let user
  try {
    user = jwt.verify(token, payload.secret)
  } catch (error) {
    payload.logger.error(`Error verifying token for live preview: ${error}`)
    return new Response('Invalid token', { status: 403 })
  }

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }

  try {
    const docs = await payload.find({
      collection: collection,
      draft: true,
      locale: locale as 'en' | 'fr' | 'ar' | 'all' | undefined,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    if (!docs.docs.length) {
      return new Response('Document not found', { status: 404 })
    }

    // Enable draft mode
    const draft = await draftMode()
    draft.enable()

    // Log draft state
    payload.logger.info(`Draft mode enabled: ${draft.isEnabled}`)

    // Use Response.redirect() instead of next/navigation redirect
    return Response.redirect(new URL(path, req.url))
  } catch (error) {
    if (error.message === 'NEXT_REDIRECT') {
      // Handle redirect error gracefully
      return Response.redirect(new URL(path, req.url))
    }

    payload.logger.error('Error in preview route:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
