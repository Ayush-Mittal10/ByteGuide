#include <iostream>
#include <vector>
#include <cmath>
#include <climits>
using namespace std;

int main() {
    int n, head, totalMovement = 0;
    cin >> n;

    vector<int> requests(n);
    vector<bool> visited(n, false);
    for (int i = 0; i < n; i++) {
        cin >> requests[i];
    }

    cin >> head;

    for (int i = 0; i < n; i++) {
        int closest = -1, minDistance = INT_MAX;
        for (int j = 0; j < n; j++) {
            if (!visited[j] && abs(requests[j] - head) < minDistance) {
                minDistance = abs(requests[j] - head);
                closest = j;
            }
        }
        totalMovement += minDistance;
        head = requests[closest];
        visited[closest] = true;
    }

    cout << "Total head movement is " << totalMovement << endl;
    return 0;
}
