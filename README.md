# 소리숲 Frontend

## 🛠 Tech Stack

### Languages
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

### Frameworks
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white)

### Libraries
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=reactquery&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=zustand&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-000000?style=flat&logoColor=white)
![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-000000?style=flat&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white)
![soridam-design-system](https://img.shields.io/badge/soridam--design--system-FF66CC?style=flat&logoColor=white)

### Tools
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
![Cross-env](https://img.shields.io/badge/cross--env-000000?style=flat&logoColor=white)


## 개선 사항
### 2025.09.29
- modal 관련 전역 상태관리 store 통합
- modal을 unifiedModalRenderer 컴포넌트로 통합하여 랜더링

### 2025.09.30
- soridam-design-system의 NavList에 z-index를 부여하고 div태그를 제거함으로써 DOM Depth를 줄임
- MainHeader에 screen Reader 전용 h1 태그 추가
- CurrentLocationDisplay의 location api 관련 fetch함수 모듈화 및 response type 추가
- avgDecibel의 평균 계산 최적화를 위해 지수이동평균 적용
- chart의 경과시간 관련 로직을 timer hook으로 분리함으로써 UI랜더링과 상태관리 책임 분리
- Fade animation 관련 FadeInUp 컴포넌트로 구현
- 소음 측정 화면의 상태별 button 구성정보를 object로 관리

### 2025.10.01
- 소음 측정 데이터가 들어오지 않을시 main 페이지로 redirect하는 useEnsureMeasurement 구현하여 RegisterMap과 RegisterForm에서 반복적으로 데이터가 없을시 redirection하는 함수를 제거하고 페이지에서 통합 관리
- 측정 시 사용되는 함수와 여러 경로(/map, /register)에서 avgDecibel로부터 level이나 img경로를 가져오는 함수가 반복됨에따라 overloading으로 변경
-  filter의 option data를 관리하는 store에 temp 도입
- /map의 MapHeader에서 /map/search로 이동하는 페이지 전환을 보다 빠르게 하기 위해 prefetch도입
- 초기 지도 랜더링시 사용하는 /api/map과 필터적용시 사용되는 /api/map/with-measurement를 통합
- /map/search의 입력시마다 과도한 fetching을 막기 위해 debounce 도입
- /search, placeDetailSheet, /map 관련 fetch함수 모듈화 및 response dto 설정

### 2025.10.02
- SideBar의 메뉴가 전부 준비되지 않아 menu를 map/object로 분리하고, SideBarItem 컴포넌트를 만들어 유지보수성을 높임
- /save page의 데이터 fetching함수를 "loading" | "guest" | "empty" | "data" 와 같이 enum형태로 정리 및 fetch함수를 커스텀 훅함수로 추출
- /save/[id] 페이지의 데이터 fetch함수 커스텀 hook 함수로 추출 및 dto 정의
- 로그인의 미지원 서비스에 대한 toast 알림 추가
- 로그인의 fetch함수를 모듈화

### 2025.10.03
- 회원가입 유효성 검사 모듈화
- SignUpHeader의 stepMap 정리 및 뒤로가기 버튼 로직 정리
- 이메일 중복 체크 관련 fetch 함수 모듈화/Response DTO 정의
- 회원가입 fetch함수 모듈화 및 Response DTO 정의

### 2025.10.04
- 로그아웃 및 회원탈퇴 관련 fetch함수 모듈화
- getUserFromToken의 user 및 err에 대한 any type 제거
- 소음 데이터 list관련 fetch함수 내 err의 any type 제거
- placeDetailSheet관련 api route의 err any type 제거
- 소음데이터 삭제 관련 response dto 설정
- 소음데이터 list관련 response dto 설정
- 소음데이터 등록 관련 fetch함수 모듈화
- 소음데이터 삭제 관련 fetch함수 모듈화
- ReactQuery 도입 준비 및 QueryClientProvider 컴포넌트화

### 2025.10.05 및 2025.10.07
- 각 서비스 화면의 ReactQuery 도입

### 2025.10.09
- 성능 평가 진행 후 `font-display: swap` 적용
- 관련 설명: https://velog.io/@herjun802/lightHouse%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%84%B1%EB%8A%A5-%ED%8F%89%EA%B0%80-%EB%B0%8F-font-display

### 2025.10.12
- css purge 적용

### 2025.10.13
- UnifiedModalRenderer, FilterBottomSheet, ToastContainer, PlaceDetailSheet 컴포넌트에 대해 dynamic Import 적용
- Pretendard 글꼴을 기본 woff2형식에서 subset 형식으로 전환
- map에 대한 prefetch 및 fetch priority = high 적용

### 2025.10.14
- sideBar에 대한 dynamic import 적용
- /save 경로에 대한 기존 SaveMain컴포넌트에서 로그인 유저인지 data가 존재하는지에 따라 조건부랜더링으로 보여주었다면 accessToken을 활용해 parallel 구조로 변경
- Loading 컴포넌트 도입
