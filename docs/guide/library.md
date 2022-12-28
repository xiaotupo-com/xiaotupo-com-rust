---
title: Rust 开发常用库
---

参考：[https://rusty.rs/daily-dev.html](https://rusty.rs/daily-dev.html)

## Web,Http

* Http 客户端
    * [reqwest](https://github.com/seanmonstar/reqwest) 一个简单又强大的HTTP客户端，reqwest是目前使用最多的HTTP库
* Web 框架
    * [axum](https://github.com/tokio-rs/axum) 基于Tokio和Hyper打造，模块化设计较好，目前口碑很好，值得使用Ergonomic and modular web framework built with Tokio, Tower, and Hyper
    * [Rocket](https://github.com/SergioBenitez/Rocket) 功能强大，API简单的Web框架，但是主要开发者目前因为个人原因无法进行后续开发，未来存在不确定性
    * [actix-web](https://github.com/actix/actix-web) 性能极高的Web框架，就是团队内部有些问题，未来存在一定的不确定性
* 序列化/反序列化
    * [Serde](https://github.com/serde-rs/serde) 一个超高性能的通用序列化/反序列化框架，可以跟多种协议的库联合使用，实现统一编解码格式
    * [Serde_Json](https://github.com/serde-rs/json) 快到上天的JSON库，也是Rust事实上的标准JSON库，你也可以使用它的大哥serde，一个更通用的序列化/反序列化库