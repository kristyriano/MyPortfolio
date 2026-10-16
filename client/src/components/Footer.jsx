// Footer: shown at the bottom of every page
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p>© {currentYear} Kristy Riano. Built with React.</p>
    </footer>
  )
}

export default Footer
