---
title: 闭包
---
参考：[https://course.rs/advance/functional-programing/closure.html](https://course.rs/advance/functional-programing/closure.html)

闭包（`Closure`）被广泛应用于函数式编程语言中，`Rust` 同样支持闭包功能，先来看一个简单的闭包例子。

```rust
fn main() {
    println!("----------------------");
    let x = 1;
    let sum = |y| x+y;

    println!("Sum: {}", sum(10)); // output: 11
}
```
上面例子中的 `sum` 就是一个闭包，和函数类似 `y` 是它的参数，同时捕获了作用域中的 `x`，调用 `sum(10)`，意味着用 `10 + x` ,结果为 `11`。

## 结构体中的闭包

`Rust` 提供了一系列的 `Fn` 特征用于声明闭包类型，下面例子中的 `T` 就是一个闭包类型，它有一个 `u32` 类型的参数，返回值也是 `u32`。
`Fn` 特征除了用于结构体还可以用于函数。
```rust
struct Cacher<T>
where
    T: Fn(u32) -> u32,
{
    query: T,
    value: Option<u32>,
}
```

完整例子：
```rust
struct Cacher<T>
where
    T: Fn(u32) -> u32,
{
    query: T,
    value: Option<u32>,
}

impl <T> Cacher<T>
where
    T: Fn(u32) -> u32,
{
    fn new(query: T) -> Self {
        Self {
            query,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) ->u32 {
        match self.value {
            Some(v) => {
                if (v-10) != arg {
                    let v = (self.query)(arg);
                    self.value = Some(v);
                    v
                } else {
                    v
                }
            },
            None => {
                let v = (self.query)(arg);
                self.value = Some(v);
                v
            }
        }
    }
}
```

## 三种 Fn 特征

1. `Fn()` 不可变引用
2. `FnMut()` 可变引用
3. `FnOnce()` 转移所有权

```rust
fn fn_once<F>(func: F)
where
    F: FnOnce(usize) -> bool + Copy, // F 需要 Copy 特征
{
    println!("{}", func(3));
    println!("{}", func(4));
}

fn main() {
    println!("----------------------");
    let x = vec![1, 2, 3];
    fn_once(|z: usize|{ z == x.len()});

    println!("{:?}", x);
}

```

## 闭包作为返回值

```rust
fn factory(n: i32) -> Box<dyn Fn(i32) -> i32> {
    let num = 5;

    if n>1 {
        Box::new(move |x| x+num)
    } else {
        Box::new(move |x| x-num)
    }
}


fn main() {
    println!("----------------------");

    let a = factory(1); // factory() 的返回值为 Box<dyn Fn(i32) -> i32>
    let b = a(20); // 根据传给 factory() 的值大小来执行不同的闭包
    println!("b: {}", b);
}
```
