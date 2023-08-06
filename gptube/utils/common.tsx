import { Subscription } from "@/types/billing";

export const subscriptionsDev: Subscription[] = [
  {
    id: "93793",
    name: "Hobby creator",
    description:
      "Specially if you are growing and would like to know how to grow even more.",
    variantId: "100776",
    period: "monthly",
    benefits: [
      <span key="hobby-benefit-1">
        Up to <b>1000 comments</b> (on a video)
      </span>,
      <span key="hobby-benefit-2">
        Up to <b>30 videos</b> per month
      </span>,
    ],
    price: 1500,
    priceFormatted: 15,
    freeTrialDays: 15,
  },
  {
    id: "93793",
    name: "Hobby creator",
    description:
      "Specially if you are growing and would like to know how to grow even more.",
    variantId: "107306",
    period: "yearly",
    benefits: [
      <span key="hobby-benefit-1">
        Up to <b>1000 comments</b> (on a video)
      </span>,
      <span key="hobby-benefit-2">
        Up to <b>30 videos</b> per month
      </span>,
    ],
    price: 12000,
    priceFormatted: 120,
    freeTrialDays: 15,
  },
  {
    id: "94367",
    name: "Popular creator",
    description:
      "Specially for creators with a wider audience and need more feedback.",
    variantId: "101456",
    period: "monthly",
    benefits: [
      <span key="popular-benefit-1">
        Up to <b>5000 comments</b> (on a video)
      </span>,
      <span key="popular-benefit-1">
        Up to <b>50 videos</b> per month
      </span>,
    ],
    price: 3000,
    priceFormatted: 30,
    freeTrialDays: 15,
  },
  {
    id: "94367",
    name: "Popular creator",
    description:
      "Specially for creators with a wider audience and need more feedback.",
    variantId: "107310",
    period: "yearly",
    benefits: [
      <span key="popular-benefit-1">
        Up to <b>5000 comments</b> (on a video)
      </span>,
      <span key="popular-benefit-1">
        Up to <b>50 videos</b> per month
      </span>,
    ],
    price: 24000,
    priceFormatted: 240,
    freeTrialDays: 15,
  },
];
