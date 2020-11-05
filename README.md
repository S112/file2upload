# vue 文件（图片）上传组件

## 安装
`npm install file2upload` or `yarn add file2upload`

`Tip`：如果stylus-loader报错，是因为版本较高，需要降级到3.0.2

## 属性
|字段|描述|值类型|
|-|-|-|
|v-model|文件数据|Array
|action|文件上传的url|String
|max|文件上传的最大数量|Number
|simultaneous-uploads|可同时上传的文件数量|Number
|multiple|是否允许用户选择多个文件|Boolean
|beforeUploadCheck|上传前的校验方法，判断是否要上传|Function

## 事件
|字段|描述|
|-|-|
|file-success|文件上传成功后触发
|file-error|文件上传失败后触发
|file-removed|文件删除后触发
