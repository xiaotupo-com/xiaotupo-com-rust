---
title: 迭代器
---

参考：[https://course.rs/advance/functional-programing/iterator.html](https://course.rs/advance/functional-programing/iterator.html)


在写代码时会用到这3个函数，into_iter()、iter() 和 iter_mut(),这三者的区别是：
- `into_iter` 会夺走所有权
- `iter` 是借用
- `iter_mut` 是可变借用

## 遍历数组
使用 `for` 遍历一个数组：
```rust
fn main() {
    let v = vec![10, 20, 30, 40, 50];

    for i in v {
        println!("i: {}", i);
    }
}
```
通过例子可以看到我们可以直接遍历数组，这是因为数组实现了 `IntoIterator` 特征，Rust 通过 for 语法糖，自动把实现了该特征的数组类型转换为迭代器。

现在我们显式的使用 `IntoIterator` 特征的 `into_iter` 方法来遍历数组：
```rust
fn main() {
    let v = vec![10, 20, 30, 40, 50];

    for i in v.into_iter() {
        println!("i: {}", i);
    }
}
```

## 惰性初始化
迭代器是惰性的，如果你不使用它，那么它将不会发生任何事情。

```rust
fn main() {
    let v = vec![10, 20, 30, 40, 50];

    let v_iter = v.iter(); // 创建一个迭代器，此时不会发生任何事情

    for i in v_iter {
        println!("i: {}", i);
    }
}
```

next 方法

迭代器特征 `Iterator` 有一个 `next` 方法，该方法控制如何从集合中取值，最终返回值的类型是关联类型 Item。
```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // 省略其余有默认实现的方法
}
```
调用 `next`方法试试看：
```rust
fn main() {
    let v = vec![10, 20, 30, 40, 50];

    let mut v_iter = v.iter();

    if let Some(i) = v_iter.next() {
        println!("{}", i);
    }

    if let Some(i) = v_iter.next() {
        println!("{}", i);
    }

    if let Some(i) = v_iter.next() {
        println!("{}", i);
    }

    if let Some(i) = v_iter.next() {
        println!("{}", i);
    }

}
```
输出：
```shell
10
20
30
40
```

## 例子

```rust
fn main() {
    let v = vec![10, 20, 30, 40, 50];

    for i in v.into_iter() {
        println!("{}", i);
    }

    // 下面的代码将报错，因为 v 的所有权在上面 `for` 循环中已经被转移走
    // println!("{:?}", v);

    let v = vec![10, 20, 30, 40, 50];
    let _v = v.iter();

    // 不会报错，因为 values_iter 只是借用了 values 中的元素
    println!("{:?}", v);

    let mut v = vec![10, 20, 30, 40, 50];
    let mut v_iter_mut = v.iter_mut();

    if let Some(v) = v_iter_mut.next() {
        *v = 0; // 修改 v[0] = 0
    }

    println!("{:?}", v);

}
```


## 消费者与适配器

消费者是迭代器上的方法，它会消费掉迭代器中的元素，然后返回其类型的值，这些消费者都有一个共同的特点：在它们的定义中，都依赖 `next` 方法来消费元素，因此这也是为什么迭代器要实现 `Iterator` 特征，而该特征必须要实现 `next` 方法的原因。

## 消费者适配器
只要迭代器上的某个方法 `A` 在其内部调用了 `next` 方法，那么 `A` 就被称为消费性适配器：因为 `next` 方法会消耗掉迭代器上的元素，所以方法 `A` 的调用也会消耗掉迭代器上的元素。

其中一个例子是 `sum` 方法，它会拿走迭代器的所有权，然后通过不断调用 `next` 方法对里面的元素进行求和：
```rust
fn main() {
    println!("----------------------");
    let v1 = vec![1, 2, 3];

    let total: i32 = v1.iter().sum();

    println!("Total: {}", total);

    println!("{:?}", v1);

}
```

**sum()**
```rust
fn sum<S>(self) -> S
    where
        Self: Sized,
        S: Sum<Self::Item>,
{
    Sum::sum(self)
}
```

## 迭代器适配器

既然消费者适配器是消费掉迭代器，然后返回一个值。那么迭代器适配器，顾名思义，会返回一个新的迭代器，这是实现链式方法调用的关键：`v.iter().map().filter()...`。

与消费者适配器不同，迭代器适配器是惰性的，意味着你`需要一个消费者适配器来收尾，最终将迭代器转换成一个具体的值`：

```rust
let v1 = vec![1,2,3];
v1.iter().map(|x| x+1);
```
该代码将会发出警告：
```shell
x: &i32
unused `Map` that must be used
iterators are lazy and do nothing unless consumed
```
如上述中文注释所说，这里的 map 方法是一个迭代者适配器，它是惰性的，不产生任何行为，因此我们还需要一个消费者适配器进行收尾：
```rust
fn main() {
    println!("----------------------");
    let v1 = vec![1, 2, 3];

    let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

    println!("{:?}", v2);

}
```

上面代码中，使用了 `collect` 方法，该方法就是一个消费者适配器，使用它可以将一个迭代器中的元素收集到指定类型中，这里我们为 `v2` 标注了 `Vec<_>` 类型，就是为了告诉 `collect`：请把迭代器中的元素消费掉，然后把值收集成 `Vec<_>` 类型，至于为何使用 `_`，因为编译器会帮我们自动推导。

为何 `collect` 在消费时要指定类型？是因为该方法其实很强大，可以收集成多种不同的集合类型，`Vec<T>` 仅仅是其中之一，因此我们必须显式的告诉编译器我们想要收集成的集合类型。

还有一点值得注意，`map` 会对迭代器中的每一个值进行一系列操作，然后把该值转换成另外一个新值，该操作是通过闭包 `|x| x + 1` 来完成：最终迭代器中的每个值都增加了 `1`，从 `[1, 2, 3]` 变为 `[2, 3, 4]`。

再来看看如何使用 `collect` 收集成 `HashMap` 集合：

```rust
use std::collections::HashMap;

fn main() {
    println!("----------------------");
    let names = ["sunface", "sunfei"];
    let ages = [18, 19];

    let folks: HashMap<_,_> = names.into_iter().zip(ages.into_iter()).collect();

    println!("{:?}", folks);

}
```
输出：
```shell
----------------------
{"sunfei": 19, "sunface": 18}
```

`zip` 是一个迭代器适配器，它的作用就是将两个迭代器的内容压缩到一起，形成 `Iterator<Item=(ValueFromA, ValueFromB)>` 这样的新的迭代器，在此处就是形如 `[(name1, age1), (name2, age2)]` 的迭代器。

然后再通过 `collect` 将新迭代器中`(K, V)` 形式的值收集成 `HashMap<K, V>`，同样的，这里必须显式声明类型，然后 `HashMap` 内部的 `KV` 类型可以交给编译器去推导，最终编译器会推导出 `HashMap<&str, i32>`，完全正确！

## 闭包作为适配器参数

```rust
#[derive(Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter().filter(|s| s.size == shoe_size).collect()
}

fn main() {
    println!("----------------------");
    let mut shoe1: Vec<Shoe> = vec![
        Shoe {
            size: 35,
            style: String::from("Red"),
        },
        Shoe {
            size: 36,
            style: String::from("White"),
        }
    ];
    
    let shoe2 = shoes_in_size(shoe1, 36);

    // 这行会出错，因为shoe1 的所有权被 shoes_in_size 函数转移了
    // println!("{:?}", shoe1);
    println!("{:?}", shoe2);
}
```

`filter` 是迭代器适配器，用于对迭代器中的每个值进行过滤。 它使用闭包作为参数，该闭包的参数 `s` 是来自迭代器中的值，然后使用 `s` 跟外部环境中的 `shoe_size` 进行比较，若相等，则在迭代器中保留 `s` 值，若不相等，则从迭代器中剔除 `s` 值，最终通过 `collect` 收集为 `Vec<Shoe>` 类型。

## 实现 Iterator 特征

```rust
#[derive(Debug)]
struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Self {
        Self { count: 0}
    }
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    println!("----------------------");

    let c1 = Counter::new();

    for i in c1.into_iter() {
        println!("{}", i);
    }
    
}
```

## enumerate 获取迭代时的索引

```rust
fn main() {
    println!("----------------------");

    let v = vec![1u64, 2, 3, 4, 5,6];
    for (i,v) in v.iter().enumerate() {
        println!("第{}个的值是{}", i, v);
    }
    
}
```
输出：
```shell
----------------------
第0个的值是1
第1个的值是2
第2个的值是3
第3个的值是4
第4个的值是5
第5个的值是6
```