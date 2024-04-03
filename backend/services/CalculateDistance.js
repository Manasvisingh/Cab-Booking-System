//dijkstra code for distance
//input for source and destination and the email id

const CabService = require("./CabService");

// Import any necessary modules or models
// For example, you may need to import a Location model to fetch data from the database

// Define the graph representing the network of locations and their connections
const graph = {
  // Define connections between locations and their distances
  // This data can be retrieved from a database or hard-coded here
  A: { B: 5, C: 3 },
  B: { A: 5, C: 2, D: 4 },
  C: { A: 3, B: 2, D: 7 },
  D: { B: 4, C: 7 },
};

// Implement Dijkstra's algorithm to find the shortest path
function dijkstra(graph, source, destination) {
  const visited = {};
  const distances = {};
  const predecessors = {};
  const queue = new PriorityQueue();

  // Initialize distances to infinity and predecessors to null
  for (const node in graph) {
    distances[node] = Infinity;
    predecessors[node] = null;
  }

  // Start with the source node
  distances[source] = 0;
  queue.enqueue(source, 0);

  // Iterate while the queue is not empty
  while (!queue.isEmpty()) {
    const currentNode = queue.dequeue().element;
    console.log(currentNode);

    // If the current node is the destination, we've found the shortest path
    if (currentNode === destination) {
      console.log("Destination is reached!!");
      break;
    }

    if (!visited[currentNode]) {
      visited[currentNode] = true;

      // Iterate through neighbors of the current node
      for (const neighbor in graph[currentNode]) {
        const distance = graph[currentNode][neighbor];
        const totalDistance = distances[currentNode] + distance;

        // Update distances and predecessors if a shorter path is found
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          predecessors[neighbor] = currentNode;
          queue.enqueue(neighbor, totalDistance);
        }
      }
    }
  }

  // Build the shortest path from source to destination
  const shortestPath = [];
  let current = destination;
  while (current !== null) {
    shortestPath.unshift(current);
    current = predecessors[current];
  }

  return { distance: distances[destination], path: shortestPath };
}

// Priority Queue implementation (you need to implement this)
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  enqueue(element, priority) {
    this.elements.push({ element, priority });
    this.elements.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

// Complete the CalculateDistance function
exports.CalculateDistance = async (req, res) => {
  try {
    const { email, source, destination } = req.query;

    // Use Dijkstra's algorithm to calculate the distance and shortest path
    const result = dijkstra(graph, source, destination);
    //const result = {distance: 10, path: 'abcd'};
    const allCabs = new CabService().getAvailableCabs();

    const options = allCabs.map((cab) => ({
      name: cab.type,
      price: cab.price * result.distance,
    }));
    // Return the result in the response
    console.log("This is called!");
    res.json({
      email: email,
      source: source,
      destination: destination,
      distance: result.distance,
      path: result.path,
      options: options,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Function to get the available cabs
const getCabs = () => {
  return [
    { name: "eco", price: 10 },
    { name: "sedan", price: 15 },
    { name: "suv", price: 20 },
  ];
};
