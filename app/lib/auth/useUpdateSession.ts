// useUpdateSession.ts

import { useSession } from 'next-auth/react';

/**
 * Custom hook to update multiple properties in the user session.
 *
 * @returns {Function} - A function to update session properties.
 */
export const useUpdateSession = (): ((
  properties: Record<string, any>,
) => Promise<void>) => {
  const { update } = useSession(); // Do not destructure session here, only update

  /**
   * Function to update multiple properties in the user session.
   *
   * @param {Record<string, string | number | boolean>} properties - An object containing the properties to update and their values.
   */
  const updateSessionProperties = async (
    properties: Record<string, string | number | boolean>,
  ): Promise<void> => {
    if (typeof update !== 'function') {
      console.error('The "update" function is not available.');
      return;
    }

    try {
      await update(properties); // Call the update function
      console.log(`Session properties updated successfully.`);
    } catch (error) {
      console.error(`Failed to update session properties:`, error);
    }
  };

  return updateSessionProperties; // Return the function
};
