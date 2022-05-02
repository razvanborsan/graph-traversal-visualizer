# Graph Traversal Visualizer

This project is comprised of two parts, a maze builder and graph traversal solutions for said maze. There are 4 maze generation algorithms (each with a different animation) and 4 graph traversal algorithms. 

You can move the starting point and the target wherever you want; play around and see all kinds of variations!

### Perfect mazes

All four algorithms generate perfect mazes; this means that every point is reachable and there is only one single path from one point in the maze to any other point. 

## Deployed App
The app is available [here](https://razvanborsan.github.io/graph-traversal-visualizer/).

Preview:

![graph-visualizer](https://user-images.githubusercontent.com/22635895/166207688-8b557e26-b9bf-494c-948e-3067bf7101b3.gif)

### Tech stack

I used GatsbyJS with Chakra UI and SCSS modules for the interface and deck.gl for the map. The algorithms themselves are written by me in plain JavaScript.

### Run locally

If you want to play around with the project locally, cloning it + `npm install` + `npm start` should suffice.
