const locreq          = require('locreq')(__dirname);
const KdNode = locreq('app/models/kd-node');
const requirejs = require('requirejs');
requirejs.config({
  //Use node's special variable __dirname to
  //get the directory containing this file.
  //Useful if building a library that will
  //be used in node but does not require the
  //use of node outside
  baseUrl: __dirname,

  //Pass the top-level main.js/index.js require
  //function to requirejs so that node modules
  //are loaded relative to the top-level JS file.
  nodeRequire: require
});
const KdTree = requirejs('kd-tree-javascript');

var exports = module.exports = {};

const addPoints = (p1, p2) => {
  return {
    x: p1.x + p2.x,
    y: p1.y + p2.y
  };
};
const dividePointBy = (p, divisor) => {
  return {
    x: parseInt(p.x/divisor),
    y: parseInt(p.y/divisor)
  }
};
const distanceBetweenPoints = (p1, p2) => {
  if (p1.name === p2.name) return Number.MAX_VALUE;
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};
const averagePoint = (coordinateArray) => {
  let sumOfPoints = {
    x: 0,
    y: 0
  };

  for (let i = 0; i < coordinateArray.length; i++) {
    sumOfPoints = addPoints(sumOfPoints, coordinateArray[i]);
  }

  return dividePointBy(sumOfPoints, coordinateArray.length);
};
/**
 * An initial attempt that hypothesised that averaging the points
 * to a single point might allow an O(2n) / O(n)
 *
 * Actual  Result: Fails to account for points that may average close
 * to the most isolated point.
 *
 * @param coordinateArray
 * @returns {*}
 */
exports.mostIsolatedPoint = (coordinateArray) => {
  let avgPoint = averagePoint(coordinateArray);
  let isolatedPoint = coordinateArray[0];
  let isolatedDistance = distanceBetweenPoints(isolatedPoint, avgPoint);
  let compareDistance;
  for (let i = 1; i < coordinateArray.length; i++) {
    compareDistance = distanceBetweenPoints(coordinateArray[i], avgPoint);
    if (compareDistance > isolatedDistance) {
      isolatedDistance = compareDistance;
      isolatedPoint = coordinateArray[i];
    }
  }

  return isolatedPoint;
};

var initMinimumDistance = (point) => {
  if (isNaN(parseFloat(point.minimumDistance))) {
    point.minimumDistance = Number.MAX_VALUE;
  }
};

/**
 * Simply implementing the O((n^2-n)/2) / O(n^2)
 * algorithm, to get insight on how this can be improved.
 *
 * @param coordinateArray
 * @returns {*}
 */
exports.mostIsolatedPointBrute = (coordinateArray) => {
  let isolatedPoint = coordinateArray[0];
  let isolatedDistance = distanceBetweenPoints(isolatedPoint, coordinateArray[1]);
  let comparePoint1, comparePoint2;
  let compareDistance;

  for (let i = 0; i < coordinateArray.length; i++) {
    comparePoint1 = coordinateArray[i];
    initMinimumDistance(comparePoint1);
    for (let j = coordinateArray.length-1; j > i ; j--) {
      comparePoint2 = coordinateArray[j];
      initMinimumDistance(comparePoint2);
      compareDistance = distanceBetweenPoints(comparePoint1, comparePoint2);
      if (comparePoint1.minimumDistance > compareDistance) {
        comparePoint1.minimumDistance = compareDistance;
        if (compareDistance > isolatedDistance) {
          isolatedPoint = comparePoint1;
          isolatedDistance = compareDistance;
        }
      }
      if (comparePoint2.minimumDistance > compareDistance) {
        comparePoint2.minimumDistance = compareDistance;
        if (compareDistance > isolatedDistance) {
          isolatedPoint = comparePoint2;
          isolatedDistance = compareDistance;
        }
      }
    }
  }

  return isolatedPoint;

};

/**
 * An attempt to implement a KD Tree
 *
 * Actual Result: Not being familiar with KD Trees,
 * my implementation does not include the appropriate
 * check for alternate "best node" on other side of
 * the tree, based on the axis last used. Rather than
 * continue implementing my own KD Tree, I decided to
 * move on to using a library.
 * @param coordinateArray
 * @returns {*}
 */
exports.kdIsolationTree = (coordinateArray) => {
  let kdNodeArray = [new KdNode(coordinateArray[0])];
  let kdTree = kdNodeArray[0];
  let kdNode;

  for (let i = 1; i < coordinateArray.length; i++) {
    kdNode = new KdNode(coordinateArray[i]);
    kdNodeArray.push(kdNode);
    kdTree.insert(kdNode);
  }
  let isolatedNode = kdTree;
  for(let i = 0; i < kdNodeArray.length; i++) {
    kdNodeArray[i].getNearestNode(kdTree);
    if (isolatedNode.nearestDistance < kdNodeArray[i].nearestDistance) {
      console.log("NEAREST DISTANCE FROM: " + isolatedNode.nearestDistance + " TO: " + kdNodeArray[i].nearestDistance);
      isolatedNode = kdNodeArray[i];
    }
  }

  console.log(isolatedNode);

  return isolatedNode.point;
};

exports.kdIsoTree = (coordinateArray) => {
  const kdTree = new KdTree.kdTree(coordinateArray, distanceBetweenPoints, ["x", "y"]);

  let isolatedNode;
  let nearestNodeToI;
  let nearestDistance = 0;
  let currentNode;
  let nearestToIDistance;
  for (let i = 0; i < coordinateArray.length; i++) {
    currentNode = coordinateArray[i];
    nearestNodeToI = kdTree.nearest(coordinateArray[i], 1);
    nearestToIDistance = distanceBetweenPoints(currentNode, nearestNodeToI[0][0]);

    if (nearestToIDistance > nearestDistance) {
      console.log("ISOLATED", nearestToIDistance, nearestNodeToI[0]);
      nearestDistance = nearestToIDistance;
      isolatedNode = coordinateArray[i];
    }
  }

  // This portion actually determines that the library provided is not
  // correctly identifying the nearest node. This is where I would ask
  // for a clearer idea of what is going on with the KD Tree when it
  // claims to retrieve the "nearest" point.
  // let currentPoint, isolatedPointB;
  // let minimumDistance = null;
  // let currentDistance;
  // for (let i = 0; i < coordinateArray.length; i++) {
  //
  //   currentPoint = coordinateArray[i];
  //   if (currentPoint.name === isolatedNode.name) continue;
  //   currentDistance = distanceBetweenPoints(isolatedNode, currentPoint);
  //   if (minimumDistance === null || currentDistance < minimumDistance) {
  //     minimumDistance = currentDistance;
  //     isolatedPointB = currentPoint;
  //   }
  // }
  // console.log("MINIMUM DISTANCE:", minimumDistance, isolatedPointB);

  return isolatedNode;
};

