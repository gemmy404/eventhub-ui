import eventHubLogo from '../../assets/eventhub-logo.png'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner container">
        <div className="site-footer__brand">
          <img src={eventHubLogo} alt="EventHub" />
          <p>A simpler way to discover, share, and experience the events that matter.</p>
        </div>
        <p className="site-footer__copyright">© 2026 EventHub. All rights reserved.</p>
      </div>
    </footer>
  )
}
