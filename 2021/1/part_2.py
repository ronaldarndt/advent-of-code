import sys


with open('./input.txt', 'r') as f:
    data = [int(x) for x in f.readlines()]


last = sys.maxsize
count = 0
for i, line in enumerate(data[:-2]):
    window = data[i]
    for j in range(1, 3):
        window += data[i + j]
    if window > last:
        count += 1
    last = window

print(count)