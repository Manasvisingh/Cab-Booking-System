# Cab Booking System

#### The Cab Booking System is a MERN (MongoDB, Express.js, React.js, Node.js) application, utilizing modern web technologies to offer a seamless cab booking experience. It employs Dijkstra's algorithm to find the shortest path between source and destination locations, ensuring efficient passenger travel.

## Dijkstra's algorithm
##### Dijkstra's algorithm is a widely used algorithm in graph theory and computer science, named after Dutch computer scientist Edsger W. Dijkstra. It is used to find the shortest path between nodes in a graph, which in our case, represents the network of locations and their connections.The algorithm works by maintaining a priority queue of nodes, starting with the source node. It then explores neighboring nodes, updating the shortest distances and predecessors along the way. This process continues until the destination node is reached, ensuring the shortest path is found.

## 🚕 Features

### 1. Effortless Booking
* Users can book cabs by providing their email, source, and destination locations.
* The system provides real-time availability of cabs based on the user's location and destination.
### 2. Real-time Notifications
* Receive detailed confirmation alert upon booking a cab.
### 3. Multiple Cab Options
* Choose from various cab types and select your preferred rate.
### 4. Optimized Routing
* Utilizes Dijkstra's algorithm to calculate the shortest path, providing the most efficient route to your destination.
### 5. Reasponsive Design
* Enjoy a seamless user experience across different devices with our responsive web design.


## 🛠️ Technologies Used

#### Frontend: React.js, Material-UI, MDB React UI Kit
#### Backend: Node.js, Express.js
#### Other Tools: Cors for cross-origin resource sharing, Node-fetch for making HTTP requests, UUID for generating unique identifiers


## 📋 Setup Instructions

### Step 1- Clone the Repository:
``` bash
git clone https://github.com/Manasvisingh/Cab-Booking-System.git
``` 
### Step 2- Install Dependencies:
```bash
cd frontend
npm install
```
```bash
cd ../backend
npm install
```
### Step 3- Run the Application:
#### Backend:
```bash
node app.js
```
#### Frontend:
```bash
cd frontend
npm start
```
### Step 4- Access the Application:
Open your web browser and access the application at http://localhost:3002.



##### ✍️ Author - Manasvi Singh

##### 📄 License
This project is licensed under the MIT License.

