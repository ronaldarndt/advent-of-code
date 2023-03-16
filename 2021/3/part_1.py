with open('./input.txt', 'r') as f:
    data = f.readlines()

b = [{'0': 0, '1': 0} for _ in range(12)]

for line in data:
    for i, bit in enumerate(line[:-1]):
        b[i][bit] += 1

n = ''.join([max(x, key=x.get) for x in b])
g = int(n, 2)
e = 0b111111111111 - g

print(e * g)