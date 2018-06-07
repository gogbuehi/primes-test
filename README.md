# Primes Table
Retrieve n Primes and Generate an n x n Multiplication Table

## Requirements
`node 8.11.x`

## Getting Started
1. Command-line: `npm install`
2. Command-line: `npm start`
3. Go to: `http://localhost:3000?n=10`
4. To change `n`, change the value of `n` in the querystring

## Running Tests
- `npm test` 

## Notes
- Because this relies on a web interface, the display table is limited in size. Otherwise, the return payload can be too
can be too large to render and download in a timely manner. Display is limited to a table of 100 primes.
- A suggestion would be to change the app to an API that allows for some akin to pagination. Keeping in mind that a
table doesn't lend itself to pagination like a list does. 
- On the page, the time spent calculating the primes is provided in microseconds towards the bottom of the page. Despite
limit, `n` primes are still calculated.

## Nice features
- Prime generation is quite fast. Reducing the set of primes to check against with each iteration brought huge
improvements to the speed of the algorithm. My first pass took 4500ms to get 40,000 primes. After optimising, it's
around 50ms.

## More to do
- There might be a way to save on how the table is built, since most of the multiples have 2 entries.
- A better interface is in order. I would like this to be an API, rather than a monolithic app. The interface could load
quickly, and make async requests for tables.
- For massive tables to show up in a Web Interface, there needs to be a way to build the table on the client-side. Rather
than having the full table as a matrix, the raw data can just be an indexed list of the distinct factor multiples. The
client-side app can handle retrieving the raw data and building the HTML. This would include only requesting a set of
factors-multiples that can be reasonably displayed, to deal with payload issues.

 