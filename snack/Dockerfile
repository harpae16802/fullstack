# 使用 Node.js 18 作為基礎映像
FROM node:18

# 設置工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製項目文件
COPY . .

# 構建應用程序
RUN npm run build

# 暴露應用的端口
EXPOSE 3000

# 啟動應用程序
CMD ["npm", "start"]
