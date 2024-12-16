def double_number(iterable):
    for i in iterable:
        print('[]double data gen')
        yield i
def datagen():
    print('[]data gen')
    return[1,2,3,4,5]
for i in double_number(range(1000)):
    print(i)
for i in datagen():
    print(i)