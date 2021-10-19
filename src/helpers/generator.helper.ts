import * as Random from 'expo-random';

export const createId = async (): Promise<string> => {
  let newId = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  while (newId.length < 20) {
    const bytes = await Random.getRandomBytesAsync(40);
    bytes.forEach(b => {
      // Length of `chars` is 62. We only take bytes between 0 and 62*4-1
      // (both inclusive). The value is then evenly mapped to indices of `char`
      // via a modulo operation.
      const maxValue = 62 * 4 - 1;
      if (newId.length < 20 && b <= maxValue) {
        newId += chars.charAt(b % 62);
      }
    });
  }

  return newId;
};
