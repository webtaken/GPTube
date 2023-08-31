// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { collection, doc, getDoc } from 'firebase/firestore'

import { firestore } from '@/lib/firebase/config-firebase'

interface UsageLimitQueryParams {
  ownerEmail: string
}

export interface ResponseBody {
  usage_limit_reached: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { ownerEmail } = req.query as unknown as UsageLimitQueryParams

    if (!ownerEmail || ownerEmail === '') throw new Error('no provided user email')
    const usersColl = collection(firestore, 'users')
    const userDoc = doc(usersColl, ownerEmail)
    const docSnap = await getDoc(userDoc)

    if (!docSnap.exists()) {
      res.status(200).json({ usage_limit_reached: false })

      return
    }

    const userData = docSnap.data()
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentUsageLimit = userData.usageLimitYoutube
    const usageLimit = parseInt(process.env.USAGE_LIMIT_YOUTUBE || '20')

    const bodyResponse: ResponseBody = {
      usage_limit_reached: currentUsageLimit >= usageLimit,
    }

    res.status(200).json(bodyResponse)
  } catch (error) {
    res.status(500).json({ error })
  }
}
