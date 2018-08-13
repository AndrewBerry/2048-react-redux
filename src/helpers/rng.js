export const MAX_PRNG_VALUE = 2147483646;

// Park-Miller PRNG
export const nextPRNG = previousValue =>
  ((previousValue <= 0 ? previousValue + MAX_PRNG_VALUE : previousValue) *
    16807) %
  2147483647;
