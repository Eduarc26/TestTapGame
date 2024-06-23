import CryptoJS from "crypto-js";

const token = process.env.TOKEN!;

interface VerificationResult {
  success: boolean;
  userId?: number;
}

export const verifyTelegramWebAppData = async (
  telegramInitData: string
): Promise<VerificationResult> => {
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

  if (_hash !== hash) {
    return { success: false };
  }

  const userField = dataToCheck.find((item) => item.startsWith("user="));

  if (userField) {
    const user = JSON.parse(userField.substring(5));
    return { success: true, userId: user.id };
  } else {
    return { success: false };
  }
};
