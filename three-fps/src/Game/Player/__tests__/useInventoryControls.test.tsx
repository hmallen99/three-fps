import useInventoryControls from "../useInventoryControls"
import React from "react-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { ReactElement } from "react"

function InventoryController() : ReactElement {
	const { slotRef, nextSlot } = useInventoryControls()

	return (
		<div>
			<h1>{nextSlot}</h1>
		</div>
	)
}

it("Should render a Loadout List Item", () => {
	render(<InventoryController />)

	expect(screen.getByText(0)).toBeDefined()

	userEvent.keyboard("[Digit2]")

	expect(screen.getByText(1)).toBeDefined()
})