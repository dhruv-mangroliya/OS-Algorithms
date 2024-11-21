function srtfScheduling() {
    // Take the number of processes from the user
    const n = parseInt(prompt("Enter the number of processes: "));
    let arrival = [];
    let burst = [];

    // Take arrival and burst times as input
    for (let i = 0; i < n; i++) {
        arrival[i] = parseInt(prompt(`Enter arrival time for Process ${i + 1}: `));
        burst[i] = parseInt(prompt(`Enter burst time for Process ${i + 1}: `));
    }

    let remainingBurst = [...burst];
    let completionTime = Array(n).fill(0);
    let turnaroundTime = Array(n).fill(0);
    let waitingTime = Array(n).fill(0);

    // Min-heap priority queue using an array
    let heap = [];
    let time = 0, completed = 0;

    function pushToHeap(remaining, arrive, index) {
        heap.push({ remaining, arrive, index });
        heap.sort((a, b) => {
            if (a.remaining === b.remaining) return a.arrive - b.arrive;
            return a.remaining - b.remaining;
        });
    }

    // Simulate the process execution
    while (completed < n) {
        // Add processes to the heap if they arrive at the current time
        for (let i = 0; i < n; i++) {
            if (arrival[i] <= time && remainingBurst[i] > 0) {
                pushToHeap(remainingBurst[i], arrival[i], i);
                remainingBurst[i] = -1; // Mark as added
            }
        }

        if (heap.length > 0) {
            let { remaining, arrive, index } = heap.shift();

            // Execute the process for 1 unit of time
            time++;
            remaining--;

            if (remaining > 0) {
                pushToHeap(remaining, arrive, index);
            } else {
                completed++;
                completionTime[index] = time;
            }
        } else {
            // If no process is ready, move to the next time unit
            time++;
        }
    }

    // Calculate turnaround and waiting times
    for (let i = 0; i < n; i++) {
        turnaroundTime[i] = completionTime[i] - arrival[i];
        waitingTime[i] = turnaroundTime[i] - burst[i];
    }

    // Display the results
    console.log("Process\tArrival\tBurst\tCompletion\tTurnaround\tWaiting");
    for (let i = 0; i < n; i++) {
        console.log(
            `${i + 1}\t${arrival[i]}\t${burst[i]}\t${completionTime[i]}\t\t${turnaroundTime[i]}\t\t${waitingTime[i]}`
        );
    }

    // Display results in a browser-friendly way
    alert("Check console for results!");
}

// Call the function to start
srtfScheduling();
