import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, TrendingDown, Star, MessageSquare, AlertTriangle, Users, Download, Calendar, BarChart3, CheckCircle, Truck, RefreshCw, Trophy, Activity, Smartphone, Building2, DollarSign, CreditCard, Banknote, Landmark } from 'lucide-react'
import './App.css'

// Import data
import ionAppData from './assets/ion_itau_app_data.json'
import ionReviews from './assets/ion_itau_reviews.json'
import toroAppData from './assets/toro_app_data.json'
import ricoAppData from './assets/rico_app_data.json'
import xpAppData from './assets/xp_investimentos_app_data.json'
import nuAppData from './assets/nu_invest_app_data.json'
import btgAppData from './assets/btg_pactual_app_data.json'
import interAppData from './assets/banco_inter_app_data.json'

function App() {
  const [activeTab, setActiveTab] = useState('overview')
  const [darkMode, setDarkMode] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // App colors based on PDF
  const appColors = {
    'Ion Itaú': '#8B5CF6',
    'Toro': '#3B82F6',
    'Rico': '#10B981',
    'XP Investimentos': '#8B5CF6',
    'Nubank': '#F59E0B',
    'Banco Inter': '#EF4444',
    'BTG Pactual': '#1E40AF'
  }

  // App icons mapping
  const appIcons = {
    'Ion Itaú': BarChart3,
    'Toro': TrendingUp,
    'Rico': DollarSign,
    'XP Investimentos': Building2,
    'Nubank': CreditCard,
    'Banco Inter': Landmark,
    'BTG Pactual': Banknote
  }

  // Prepare competitor data including Banco Inter
  const competitorData = [
    { 
      name: 'Ion Itaú', 
      score: ionAppData.score, 
      reviews: ionAppData.reviews, 
      installs: ionAppData.installs,
      color: appColors['Ion Itaú'],
      icon: appIcons['Ion Itaú'],
      tags: ['Iniciantes', 'Intermediários']
    },
    { 
      name: 'Toro', 
      score: toroAppData.score, 
      reviews: toroAppData.reviews, 
      installs: toroAppData.installs,
      color: appColors['Toro'],
      icon: appIcons['Toro'],
      tags: ['Iniciantes', 'Baixo custo']
    },
    { 
      name: 'Rico', 
      score: ricoAppData.score, 
      reviews: ricoAppData.reviews, 
      installs: ricoAppData.installs,
      color: appColors['Rico'],
      icon: appIcons['Rico'],
      tags: ['Iniciantes', 'Interface intuitiva']
    },
    { 
      name: 'XP Investimentos', 
      score: xpAppData.score, 
      reviews: xpAppData.reviews, 
      installs: xpAppData.installs,
      color: appColors['XP Investimentos'],
      icon: appIcons['XP Investimentos'],
      tags: ['Intermediários', 'Avançados']
    },
    { 
      name: 'Nubank', 
      score: nuAppData.score, 
      reviews: nuAppData.reviews, 
      installs: nuAppData.installs,
      color: appColors['Nubank'],
      icon: appIcons['Nubank'],
      tags: ['Banco Digital', 'Para iniciantes']
    },
    { 
      name: 'Banco Inter', 
      score: interAppData.score, 
      reviews: interAppData.reviews, 
      installs: interAppData.installs,
      color: appColors['Banco Inter'],
      icon: appIcons['Banco Inter'],
      tags: ['Banco Digital', 'Super App']
    },
    { 
      name: 'BTG Pactual', 
      score: btgAppData.score, 
      reviews: btgAppData.reviews, 
      installs: btgAppData.installs,
      color: appColors['BTG Pactual'],
      icon: appIcons['BTG Pactual'],
      tags: ['Intermediário', 'Avançado', 'Assessoria']
    }
  ]

  // Process reviews data for charts
  const processReviewsData = () => {
    const reviewsByScore = [1, 2, 3, 4, 5].map(score => ({
      score: `${score} estrela${score > 1 ? 's' : ''}`,
      count: ionReviews.filter(review => review.score === score).length,
      percentage: Math.round((ionReviews.filter(review => review.score === score).length / ionReviews.length) * 100)
    }))

    const recentReviews = ionReviews
      .slice(0, 10)
      .map(review => ({
        ...review,
        at: new Date(review.at).toLocaleDateString('pt-BR')
      }))

    return { reviewsByScore, recentReviews }
  }

  const { reviewsByScore, recentReviews } = processReviewsData()

  // Colors for pie chart
  const PIE_COLORS = ['#10B981', '#34D399', '#F59E0B', '#FF6B35', '#EF4444']

  // Get app version from the most recent review
  const getAppVersion = () => {
    const recentReview = ionReviews.find(review => review.appVersion)
    return recentReview ? recentReview.appVersion : '2.80.0'
  }

  // Handle data update
  const handleUpdateData = async () => {
    setIsUpdating(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLastUpdate(new Date())
    setIsUpdating(false)
  }

  // Calculate ranking position
  const sortedApps = [...competitorData].sort((a, b) => b.score - a.score)
  const ionRanking = sortedApps.findIndex(app => app.name === 'Ion Itaú') + 1

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} pdf-theme`}>
      <div className="min-h-screen bg-gray-50">
        {/* Header with purple gradient */}
        <header className="purple-gradient relative overflow-hidden">
          <div className="container mx-auto px-6 py-12 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="bg-white/20 p-3 rounded-2xl">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">Notas dos Aplicativos de Investimentos</h1>
                  <p className="text-white/90 text-lg">Análise comparativa das avaliações na Google Play Store Brasil</p>
                  <p className="text-white/70 text-sm mt-1">Google Play Brasil | 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleUpdateData}
                  disabled={isUpdating}
                  className="update-button"
                >
                  <RefreshCw className={`h-4 w-4 ${isUpdating ? 'loading-spinner' : ''}`} />
                  {isUpdating ? 'Atualizando...' : 'Atualizar Dados'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDarkMode(!darkMode)}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                >
                  {darkMode ? '☀️' : '🌙'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full transform -translate-x-16 translate-y-16"></div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          {/* Ranking Section */}
          <section className="mb-12">
            <h2 className="section-title">
              <Trophy className="h-6 w-6" />
              Ranking dos Melhores Aplicativos
            </h2>
            <p className="text-gray-600 mb-8">
              Conheça o ranking atualizado dos melhores aplicativos de investimentos no Brasil, 
              levando em consideração notas, número de avaliações e perfil do investidor.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedApps.slice(0, 6).map((app, index) => {
                const IconComponent = app.icon
                return (
                  <div key={app.name} className="pdf-card">
                    <div className="app-card" style={{ background: app.color }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-white/20 p-2 rounded-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">#{index + 1}</div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2">{app.name}</h3>
                      
                      <div className="star-rating mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(app.score) ? 'star-filled' : 'star-empty'}`} 
                          />
                        ))}
                        <span className="text-white font-bold ml-2">{app.score.toFixed(1)}</span>
                      </div>
                      
                      <p className="text-white/90 text-sm mb-3">
                        Mais de {Math.floor(app.reviews / 1000)}K avaliações
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {app.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className="profile-tag bg-white/20 text-white text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Ion Itaú Highlight Section */}
          <section className="mb-12">
            <h2 className="section-title">
              <Smartphone className="h-6 w-6" />
              Análise de Destaque: Ion Itaú
            </h2>
            <p className="text-gray-600 mb-8">
              Detalhamento do aplicativo Ion Itaú na Google Play Store Brasil
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Main Ion Card */}
              <div className="lg:col-span-2">
                <div className="pdf-card">
                  <div className="app-card app-ion">
                    <div className="flex items-center justify-between mb-6">
                      <div className="bg-white/20 p-3 rounded-xl">
                        <BarChart3 className="h-8 w-8 text-white" />
                      </div>
                      <Badge className="bg-white/20 text-white border-white/30">
                        v{getAppVersion()}
                      </Badge>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white mb-4">Ion Itaú</h3>
                    
                    <div className="star-rating mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < Math.floor(ionAppData.score) ? 'star-filled' : 'star-empty'}`} 
                        />
                      ))}
                      <span className="text-white font-bold text-xl ml-3">{ionAppData.score.toFixed(1)}</span>
                    </div>
                    
                    <p className="text-white/90 text-lg mb-4">
                      +{Math.floor(ionAppData.reviews / 1000)}K avaliações
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Ideal para iniciantes</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Interface simplificada</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/90">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Recursos educativos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Cards */}
              <div className="space-y-6">
                <div className="metric-card">
                  <div className="metric-number text-purple-600">{ionAppData.score.toFixed(1)}</div>
                  <div className="metric-label">Nota Média</div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-number text-blue-600">#{ionRanking}</div>
                  <div className="metric-label">Posição Ranking</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="metric-card">
                  <div className="metric-number text-green-600">{Math.floor(ionAppData.reviews / 1000)}K</div>
                  <div className="metric-label">Avaliações</div>
                </div>
                
                <div className="metric-card">
                  <div className="metric-number text-orange-600">{ionAppData.installs}</div>
                  <div className="metric-label">Downloads</div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparative Analysis */}
          <section className="mb-12">
            <h2 className="section-title">
              <BarChart3 className="h-6 w-6" />
              Comparativo de Notas e Avaliações
            </h2>
            <p className="text-gray-600 mb-8">
              Análise detalhada das avaliações dos principais aplicativos de investimentos na Google Play Store Brasil
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="pdf-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Avaliações na Google Play (em estrelas)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={competitorData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 12 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={100} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }} 
                      />
                      <Bar 
                        dataKey="score" 
                        fill={(entry) => entry.color}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reviews Distribution */}
              <div className="pdf-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribuição de Avaliações - Ion Itaú</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={reviewsByScore}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ score, percentage }) => `${score.split(' ')[0]}★: ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {reviewsByScore.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* Comments Section */}
          <section className="mb-8">
            <h2 className="section-title">
              <MessageSquare className="h-6 w-6" />
              Comentários Recentes dos Usuários
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Comments */}
              <div className="lg:col-span-2">
                <div className="pdf-card p-6">
                  <div className="space-y-4">
                    {recentReviews.slice(0, 5).map((review, index) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-4 py-3 bg-purple-50 rounded-r-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(review.score)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{review.content}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{review.at}</span>
                          <Badge variant={review.score >= 4 ? 'default' : review.score >= 3 ? 'secondary' : 'destructive'}>
                            {review.score >= 4 ? 'Positivo' : review.score >= 3 ? 'Neutro' : 'Negativo'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analysis Summary */}
              <div className="pdf-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Análise Comparativa</h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-1">4,2</div>
                    <div className="text-sm text-gray-600">Média Geral</div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Destaques da análise:</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• XP Investimentos lidera em avaliação média (4.8)</li>
                      <li>• Banco Inter possui o maior número de avaliações</li>
                      <li>• Toro destaca-se como o melhor app para iniciantes</li>
                      <li>• Apps com nota acima de 4.5 são considerados excelentes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="text-center py-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
              Fonte: Google Play Store Brasil | Junho 2025
            </p>
            <p className="text-xs text-gray-400">
              Última atualização: {lastUpdate.toLocaleString('pt-BR')}
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

