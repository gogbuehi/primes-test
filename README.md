# Isolated Point
Retrieve the most isolated point in a set of points on a 2-D coordinate system

## Requirements
`node 8.11.x`

## Getting Started
1. Command-line: `npm install`
2. Command-line: `npm start`
3. Go to: `http://localhost:3000?n=0`
4. To change `n`, change the value of `n` in the querystring
- `n=0`: Small data set
- `n=1`: Big data set
- `n=2`: Custom data set

## Running Tests
- `npm test` 

## Notes
I have never worked with 2D search algorithms, so I decided to first see if I could apply some hypotheses to
solving the problem: 
1. Brute-force, which gave O((n^2 - n)/2) / O(n^2). This is fine
for small sets of points but naturally does not scale.
2. I hypothesised that averaging the coordinates might give me a single point to check against. The idea being
that the point farthest from the average point being the most isolated. This was quick, but had many conceptual
flaws. This was based on a cluster of points and an isolated point being the entire data set.
3. I came across the idea of KD Trees to efficiently search for the nearest node. While the basic premise of a 
KD Tree makes sense, and I understand the math it is utilising, I started to struggle at how best to implement
the hypersphere intersection aspect of it.
4. Given that I didn't want to spend too much time trying to reinvent the wheel, I switched to trying out a few
npm libraries that implement KD Trees. The APIs for these libraries seem to imply that they are returning the
nearest point, but my results for the "big" data set do not yield a correct answer

## Conclusion
I enjoyed trying to solve this problem, and I feel like I have the premise of how to search for the most isolated
point, given a set of points in a 2D space. Not having solved this type of problem before, I feel it wouldn't take
much time to sit down and wrap my head around the missing implementation piece for my KD Node to appropriately solve
for the nearest node.


 