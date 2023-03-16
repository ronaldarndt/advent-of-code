with open('./input.txt', 'r') as f:
    data = f.readlines()

x = 0
d = 0

for line in data:
    instr, amount = line.split(' ')
    amount = int(amount)

    if instr == 'forward':
        x += amount
    else:
        direction = 1 if instr == 'down' else -1
        d += amount * direction

print(x * d)