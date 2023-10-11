import type { Subscription } from '@/types/subscription'

import React from 'react'
import { useRouter } from 'next/router'
import { toast, Toaster } from 'react-hot-toast'

import PricingPlan from '@/components/Pricing/PricingPlan'
import { useAuth } from '@/hooks/use-auth'

const subscriptions: Subscription[] = [
  {
    id: 'hobby_sub',
    name: 'Hobby creator',
    subType: 'hobby',
    benefits: [
      <span key="hobby-benefit-1">
        Up to <b>1000 comments</b> (on a video)
      </span>,
      <span key="hobby-benefit-2">
        Up to <b>30 videos</b> per month
      </span>,
    ],
    price: 15,
    checkoutURL:
      'https://gptube.lemonsqueezy.com/checkout/buy/0f473f05-2765-4add-a7de-9ea7eeb40e66',
  },
  {
    id: 'popular_sub',
    name: 'Popular creator',
    subType: 'popular',
    benefits: [
      <span key="popular-benefit-1">
        Up to <b>5000 comments</b> (on a video)
      </span>,
      <span key="popular-benefit-1">
        Up to <b>50 videos</b> per month
      </span>,
    ],
    price: 30,
    checkoutURL:
      'https://gptube.lemonsqueezy.com/checkout/buy/b2a92636-4831-407d-be94-1fd40fda945b',
  },
]

function Subscriptions() {
  const { user } = useAuth()
  const router = useRouter()

  const onSubscribeHandler = async (sub: Subscription) => {
    if (!user) {
      router.push({
        pathname: '/login',
        query: { from: 'pricing' },
      })

      return
    }

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionType: sub.subType,
        }),
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const checkout = await response.json()

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      window.open(checkout.data.attributes.url, '_blank')
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      toast.error(`${error}`)
    }
  }

  return (
    <>
      <Toaster />
      <p className="text-5xl font-semibold text-center text-typo">Pricing Plans</p>
      <div className="flex items-stretch justify-center gap-32 my-16">
        {subscriptions.map(sub => {
          return (
            <PricingPlan
              key={`sub-${sub.id}`}
              subscription={sub}
              onSubscribe={() => onSubscribeHandler(sub)}
            />
          )
        })}
      </div>
    </>
  )
}

export default Subscriptions
