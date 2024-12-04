import { SuggestionProps } from "./utils";

export const binarySearchSuggestions = (list: SuggestionProps[], query: string, maxResults: number) => {
    const lowerQuery = query.toLowerCase();
    let start = 0;
    let end = list.length - 1;
    let results: SuggestionProps[] = [];
  
    while (start <= end) {
      const mid = Math.floor((start + end) / 2);
      const midValue = list[mid].username.toLowerCase();
  
      if (midValue.startsWith(lowerQuery)) {
        // Trouve les correspondances autour de l'indice `mid`
        results = [list[mid]];
        let left = mid - 1;
        let right = mid + 1;
  
        while (results.length < maxResults) {
          if (left >= start && list[left].username.toLowerCase().startsWith(lowerQuery)) {
            results.unshift(list[left]);
            left--;
          } else if (right <= end && list[right].username.toLowerCase().startsWith(lowerQuery)) {
            results.push(list[right]);
            right++;
          } else {
            break;
          }
        }
        break;
      }
  
      if (midValue < lowerQuery) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  
    return results;
  };
  