import LoadoutSlot from "../LoadoutSlot"
import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

it("Should render a Loadout List Item", () => {
	const item = {
		damage: 10,
		assetID: "test-asset-id",
		ammo: 30,
		name: "test-item",
	}

	const onClickListener = jest.fn()

	render(<LoadoutSlot slotNumber={0} item={item} onClick={onClickListener}/>)

	userEvent.click(screen.getByText("test-item"))

	expect(onClickListener).toBeCalledWith("test-asset-id", 0)
})