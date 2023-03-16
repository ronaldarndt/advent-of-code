def bit_not(n, numbits=12):
    return (1 << numbits) - 1 - n

with open('./input.txt', 'r') as f:
    data = f.readlines()

b = [{'0': 0, '1': 0} for _ in range(12)]

for line in data:
    for i, bit in enumerate(line[:-1]):
        b[i][bit] += 1

n = ''.join([max(x, key=x.get) for x in b])

o = 0
c = 0

for bit in range(2, 12):
    if o == 0:
        result = [x for x in data if x.startswith(n[:bit])]
        if len(result) == 1:
            o = int(result[0], 2)

    if c == 0:
        v = bit_not(int(n[:bit], 2), bit)
        result = [x for x in data if x.startswith(f'{v:0{bit}b}')]
        if bit == 3:
            print(f'{v:0{bit}b} {v}  {n[:bit]} {int(n[:bit], 2)}')
        if len(result) == 1:
            c = int(result[0], 2)

    if o != 0 and c != 0:
        break

print(o * c)