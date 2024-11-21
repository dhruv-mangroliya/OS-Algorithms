#include <iostream>
#include <vector>
#include <limits>
using namespace std;

void priorityScheduling(int n, vector<int>& arrival, vector<int>& burst, vector<int>& priority) {
    vector<int> completion(n, 0), turnaround(n, 0), waiting(n, 0);
    vector<bool> isCompleted(n, false);
    int currentTime = 0, completed = 0;

    while (completed < n) {
        int idx = -1;
        int minPriority = numeric_limits<int>::max();

        // Find the process with the highest priority that has arrived
        for (int i = 0; i < n; ++i) {
            if (!isCompleted[i] && arrival[i] <= currentTime && priority[i] < minPriority) {
                minPriority = priority[i];
                idx = i;
            }
        }

        if (idx != -1) {
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

    // Output results
    cout << "Process\tArrival\tBurst\tPriority\tCompletion\tTurnaround\tWaiting\n";
    for (int i = 0; i < n; ++i) {
        cout << i + 1 << "\t" << arrival[i] << "\t" << burst[i] << "\t" << priority[i]
             << "\t\t" << completion[i] << "\t\t" << turnaround[i] << "\t\t" << waiting[i] << "\n";
    }
}

int main() {
    int n;
    cout << "Enter the number of processes: ";
    cin >> n;

    vector<int> arrival(n), burst(n), priority(n);
    for (int i = 0; i < n; ++i) {
        cout << "Enter arrival time, burst time, and priority for process " << i + 1 << ": ";
        cin >> arrival[i] >> burst[i] >> priority[i];
    }

    priorityScheduling(n, arrival, burst, priority);

    return 0;
}
