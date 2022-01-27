import useInventoryControls from "../useInventoryControls"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { ReactElement } from "react"

function InventoryController() : ReactElement {
	const slot = useInventoryControls()

	return (
		<div>
			<h1>{slot.nextSlot}</h1>
		</div>
	)
}

it("Should handle numkeys for Inventory Controls", () => {
	render(<InventoryController />)

	expect(screen.getByText(0)).toBeDefined()

	userEvent.keyboard("[Digit2]")
	expect(screen.getByText(1)).toBeDefined()

	userEvent.keyboard("[Digit3]")
	expect(screen.getByText(2)).toBeDefined()

	userEvent.keyboard("[Digit4]")
	expect(screen.getByText(3)).toBeDefined()

	userEvent.keyboard("[Digit1]")
	expect(screen.getByText(0)).toBeDefined()
})