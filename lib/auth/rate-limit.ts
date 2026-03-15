type CounterEntry = {
  count: number;
  resetAt: number;
};

const counters = new Map<string, CounterEntry>();

export function isRateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = counters.get(key);

  if (!current || now > current.resetAt) {
    counters.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (current.count >= limit) {
    return true;
  }

  current.count += 1;
  return false;
}
