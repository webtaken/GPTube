import { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const SHEET_ID = `${process.env.SPREADSHEET_ID}`;
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SERVICE_ACCOUNT_EMAIL = `${process.env.GOOGLE_SHEETS_CLIENT_EMAIL}`;
const SERVICE_ACCOUNT_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----${process.env.GOOGLE_SHEETS_PRIVATE_KEY}-----END PRIVATE KEY-----`;

type sheetForm = {
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests are allowed." });
  }

  const body = req.body as sheetForm;

  try {
    // prepare auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: SERVICE_ACCOUNT_EMAIL,
        private_key: SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      valueInputOption: "USER_ENTERED",
      range: "A1:A1",
      requestBody: {
        range: "A1:A1",
        majorDimension: "ROWS",
        values: [[body.email]],
      },
    });

    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}
