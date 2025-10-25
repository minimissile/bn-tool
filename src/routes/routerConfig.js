// 统一的路由命名与路径常量
export const RouteNames = {
  Home: 'Home',
  Tools: 'Tools',
  RewardCalculator: 'RewardCalculator',
  PriceQuery: 'PriceQuery',
  Login: 'Login',
  Unauthorized: 'Unauthorized',
  NotFound: 'NotFound',
}

export const Paths = {
  Home: '/',
  Tools: '/tools',
  RewardCalculator: '/tools/reward-calculator',
  PriceQuery: '/tools/price-query',
  Login: '/auth/login',
  Unauthorized: '/auth/unauthorized',
  NotFound: '*',
}