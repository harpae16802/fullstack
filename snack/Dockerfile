# 使用官方的Node.js镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件
COPY package*.json ./

# 安装依赖
RUN npm install

# 安装eslint相关依赖
RUN npm install eslint-config-prettier --save-dev

# 复制所有文件到工作目录
COPY . .

# 运行构建命令
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
