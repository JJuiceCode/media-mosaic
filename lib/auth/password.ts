import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SCRYPT_KEY_LENGTH = 64;
const SCRYPT_N = 16384;
const SCRYPT_R = 8;
const SCRYPT_P = 1;

export function hashPassword(password: string) {
  const salt = randomBytes(16);
  const derivedKey = scryptSync(password, salt, SCRYPT_KEY_LENGTH, {
    N: SCRYPT_N,
    r: SCRYPT_R,
    p: SCRYPT_P,
  });

  return `scrypt:${SCRYPT_N}:${SCRYPT_R}:${SCRYPT_P}:${salt.toString("hex")}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, nRaw, rRaw, pRaw, saltHex, hashHex] = passwordHash.split(":");

  if (algorithm !== "scrypt" || !nRaw || !rRaw || !pRaw || !saltHex || !hashHex) {
    return false;
  }

  const n = Number(nRaw);
  const r = Number(rRaw);
  const p = Number(pRaw);

  if (!Number.isSafeInteger(n) || !Number.isSafeInteger(r) || !Number.isSafeInteger(p)) {
    return false;
  }

  const salt = Buffer.from(saltHex, "hex");
  const storedHash = Buffer.from(hashHex, "hex");
  const computedHash = scryptSync(password, salt, storedHash.length, { N: n, r, p });

  if (storedHash.length !== computedHash.length) {
    return false;
  }

  return timingSafeEqual(storedHash, computedHash);
}
