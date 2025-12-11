[root@srv1137148 ~]# cd /opt/voice-ai-service
[root@srv1137148 voice-ai-service]# micro retell.py
[root@srv1137148 voice-ai-service]# pm2 restart voice-ai-service
Use --update-env to update environment variables
[PM2] Applying action restartProcessId on app [voice-ai-service](ids: [ 0 ])
[PM2] [voice-ai-service](0) ✓
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 2  │ evolution-api      │ fork     │ 10   │ online    │ 0%       │ 172.7mb  │
│ 0  │ voice-ai-service   │ fork     │ 260  │ online    │ 0%       │ 5.2mb    │
│ 6  │ wa-ai-service      │ fork     │ 12   │ online    │ 0%       │ 90.7mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
[root@srv1137148 voice-ai-service]# pm2 logs voice-ai-service
[TAILING] Tailing last 15 lines for [voice-ai-service] process (change the value with --lines option)
/opt/voice-ai-service/logs/out-0.log last 15 lines:
0|voice-ai | 2025-12-10 22:04:16: INFO:     152.231.143.16:52152 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:05: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:05: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:07: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:07: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:10: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:10: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:13: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:13: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:16: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:16: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:19: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:19: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:22: INFO:     152.231.143.16:9167 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai | 2025-12-10 22:06:22: INFO:     152.231.143.16:9168 - "GET /api/retell/queue-status HTTP/1.1" 200 OK

/opt/voice-ai-service/logs/error-0.log last 15 lines:
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-11 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-12 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-13 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-14 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-15 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-16 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-17 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-18 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:🔧 Worker-19 ready
0|voice-ai | 2025-12-10 22:07:01: INFO:queue_manager:✅ 20 workers started
0|voice-ai | 2025-12-10 22:07:01: INFO:     Started server process [861281]
0|voice-ai | 2025-12-10 22:07:01: INFO:     Waiting for application startup.
0|voice-ai | 2025-12-10 22:07:01: INFO:httpx:HTTP Request: GET http://31.97.210.100:3000/mcp/health "HTTP/1.1 200 OK"
0|voice-ai | 2025-12-10 22:07:01: INFO:     Application startup complete.
0|voice-ai | 2025-12-10 22:07:01: INFO:     Uvicorn running on http://0.0.0.0:8500 (Press CTRL+C to quit)

0|voice-ai-service  | 2025-12-10 22:07:10: ✅ WhatsApp conectado
0|voice-ai-service  | 2025-12-10 22:07:10: ✅ Servicio de WhatsApp inicializado
0|voice-ai-service  | 2025-12-10 22:07:10: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:10: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:10: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:10: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:12: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:12: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:15: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:15: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:18: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:18: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:21: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:21: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:22: INFO:     152.231.143.16:8399 - "POST /api/retell/batch-classify HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:22: INFO:retell:🕵️‍♂️ Starting batch classification for 1 numbers (Background)
0|voice-ai-service  | 2025-12-10 22:07:22: INFO:retell:🕵️‍♂️ Classifying: +50686951614
0|voice-ai-service  | 2025-12-10 22:07:22: INFO:retell:🚀 Classification initiated for +50686951614
0|voice-ai-service  | 2025-12-10 22:07:24: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:24: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:27: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:27: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:30: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:30: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:33: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:33: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:36: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:36: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:39: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:39: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:42: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:42: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:45: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:45: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:48: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:48: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:51: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:51: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:54: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:54: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:57: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:07:57: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:08:00: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:08:00: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:08:03: INFO:     152.231.143.16:8399 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
0|voice-ai-service  | 2025-12-10 22:08:03: INFO:     152.231.143.16:54032 - "GET /api/retell/queue-status HTTP/1.1" 200 OK
^C
[root@srv1137148 voice-ai-service]#