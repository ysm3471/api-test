#!/bin/bash
cd ~/api-test

# 최신 코드 가져오기
git fetch origin main
git reset --hard origin/main

# 의존성 설치
npm ci --omit=dev

# PM2 재시작
pm2 reload ecosystem.config.js --only index --update-env
