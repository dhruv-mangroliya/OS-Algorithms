#include <iostream>
#include <queue>
#include <vector>
#include <set>

using namespace std;

void roundRobin(int n, vector<int>& arrival, vector<int>& burst, int tq) {
    vector<int> remainingBurst(burst); // Remaining burst times
    vector<int> completionTime(n, -1); // Completion times for each process
    queue<int> q; // Queue to hold processes
    set<int> inQueue; // Set to track processes already in the queue
    int time = 0; // Current time
    int completed = 0; // Number of completed processes

    // Add processes that have arrived at time 0
    for (int i = 0; i < n; ++i) {
        if (arrival[i] <= time) {
            q.push(i);
            inQueue.insert(i); // Mark process as in queue
        }
    }

    while (completed < n) {
        if (!q.empty()) {
            int i = q.front();
            q.pop();
            inQueue.erase(i); // Remove from the set as it is being processed

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

            // Add new processes to the queue that have arrived by the current time
            for (int j = 0; j < n; ++j) {
                if (arrival[j] <= time && remainingBurst[j] > 0 && inQueue.find(j) == inQueue.end()) {
                    q.push(j);
                    inQueue.insert(j); // Mark process as in queue
                }
            }
        }
    }

    // Output the completion times of all processes
    for (int i = 0; i < n; ++i) {
        cout << "Process " << i + 1 << " completed at time " << completionTime[i] << endl;
    }
}

int main() {
    int n, tq;
    cout << "Enter the number of processes: ";
    cin >> n;

    vector<int> arrival(n), burst(n);

    cout << "Enter arrival time and burst time of processes:\n";
    for (int i = 0; i < n; ++i) {
        cin >> arrival[i] >> burst[i];
    }

    cout << "Enter time quantum: ";
    cin >> tq;

    roundRobin(n, arrival, burst, tq);

    return 0;
}
