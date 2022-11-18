import React from 'react'
import { createRoot } from 'react-dom/client'
import CartDrawer from './components/CartDrawer'
import './styles.css'

const ReactCart = () => {
	const container = document.getElementById('react-cart')
	const root = createRoot(container)
	root.render(<CartDrawer />)
}

export default ReactCart
