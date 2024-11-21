function priorityScheduling(processes, arrival, burst, priority) {
    const n = processes;
    const completion = Array(n).fill(0);
    const turnaround = Array(n).fill(0);
    const waiting = Array(n).fill(0);
    const isCompleted = Array(n).fill(false);

    let currentTime = 0;
    let completed = 0;

    while (completed < n) {
        let idx = -1;
        let minPriority = Infinity;

        // Find the process with the highest priority that has arrived
        for (let i = 0; i < n; i++) {
            if (!isCompleted[i] && arrival[i] <= currentTime && priority[i] < minPriority) {
                minPriority = priority[i];
                idx = i;
            }
        }

        if (idx !== -1) {
            // Execute the selected process
            currentTime += burst[idx];
            completion[idx] = currentTime;
            turnaround[idx] = completion[idx] - arrival[idx];
            waiting[idx] = turnaround[idx] - burst[idx];
            isCompleted[idx] = true;
            completed++;
        } else {
            // If no process is ready, move to the next time unit
            currentTime++;
        }
    }

    // Display the results
    console.log("Process\tArrival\tBurst\tPriority\tCompletion\tTurnaround\tWaiting");
    for (let i = 0; i < n; i++) {
        console.log(
            `${i + 1}\t${arrival[i]}\t${burst[i]}\t${priority[i]}\t\t${completion[i]}\t\t${turnaround[i]}\t\t${waiting[i]}`
        );
    }
}

// Input Function
function main() {
    const processes = parseInt(prompt("Enter the number of processes: "));
    const arrival = [];
    const burst = [];
    const priority = [];

    for (let i = 0; i < processes; i++) {
        const arrivalTime = parseInt(prompt(`Enter arrival time for process ${i + 1}: `));
        const burstTime = parseInt(prompt(`Enter burst time for process ${i + 1}: `));
        const priorityValue = parseInt(prompt(`Enter priority for process ${i + 1}: `));
        arrival.push(arrivalTime);
        burst.push(burstTime);
        priority.push(priorityValue);
    }

    priorityScheduling(processes, arrival, burst, priority);
}

// Execute the program
main();
