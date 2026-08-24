"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	ArrowLeft,
	Package,
	MapPin,
	CreditCard,
	Printer,
	RotateCcw,
	Truck,
	Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderTimeline } from "@/components/features/order";

// Mock order data
const mockOrder = {
	id: "order-1",
	orderNumber: "PS-ABC123",
	status: "shipped" as const,
	createdAt: "2024-01-15T10:30:00Z",
	total: { amount: 15999, formatted: "$159.99" },
	subtotal: { amount: 14499, formatted: "$144.99" },
	shipping: { amount: 599, formatted: "$5.99" },
	tax: { amount: 901, formatted: "$9.01" },
	items: [
		{
			id: "item-1",
			name: "Organic Coffee Beans - Premium Blend",
			sku: "COF-001",
			quantity: 2,
			unitPrice: { amount: 2499, formatted: "$24.99" },
			totalPrice: { amount: 4998, formatted: "$49.98" },
			image: {
				url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200",
				alt: "Coffee",
			},
		},
		{
			id: "item-2",
			name: "Organic Almond Butter",
			sku: "NUT-002",
			quantity: 1,
			unitPrice: { amount: 1299, formatted: "$12.99" },
			totalPrice: { amount: 1299, formatted: "$12.99" },
			image: {
				url: "https://images.unsplash.com/photo-1612187209234-567b6e9a1439?w=200",
				alt: "Almond Butter",
			},
		},
		{
			id: "item-3",
			name: "Extra Virgin Olive Oil",
			sku: "OIL-003",
			quantity: 2,
			unitPrice: { amount: 1899, formatted: "$18.99" },
			totalPrice: { amount: 3798, formatted: "$37.98" },
			image: {
				url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200",
				alt: "Olive Oil",
			},
		},
	],
	itemCount: 5,
	shippingAddress: {
		firstName: "John",
		lastName: "Doe",
		streetAddress: "123 Main Street",
		streetAddress2: "Apt 4B",
		city: "San Jose",
		state: "San Jose",
		postalCode: "10101",
		country: "Costa Rica",
		phone: "+506 8888-1234",
	},
	billingAddress: {
		firstName: "John",
		lastName: "Doe",
		streetAddress: "123 Main Street",
		streetAddress2: "Apt 4B",
		city: "San Jose",
		state: "San Jose",
		postalCode: "10101",
		country: "Costa Rica",
	},
	paymentMethod: {
		type: "card",
		brand: "Visa",
		last4: "4242",
	},
	tracking: {
		carrier: "FedEx",
		trackingNumber: "123456789012",
		estimatedDelivery: "2024-01-18T00:00:00Z",
	},
	timeline: [
		{
			id: "evt-1",
			status: "placed",
			description: "Order placed",
			timestamp: "2024-01-15T10:30:00Z",
			isCompleted: true,
			isCurrent: false,
		},
		{
			id: "evt-2",
			status: "confirmed",
			description: "Order confirmed",
			timestamp: "2024-01-15T10:35:00Z",
			isCompleted: true,
			isCurrent: false,
		},
		{
			id: "evt-3",
			status: "processing",
			description: "Order being prepared",
			timestamp: "2024-01-15T14:00:00Z",
			isCompleted: true,
			isCurrent: false,
		},
		{
			id: "evt-4",
			status: "shipped",
			description: "Shipped via FedEx",
			timestamp: "2024-01-16T09:00:00Z",
			isCompleted: true,
			isCurrent: true,
		},
		{
			id: "evt-5",
			status: "delivered",
			description: "Delivered",
			timestamp: "",
			isCompleted: false,
			isCurrent: false,
		},
	],
};

const statusConfig = {
	processing: { label: "Processing", color: "bg-yellow-100 text-yellow-800" },
	shipped: { label: "Shipped", color: "bg-blue-100 text-blue-800" },
	delivered: { label: "Delivered", color: "bg-green-100 text-green-800" },
	cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800" },
};

export default function OrderDetailPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	use(params);
	const [order, _setOrder] = useState(mockOrder);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate loading
		setTimeout(() => setIsLoading(false), 500);
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-12">
				<Loader2 className="w-8 h-8 animate-spin text-[#0052a1]" />
			</div>
		);
	}

	const status = statusConfig[order.status];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<Link
						href="/account/orders"
						className="text-sm text-gray-600 hover:text-[#0052a1] inline-flex items-center mb-2"
					>
						<ArrowLeft className="w-4 h-4 mr-1" />
						Back to Orders
					</Link>
					<div className="flex items-center gap-3">
						<h1 className="text-2xl font-bold text-gray-900">
							Order {order.orderNumber}
						</h1>
						<span
							className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
						>
							{status.label}
						</span>
					</div>
					<p className="text-gray-600 mt-1">
						Placed on{" "}
						{new Date(order.createdAt).toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</p>
				</div>
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						<Printer className="w-4 h-4 mr-2" />
						Print
					</Button>
					<Button variant="outline" size="sm">
						<RotateCcw className="w-4 h-4 mr-2" />
						Reorder
					</Button>
				</div>
			</div>

			<div className="grid lg:grid-cols-3 gap-6">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Tracking Info */}
					{order.tracking && (
						<div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
							<div className="flex items-start gap-3">
								<Truck className="w-5 h-5 text-blue-600 mt-0.5" />
								<div className="flex-1">
									<p className="font-medium text-blue-900">
										Your order is on the way!
									</p>
									<p className="text-sm text-blue-700 mt-1">
										Estimated delivery:{" "}
										{new Date(
											order.tracking.estimatedDelivery,
										).toLocaleDateString("en-US", {
											weekday: "long",
											month: "long",
											day: "numeric",
										})}
									</p>
									<div className="mt-3 flex flex-wrap gap-2">
										<span className="text-sm text-blue-700">
											{order.tracking.carrier}: {order.tracking.trackingNumber}
										</span>
										<Button size="sm" className="bg-blue-600 hover:bg-blue-700">
											Track Package
										</Button>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Order Timeline */}
					<div className="bg-white rounded-xl border p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-6">
							Order Status
						</h2>
						<OrderTimeline events={order.timeline} />
					</div>

					{/* Order Items */}
					<div className="bg-white rounded-xl border p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Items ({order.itemCount})
						</h2>
						<div className="space-y-4">
							{order.items.map((item) => (
								<div
									key={item.id}
									className="flex gap-4 py-4 border-b last:border-0 last:pb-0"
								>
									<div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0">
										{item.image ? (
											<Image
												src={item.image.url}
												alt={item.image.alt || item.name}
												fill
												className="object-cover"
											/>
										) : (
											<div className="w-full h-full flex items-center justify-center">
												<Package className="w-8 h-8 text-gray-400" />
											</div>
										)}
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-medium text-gray-900">{item.name}</p>
										<p className="text-sm text-gray-500">SKU: {item.sku}</p>
										<p className="text-sm text-gray-600 mt-1">
											Qty: {item.quantity} x {item.unitPrice.formatted}
										</p>
									</div>
									<p className="font-semibold text-gray-900">
										{item.totalPrice.formatted}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Order Summary */}
					<div className="bg-white rounded-xl border p-6">
						<h2 className="text-lg font-semibold text-gray-900 mb-4">
							Order Summary
						</h2>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between">
								<span className="text-gray-600">Subtotal</span>
								<span className="text-gray-900">
									{order.subtotal.formatted}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Shipping</span>
								<span className="text-gray-900">
									{order.shipping.formatted}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-gray-600">Tax</span>
								<span className="text-gray-900">{order.tax.formatted}</span>
							</div>
							<Separator className="my-2" />
							<div className="flex justify-between font-semibold text-base">
								<span className="text-gray-900">Total</span>
								<span className="text-[#0052a1]">{order.total.formatted}</span>
							</div>
						</div>
					</div>

					{/* Shipping Address */}
					<div className="bg-white rounded-xl border p-6">
						<div className="flex items-center gap-2 mb-4">
							<MapPin className="w-5 h-5 text-[#0052a1]" />
							<h2 className="text-lg font-semibold text-gray-900">
								Shipping Address
							</h2>
						</div>
						<div className="text-sm text-gray-600">
							<p className="font-medium text-gray-900">
								{order.shippingAddress.firstName}{" "}
								{order.shippingAddress.lastName}
							</p>
							<p>{order.shippingAddress.streetAddress}</p>
							{order.shippingAddress.streetAddress2 && (
								<p>{order.shippingAddress.streetAddress2}</p>
							)}
							<p>
								{order.shippingAddress.city}, {order.shippingAddress.state}{" "}
								{order.shippingAddress.postalCode}
							</p>
							<p>{order.shippingAddress.country}</p>
							{order.shippingAddress.phone && (
								<p className="mt-2">{order.shippingAddress.phone}</p>
							)}
						</div>
					</div>

					{/* Payment Method */}
					<div className="bg-white rounded-xl border p-6">
						<div className="flex items-center gap-2 mb-4">
							<CreditCard className="w-5 h-5 text-[#0052a1]" />
							<h2 className="text-lg font-semibold text-gray-900">
								Payment Method
							</h2>
						</div>
						<div className="flex items-center gap-3">
							<div className="w-12 h-8 bg-gradient-to-br from-[#0052a1] to-[#003d7a] rounded flex items-center justify-center">
								<CreditCard className="w-5 h-5 text-white" />
							</div>
							<div className="text-sm">
								<p className="font-medium text-gray-900">
									{order.paymentMethod.brand} ending in{" "}
									{order.paymentMethod.last4}
								</p>
							</div>
						</div>
					</div>

					{/* Need Help */}
					<div className="bg-gray-50 rounded-xl border p-6">
						<h2 className="font-semibold text-gray-900 mb-2">Need Help?</h2>
						<p className="text-sm text-gray-600 mb-4">
							If you have questions about your order, we&apos;re here to help.
						</p>
						<Button variant="outline" className="w-full">
							Contact Support
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
