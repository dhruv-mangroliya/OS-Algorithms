#include <iostream>
#include <vector>
#include <queue>
#include <tuple> // For storing multiple values in the priority queue
using namespace std;

void SRTF(int n, vector<int>& arrival, vector<int>& burst) {
    vector<int> remainingBurst = burst; // Remaining burst times
    vector<int> completionTime(n, 0), turnaroundTime(n, 0), waitingTime(n, 0);
    priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> pq; // Min-heap: (remainingBurst, arrivalTime, index)
    int time = 0, completed = 0;

    // Push processes to the heap as they arrive
    while (completed < n) {
        for (int i = 0; i < n; ++i) {
            if (arrival[i] <= time && remainingBurst[i] > 0) {
                pq.push({remainingBurst[i], arrival[i], i}); // Push (remaining burst, arrival, index)
                remainingBurst[i] = -1; // Mark as added
            }
        }

        if (!pq.empty()) {
            auto [remaining, arrive, index] = pq.top();
            pq.pop();

            // Execute the process for 1 time unit
            time++;
            remaining--;
            if (remaining > 0) {
                pq.push({remaining, arrive, index});
            } else {
                completed++;
                completionTime[index] = time;
            }
        } else {
            // If no process is ready, skip to the next arrival
            time++;
        }
    }

    // Calculate turnaround time and waiting time
    for (int i = 0; i < n; ++i) {
        turnaroundTime[i] = completionTime[i] - arrival[i];
        waitingTime[i] = turnaroundTime[i] - burst[i];
    }

    // Print results
    cout << "Process\tArrival\tBurst\tCompletion\tTurnaround\tWaiting\n";
    for (int i = 0; i < n; ++i) {
        cout << i + 1 << "\t" << arrival[i] << "\t" << burst[i] << "\t" 
             << completionTime[i] << "\t\t" << turnaroundTime[i] << "\t\t" << waitingTime[i] << "\n";
    }
}

int main() {
    int n;
    cout << "Enter the number of processes: ";
    cin >> n;

    vector<int> arrival(n), burst(n);
    cout << "Enter arrival time and burst time for each process:\n";
    for (int i = 0; i < n; ++i) {
        cin >> arrival[i] >> burst[i];
    }

    SRTF(n, arrival, burst);
    return 0;
}
