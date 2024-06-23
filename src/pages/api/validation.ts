import type { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";

const token = process.env.TOKEN!;
const authData =
  "query_id=AAHPrkQ7AAAAAM-uRDuC4NjH&user=%7B%22id%22%3A994356943%2C%22first_name%22%3A%22marov%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22kohinurlzt%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1719082274&hash=cc50b9e9ac6cd34ed29517d85df7f81e2c50b7ac0fde88125b0c79cad4ad4aa4";

export const verifyTelegramWebAppData = async (
  telegramInitData: string
): Promise<boolean> => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get("hash");
  let dataToCheck: string[] = [];

  initData.sort();
  initData.forEach(
    (val, key) => key !== "hash" && dataToCheck.push(`${key}=${val}`)
  );

  const secret = CryptoJS.HmacSHA256(token, "WebAppData");
  const _hash = CryptoJS.HmacSHA256(dataToCheck.join("\n"), secret).toString(
    CryptoJS.enc.Hex
  );

  return _hash === hash;
};

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const isValid = await verifyTelegramWebAppData(authData);
    res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "Oops.. Something went wrong" });
  }
}
