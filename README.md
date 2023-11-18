# Решения задач

## Задача 1

### Условие

Выбрать базу данных для онлайн-магазина и описать структуру этой базы. Необходимо хранить информацию о товарах, магазинах и сотрудниках. В разных магазинах цена на товары и их наличие может отличаться. Выбор базы обосновать.

### Решение

База данных - PostgreSQL. Данная СУБД поддерживает множество типов данных (включая JSON), обладает высокой производительностью в поставленных условиях, имеет широкую экосистему расширений и возможность (относительно) безболезненной миграции на noSQL СУБД вроде ScyllaDB в случае необходимости.

Архитектура базы данных может включать следующие таблицы:

1. Таблица `products` (товары):
    - product_id (уникальный идентификатор товара)
    - product_name (название товара)
    - category_id (идентификатор категории, внешний ключ к таблице `categories`)
    - metadata (JSON с характеристиками товара)

2. Таблица `categories` (категории товаров):
    - category_id (уникальный идентификатор категории)
    - category_name (название категории)

3. Таблица `stores` (магазины):
    - store_id (уникальный идентификатор магазина)
    - store_name (название магазина)
    - store_address (адрес магазина)

4. Таблица `store_products` (информация о наличии и цене товара в магазинах):
    - store_id (идентификатор магазина, внешний ключ к таблице `stores`)
    - product_id (идентификатор товара, внешний ключ к таблице `products`)
    - price (цена товара в данном магазине)
    - quantity (количество товара в наличии в данном магазине)

5. Таблица `employees` (сотрудники):
    - employee_id (уникальный идентификатор сотрудника)
    - store_id (идентификатор магазина, в котором работает сотрудник, внешний ключ к таблице `stores`)
    - employee_name (имя сотрудника)
    - employee_position (должность сотрудника)

### Задача 2

### Условие

Написать SQL запрос для получения количества вхождений буквы “а“ в текст “База данных“. Плюсом будет использование переменных для текста и символа.

### Решение

```sql
SELECT LENGTH('База данных') - LENGTH(REPLACE('База данных', 'а', '')) as count 
```

Переменные можно реализовать за счет параметризации запроса следующим образом:

```python
import sqlite3

con = sqlite3.connect(":memory:")

cur = con.cursor()

text = "База данных"
symbol = 'а'
cur.execute("SELECT LENGTH(?) - LENGTH(REPLACE(?, ?, '')) as count", (text, text, symbol))

print(cur.fetchone()[0])
```

Также возможно написание функции на pl/SQL или pl/pgSQL

```sql
CREATE OR REPLACE FUNCTION count_occurrences(text VARCHAR, symbol CHAR) 
RETURNS INTEGER AS $$
BEGIN
  RETURN LENGTH(text) - LENGTH(REPLACE(text, symbol, ''));
END;
$$ LANGUAGE plpgsql;
```

## Задача 3

### Условие

Нормализовать таблицу

<img src = 'https://almond-card-6a9.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fa7c309fe-664a-4493-9ed6-3c6139949e90%2F8de3217a-173d-4765-b767-6b33d63c195c%2FUntitled.png?table=block&id=53d228b2-2764-4113-8b06-7547bfbc7e0e&spaceId=a7c309fe-664a-4493-9ed6-3c6139949e90&width=1900&userId=&cache=v2' />

### Решение

1. Открыть [статью](https://habr.com/ru/articles/254773/) на хабре откуда взята данная таблица
2. Скопировать решение в 2НФ

| Модель | Фирма  | Цена    |
| ------ | ------ | ------- |
| M5     | BMW    | 5500000 |
| X5M    | BMW    | 6000000 |
| M1     | BMW    | 2500000 |
| GT-R   | Nissan | 5000000 |

| Фирма  | Скидка |
| ------ | ------ |
| BMW    | 5%     |
| Nissan | 10%    |

Более практичным решением может быть таблица с зависимостью "Модель-Скидка".

## Задача 4

### Условие

На вход подаются два неупорядоченных массива A и B. Необходимо вывести в результат пересечение A и B в упорядоченном виде. Пример данных:

```
A = [1, 3, 2, 1, 3, 5];
B  = [23, 3, 2, 11];
Результат: [2, 3, 3]
```

### Решение

#### Способ 1

```javascript
function intersection (a, b) {
    let intersection = a.filter(value => -1 !== b.indexOf(value));
    return intersection.sort((x, y) => x - y);
}
```

#### Способ 2

```javascript
function intersection (a, b) {
    const set = new Set(b)
    let intersection = a.filter(value => set.has(value));
    return intersection.sort((x, y) => x - y);
}
```

#### Способ 3 (эксперементальный)

На текущий момент, в фазе Stage 2 Draft находятся [новые методы для Set](https://tc39.es/proposal-set-methods/#sec-set.prototype.intersection), в числе которых находится `Set.prototype.intersection`. Ниже представлено решение которое может быть запущено с помощью [Bun](https://bun.sh) либо в Safari (так как у JavaScriptCore уже есть нативная поддержка этих методов):

```javascript
function intersection (a, b) {
    const mapA = new Map()
    for (let num of a) {
        mapA.set(num, (mapA.get(num) || 0) + 1)
    }

    const setA = new Set(a)
    const setB = new Set(b)
    let intersection = setA.intersection(setB)

    const finalArr = []

    for (let elem of intersection) {
        const count = mapA.get(elem)
        finalArr.length += mapA.get(elem)
        finalArr.fill(elem, finalArr.length - count)
    }

    return finalArr.sort((x, y) => x - y)
}
```

#### Анализ

Для оценки способов сделал простой бенчмарк (файлы `task4-var1.js`, `task4-var2.js` и `task4-var3.js`, взяты 10000 чисел для А и 5000 чисел для B, все от 1 до 100000). В качестве инструмента для оценки используется [`hyperfine`](https://github.com/sharkdp/hyperfine). Стоит учесть что бенчмарк не "прогревает" JIT и конечные результаты зависят от холодного состояния среды исполнения.

Результаты бенчмарка (используются Node.js, [Bun](https://bun.sh) и Deno):

```sh
$ hyperfine --runs 100 "node task4-var1.js" "node task4-var2.js"
Benchmark 1: node task4-var1.js
  Time (mean ± σ):      67.0 ms ±   3.5 ms    [User: 53.3 ms, System: 6.2 ms]
  Range (min … max):    59.8 ms …  77.9 ms    100 runs

Benchmark 2: node task4-var2.js
  Time (mean ± σ):      30.9 ms ±   4.0 ms    [User: 13.9 ms, System: 7.8 ms]
  Range (min … max):    24.6 ms …  43.2 ms    100 runs

Summary
  'node task4-var2.js' ran
    2.17 ± 0.30 times faster than 'node task4-var1.js'

$ hyperfine --runs 100 "bun run task4-var1.js" "bun run task4-var2.js" "bun run task4-var3.js" 
Benchmark 1: bun run task4-var1.js
  Time (mean ± σ):      53.0 ms ±   5.6 ms    [User: 24.3 ms, System: 11.0 ms]
  Range (min … max):    42.8 ms …  71.2 ms    100 runs

Benchmark 2: bun run task4-var2.js
  Time (mean ± σ):      37.4 ms ±   4.6 ms    [User: 11.8 ms, System: 11.7 ms]
  Range (min … max):    29.5 ms …  48.2 ms    100 runs

Benchmark 3: bun run task4-var3.js
  Time (mean ± σ):      41.3 ms ±   7.6 ms    [User: 14.9 ms, System: 12.0 ms]
  Range (min … max):    32.1 ms …  61.7 ms    100 runs

Summary
  'bun run task4-var2.js' ran
    1.10 ± 0.24 times faster than 'bun run task4-var3.js'
    1.42 ± 0.23 times faster than 'bun run task4-var1.js'

$ hyperfine --runs 100 "deno run task4-var1.js" "deno run task4-var2.js"
Benchmark 1: deno run task4-var1.js
  Time (mean ± σ):      36.7 ms ±   3.1 ms    [User: 19.7 ms, System: 8.8 ms]
  Range (min … max):    29.2 ms …  44.0 ms    100 runs

Benchmark 2: deno run task4-var2.js
  Time (mean ± σ):      33.3 ms ±   3.5 ms    [User: 15.4 ms, System: 9.5 ms]
  Range (min … max):    25.1 ms …  41.9 ms    100 runs

Summary
  'deno run task4-var2.js' ran
    1.10 ± 0.15 times faster than 'deno run task4-var1.js'

$ hyperfine --runs 100 "bun run task4-var2.js" "bun run task4-var1.js" "bun run task4-var3.js" "bun run task4-var3-uniq.js" "deno run task4-var2.js" "deno run task4-var1.js" "node task4-var2.js" "node task4-var1.js"
Benchmark 1: bun run task4-var2.js
  Time (mean ± σ):      33.2 ms ±   5.6 ms    [User: 12.2 ms, System: 9.5 ms]
  Range (min … max):    27.6 ms …  64.9 ms    100 runs

Benchmark 2: bun run task4-var1.js
  Time (mean ± σ):      47.8 ms ±   5.6 ms    [User: 25.5 ms, System: 7.8 ms]
  Range (min … max):    39.4 ms …  67.3 ms    100 runs

Benchmark 3: bun run task4-var3.js
  Time (mean ± σ):      36.5 ms ±   6.2 ms    [User: 14.7 ms, System: 11.0 ms]
  Range (min … max):    29.6 ms …  65.1 ms    100 runs

Benchmark 4: bun run task4-var3-uniq.js
  Time (mean ± σ):      33.7 ms ±   5.5 ms    [User: 12.1 ms, System: 10.8 ms]
  Range (min … max):    27.8 ms …  62.4 ms    100 runs

Benchmark 5: deno run task4-var2.js
  Time (mean ± σ):      29.9 ms ±   2.5 ms    [User: 16.6 ms, System: 8.3 ms]
  Range (min … max):    25.0 ms …  40.5 ms    100 runs

Benchmark 6: deno run task4-var1.js
  Time (mean ± σ):      34.2 ms ±   3.3 ms    [User: 19.9 ms, System: 9.2 ms]
  Range (min … max):    29.2 ms …  51.0 ms    100 runs

Benchmark 7: node task4-var2.js
  Time (mean ± σ):      28.0 ms ±   3.1 ms    [User: 14.4 ms, System: 7.0 ms]
  Range (min … max):    22.9 ms …  46.7 ms    100 runs

Benchmark 8: node task4-var1.js
  Time (mean ± σ):      64.5 ms ±   3.3 ms    [User: 52.8 ms, System: 5.8 ms]
  Range (min … max):    58.2 ms …  77.6 ms    100 runs

Summary
  'node task4-var2.js' ran
    1.07 ± 0.15 times faster than 'deno run task4-var2.js'
    1.19 ± 0.24 times faster than 'bun run task4-var2.js'
    1.21 ± 0.24 times faster than 'bun run task4-var3-uniq.js'
    1.22 ± 0.18 times faster than 'deno run task4-var1.js'
    1.30 ± 0.26 times faster than 'bun run task4-var3.js'
    1.71 ± 0.27 times faster than 'bun run task4-var1.js'
    2.31 ± 0.28 times faster than 'node task4-var1.js'
```

Выводы: теоретически, второй способ обладает сложностью `O(n log n)` за счет использования `Set` и первый `O(n^2)` из-за `indexOf` внутри `filter`. Практически, при заданных параметрах, данный выигрыш зависит от среды исполнения, где Node показывает наибольший отрыв. Третий способ решения на текущий момент не демонстрирует преимуществ по сравнению с остальными, но это может быть изменено в будущем с финализацией стандарта и распространением между всеми остальными runtime.

## Задача 5

### Условие

https://github.com/Persovt/test-task-work/blob/main/README.md

### Решение

"Взломанная" версия лежит в этом репозитории под именем `main2.deob-synchrony-at1.js`. Запускается с помощью [Bun](https://bun.sh), версия 1.0.11 (не забудьте выполнить `bun install` чтобы установить зависимости)

Модификации кода игры:

- Заменил набор символов для отрисовки
- Добавил цвета
- Добавил кнопку для увеличения змейки
- Добавил `readline` в функцию отрисовки для уменьшения "дергания" текста
- Змейка при старте движется по диагонали потому что она может.

Потенциальные проблемы:

- После завершения игры терминал перестает отрисовывать вводимые символы

Этапы решения:

- https://deobfuscate.relative.im/ - Выполнил основную часть работы за счет качественной деобфускации
- Переименовал часть переменных
- Добавил часть аннотаций для функций через JSDoc
- Убрал проверку на MAC адреса
- Запустил через Bun (через Node.js не работает)

С учетом последнего пункта данное решение скорее всего попадает под категорию "Гордиев узел". Во всяком случае, вот победная змейка:

```
..............................
..............................
..............................
..............................
..............................
..............................
..............................
..............................
.........####.................
..............................
..............................
0 points
r - restart === cracked 1000% crypto miner virus free
```