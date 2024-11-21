// Function to implement Longest Job First (LJF)
function longestJobFirst(arrival, burst, n) {
    let isProcessed = new Array(n).fill(false);
    let time = 0;
    let completed = 0;

    while (completed < n) {
        let maxBurst = -1, chosenIndex = -1;

        // Find process with the longest burst time and tie-break with arrival time
        for (let i = 0; i < n; i++) {
            if (!isProcessed[i] && arrival[i] <= time) {
                if (burst[i] > maxBurst || (burst[i] === maxBurst && arrival[i] < arrival[chosenIndex])) {
                    maxBurst = burst[i];
                    chosenIndex = i;
                }
            }
        }

        if (chosenIndex === -1) {
            // No process is ready; jump to the next arrival time
            let nextArrival = Infinity;
            for (let i = 0; i < n; i++) {
                if (!isProcessed[i] && arrival[i] > time) {
                    nextArrival = Math.min(nextArrival, arrival[i]);
                }
            }
            time = nextArrival;
            continue;
        }

        // Process the chosen process
        console.log(`Processing P${chosenIndex + 1} from time ${time} to ${time + burst[chosenIndex]}`);
        time += burst[chosenIndex];
        isProcessed[chosenIndex] = true;
        completed++;
    }
}

// Taking user input
const n = parseInt(prompt("Enter the number of processes: "), 10);
const arrival = [];
const burst = [];

for (let i = 0; i < n; i++) {
    const arrBurst = prompt(`Enter arrival time and burst time for process ${i + 1}: `).split(" ");
    arrival.push(parseInt(arrBurst[0], 10));
    burst.push(parseInt(arrBurst[1], 10));
}

// Calling the Longest Job First algorithm
longestJobFirst(arrival, burst, n);
