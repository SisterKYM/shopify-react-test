import React from 'react'

const CartItem = (props) => {
	const { item, index, updateItem } = props

	return (
		<li>
			<img
				src={item.image}
				alt={item.title}
				width='150'
				height='150'
			/>
			<div>
				<h3>
					<a href={`/products/${item.handle}`}>{item.title}</a>
				</h3>
				<div>{item.variant_title}</div>
				<div className='drawer-quantity'>
					<button
						onClick={() => {
							updateItem(index + 1, item.quantity - 1)
						}}
					>
						-
					</button>
					<input
						type='number'
						value={item.quantity}
						onChange={(e) => {
							updateItem(index + 1, e.target.value)
						}}
					/>

					<button
						onClick={() => {
							updateItem(index + 1, item.quantity + 1)
						}}
					>
						+
					</button>
				</div>
				<button
					className='remove-item'
					onClick={() => {
						updateItem(index + 1, 0)
					}}
				>
					<small>Remove</small>
				</button>
			</div>
			<div>${(item.price / 100) * item.quantity}</div>
		</li>
	)
}

export default CartItem