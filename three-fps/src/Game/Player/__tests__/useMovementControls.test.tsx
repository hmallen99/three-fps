import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { ReactElement, useRef } from "react"
import useMovementControls from "../useMovementControls"

type MovementProps = {
	velocity : Array<number>
}

function MovementController(props : MovementProps) : ReactElement {
	const velocity = useRef(props.velocity)
	const { forward, backward, left, right, jump } = useMovementControls(velocity)

	return (
		<div>
			<h1 data-testid="forward">{forward.toString()}</h1>
			<h1 data-testid="backward">{backward.toString()}</h1>
			<h1 data-testid="left">{left.toString()}</h1>
			<h1 data-testid="right">{right.toString()}</h1>
			<h1 data-testid="jump">{jump.jump.toString()}{jump.jumpCount}{jump.jumpHeld.toString()}</h1>
		</div>
	)
}

it("Should handle wasd movement", () => {
	render(<MovementController velocity={[0, 0, 0]}/>)

	expect(screen.getByTestId("forward").textContent).toEqual("false")
	expect(screen.getByTestId("backward").textContent).toEqual("false")
	expect(screen.getByTestId("left").textContent).toEqual("false")
	expect(screen.getByTestId("right").textContent).toEqual("false")

	let keyboardState = userEvent.keyboard("[KeyW>]")
	expect(screen.getByTestId("forward").textContent).toEqual("true")
	expect(screen.getByTestId("backward").textContent).toEqual("false")
	expect(screen.getByTestId("left").textContent).toEqual("false")
	expect(screen.getByTestId("right").textContent).toEqual("false")

	userEvent.keyboard("[/KeyW]", {keyboardState})
	keyboardState = userEvent.keyboard("[KeyS>]")
	expect(screen.getByTestId("forward").textContent).toEqual("false")
	expect(screen.getByTestId("backward").textContent).toEqual("true")
	expect(screen.getByTestId("left").textContent).toEqual("false")
	expect(screen.getByTestId("right").textContent).toEqual("false")

	userEvent.keyboard("[/KeyS]", {keyboardState})
	keyboardState = userEvent.keyboard("[KeyA>]")
	expect(screen.getByTestId("forward").textContent).toEqual("false")
	expect(screen.getByTestId("backward").textContent).toEqual("false")
	expect(screen.getByTestId("left").textContent).toEqual("true")
	expect(screen.getByTestId("right").textContent).toEqual("false")

	userEvent.keyboard("[/KeyA]", {keyboardState})
	keyboardState = userEvent.keyboard("[KeyD>]")
	expect(screen.getByTestId("forward").textContent).toEqual("false")
	expect(screen.getByTestId("backward").textContent).toEqual("false")
	expect(screen.getByTestId("left").textContent).toEqual("false")
	expect(screen.getByTestId("right").textContent).toEqual("true")

	userEvent.keyboard("[/KeyD]", {keyboardState})
	expect(screen.getByTestId("forward").textContent).toEqual("false")
	expect(screen.getByTestId("backward").textContent).toEqual("false")
	expect(screen.getByTestId("left").textContent).toEqual("false")
	expect(screen.getByTestId("right").textContent).toEqual("false")
})

it("Should handle single jump", () => {
	render(<MovementController velocity={[0, 0, 0]}/>)
	expect(screen.getByTestId("jump").textContent).toEqual("false0false")

	const keyboardState = userEvent.keyboard("[Space>]")
	expect(screen.getByTestId("jump").textContent).toEqual("true1true")
	userEvent.keyboard("[/Space]", {keyboardState})
	expect(screen.getByTestId("jump").textContent).toEqual("false1false")
})

it("Should handle double jump", () => {
	const velocity = [0, 1, 0]
	render(<MovementController velocity={velocity}/>)
	let keyboardState = userEvent.keyboard("[Space>]")
	expect(screen.getByTestId("jump").textContent).toEqual("true1true")
	userEvent.keyboard("[/Space]", {keyboardState})

	keyboardState = userEvent.keyboard("[Space>]")
	expect(screen.getByTestId("jump").textContent).toEqual("true2true")

	userEvent.keyboard("[/Space]", {keyboardState})
	keyboardState = userEvent.keyboard("[Space>]")
	expect(screen.getByTestId("jump").textContent).toEqual("false3true")

	velocity[1] = 0
	userEvent.keyboard("[/Space]", {keyboardState})
	userEvent.keyboard("[Space>]")
	expect(screen.getByTestId("jump").textContent).toEqual("true1true")
})