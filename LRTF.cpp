#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void lrtfScheduling(int n, vector<int> arrival, vector<int> burst) {
    vector<int> remainingBurst = burst;
    vector<int> completionTime(n, 0), turnaroundTime(n, 0), waitingTime(n, 0);
    int time = 0, completed = 0, currentProcess = -1;

    while (completed < n) {
        int longest = -1;
        for (int i = 0; i < n; i++) {
            if (arrival[i] <= time && remainingBurst[i] > 0) {
                if (longest == -1 || remainingBurst[i] > remainingBurst[longest]) {
                    longest = i;
                }
            }
        }

        if (longest == -1) {
            time++; // No process available, move forward in time
        } else {
            remainingBurst[longest]--;
            if (remainingBurst[longest] == 0) {
                completed++;
                completionTime[longest] = time + 1;
            }
            time++;
        }
    }

    // Calculate turnaround and waiting times
    for (int i = 0; i < n; i++) {
        turnaroundTime[i] = completionTime[i] - arrival[i];
        waitingTime[i] = turnaroundTime[i] - burst[i];
    }

    // Print the results
    cout << "Process\tArrival\tBurst\tCompletion\tTurnaround\tWaiting\n";
    for (int i = 0; i < n; i++) {
        cout << i + 1 << "\t" << arrival[i] << "\t" << burst[i] << "\t"
             << completionTime[i] << "\t\t" << turnaroundTime[i] << "\t\t" << waitingTime[i] << "\n";
    }
}

int main() {
    int n;
    cout << "Enter the number of processes: ";
    cin >> n;

    vector<int> arrival(n), burst(n);
    for (int i = 0; i < n; i++) {
        cout << "Enter arrival time for process " << i + 1 << ": ";
        cin >> arrival[i];
        cout << "Enter burst time for process " << i + 1 << ": ";
        cin >> burst[i];
    }

    lrtfScheduling(n, arrival, burst);
    return 0;
}
