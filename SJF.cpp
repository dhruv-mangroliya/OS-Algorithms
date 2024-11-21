#include <iostream>
#include <vector>
#include <algorithm>
#include <climits> // For INT_MAX

using namespace std;

void shortestJobFirst(vector<int> &arrival, vector<int> &burst, int n) {
    vector<bool> isProcessed(n, false);
    int time = 0, completed = 0;

    while (completed < n) {
        int minBurst = INT_MAX, chosenIndex = -1;

        // Find process with the shortest burst time and tie-break with arrival time
        for (int i = 0; i < n; ++i) {
            if (!isProcessed[i] && arrival[i] <= time) {
                if (burst[i] < minBurst || (burst[i] == minBurst && arrival[i] < arrival[chosenIndex])) {
                    minBurst = burst[i];
                    chosenIndex = i;
                }
            }
        }

        if (chosenIndex == -1) {
            // No process is ready; jump to the next arrival time
            int nextArrival = INT_MAX;
            for (int i = 0; i < n; ++i) {
                if (!isProcessed[i] && arrival[i] > time) {
                    nextArrival = min(nextArrival, arrival[i]);
                }
            }
            time = nextArrival;
            continue;
        }

        // Process the chosen process
        cout << "Processing P" << (chosenIndex + 1) << " from time " << time << " to " << time + burst[chosenIndex] << endl;
        time += burst[chosenIndex];
        isProcessed[chosenIndex] = true;
        completed++;
    }
}

int main() {
    int n;
    cout << "Enter the number of processes: ";
    cin >> n;

    vector<int> arrival(n), burst(n);
    cout << "Enter arrival time and burst time of processes:\n";
    for (int i = 0; i < n; ++i) {
        cin >> arrival[i] >> burst[i];
    }

    shortestJobFirst(arrival, burst, n);

    return 0;
}
