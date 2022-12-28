---
title: 随机数生成
head:
    - [meta, {name: description, content: 本文记录了 Rust 中提供的随机数生成的方法，通过具体的例子展示各种随机数的生成方法。}]
    - [meta, {name: keywords, content: "Rust, 随机数"}]
---

## 生产指定 Rust 类型的随机数

```rust
use rand::Rng;


fn main() {
    println!("----------------------");

    let mut rng = rand::thread_rng(); // 获取一个随机数生成器
    let n1: u8 = rng.gen();
    let n2: u16 = rng.gen();
    println!("Random u8: {}", n1);
    println!("Random u16: {}", n2);
    println!("Random u32: {}", rng.gen::<u32>());
    println!("Random i32: {}", rng.gen::<i32>());
    println!("Random float: {}", rng.gen::<f64>()); // 浮点数的范围在 0~1 之间
}
```

## 指定随机数范围

生成一个 `[0~10]` 之间的随机数,不包含 `10`。

```rust
use rand::Rng;

fn main() {
    println!("----------------------");

    let mut rng = rand::thread_rng();
    println!("整型：{}", rng.gen_range(0..10));
    println!("浮点型：{}", rng.gen_range(0.0..10.0));
}
```

输出：
```rust
----------------------
整型：2
浮点型：1.3833446323981913
```

**Uniform** 可以用于生成均匀分布的随机数，当需要在同一个范围内重复生成随机数时，该方法虽然和之前的方法效果一样，但会更快一些。

```rust
use rand::distributions::{Distribution, Uniform};


fn main() {
    println!("----------------------");
 
    let mut rng = rand::thread_rng();

    let die = Uniform::from(1..7);
    
    loop {
        let throw = die.sample(&mut rng);
        println!("Roll the die: {}", throw);
        // throw 等于 4 时退出
        if throw == 4 {
            break;
        }
    }
}
```

## 使用指定分布来生成随机数

默认情况下，`rand` 包使用均匀分布来生成随机数，我们可以使用 `rand_distr` 包提供的更多类型的分布类型。

首先，你需要获取想要使用的分布的实例，然后在 rand::Rng 的帮助下使用 Distribution::sample 对该实例进行取样。

这里用 Normal 分布作为展示：
```rust
use rand::{thread_rng};
use rand_distr::{Distribution, Normal, NormalError};

fn main() -> Result<(), NormalError> {
    println!("----------------------");
    let mut rng = thread_rng();
    let normal = Normal::new(2.0, 3.0)?;
    let v = normal.sample(&mut rng);

    println!("{} is from a N(2, 9) distribution", v);

    Ok(())
}
```