# 使用 Node.js 20 作為基礎映像
FROM node:20

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製項目文件
COPY . .

# 暴露應用的端口
EXPOSE 3002

# 啟動應用程序
CMD ["node", "index.js"]
