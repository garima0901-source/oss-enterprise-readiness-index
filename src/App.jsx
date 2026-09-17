import Hero from './components/Hero'
import HubGrowthChart from './components/HubGrowthChart'
import RoboticsShift from './components/RoboticsShift'
import EnterpriseFeatures from './components/EnterpriseFeatures'
import SelfCheck from './components/SelfCheck'
import Closing from './components/Closing'
import Footer from './components/Footer'

const GITHUB_URL = 'https://github.com/garima0901-source/oss-enterprise-readiness-index'
const LINKEDIN_URL = 'https://www.linkedin.com/in/garima-1676141b4/'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Hero />
      <main>
        <HubGrowthChart />
        <RoboticsShift />
        <EnterpriseFeatures />
        <SelfCheck />
      </main>
      <Closing />
      <Footer githubUrl={GITHUB_URL} linkedinUrl={LINKEDIN_URL} />
    </div>
  )
}
