function shortestJobFirst(arrival, burst, n) {
    const isProcessed = Array(n).fill(false); // To track processed processes
    let time = 0;
    let completed = 0;

    while (completed < n) {
        let minBurst = Infinity;
        let chosenIndex = -1;

        // Find process with the shortest burst time and tie-break with arrival time
        for (let i = 0; i < n; i++) {
            if (!isProcessed[i] && arrival[i] <= time) {
                if (
                    burst[i] < minBurst || 
                    (burst[i] === minBurst && arrival[i] < arrival[chosenIndex])
                ) {
                    minBurst = burst[i];
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
        console.log(
            `Processing P${chosenIndex + 1} from time ${time} to ${
                time + burst[chosenIndex]
            }`
        );
        time += burst[chosenIndex];
        isProcessed[chosenIndex] = true;
        completed++;
    }
}

// Driver code
const prompt = require("prompt-sync")();
const n = parseInt(prompt("Enter the number of processes: "));
const arrival = [];
const burst = [];

console.log("Enter arrival time and burst time of processes:");
for (let i = 0; i < n; i++) {
    const [a, b] = prompt().split(" ").map(Number);
    arrival.push(a);
    burst.push(b);
}

shortestJobFirst(arrival, burst, n);
