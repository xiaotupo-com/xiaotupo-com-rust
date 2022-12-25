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


