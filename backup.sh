#!/bin/bash
BACKUP_DIR=/path/to/backups
DATE=$(date +%Y%m%d)

# 创建备份目录
mkdir -p $BACKUP_DIR

# MySQL 备份
docker exec mysql8 mysqldump -uroot -p123456 --single-transaction --routines lilming > $BACKUP_DIR/lilming_$DATE.sql

# 压缩备份（保留7天）
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
gzip $BACKUP_DIR/lilming_$DATE.sql


# 添加定时任务
# chmod +x backup.sh
# crontab -e
# 添加以下内容（每天凌晨3点备份）：
# 0 3 * * * /path/to/backup.sh