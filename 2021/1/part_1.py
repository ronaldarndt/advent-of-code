import sys

with open('./input.txt', 'r') as f:
    data = [int(x) for x in f.readlines()]

last = sys.maxsize
count = 0
for line in data:
    if line > last:
        count += 1
    last = line

print(count)