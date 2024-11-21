function lrtfScheduling() {
    const n = parseInt(prompt("Enter the number of processes: "));
    let arrival = [];
    let burst = [];
    let remainingBurst = [];
    let completionTime = Array(n).fill(0);
    let turnaroundTime = Array(n).fill(0);
    let waitingTime = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        arrival[i] = parseInt(prompt(`Enter arrival time for Process ${i + 1}: `));
        burst[i] = parseInt(prompt(`Enter burst time for Process ${i + 1}: `));
    }
    remainingBurst = [...burst];

    let time = 0, completed = 0;

    while (completed < n) {
        let longest = -1;
        for (let i = 0; i < n; i++) {
            if (arrival[i] <= time && remainingBurst[i] > 0) {
                if (longest === -1 || remainingBurst[i] > remainingBurst[longest]) {
                    longest = i;
                }
            }
        }

        if (longest === -1) {
            time++; // Move forward in time if no process is available
        } else {
            remainingBurst[longest]--;
            if (remainingBurst[longest] === 0) {
                completed++;
                completionTime[longest] = time + 1;
            }
            time++;
        }
    }

    // Calculate turnaround and waiting times
    for (let i = 0; i < n; i++) {
        turnaroundTime[i] = completionTime[i] - arrival[i];
        waitingTime[i] = turnaroundTime[i] - burst[i];
    }

    // Display results
    console.log("Process\tArrival\tBurst\tCompletion\tTurnaround\tWaiting");
    for (let i = 0; i < n; i++) {
        console.log(
            `${i + 1}\t${arrival[i]}\t${burst[i]}\t${completionTime[i]}\t\t${turnaroundTime[i]}\t\t${waitingTime[i]}`
        );
    }

    alert("Check console for results!");
}

// Call the function
lrtfScheduling();
