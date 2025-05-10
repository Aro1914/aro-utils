# @aro1914/utils

A comprehensive collection of utility functions for JavaScript applications, focusing on array manipulation, currency formatting, time utilities, and Algorand blockchain interactions.

## Installation

```bash
npm install @aro1914/utils
```

## Configuration

Configure the library's global settings using the `setConfig` function. This allows you to set default behaviors for various utilities.

```javascript
import { setConfig, getConfig } from '@aro1914/utils';

// Set global configurations
setConfig({
  NETWORK: 'mainnet', // or 'testnet'
  SERVER_URI: 'https://your-server-uri.com'
});

// Get current configuration
const currentConfig = getConfig();
```

You can update individual settings at any time:

```javascript
// Update specific settings
setConfig({
  NETWORK: 'testnet'  // Updates only the network setting
});
```

## Key Features

- Array manipulation (filtering, shuffling, filling)
- Currency formatting with international support
- Time utilities and duration formatting
- String manipulation and truncation
- Debounce and throttle implementations
- Queue management with concurrency control
- HTTP request handling with axios
- Algorand token utilities
- Number formatting with metric suffixes

## Quick Start

```javascript
import { 
  formatAsCurrency, 
  truncate, 
  msToTime 
} from '@aro1914/utils';

// Format currency
console.log(formatAsCurrency({ value: 1234567 })); // "1.2M"

// Truncate long strings
console.log(truncate("Hello World", 2)); // "He...ld"

// Format time duration
console.log(msToTime({ duration: 3661000 })); 
// ["01:01:01.0", "1:1:1", "1 hour, 1 minute, 1 second"]
```

## API Documentation

### Array Utilities

#### `asyncFilter(arr, predicate)`

Asynchronously filters an array using a predicate function that returns a Promise.

```javascript
const numbers = [1, 2, 3, 4, 5];
const isEvenAsync = async (num) => num % 2 === 0;
const evenNumbers = await asyncFilter(numbers, isEvenAsync);
// evenNumbers = [2, 4]
```

#### `fillArray(array, size)`

Creates a new array by repeating elements from the input array.

```javascript
fillArray([1, 2], 5) // returns [1, 2, 1, 2, 1]
fillArray([1], 3) // returns [1, 1, 1]
```

#### `shuffle(array, returnAmount)`

Shuffles an array and optionally returns a subset.

```javascript
shuffle([1, 2, 3, 4, 5]); // Returns completely shuffled array
shuffle([1, 2, 3, 4, 5], 3); // Returns 3 randomly selected elements
```

### Currency Formatting

#### `formatAsCurrency(options)`

Formats numbers as currency with sophisticated options. This function respects global configuration settings but allows overrides per call.

```javascript
// Basic usage
formatAsCurrency({ value: 1234567 }) // "$1.2M"

// With formatting options
formatAsCurrency({ 
  value: 1234.56, 
  symbol: '$',
  depth: 1e9,
  dp: 2,
  includeBlankDecimals: true 
}) // "$1,234.56"

// Without decimals
formatAsCurrency({ 
  value: 1000, 
  dp: 0 
}) // "$1,000"
```

#### `currencyFormat(number, addDecimals = true, decimals = 2)`

Formats numbers with comma separators and configurable decimal places.

```javascript
currencyFormat(1234567.89) // "1,234,567.89"
currencyFormat(1234567) // "1,234,567.00"
currencyFormat(1234567, false) // "1,234,567"
```

### Time Utilities

#### `msToTime(options)`

Converts milliseconds to multiple formatted time representations.

```javascript
const time = msToTime({ 
  duration: 3661000,
  includeSeconds: true,
  includeDays: false 
});

// Returns array with different formats:
// [0]: "01:01:01.0" (padded format)
// [1]: "1:1:1" (simple format)
// [2]: "1 hour, 1 minute, 1 second" (readable format)
// [3]: { hours: "01", minutes: "01", seconds: "01", milliseconds: "0" }
```

#### `formatTimestamp(unixTimestamp)`

Converts Unix timestamps to human-readable dates.

```javascript
const [date, suffix] = formatTimestamp(1672531200000);
// date: "12:00 AM, Sunday January 1"
// suffix: "st"
```

### Function Control

#### `deBounce(func, delay)`

Creates a debounced function that delays execution until after wait milliseconds.

```javascript
const handleSearch = (query) => {
  // API call
};

const debouncedSearch = deBounce(handleSearch, 300);

// In event handler:
searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

#### `throttle(func, limit)`

Creates a throttled function that only executes at most once per `limit` milliseconds.

```javascript
const handleScroll = () => {
  // Heavy computation
};

const throttledScroll = throttle(handleScroll, 100);

window.addEventListener('scroll', throttledScroll);
```

### Queue Management

#### `queueFunctionCalls(array, callback, concurrentCalls = 3, delayMs = 500)`

Process array items with controlled concurrency and delay.

```javascript
// Example: Batch processing API calls
const userIds = [1, 2, 3, 4, 5, 6, 7, 8];

const results = await queueFunctionCalls(
  userIds,
  async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
  3, // Process 3 requests concurrently
  1000 // Wait 1 second between batches
);
```

### Algorand Token Utilities

#### `getASAInfo(assetId)`

Fetches comprehensive Algorand Standard Asset information.

```javascript
const assetInfo = await getASAInfo(123456);
/* Returns:
{
  success: true,
  decimals: 6,
  name: "Asset Name",
  unit: "ASSET",
  url: "https://asset.website",
  total: 1000000,
  ...other asset properties
}
*/
```

#### `getAssetsByAccount(options)`

Retrieves assets owned by an Algorand account with filtering options.

```javascript
const assets = await getAssetsByAccount({
  address: 'ALGO_ADDRESS',
  withBalance: true,
  blacklist: [123, 456], // Skip these asset IDs
  closableAssets: false
});
```

### HTTP Utilities

#### `request(options)`

Makes HTTP requests with comprehensive error handling and response processing.

```javascript
// POST request with authentication
const response = await request({
  path: '/api/data',
  method: 'post',
  accessToken: 'your-auth-token',
  body: { key: 'value' },
  prop: 'result'
});

// File upload
const fileResponse = await requestUpload({
  path: '/api/upload',
  method: 'post',
  file: fileObject,
  accessToken: 'your-auth-token'
});
```

## Error Handling

Most async functions in this library follow this error pattern:

```javascript
try {
  const result = await someUtilFunction(params);
  if (result.success) {
    // Handle success
  } else {
    // Handle failure with result.error
  }
} catch (error) {
  // Handle unexpected errors
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Emmanuel Agbavwe
