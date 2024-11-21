function roundRobin(n, arrival, burst, tq) {
    let remainingBurst = [...burst];  // Remaining burst times
    let completionTime = new Array(n).fill(-1);  // Completion times for each process
    let q = [];  // Queue to hold processes
    let inQueue = new Set();  // Set to track processes already in the queue
    let time = 0;  // Current time
    let completed = 0;  // Number of completed processes

    while (completed < n) {
        // Add processes that have arrived at the current time to the queue
        for (let i = 0; i < n; i++) {
            if (arrival[i] <= time && remainingBurst[i] > 0 && !inQueue.has(i)) {
                q.push(i);
                inQueue.add(i);  // Mark process as in queue
            }
        }

        if (q.length > 0) {
            let i = q.shift();  // Get process from the front of the queue
            inQueue.delete(i);  // Remove from the set as it is being processed

            // If the remaining burst time is greater than time quantum, execute for TQ
            if (remainingBurst[i] > tq) {
                remainingBurst[i] -= tq;
                time += tq;
            } else {
                // If the remaining burst time is less than or equal to time quantum, execute fully
                time += remainingBurst[i];
                completionTime[i] = time;
                remainingBurst[i] = 0;
                completed++;
            }
        } else {
            // If no processes are available to execute, increment time
            time++;
        }
    }

    // Output the completion times of all processes
    for (let i = 0; i < n; i++) {
        console.log(`Process ${i + 1} completed at time ${completionTime[i]}`);
    }
}

// Take input from the user
let n = parseInt(prompt("Enter the number of processes:"));

let arrival = [];
let burst = [];
for (let i = 0; i < n; i++) {
    let at = parseInt(prompt(`Enter arrival time for process ${i + 1}:`));
    let bt = parseInt(prompt(`Enter burst time for process ${i + 1}:`));
    arrival.push(at);
    burst.push(bt);
}

let tq = parseInt(prompt("Enter the time quantum:"));

// Call roundRobin function with user input
roundRobin(n, arrival, burst, tq);
