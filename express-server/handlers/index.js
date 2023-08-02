const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = {
  type: process.env.TYPE || "",
  project_id: process.env.PROJECT_ID || "",
  private_key_id: process.env.PRIVATE_KEY_ID || "",
  private_key: process.env.PRIVATE_KEY || "",
  client_email: process.env.CLIENT_EMAIL || "",
  client_id: process.env.CLIENT_ID || "",
  auth_uri: process.env.AUTH_URI || "",
  token_uri: process.env.TOKEN_URI || "",
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL || "",
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || "",
};

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const getObjectFromPayload = (payload) => {
  return payload["data"];
};

const getSubscriptionSchema = (subscription) => {
  return {
    user_email: subscription["attributes"]["user_email"],
    subscription_id: subscription["id"],
    product_id: subscription["attributes"]["product_id"],
    variant_id: subscription["attributes"]["variant_id"],
    customer_id: subscription["attributes"]["customer_id"],
    status: subscription["attributes"]["status"],
    status_formatted: subscription["attributes"]["status_formatted"],
    trial_ends_at: subscription["attributes"]["trial_ends_at"],
    renews_at: subscription["attributes"]["renews_at"],
    ends_at: subscription["attributes"]["ends_at"],
    card_brand: subscription["attributes"]["card_brand"],
    card_last_four: subscription["attributes"]["card_last_four"],
    update_payment_method:
      subscription["attributes"]["urls"]["update_payment_method"],
  };
};

const getSubscriptionInvoiceSchema = (subscriptionInvoice) => {
  return {
    invoice_id: subscriptionInvoice["id"],
    invoice_url: subscriptionInvoice["attributes"]["urls"]["invoice_url"],
  };
};

const subscriptionCreatedHandler = async (payload) => {
  const subscription = payload["data"];
  const data = getSubscriptionSchema(subscription);
  try {
    const newSub = await db
      .collection("subscriptions")
      .doc(`${subscription["id"]}`)
      .set(data);
    console.log(`subscription created: \n${JSON.stringify(newSub, null, 2)}`);
  } catch (error) {
    console.error(error);
    console.log("error on subscription created handler");
  }
};

const subscriptionUpdatedHandler = async (payload) => {
  const subscription = payload["data"];
  const data = getSubscriptionSchema(subscription);
  try {
    const newSub = await db
      .collection("subscriptions")
      .doc(`${subscription["id"]}`)
      .update(data);
    console.log(
      `subscription updated (ID): ${JSON.stringify(newSub, null, 2)}`
    );
  } catch (error) {
    console.error(error);
    console.log("error on subscription updated handler");
  }
};

const subscriptionPaymentSuccessHandler = async (payload) => {
  const subscriptionInvoice = getObjectFromPayload(payload);
  const subscriptionId = subscriptionInvoice["attributes"]["subscription_id"];
  const data = getSubscriptionInvoiceSchema(subscriptionInvoice);
  try {
    const subscriptionDoc = db
      .collection("subscriptions")
      .doc(`${subscriptionId}`);
    const newInvoice = await subscriptionDoc
      .collection("invoices")
      .doc(`${subscriptionInvoice["id"]}`)
      .set(data);
    console.log(
      `subscription invoice created: ${JSON.stringify(newInvoice, null, 2)}`
    );
  } catch (error) {
    console.error(error);
    console.log("error on subscription payment success handler");
  }
};

const webhook_events = {
  subscription_created: subscriptionCreatedHandler,
  subscription_updated: subscriptionUpdatedHandler,
  subscription_payment_success: subscriptionPaymentSuccessHandler,
};

module.exports = webhook_events;
