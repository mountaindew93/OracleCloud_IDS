# NETGUARD IDS

## AI 기반 실시간 네트워크 침입 탐지 시스템 (IDS)

---

# 1. 서비스 소개

## 프로젝트 개요

NETGUARD IDS는 머신러닝(Random Forest)을 활용하여 네트워크 트래픽을 실시간으로 분석하고 공격 여부를 탐지하는 AI 기반 침입 탐지 시스템입니다.

기존 IDS는 로그를 확인해야만 현재 상태를 파악할 수 있는 경우가 많습니다. 본 프로젝트는 탐지 결과를 실시간 Dashboard로 시각화하여 관리자가 현재 네트워크 보안 상태를 직관적으로 확인할 수 있도록 구현했습니다.

---

## 주요 기능

- 실시간 네트워크 트래픽 분석
- Random Forest 기반 공격 탐지
- 공격 유형 분류
- MySQL 데이터 저장
- FastAPI REST API 제공
- React Dashboard 실시간 시각화
- 공격 로그 조회
- 위험도(Risk Score) 계산
- 최근 공격 알림 제공

---

# 2. 사용 시나리오

### ① 패킷 수집

네트워크 트래픽(CSV 또는 패킷 데이터)을 수집합니다.

### ② 전처리

모델 입력 형식에 맞게 Feature를 정리합니다.

### ③ 머신러닝 예측

Random Forest 모델이

- Normal
- Attack

을 예측합니다.

### ④ DB 저장

예측 결과를 MySQL에 저장합니다.

### ⑤ REST API 제공

FastAPI가 Dashboard에 필요한 데이터를 제공합니다.

### ⑥ Dashboard

React Dashboard에서

- 총 트래픽
- 공격 비율
- 공격 유형
- 위험도
- 최근 공격

을 실시간으로 표시합니다.

---

# 3. 시스템 아키텍처

```
                    ┌─────────────────────────────┐
                    │      Network Traffic        │
                    │   (CSV / Packet Capture)    │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │    Data Preprocessing       │
                    │ Feature Selection / Scaling │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │ Random Forest AI Model      │
                    │ Attack Classification       │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │        MySQL Database       │
                    │ Prediction History          │
                    │ Notification Log            │
                    └──────────────┬──────────────┘
                                   │
                      REST API (FastAPI)
                                   │
                                   ▼
                    ┌─────────────────────────────┐
                    │ React Dashboard             │
                    │ Attack Logs                 │
                    │ System Monitoring           │
                    └─────────────────────────────┘
```

---

# 4. OCI 아키텍처

```
                     Oracle Cloud Infrastructure

                ┌──────────────────────────┐
                │      Public Internet      │
                └──────────────┬────────────┘
                               │
                     Public IP (HTTP)
                               │
                               ▼
                ┌──────────────────────────┐
                │ OCI Compute Instance     │
                │ Oracle Linux 8           │
                └──────────────┬────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
      Nginx                FastAPI              MySQL
  (Static React)         REST API          Prediction DB

                               │
                               ▼
                   Random Forest Prediction
```

---

# 5. 사용한 OCI 리소스

| Resource | 설명 |
| --- | --- |
| OCI Compute Instance | 프로젝트 서버 |
| Oracle Linux 8 | 운영체제 |
| Public IP | 외부 접속 |
| Virtual Cloud Network (VCN) | 네트워크 구성 |
| Internet Gateway | 외부 인터넷 연결 |
| Security List | 80 / 8000 포트 허용 |
| Nginx | React 정적 페이지 서비스 |
| FastAPI | REST API |
| MySQL | 데이터 저장 |

---

# 6. 설치 및 실행 방법

## 1) 프로젝트 Clone

```
git clone https://github.com/username/netguard-ids.gitcd netguard-ids
```

---

## 2) Python 가상환경

```
python-m venv venvsource venv/bin/activate
```

---

## 3) 패키지 설치

```
pip install-r requirements.txt
```

---

## 4) FastAPI 실행

```
uvicorn main:app--host0.0.0.0--port8000
```

---

## 5) React 실행

```
npm installnpm run dev
```

배포 시

```
npm run build
```

```
cp-r dist/* /var/www/ids/
```

---

## 6) Nginx

```
sudo systemctlrestart nginx
```

---

## 7) 서비스 접속

```
http://서버IP
```

---

# 7. 데이터 흐름

```
네트워크 트래픽

↓

CSV 생성

↓

전처리

↓

Random Forest 예측

↓

Prediction History 저장

↓

Notification 생성

↓

FastAPI API

↓

Dashboard 시각화
```

---

## 수집(Source)

- 네트워크 트래픽 CSV
- UNSW-NB15 Dataset

---

## 저장(Storage)

MySQL

- prediction_history
- notification_log

---

## 가공(Processing)

Random Forest

↓

Attack / Normal 분류

↓

Confidence 계산

↓

Risk Score 계산

↓

통계 생성

---

## 제공(Service)

FastAPI REST API

↓

JSON 반환

↓

React Dashboard

---

# 8. API 예시

```
GET /dashboard

GET /logs

GET /recent-attacks

GET /system

GET /model
```

---

# 9. 프로젝트 구조

```
ids_project

backend/
    api/
    services/
    models/

frontend/
    src/
        components/
        pages/
        charts/

dataset/

model/

nginx/

README.md
```

---

# 10. 한계점

현재 프로젝트는 다음과 같은 한계가 있습니다.

- 실제 Packet Capture 대신 CSV 기반 데이터 사용
- 단일 머신러닝(Random Forest) 모델 사용
- 단일 서버 구조
- 실시간 Stream 처리 미지원
- 사용자 인증 기능 없음
- 알림 기능 제한

---

# 11. 향후 개선 방향

향후에는 다음 기능을 추가할 예정입니다.

- 실시간 Packet Capture(libpcap, Scapy) 연동
- Kafka 기반 Streaming Pipeline 구축
- Redis Cache 적용
- WebSocket 기반 Dashboard 실시간 업데이트
- Docker 및 Kubernetes 배포
- GPU 기반 딥러닝 모델(LSTM, Transformer) 적용
- 이메일/Slack/Discord 알림 기능
- 사용자 인증 및 권한 관리(JWT)
- Elasticsearch + Kibana 연동
- OCI Load Balancer를 활용한 이중화

---

# 12. 기술 스택

| 분야 | 사용 기술 |
| --- | --- |
| Language | Python, JavaScript |
| Backend | FastAPI |
| Frontend | React, Chart.js |
| AI | Scikit-learn (Random Forest) |
| Database | MySQL |
| Web Server | Nginx |
| Cloud | Oracle Cloud Infrastructure (OCI) |
| OS | Oracle Linux 8 |
| Version Control | Git, GitHub |