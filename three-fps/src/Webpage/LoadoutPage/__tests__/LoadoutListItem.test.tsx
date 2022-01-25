import LoadoutListItem from "../LoadoutListItem"
import React from "react-dom"
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

	render(<LoadoutListItem item={item} onClick={onClickListener}/>)

	userEvent.click(screen.getByText("test-item"))

	expect(onClickListener).toBeCalledWith(item)
})