# (实验性) 适用于新版百度网盘的增强脚本

基于 Rollup + 同版本 Vue 构建，强制启用开发者模式。

可通过对 WebPack 的模块初始化函数 Hook 进行执行时代码注入。

## 开发相关

百度用到了 [Element-UI][eleme_ui] 库，但前缀从 `el-` 变成了 `u-`。

如 [`<el-radio>`][el_radio] 在百度的框架内使用 `<u-radio>` 的方式引用即可。

[eleme_ui]: https://element.eleme.io/
[el_radio]: https://element.eleme.io/#/zh-CN/component/radio

## 开发目标

### 当前进展

请在仓库讨论区追踪: https://github.com/jixunmoe/dupan-helper-v2/discussions/2
