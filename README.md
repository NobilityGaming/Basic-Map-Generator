# Basic-Map-Generator
A very basic customizable map generator.

I call this a map generator very loosely as this is not a good way at all to make a realistic map generator. It was made more just to experiment.

This doesn't use any sort of noise instead it scans tiles left to right and uses a seeded number generator to decide if the next tile will inherit a color from two surrounding parent tiles or upgrade to the next tile tier.

Node.js Modules used: seedrandom and node-canvas

# Example

250 by 250 map with the seed "test":

![alt text](https://github.com/NobilityGaming/Basic-Map-Generator/blob/master/test.png?raw=true)
