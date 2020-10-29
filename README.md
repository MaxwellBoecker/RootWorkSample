# RootWorkSample
### How to start this app:
1. npm install
2. Run this command in the terminal to process the
   sample text file 'input.txt' in the root directory:
   ```
   node index.js < input.txt
   ```
   The return value is written to output.txt
3. This command runs the tests
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
step closer to returning the desired output. In a general sense, I needed to split the input into Drivers and Trips, then modify each in a way that they could
be easily combined at the end. As far as drivers, I needed to make sure each driver got stored. As far as trips, I needed to make sure that I had the data on how many miles were traveled and how long it took, as well as filter out the trips with an average speed of less than 5 mph or greater than 100 mph.  

After converting the input text file to a string, I chose to split it into two arrays, one containing Driver commands and one containing Trip commands. I then created an object out of the Driver commands array which contained keys of driver's names. Storing this data in an object was my first choice because during the aggregation phase, adding trip data for each driver would be efficiently accomplished with the constant-time lookup of Javascript objects. At each key in the object I stored an empty object. This empty object is where all the aggregated data for each driver's trips went during the aggregation phase.  

The array of Trip commands went through two phases after its creation. First, I parsed each string in the array into an object which stored the essential data for each trip. The object contained driver name, distance traveled and time spent traveling in hours. Then I pruned the array of trip objects to exclude the ones that had an average speed of less than 5 mph or greater than 100 mph. Using an array here was the logical choice, as the Javascript native array methods make it super convenient to work with them.  

Then, I aggregated the total trip data for each driver. I simply iterated over each object in the Trips array and added its distance and time(hours) to the object under the key matching the driver name in the driver object.  

The final step was turning this data into a string and writing it back into a text file.  


#### Program Design
The program is broken down into 6 functions
```
splitDriversAndTrips
```
takes the string representing the input, splits it into an array, and then splits that array into two arrays, one of Driver commands and one of Trip commands  
```
storeDrivers
```
takes the array of Driver commands and turns it into an object with each driver name as a key and an empty object as the value  
```
tripParser
```
takes the array of Trip commands and turns each string into an object containing keys for driver name, distance traveled and time in hours  
```
pruneTrips
```
takes the resulting array from tripParser and removes the trips that have an average speed of greater than 100 mph or less than 5 mph  
```
tripAggregator
```
combines the array from pruneTrips and the object from storeDrivers, aggregating the total distance and time traveled for each driver.  
createResult
```
creates a string out of the object from tripAggregator. This is the string that is finally written to output.txt with fs.writeFileSync  

#### Approach to Testing
I wrote unit tests for each function. These tests ensure that the functions return the expected values and data types. I chose this approach because in this program each function relies on the output of an earlier function, so if one of them fails, the whole program will fail. It is necessary to know exactly where and why a particular test has failed. Also, if I need to refactor these functions at all or add in new features to my program, it will be easy to test them and determine whether or not the changes break the program.
