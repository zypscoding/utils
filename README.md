@ekkoling/utils
工具函数
|-- lib/（存放打包后的文件）
|-- src/（源码）
|-- package.json
|-- rollup.config.base.js（rollup基础配置）
|-- rollup.config.dev.js（rollup开发配置）
|-- rollup.config.js（rollup正式配置）
|-- README.md
|-- tsconfig.json

# 测试环境
npm run dev
# 生产环境
npm run build

可以通过npm pack命令进行本地模拟打包测试，在项目根目录下就会生成一个tgz的压缩包，这就是将要上传的文件内容。