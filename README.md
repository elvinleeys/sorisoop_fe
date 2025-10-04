# 소리숲 Frontend

## 2025.09.29
- modal 관련 전역 상태관리 store 통합
- modal을 unifiedModalRenderer 컴포넌트로 통합하여 랜더링

## 2025.09.30
- soridam-design-system의 NavList에 z-index를 부여하고 div태그를 제거함으로써 DOM Depth를 줄임
- MainHeader에 screen Reader 전용 h1 태그 추가
- CurrentLocationDisplay의 location api 관련 fetch함수 모듈화 및 response type 추가
- avgDecibel의 평균 계산 최적화를 위해 지수이동평균 적용
- chart의 경과시간 관련 로직을 timer hook으로 분리함으로써 UI랜더링과 상태관리 책임 분리
- Fade animation 관련 FadeInUp 컴포넌트로 구현
- 소음 측정 화면의 상태별 button 구성정보를 object로 관리

## 2025.10.01
- 소음 측정 데이터가 들어오지 않을시 main 페이지로 redirect하는 useEnsureMeasurement 구현하여 RegisterMap과 RegisterForm에서 반복적으로 데이터가 없을시 redirection하는 함수를 제거하고 페이지에서 통합 관리
- 측정 시 사용되는 함수와 여러 경로(/map, /register)에서 avgDecibel로부터 level이나 img경로를 가져오는 함수가 반복됨에따라 overloading으로 변경
-  filter의 option data를 관리하는 store에 temp 도입
- /map의 MapHeader에서 /map/search로 이동하는 페이지 전환을 보다 빠르게 하기 위해 prefetch도입
- 초기 지도 랜더링시 사용하는 /api/map과 필터적용시 사용되는 /api/map/with-measurement를 통합
- /map/search의 입력시마다 과도한 fetching을 막기 위해 debounce 도입
- /search, placeDetailSheet, /map 관련 fetch함수 모듈화 및 response dto 설정

## 2025.10.02
- SideBar의 메뉴가 전부 준비되지 않아 menu를 map/object로 분리하고, SideBarItem 컴포넌트를 만들어 유지보수성을 높임
- /save page의 데이터 fetching함수를 "loading" | "guest" | "empty" | "data" 와 같이 enum형태로 정리 및 fetch함수를 커스텀 훅함수로 추출
- /save/[id] 페이지의 데이터 fetch함수 커스텀 hook 함수로 추출 및 dto 정의
- 로그인의 미지원 서비스에 대한 toast 알림 추가
- 로그인의 fetch함수를 모듈화

## 2025.10.03
- 회원가입 유효성 검사 모듈화
- SignUpHeader의 stepMap 정리 및 뒤로가기 버튼 로직 정리
- 이메일 중복 체크 관련 fetch 함수 모듈화/Response DTO 정의
- 회원가입 fetch함수 모듈화 및 Response DTO 정의