# RootWorkSample
### How to start this app:
1. npm install
2. Run this command in the terminal to process the
   sample text file 'input.txt' in the  root directory:
   ```
   node index.js < input.txt
   ```
   The return value is written to output.txt
3. Run this command in the terminal to run the tests
   ```
   npm test
   ```
### Files and Folders
* **index.js** is where the functions are invoked
* **indexFunctionDefs.js** is where the functions are defined and exported from
* **test** is the folder which contains the test file **test.js**

### My Approach To Solving This Problem:

#### Problem Ideation
I broke this problem down into functions, each of which represented a specific, concrete task that would modify the input 
data and bring me one
step closer to returning the desired output. In other words, each of the main steps in the problem as I understood it was represented by a
function. In a general sense, I needed to split the input into Drivers and Trips, then modify each in a way that they could
be combined at the end. As far as drivers, I needed to make sure each one got stored. As far as trips, I needed to make sure that I had the data on how many miles were traveled and how long it took, as well as filter out the trips with an average speed of less than 5 mph or greater than 100 mph.
* new paragraph
After converting the input text file to a string, I chose to split it into two arrays, one containing Driver commands and one containing Trip commands. I then created an object out of the Driver commands array which contained keys of driver's names. Storing this data in an object was my first choice because during the aggregation phase, adding trip data for each driver would be conveniently accomplished with the constant-time lookup of Javascript objects. At each key in the object i stored an empty object. This empty object is where all the aggregated data for each driver's trips went during the aggregation phase.  Even though it was possible to accomplish this step while splitting the arrays, this approach had the advantage of deduplicating the drivers, in the case that the same driver had been entered multiple times in the input file.
* new P
The array of Trip commands went through two phases after its creation. First, I parsed each string in the array into an object which stored the essential data for each trip. The object contained driver name, distance traveled and time spent traveling in hours. Then I pruned the array of trip objects to exclude the ones that had an average speed of less than 5 mph or greater than 100 mph. Using an array here was the logical choice, as the Javascript native array methods make it super convenient to work with them.
* new P
Then, I aggregated the total trip data for each driver. I simply iterated over each object in the Trips array and added its distance and time(hours) to the object under the key matching the driver name in the driver object.
* new P
The final step was turning this data into a string and writing it back into a text file. 


#### Program Design
The program is broken down into 6 functions
```
splitDriversAndTrips
storeDrivers
tripParser
pruneTrips
tripAggregator
createResult
```

#### Approach to Testing
I wrote unit tests for each function. These tests ensure that the functions return the expected values and data types when fed an input. 
