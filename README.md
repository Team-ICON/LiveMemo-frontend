
## 프로젝트에 대한 설명

유저간 실시간 공유 메모 입니다.

유저 간 실시간 메모를 작성하며 음성으로도 커뮤니케이션을 할 수 있도록 구현하였습니다.

#### 데모 및 설명영상 ([바로가기](https://youtu.be/pimv_s9vUPc))

#### 폴더

유저 간 같은 메모를 공유하고 있더라도, 각 유저는 유저별 개인이 설정한 폴더에 해당 메모를 저장할 수 있습니다.

#### 음성통화

메모 화면에서 우측 상단의 마이크를 누르면 해당 메모에 접속 중인 유저와 음성통화가 가능합니다.

#### bookmark

메모 화면에서 메모는 가장 최근에 수정된 순으로 정렬되지만 메모를 북마크 등록하면 해당 메모는 최 상단에 고정됩니다.

#### 유저초대

gmail로 다른 유저와 메모를 공유할 수 있습니다.

- backend 링크

- frontend 링크

- Key word

Webrtc, WebSocket, CRDT, React, Node js, PWA

- 사용기술, 사용한 라이브러리 및 그에 대한 설명

Signaling Server 에서 Client 간 통신이 가능하도록 하였음 (signaling server에서는 어떤 데이터들이 오가는지)

Client간 어떤 프로토콜로 통신하게 하는지. sctp?udp?

PWA + Service Worker를 통해 온/오프라인 상태에서 app push 가능토록 구현

- 개선 여지가 있는 부분 

----------------------------------------------------------------------------------------------------------------------------------------------------

# 기술 problem & solving (계속 추가)

## 실시간 데이터 동시성 처리: CRDT vs OT

- OT(Operational Transformation): 중앙 서버에서 변경사항 처리하여 모두 같은 데이터 볼 수 있도록 함

- CRDT(Conflict-Free-Replicated Data Types): 동시성 충돌을 막기 위한 새로운 자료 구조 도입, 최신 스타일

- OT는 구현이 복잡하며, 중앙 서버의 역할이 큼(google docs 등) --> 최신 기술이고, 상대적으로 단순한 로직을 가진 CRDT를 적용한 라이브러리 활용

## 클라이언트 연결 방식: webRTC vs websocket

- websocket: 클라이언트가 서버와 웹소켓 방식으로 연결, 안정적, 중앙 서버역할 중요, 비교적 느림

- webRTC: 클라이언트끼리 p2p 연결 --> 빠름, 비교적 불안정, 음성/영상 스트림 강점, 서버 부담 적음

- 실시간성(공유 메모 타이핑 딜레이 최소화), 음성연결, 적은 서버 부담에 초점을 맞추어 webRTC 적용

## 공유 데이터 관리

- 공유자원을 관리하기 용이하도록 운영체제 파일시스템의 아이노드 링크 참조 개념을 활용하여 DB구조 설계

- 공유자원 특성에 맞추어 개인별 관리 데이터(디렉토리 형식) 구현

## 라이브러리 수정

- 우리의 현 서비스 상황에 맞춰 사용할 수 있도록 Yjs/y-webrtc 라이브러리 수정하여 사용

1) Room 생성시 유저ID로 관리

2) 음성 stream을 추가하여 실시간 음성 대화 가능하게 함

## 로그인, app push(+service worker), 배포(https) 추가 어떤지..
![livememo_최최종](https://user-images.githubusercontent.com/18034609/145803684-7e1c15fc-b437-413e-84ae-5958ef0631e0.png)
