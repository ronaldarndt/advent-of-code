from math import floor
from typing import List

i = 0
numbers: List[int] = []
cards: List[List[int]] = []

with open('./input.txt', 'r') as f:
    for line in f:

        if i == 0:
            numbers = list(map(int, line.split(',')))
        elif line.strip() == '':
            continue
        else:
            cardIndex = floor(i / 5)
            if len(cards) <= cardIndex:
                cards.append([])
            card = cards[cardIndex]
            for n in line.replace('  ', ' ').split(' '):
                if n == '':
                    n = '0'
                card.append(int(n))

        i += 1


    