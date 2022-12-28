---
title: Circle 圆形
head:
    - [meta, {name: description, content: Rust 例子程序，该例子为一个圆形参数计算，包括通过任意一个参数来计算园的所有参数，本例子使用到了结构体和枚举类型。}]
    - [meta, {name: keywords, content: "Rust, Circle, Struct, Enum, Default"}]
---

项目结构如下：
```shell
src/
├── circle
│   ├── core.rs
│   └── mod.rs
└── main.rs
```

## mod.rs

```rust
pub mod core;
```
## core.rs
该例子的主要内容在 `core.rs` 文件中，里边定义了一个 `Circle`结构体 和一个 `CircleEnum` 枚举，结构体使用了 `Default` trait，这样就可以方便的创建一个带默认值的对象。

另外为 `Circle` 结构体实现了一个 `update` 方法，用来更新圆形的各个参数，该方法的参数类型为 `CircleEnum`，当我们需要通过不同的参数来更新圆的信息时，只需要传入如 `CircleEnum::R(12.5)` 通过半径来更新园，如果要用直径来更新园传入 `CircleEnum::D(24.5)` 即可。

```rust

use std::f64::consts::PI;
use std::fmt;

#[allow(dead_code)]
pub enum CircleEnum {
    R(f64), // 半径
    A(f64), // 面积
    P(f64), // 周长
    D(f64), // 直径
}

#[derive(Default)]
pub struct Circle {
    radius: f64,    // 半径
    area: f64,      // 面积
    perimeter: f64, // 周长
    diameter: f64,  // 直径
}

impl Circle {

    pub fn update(&mut self, circle_enum: CircleEnum) {
        let radius_to_area = |radius: f64| (radius * radius) * PI;
        let radius_to_perimeter = |radius: f64| radius * 2.0 * PI;
        let radius_to_diameter = |radius: f64| radius * 2.0;

        match circle_enum {
            // 有半径获取园的其他信息
            CircleEnum::R(radius) => {
                
                let area = radius_to_area(radius);
                let perimeter = radius_to_perimeter(radius);

                self.area = area;
                self.diameter = radius_to_diameter(radius);
                self.perimeter = perimeter;
                self.radius = radius;
            },
            // 有周长获取园的其他信息
            CircleEnum::P(perimeter) => {
                let radius = perimeter / PI / 2.0;
                let area = radius_to_area(radius);
                
                self.area = area;
                self.diameter = radius_to_diameter(radius);
                self.perimeter = perimeter;
                self.radius = radius;
            },
            // 有面积获取园的其他信息
            CircleEnum::A(area) => {
                let radius = (area / PI).sqrt();
                let perimeter = radius_to_perimeter(radius);
                
                self.area = area;
                self.diameter = radius_to_diameter(radius);
                self.perimeter = perimeter;
                self.radius = radius;
            },
            // 有直径获取园的其他信息
            CircleEnum::D(diameter) => {
                let radius = diameter / 2.0;
                let area = radius_to_area(radius);
                let perimeter = radius_to_perimeter(radius);
                
                self.area = area;
                self.diameter = diameter;
                self.perimeter = perimeter;
                self.radius = radius;

            }

        }
    }

}


impl fmt::Display for Circle {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Circle Info: \nRadius: {:.5}\nArea: {:.5}\nPerimeter: {:.5}\nDiameter: {:.5}", self.radius, self.area, self.perimeter, self.diameter)
    }
}

```

## main.rs
```rust

mod circle;
use crate::circle::core::{Circle, CircleEnum};

fn main() {
    let mut c1: Circle = Default::default();
    c1.update(CircleEnum::A(12.5));
    println!("{}", c1);
}

```