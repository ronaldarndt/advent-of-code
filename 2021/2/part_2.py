with open('./input.txt', 'r') as f:
    data = f.readlines()

x = 0
d = 0
a = 0

for line in data:
    instr, amount = line.split(' ')
    amount = int(amount)

    if instr != 'forward':
        direction = 1 if instr == 'down' else -1
        a += amount * direction
    else:
        x += amount
        d += a * amount

print(x * d)
        