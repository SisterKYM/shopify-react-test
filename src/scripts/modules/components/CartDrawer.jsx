import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'

const CartDrawer = () => {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const fetchCart = async () => {
			setLoading(true)
			try {
				const res = await fetch('/cart.js')
				const cart = await res.json()
				setItems(cart.items)
			} catch (error) {}
			setLoading(false)
		}

		fetchCart()
	}, [])

	const updateItem = async (id, quantity) => {
		const res = await fetch('/cart/change.js', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				line: id,
				quantity,
			}),
		})
		const cart = await res.json()
		setItems(cart.items)
	}

	if (loading) return null

	return (
		<div class='drawer'>
			<div class='cart-drawer'>
				<div
					class='inner'
					role='dialog'
					aria-modal='true'
					aria-label='Your cart'
					tabindex='-1'
				>
					{items.length > 0 ? (
						<>
							<h2>Your cart</h2>

							<ul>
								{items.map((item, i) => (
									<CartItem
										key={item.id}
										item={item}
										index={i}
										updateItem={updateItem}
									/>
								))}
							</ul>
							<div>
								<div>
									<div>
										<div>
											<h4>
												Subtotal: $
												{items.reduce((acc, item) => {
													return (
														acc +
														(item.price / 100) *
															item.quantity
													)
												}, 0)}
											</h4>
										</div>

										<small>
											Taxes and shipping calculated at
											checkout
										</small>
									</div>
									<div>
										<a
											className='button button--full-width'
											href='/checkout'
										>
											Check out
										</a>
									</div>
								</div>
							</div>
						</>
					) : (
						<>
							<h2 className='empty-title'>Your cart is empty</h2>
							<a href='/collections/all' class='button'>
								Continue shopping
							</a>
						</>
					)}

					<button
						className='close-cart drawer__close'
						type='button'
						aria-label='Close'
						onClick={() =>
							document
								.querySelector('#react-cart')
								.classList.remove('react-cart--open')
						}
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							aria-hidden='true'
							focusable='false'
							role='presentation'
							class='icon icon-close'
							fill='none'
							viewBox='0 0 18 17'
						>
							<path
								d='M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z'
								fill='currentColor'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartDrawer