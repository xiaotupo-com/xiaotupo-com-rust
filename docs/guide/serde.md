---
title: 序列化和反序列化

head:
    - [meta, {name: description, content: 该文展示了 Rust 中的序列化库 Serde 的使用}]
    - [meta, {name: keywords, content: "Rust, 序列化, Serde"}]
---

## Cargo.toml
```toml
[package]
name = "hello"
version = "0.1.0"
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
serde = { version = "1.0", features = ["derive"]}
serde_json = "1.0"
```

## main.rs
```rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct Point {
    x: i32,
    y: i32,
}


fn main() {
    println!("----------------------");

    let point = Point {x: 1, y: 2};
    // 把 Rust 的 struct 转化成 json 字符串
    let serialized = serde_json::to_string(&point).unwrap();

    println!("serialized = {}", serialized);

    // 将 json 字符串转换成 Rust 的 struct 对象
    let deserialized: Point = serde_json::from_str(&serialized).unwrap();

    println!("deserialized = {:?}", deserialized);
}

```