/**
 * Sorts an array of items by completion status
 * Incomplete items appear first, completed items appear last
 * 
 * @param items - Array of items to sort
 * @param completedKey - The key name that indicates completion status (default: 'completed')
 * @returns Sorted array with incomplete items first, completed items last
 */
export function sortByCompletion<T extends Record<string, any>>(
  items: T[],
  completedKey: keyof T = 'completed' as keyof T
): T[] {
  return [...items].sort((a, b) => {
    const aCompleted = a[completedKey];
    const bCompleted = b[completedKey];
    
    // If both have same completion status, maintain original order
    if (aCompleted === bCompleted) return 0;
    
    // Incomplete items (false) come before completed items (true)
    return aCompleted ? 1 : -1;
  });
}
