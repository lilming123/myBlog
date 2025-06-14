# Makefile for Full Stack Application (Next.js + MySQL)

# ---------------------------
# 变量定义 (可修改部分)
# ---------------------------

# 应用配置
APP_NAME := my-next-app
FRONTEND_PORT := 3030
# 网站地址
SITE_URL := https://www.lilming.top/

# Docker 配置
DOCKER_COMPOSE := docker-compose.yml
MYSQL_SERVICE := mysql8
MYSQL_PORT := 3306

# ---------------------------
# PHONY 目标声明
# ---------------------------
.PHONY: help deploy redeploy first-deploy frontend-redeploy \
        dev build start restart install pull \
        backend backend-stop backend-logs \
        clean check-app

# ---------------------------
# 默认目标
# ---------------------------
.DEFAULT_GOAL := help

# ---------------------------
# 帮助信息
# ---------------------------
help:
	@echo "                                                                                "
	@echo "🌈 可用命令:                                                                     "
	@echo "                                                                                "
	@echo "🚀 部署命令:                                                                     "
	@echo "  make deploy           # 智能部署 (自动检测首次/重新部署)                       "
	@echo "  make first-deploy     # 强制首次完整部署 (代码+依赖+构建+后端+前端)            "
	@echo "  make redeploy         # 强制重新完整部署                                      "
	@echo "  make frontend-redeploy # 仅重新部署前端 (代码+依赖+构建+重启)                 "
	@echo "                                                                                "
	@echo "💻 前端命令:                                                                     "
	@echo "  make dev              # 启动开发服务器 (端口: ${FRONTEND_PORT})                "
	@echo "  make start            # 启动生产服务器 (PM2)                                  "
	@echo "  make restart          # 重启生产服务器                                        "
	@echo "  make build            # 构建生产包                                            "
	@echo "  make install          # 安装依赖                                              "
	@echo "  make pull             # 拉取最新代码                                          "
	@echo "                                                                                "
	@echo "🗄️ 后端管理:                                                                     "
	@echo "  make backend          # 启动MySQL容器 (端口: ${MYSQL_PORT})                    "
	@echo "  make backend-stop     # 停止MySQL容器                                         "
	@echo "  make backend-logs     # 查看MySQL日志                                         "
	@echo "                                                                                "
	@echo "🧹 维护命令:                                                                     "
	@echo "  make clean            # 深度清理 (node_modules + .next + Docker卷)             "
	@echo "  make check-app        # 检查应用状态                                          "
	@echo "                                                                                "

# ---------------------------
# 部署流程
# ---------------------------
deploy: check-app
	@if pm2 list | grep -q $(APP_NAME); then \
		echo "                                                                                "; \
		echo "🔄 检测到现有应用 [$(APP_NAME)]，执行重新部署...                                "; \
		echo "                                                                                "; \
		$(MAKE) redeploy; \
	else \
		echo "                                                                                "; \
		echo "🚀 检测到首次部署 [$(APP_NAME)]，准备初始化环境...                              "; \
		echo "                                                                                "; \
		$(MAKE) first-deploy; \
	fi

first-deploy: pull install build backend start
	@echo "                                                                                "
	@echo "✅ 首次部署完成!                                                                 "
	@echo "  前端访问: $(SITE_URL)                                    "
	@echo "  MySQL端口: $(MYSQL_PORT)                                                       "
	@echo "                                                                                "

redeploy: pull install build backend restart
	@echo "                                                                                "
	@echo "✅ 重新部署完成!                                                                 "
	@echo "  前端访问: $(SITE_URL)                                    "
	@echo "                                                                                "

frontend-redeploy: pull install build restart
	@echo "                                                                                "
	@echo "✅ 前端重新部署完成!                                                              "
	@echo "  访问: $(SITE_URL)                                        "
	@echo "                                                                                "

# ---------------------------
# 前端命令
# ---------------------------
dev:
	@echo "                                                                                "
	@echo "⚡ 启动开发服务器...                                                             "
	@echo "  监听端口: $(FRONTEND_PORT)                                                     "
	@echo "                                                                                "
	npm run dev -- -p $(FRONTEND_PORT)

start:
	@echo "                                                                                "
	@echo "🚀 启动生产服务器...                                                             "
	@echo "  PM2应用名: $(APP_NAME)                                                         "
	@echo "  监听端口: $(FRONTEND_PORT)                                                     "
	@echo "                                                                                "
	pm2 start npm --name "$(APP_NAME)" -- run start -- -p $(FRONTEND_PORT)

restart:
	@echo "                                                                                "
	@echo "🔄 重启生产服务器...                                                             "
	pm2 stop my-next-app
	pm2 start npm --name "$(APP_NAME)" -- run start -- -p $(FRONTEND_PORT)
	@echo "✅ 已重启 [$(APP_NAME)]                                                          "
	@echo "  访问: $(SITE_URL)                                        "
	@echo "                                                                                "


build:
	@echo "                                                                                "
	@echo "🔨 开始构建生产包...                                                             "
	npm run build
	@echo "                                                                                "
	@echo "✅ 构建完成!                                                                     "
	@echo "                                                                                "

install:
	@echo "                                                                                "
	@echo "📦 安装依赖包...                                                                 "
	yarn
	@echo "                                                                                "
	@echo "✅ 依赖安装完成!                                                                 "
	@echo "                                                                                "

pull:
	@echo "                                                                                "
	@echo "🌐 正在拉取代码...                                    "
	git pull
	@echo "                                                                                "
	@echo "✅ 代码更新完成!                                                                 "
	@echo "                                                                                "

# ---------------------------
# 后端命令
# ---------------------------
backend:
	@echo "                                                                                "
	@echo "🐳 启动MySQL容器...                                                              "
	@echo "  服务名: $(MYSQL_SERVICE)                                                       "
	@echo "  暴露端口: $(MYSQL_PORT)                                                        "
	@echo "                                                                                "
	docker-compose -f $(DOCKER_COMPOSE) up -d $(MYSQL_SERVICE)
	@echo "                                                                                "
	@echo "✅ MySQL已启动，使用以下命令连接:                                                "
	@echo "  mysql -h 127.0.0.1 -P $(MYSQL_PORT) -u root -p                                 "
	@echo "                                                                                "

backend-stop:
	@echo "                                                                                "
	@echo "🛑 停止MySQL容器...                                                              "
	docker-compose -f $(DOCKER_COMPOSE) down
	@echo "                                                                                "
	@echo "✅ MySQL已停止                                                                   "
	@echo "                                                                                "

backend-logs:
	@echo "                                                                                "
	@echo "📜 查看MySQL日志...                                                              "
	@echo "  (按 Ctrl+C 退出)                                                               "
	@echo "                                                                                "
	docker-compose -f $(DOCKER_COMPOSE) logs $(MYSQL_SERVICE)

# ---------------------------
# 维护命令
# ---------------------------
clean:
	@echo "                                                                                "
	@echo "🧹 开始深度清理...                                                               "
	@echo "  删除: node_modules/ .next/ Docker卷                                           "
	@echo "                                                                                "
	rm -rf .next node_modules
	docker-compose -f $(DOCKER_COMPOSE) down --volumes
	@echo "                                                                                "
	@echo "✅ 清理完成!                                                                     "
	@echo "                                                                                "

check-app:
	@echo "                                                                                "
	@echo "🔍 检查应用状态...                                                               "
	@pm2 list | grep -q $(APP_NAME) && \
		echo "  [$(APP_NAME)] 正在运行" || \
		echo "  [$(APP_NAME)] 未运行"
	@echo "                                                                                "