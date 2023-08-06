import { NextApiRequest, NextApiResponse } from "next";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/config/firebase";

export interface SubscriptionsResponse {
  count: number;
  data: DocumentData[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;
  try {
    if (!email || email === "") throw new Error("no provided user email");
    const subsColl = collection(firestore, "subscriptions");
    const queryEmail = query(subsColl, where("user_email", "==", `${email}`));
    const queryEmailSnapshot = await getDocs(queryEmail);

    const subscriptions: DocumentData[] = [];
    queryEmailSnapshot.forEach((doc) => {
      subscriptions.push({
        ...doc.data(),
      });
    });
    res.status(200).json({
      count: queryEmailSnapshot.size,
      data: subscriptions,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
}
