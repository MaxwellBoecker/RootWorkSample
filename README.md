# RootWorkSample
### How to start this app:
1. npm install
2. Run this command in the terminal to process the
   sample text file 'input.txt' in the  root directory:
   ```
   node index.js < input.txt
   ```
   Run this command in the terminal to run the tests
   ```
   npm test
   ```
### Files and Folders
* index.js is where the functions are invoked 
* helpers.js is where the functions are defined and exported from
* test is the folder which contains the test file test.js

### My Approach To Solving This Problem:

##### Problem Ideation
I broke this problem down into functions, each of which represented a specific, concrete task that would modify the input data and bring me one step
closer to returning the desired output. In other words, each of the main steps in the problem as I understood it was represented by a function. In a general sense, I needed to split the input into Drivers and Trips, then modify each in a way that they could 
be combined at the end. As far as drivers, I needed to make sure each one got stored. As far as trips, I needed to make sure that I had the data on how many miles were traveled and how long it took. Because of the fact that Drivers can have no trips or many trips, it makes sense to aggregate these values near the end and then combine Drivers and Trips. This way, I could easily compute the average speed for each driver as well as avert the edge case of a driver not showing up because they have no stored Trips.

##### Program Design
The program is broken down into 7 main functions which are described below
under 'Description of Program Flow':
```
getDrivers
getTrips
storeDrivers
tripParser
pruneTrips
tripAggregator
createResult
```

##### Description of Program Flow
1. The data comes in as a text file, which is then converted to a string with 
```
fs.readFileSync()
```
I split the string into an array, which gives me an array of strings. 
2. 
```
getDrivers, getTrips
```
Then I create two new arrays, one which contains only 'Driver' strings and one which contains 'Trip' strings. These two steps are represented by the 
```
getDrivers
```
and 
```
getTrips
``` 
functions respectively. I chose arrays because they have great native
methods such as map, filter and reduce which make it super easy to iterate over and process data.
3. ``` storeDrivers
```
```
storeDrivers
```
Then, I create an object called 'driverObj' from the driver array. This stores every 
driver in the input file as a key and an empty object as the value. The empty object 
will store the values of time and distance after we aggregate them for each driver and 
trip. It makes sense to use an object here, because it is easy to look up and add to the data when it is being stored under a name rather than under an index.
4. tripParser
5. pruneTrips
6. tripAggregator
7. createResult

##### Approach to Testing