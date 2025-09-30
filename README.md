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
