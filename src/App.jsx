import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [totalVolume, setTotalVolume] = useState('')
  const [totalReward, setTotalReward] = useState('')
  const [myVolume, setMyVolume] = useState('')
  const [rewardCoin, setRewardCoin] = useState('BTC')
  const [coinPrice, setCoinPrice] = useState(null)
  const [priceLoading, setPriceLoading] = useState(false)
  const [lastPriceUpdate, setLastPriceUpdate] = useState(null)
  const [calculatedReward, setCalculatedReward] = useState(null)
  const [error, setError] = useState('')

  // 常用币种列表
  const popularCoins = ['BTC', 'ETH', 'BNB', 'ADA', 'DOT', 'SOL', 'MATIC', 'AVAX', 'LINK', 'UNI']

  // 获取币种价格
  const fetchCoinPrice = async (symbol) => {
    if (!symbol || symbol.trim() === '') {
      setError('请输入有效的币种符号')
      return
    }
    
    setPriceLoading(true)
    setError('')
    
    try {
      const cleanSymbol = symbol.trim().toUpperCase()
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cleanSymbol}USDT`)
      
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(`币种 ${cleanSymbol} 不存在或未在币安交易所上市`)
        } else {
          throw new Error(`网络错误 (${response.status}): 请检查网络连接`)
        }
      }
      
      const data = await response.json()
      const price = parseFloat(data.price)
      
      if (isNaN(price) || price <= 0) {
        throw new Error('获取到的价格数据无效')
      }
      
      setCoinPrice(price)
      setLastPriceUpdate(new Date())
      setError('') // 清除之前的错误
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('网络连接失败，请检查网络设置')
      } else {
        setError(err.message)
      }
      setCoinPrice(null)
    } finally {
      setPriceLoading(false)
    }
  }

  // 当币种改变时自动获取价格
  const handleCoinChange = (newCoin) => {
    setRewardCoin(newCoin)
    fetchCoinPrice(newCoin)
  }

  // 组件加载时获取默认币种价格
  useEffect(() => {
    fetchCoinPrice(rewardCoin)
  }, [])

  // 计算奖励的核心函数
  const calculateReward = () => {
    setError('')
    
    // 输入验证
    const total = parseFloat(totalVolume)
    const reward = parseFloat(totalReward)
    const my = parseFloat(myVolume)
    
    if (isNaN(total) || isNaN(reward) || isNaN(my)) {
      setError('请输入有效的数字')
      return
    }
    
    if (total <= 0 || reward <= 0 || my < 0) {
      setError('总交易量和总奖励必须大于0，个人交易量不能为负数')
      return
    }
    
    if (my > total) {
      setError('个人交易量不能超过总交易量')
      return
    }
    
    // 计算个人奖励 = (个人交易量 / 总交易量) * 总奖励
    const myReward = (my / total) * reward
    setCalculatedReward(myReward)
  }

  const resetForm = () => {
    setTotalVolume('')
    setTotalReward('')
    setMyVolume('')
    setRewardCoin('BTC')
    setCoinPrice(null)
    setLastPriceUpdate(null)
    setCalculatedReward(null)
    setError('')
  }

  // 格式化时间显示
  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    })
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>🏆 币安交易活动奖励计算器</h1>
          <p>根据总交易量、总奖励和个人交易量计算您的奖励份额</p>
        </header>
        
        <div className="calculator-card">
          <div className="input-section">
            <div className="input-group">
              <label htmlFor="totalVolume">总交易量 (USDT)</label>
              <input
                id="totalVolume"
                type="number"
                value={totalVolume}
                onChange={(e) => setTotalVolume(e.target.value)}
                placeholder="请输入活动总交易量"
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="rewardCoin">奖励币种</label>
              <div className="coin-input-container">
                <input
                  id="rewardCoin"
                  type="text"
                  value={rewardCoin}
                  onChange={(e) => setRewardCoin(e.target.value.toUpperCase())}
                  placeholder="输入币种符号 (如: BTC)"
                  className="coin-input"
                />
                <button 
                  type="button" 
                  className="price-btn"
                  onClick={() => fetchCoinPrice(rewardCoin)}
                  disabled={priceLoading || !rewardCoin}
                >
                  {priceLoading ? '获取中...' : '获取价格'}
                </button>
              </div>
              <div className="popular-coins">
                {popularCoins.map(coin => (
                  <button
                    key={coin}
                    type="button"
                    className={`coin-tag ${rewardCoin === coin ? 'active' : ''}`}
                    onClick={() => handleCoinChange(coin)}
                  >
                    {coin}
                  </button>
                ))}
              </div>
              {coinPrice && (
                <div className="price-display">
                  <div className="price-info">
                    💰 当前价格: ${coinPrice.toLocaleString()} USDT
                  </div>
                  {lastPriceUpdate && (
                    <div className="price-time">
                      更新时间: {formatTime(lastPriceUpdate)}
                      <button 
                        type="button" 
                        className="refresh-btn"
                        onClick={() => fetchCoinPrice(rewardCoin)}
                        disabled={priceLoading}
                        title="刷新价格"
                      >
                        🔄
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="input-group">
              <label htmlFor="totalReward">总奖励池 ({rewardCoin} 数量)</label>
              <input
                id="totalReward"
                type="number"
                value={totalReward}
                onChange={(e) => setTotalReward(e.target.value)}
                placeholder={`请输入活动总 ${rewardCoin} 奖励数量`}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="myVolume">我的交易量 (USDT)</label>
              <input
                id="myVolume"
                type="number"
                value={myVolume}
                onChange={(e) => setMyVolume(e.target.value)}
                placeholder="请输入您的交易量"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="button-group">
            <button 
              className="calculate-btn" 
              onClick={calculateReward}
              disabled={!totalVolume || !totalReward || !myVolume}
            >
              💰 计算奖励
            </button>
            <button className="reset-btn" onClick={resetForm}>
              🔄 重置
            </button>
          </div>
          
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
          
          {calculatedReward !== null && !error && (
            <div className="result-section">
              <h3>🎯 计算结果</h3>
              <div className="result-grid">
                <div className="result-item">
                  <span className="result-label">交易占比</span>
                  <span className="result-value">{((parseFloat(myVolume) / parseFloat(totalVolume)) * 100).toFixed(4)}%</span>
                </div>
                <div className="result-item">
                  <span className="result-label">每100U奖励</span>
                  <span className="result-value">{((parseFloat(totalReward) / parseFloat(totalVolume)) * 100).toFixed(6)} {rewardCoin}</span>
                  {coinPrice && (
                    <span className="result-usdt">≈ ${(((parseFloat(totalReward) / parseFloat(totalVolume)) * 100) * coinPrice).toFixed(2)} USDT</span>
                  )}
                </div>
                <div className="result-item highlight">
                  <span className="result-label">我的奖励</span>
                  <span className="result-value">{calculatedReward.toFixed(6)} {rewardCoin}</span>
                  {coinPrice && (
                    <span className="result-usdt">≈ ${(calculatedReward * coinPrice).toFixed(2)} USDT</span>
                  )}
                </div>
              </div>
              <div className="formula">
                <p>💡 计算公式:</p>
                <p>• 交易占比 = (我的交易量 ÷ 总交易量) × 100%</p>
                <p>• 每100U奖励 = (总奖励池 ÷ 总交易量) × 100</p>
                <p>• 我的奖励 = (我的交易量 ÷ 总交易量) × 总奖励池</p>
                {coinPrice && (
                  <p>• USDT价值 = {rewardCoin}数量 × 当前价格 (${coinPrice})</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <footer className="footer">
          <p>💡 计算公式: 个人奖励 = (个人交易量 ÷ 总交易量) × 总奖励池 | 每100U奖励 = (总奖励池 ÷ 总交易量) × 100</p>
        </footer>
      </div>
    </div>
  )
}

export default App
