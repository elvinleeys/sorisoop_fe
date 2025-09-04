// NavItem 기본 이미지 데이터
const measureImg = {
  icon: '/icons/nav/ico_measure_inactive.svg',
  iconLabel: '소음 측정',
  activeIcon: '/icons/nav/ico_measure_active.svg',
};

const mapImg = {
  icon: '/icons/nav/ico_map_inactive.svg',
  iconLabel: '소음 지도',
  activeIcon: '/icons/nav/ico_map_active.svg',
};

const saveImg = {
  icon: '/icons/nav/ico_save_inactive.svg',
  iconLabel: '저장',
  activeIcon: '/icons/nav/ico_save_active.svg',
};

// NavList 아이템 예제
export const navItems = [
  { href: '/', label: '소음 측정', img: measureImg },
  { href: '/history', label: '소음 지도', img: mapImg },
  { href: '/save', label: '저장', img: saveImg },
];